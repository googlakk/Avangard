import { createClient } from '@/lib/supabase/client'

export type CmsPageStatus = 'draft' | 'review' | 'scheduled' | 'published' | 'archived'
export type CmsSectionType = 'hero' | 'content' | 'cards' | 'cta' | 'media' | 'custom'

export interface CmsPageRecord {
    id: string
    slug: string
    title_ru: string
    title_en: string
    status: CmsPageStatus
    version: number
    scheduled_at: string | null
    published_at: string | null
    updated_at: string | null
}

export interface CmsSectionRecord {
    id: string
    page_id: string
    key: string
    type: CmsSectionType
    order_index: number
    payload: Record<string, unknown>
    is_enabled: boolean
    updated_at: string | null
}

const PAGE_STATUS_TRANSITIONS: Record<CmsPageStatus, CmsPageStatus[]> = {
    draft: ['review', 'scheduled', 'published', 'archived'],
    review: ['draft', 'scheduled', 'published', 'archived'],
    scheduled: ['draft', 'review', 'published', 'archived'],
    published: ['draft', 'archived'],
    archived: ['draft', 'review'],
}

export function getAllowedPageStatusTransitions(status: CmsPageStatus) {
    return PAGE_STATUS_TRANSITIONS[status]
}

export function canTransitionPageStatus(from: CmsPageStatus, to: CmsPageStatus) {
    if (from === to) return true
    return PAGE_STATUS_TRANSITIONS[from].includes(to)
}

function getSupabase() {
    return createClient() as unknown as {
        from: (table: string) => {
            select: (query?: string) => any
            insert: (data: unknown) => any
            update: (data: unknown) => any
            delete: () => any
        }
    }
}

function isMissingColumnError(error: unknown, column: string, table: string) {
    const message = (error as { message?: string })?.message || ''
    return message.includes(`'${column}'`) && message.includes(`'${table}'`)
}

export async function listCmsPages() {
    const supabase = getSupabase()
    const { data, error } = await supabase
        .from('cms_pages')
        .select('*')
        .order('updated_at', { ascending: false })

    if (error) throw error
    return (data || []) as CmsPageRecord[]
}

export async function getCmsPageBySlug(slug: string) {
    const supabase = getSupabase()
    const { data, error } = await supabase
        .from('cms_pages')
        .select('*')
        .eq('slug', slug)
        .maybeSingle()

    if (error) throw error
    return (data || null) as CmsPageRecord | null
}

export async function createCmsPage(input: Partial<CmsPageRecord>) {
    const supabase = getSupabase()
    const basePayload: Record<string, unknown> = {
        slug: input.slug,
        title_ru: input.title_ru,
        title_en: input.title_en,
        status: input.status || 'draft',
        version: input.version || 1,
        published_at: input.published_at || null,
    }

    if (Object.prototype.hasOwnProperty.call(input, 'scheduled_at')) {
        basePayload.scheduled_at = input.scheduled_at || null
    }

    const insertWithPayload = async (payload: Record<string, unknown>) =>
        supabase
            .from('cms_pages')
            .insert(payload)
            .select('*')
            .single()

    let { data, error } = await insertWithPayload(basePayload)

    if (error && isMissingColumnError(error, 'scheduled_at', 'cms_pages')) {
        const fallbackPayload = { ...basePayload }
        delete fallbackPayload.scheduled_at
        const retried = await insertWithPayload(fallbackPayload)
        data = retried.data
        error = retried.error
    }

    if (error) throw error
    return data as CmsPageRecord
}

function preparePageLifecyclePayload(
    current: CmsPageRecord,
    input: Partial<CmsPageRecord>
): Partial<CmsPageRecord> {
    const nextStatus = input.status ?? current.status
    const hasStatusChange = nextStatus !== current.status

    if (hasStatusChange && !canTransitionPageStatus(current.status, nextStatus)) {
        throw new Error(`Invalid status transition: ${current.status} -> ${nextStatus}`)
    }

    const payload: Partial<CmsPageRecord> = { ...input }

    if (input.status) {
        if (nextStatus === 'scheduled') {
            const nextScheduledAt = input.scheduled_at ?? current.scheduled_at
            if (!nextScheduledAt) {
                throw new Error('scheduled_at is required when status is scheduled')
            }

            payload.scheduled_at = nextScheduledAt
            payload.published_at = null
        } else if (nextStatus === 'published') {
            payload.scheduled_at = null
            payload.published_at = input.published_at ?? current.published_at ?? new Date().toISOString()
        } else {
            payload.scheduled_at = null
            if (nextStatus === 'draft' || nextStatus === 'review') {
                payload.published_at = null
            }
        }
    } else if (Object.prototype.hasOwnProperty.call(input, 'scheduled_at') && current.status !== 'scheduled') {
        throw new Error('scheduled_at can be changed only for pages in scheduled status')
    }

    return payload
}

export async function updateCmsPage(pageId: string, input: Partial<CmsPageRecord>) {
    const supabase = getSupabase()
    const { data: current, error: currentError } = await supabase
        .from('cms_pages')
        .select('*')
        .eq('id', pageId)
        .single()

    if (currentError) throw currentError

    const payload = preparePageLifecyclePayload(current as CmsPageRecord, input)

    const updateWithPayload = async (nextPayload: Partial<CmsPageRecord>) =>
        supabase
            .from('cms_pages')
            .update(nextPayload)
            .eq('id', pageId)
            .select('*')
            .single()

    let { data, error } = await updateWithPayload(payload)

    if (error && isMissingColumnError(error, 'scheduled_at', 'cms_pages')) {
        const fallbackPayload = { ...payload }
        delete fallbackPayload.scheduled_at
        const retried = await updateWithPayload(fallbackPayload)
        data = retried.data
        error = retried.error
    }

    if (error) throw error
    return data as CmsPageRecord
}

export async function deleteCmsPage(pageId: string) {
    const supabase = getSupabase()
    const { error } = await supabase
        .from('cms_pages')
        .delete()
        .eq('id', pageId)

    if (error) throw error
}

export async function listCmsSections(pageId: string) {
    const supabase = getSupabase()
    const { data, error } = await supabase
        .from('cms_sections')
        .select('*')
        .eq('page_id', pageId)
        .order('order_index', { ascending: true })

    if (error) throw error
    return (data || []) as CmsSectionRecord[]
}

export async function createCmsSection(input: Partial<CmsSectionRecord>) {
    const supabase = getSupabase()
    const { data, error } = await supabase
        .from('cms_sections')
        .insert({
            page_id: input.page_id,
            key: input.key,
            type: input.type,
            order_index: input.order_index || 0,
            payload: input.payload || {},
            is_enabled: typeof input.is_enabled === 'boolean' ? input.is_enabled : true,
        })
        .select('*')
        .single()

    if (error) throw error
    return data as CmsSectionRecord
}

export async function updateCmsSection(sectionId: string, input: Partial<CmsSectionRecord>) {
    const supabase = getSupabase()
    const { data, error } = await supabase
        .from('cms_sections')
        .update(input)
        .eq('id', sectionId)
        .select('*')
        .single()

    if (error) throw error
    return data as CmsSectionRecord
}

export async function deleteCmsSection(sectionId: string) {
    const supabase = getSupabase()
    const { error } = await supabase
        .from('cms_sections')
        .delete()
        .eq('id', sectionId)

    if (error) throw error
}

export async function reorderCmsSections(items: { id: string; order_index: number }[]) {
    const supabase = getSupabase()
    await Promise.all(
        items.map(item =>
            supabase
                .from('cms_sections')
                .update({ order_index: item.order_index })
                .eq('id', item.id)
        )
    )
}
