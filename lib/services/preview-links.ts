import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

export type PreviewEntityType = 'page' | 'news'

function getServiceClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!url || !key) {
        throw new Error('Missing Supabase service role configuration')
    }

    return createClient(url, key)
}

function getBaseUrl() {
    return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
}

function hashToken(token: string) {
    return crypto.createHash('sha256').update(token).digest('hex')
}

export async function createPreviewLink(input: {
    entityType: PreviewEntityType
    entityId: string
    slug: string
    expiresInMinutes?: number
    maxUses?: number
    createdBy?: string | null
}) {
    const supabase = getServiceClient()
    const token = crypto.randomBytes(32).toString('hex')
    const tokenHash = hashToken(token)
    const expiresInMinutes = input.expiresInMinutes ?? 60
    const maxUses = input.maxUses ?? 3
    const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000).toISOString()

    const { error } = await supabase
        .from('cms_preview_links')
        .insert({
            entity_type: input.entityType,
            entity_id: input.entityId,
            slug: input.slug,
            token_hash: tokenHash,
            expires_at: expiresAt,
            max_uses: maxUses,
            created_by: input.createdBy || null,
        })

    if (error) throw error

    const previewPath = input.entityType === 'page'
        ? `/preview/pages/${input.slug}`
        : `/preview/news/${input.slug}`

    const url = `${getBaseUrl()}${previewPath}?token=${token}`

    return { url, expiresAt, maxUses }
}

export async function validateAndConsumePreviewLink(input: {
    entityType: PreviewEntityType
    entityId: string
    token: string
}) {
    const supabase = getServiceClient()
    const tokenHash = hashToken(input.token)
    const nowIso = new Date().toISOString()

    const { data: record, error } = await supabase
        .from('cms_preview_links')
        .select('*')
        .eq('entity_type', input.entityType)
        .eq('entity_id', input.entityId)
        .eq('token_hash', tokenHash)
        .is('revoked_at', null)
        .gt('expires_at', nowIso)
        .maybeSingle()

    if (error) throw error
    if (!record) return false
    if (record.used_count >= record.max_uses) return false

    const { error: updateError } = await supabase
        .from('cms_preview_links')
        .update({
            used_count: record.used_count + 1,
        })
        .eq('id', record.id)

    if (updateError) throw updateError

    return true
}
