import { NextResponse } from 'next/server'
import { canAccessAdminPanel, normalizeRole } from '@/lib/auth/rbac'
import { createPreviewLink, type PreviewEntityType } from '@/lib/services/preview-links'
import { createClient } from '@/lib/supabase/server'

interface CreatePreviewBody {
    entityType: PreviewEntityType
    entityId: string
    slug: string
    expiresInMinutes?: number
    maxUses?: number
}

export async function POST(request: Request) {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        const role = normalizeRole(user?.user_metadata?.role ?? user?.app_metadata?.role)
        if (!user || !canAccessAdminPanel(role)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = (await request.json()) as CreatePreviewBody
        if (!body.entityType || !body.entityId || !body.slug) {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
        }

        const result = await createPreviewLink({
            entityType: body.entityType,
            entityId: body.entityId,
            slug: body.slug,
            expiresInMinutes: body.expiresInMinutes,
            maxUses: body.maxUses,
            createdBy: user.id,
        })

        return NextResponse.json(result)
    } catch (error) {
        console.error('Failed to create preview link:', error)
        return NextResponse.json({ error: 'Failed to create preview link' }, { status: 500 })
    }
}
