import type { Tables, TablesInsert } from '@/lib/database.types'
import { createClient } from '@/lib/supabase/client'

export type CmsSeoEntityType = 'page' | 'news'
export type CmsSeoLocale = 'all' | 'ru' | 'en'
export type CmsSeoMetaRecord = Tables<'cms_seo_metadata'>

export interface CmsSeoMetaInput {
    seo_title?: string | null
    seo_description?: string | null
    canonical_url?: string | null
    og_image_url?: string | null
    robots_index?: boolean
    robots_follow?: boolean
    structured_data_enabled?: boolean
    structured_data_type?: string | null
}

export interface CmsSeoFormDefaults {
    seo_title: string
    seo_description: string
    canonical_url: string
    og_image_url: string
    robots_index: boolean
    robots_follow: boolean
    structured_data_enabled: boolean
    structured_data_type: string
}

export const DEFAULT_SEO_META: CmsSeoFormDefaults = {
    seo_title: '',
    seo_description: '',
    canonical_url: '',
    og_image_url: '',
    robots_index: true,
    robots_follow: true,
    structured_data_enabled: false,
    structured_data_type: '',
}

export async function getSeoMeta(
    entityType: CmsSeoEntityType,
    entityId: string,
    locale: CmsSeoLocale = 'all'
) {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('cms_seo_metadata')
        .select('*')
        .eq('entity_type', entityType)
        .eq('entity_id', entityId)
        .eq('locale', locale)
        .maybeSingle()

    if (error) throw error
    return data as CmsSeoMetaRecord | null
}

export async function upsertSeoMeta(
    entityType: CmsSeoEntityType,
    entityId: string,
    input: CmsSeoMetaInput,
    locale: CmsSeoLocale = 'all'
) {
    const supabase = createClient()
    const payload: TablesInsert<'cms_seo_metadata'> = {
        entity_type: entityType,
        entity_id: entityId,
        locale,
        seo_title: input.seo_title || null,
        seo_description: input.seo_description || null,
        canonical_url: input.canonical_url || null,
        og_image_url: input.og_image_url || null,
        robots_index: input.robots_index ?? true,
        robots_follow: input.robots_follow ?? true,
        structured_data_enabled: input.structured_data_enabled ?? false,
        structured_data_type: input.structured_data_type || null,
    }

    const { data, error } = await supabase
        .from('cms_seo_metadata')
        .upsert(payload, {
            onConflict: 'entity_type,entity_id,locale',
        })
        .select('*')
        .single()

    if (error) throw error
    return data as CmsSeoMetaRecord
}
