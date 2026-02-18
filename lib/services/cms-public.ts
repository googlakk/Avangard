import { createClient } from '@supabase/supabase-js'

export type PublicCmsPage = {
    id: string
    slug: string
    title_ru: string
    title_en: string
    status: string
    published_at: string | null
}

export type PublicCmsSection = {
    id: string
    key: string
    type: string
    order_index: number
    payload: Record<string, unknown>
    is_enabled: boolean
}

export type CmsSectionPayloadMap = Record<string, Record<string, unknown>>

type PublicSeoMeta = {
    seo_title: string | null
    seo_description: string | null
    canonical_url: string | null
    og_image_url: string | null
    robots_index: boolean
    robots_follow: boolean
}

function getSupabase() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}

export async function getPublishedCmsPageBySlug(slug: string) {
    const supabase = getSupabase()
    const { data } = await supabase
        .from('cms_pages')
        .select('id, slug, title_ru, title_en, status, published_at')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle()

    return (data || null) as PublicCmsPage | null
}

export async function getCmsPageSections(pageId: string) {
    const supabase = getSupabase()
    const { data } = await supabase
        .from('cms_sections')
        .select('id, key, type, order_index, payload, is_enabled')
        .eq('page_id', pageId)
        .eq('is_enabled', true)
        .order('order_index', { ascending: true })

    return (data || []) as PublicCmsSection[]
}

export async function getPublishedCmsSectionPayloadsBySlug(slug: string) {
    const page = await getPublishedCmsPageBySlug(slug)
    if (!page) return null

    const sections = await getCmsPageSections(page.id)
    const map: CmsSectionPayloadMap = {}
    sections.forEach(section => {
        map[section.key] = (section.payload || {}) as Record<string, unknown>
    })

    return map
}

export async function getCmsPageSeoMeta(entityId: string) {
    const supabase = getSupabase()
    const { data } = await supabase
        .from('cms_seo_metadata')
        .select('seo_title, seo_description, canonical_url, og_image_url, robots_index, robots_follow')
        .eq('entity_type', 'page')
        .eq('entity_id', entityId)
        .eq('locale', 'all')
        .maybeSingle()

    return (data || null) as PublicSeoMeta | null
}
