import { NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { hasPermission } from '@/lib/auth/rbac'
import { resolveRoleForUser } from '@/lib/auth/roles'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const MAX_IMAGE_SIZE = 10 * 1024 * 1024
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif'])

function getServiceClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
        return null
    }

    return createClient(supabaseUrl, serviceRoleKey)
}

function sanitizeFileName(value: string) {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, '-')
        .replace(/-{2,}/g, '-')
        .replace(/^-+|-+$/g, '')
}

export async function POST(request: Request) {
    try {
        const supabase = await createServerClient()
        const { data: { user } } = await supabase.auth.getUser()

        const role = await resolveRoleForUser(user)
        if (!user || !hasPermission(role, 'pages', 'update')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const formData = await request.formData()
        const file = formData.get('file')
        const pageId = String(formData.get('pageId') || '').trim()
        const fieldId = String(formData.get('fieldId') || 'generic').trim()

        if (!(file instanceof File)) {
            return NextResponse.json({ error: 'File is required' }, { status: 400 })
        }
        if (!pageId) {
            return NextResponse.json({ error: 'pageId is required' }, { status: 400 })
        }
        if (!ALLOWED_TYPES.has(file.type)) {
            return NextResponse.json({ error: 'Only JPEG, PNG, WebP, and AVIF are allowed' }, { status: 400 })
        }
        if (file.size > MAX_IMAGE_SIZE) {
            return NextResponse.json({ error: 'Image size must be less than 10MB' }, { status: 400 })
        }

        const extension = (file.name.split('.').pop() || 'jpg').toLowerCase()
        const safeFieldId = sanitizeFileName(fieldId || 'generic')
        const filePath = `${pageId}/${safeFieldId}-${Date.now()}.${extension}`
        const serviceClient = getServiceClient()
        if (!serviceClient) {
            return NextResponse.json(
                { error: 'Supabase storage is not configured for production uploads' },
                { status: 500 }
            )
        }

        const uploadClient: SupabaseClient = serviceClient
        const { data, error } = await uploadClient.storage
            .from('gallery-images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: true,
                contentType: file.type,
            })

        if (error || !data?.path) {
            throw new Error(error?.message || 'Storage upload failed')
        }

        const { data: publicData } = uploadClient.storage
            .from('gallery-images')
            .getPublicUrl(data.path)

        return NextResponse.json({
            path: data.path,
            publicUrl: publicData.publicUrl,
        })
    } catch (error) {
        console.error('Failed to upload cms image:', error)
        const message = error instanceof Error ? error.message : 'Failed to upload image'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
