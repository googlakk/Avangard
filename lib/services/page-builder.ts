import { createClient } from '@/lib/supabase/client'

export type CmsPageStatus = 'draft' | 'review' | 'published' | 'archived'
export type CmsSectionType = 'hero' | 'content' | 'cards' | 'cta' | 'media' | 'custom'

export interface CmsPageRecord {
    id: string
    slug: string
    title_ru: string
    title_en: string
    status: CmsPageStatus
    version: number
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

export async function listCmsPages() {
    const supabase = getSupabase()
    const { data, error } = await supabase
        .from('cms_pages')
        .select('*')
        .order('updated_at', { ascending: false })

    if (error) throw error
    return (data || []) as CmsPageRecord[]
}

export async function createCmsPage(input: Partial<CmsPageRecord>) {
    const supabase = getSupabase()
    const { data, error } = await supabase
        .from('cms_pages')
        .insert({
            slug: input.slug,
            title_ru: input.title_ru,
            title_en: input.title_en,
            status: input.status || 'draft',
            version: input.version || 1,
            published_at: input.published_at || null,
        })
        .select('*')
        .single()

    if (error) throw error
    return data as CmsPageRecord
}

export async function updateCmsPage(pageId: string, input: Partial<CmsPageRecord>) {
    const supabase = getSupabase()
    const { data, error } = await supabase
        .from('cms_pages')
        .update(input)
        .eq('id', pageId)
        .select('*')
        .single()

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
