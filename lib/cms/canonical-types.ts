import type { Json, Tables } from '@/lib/database.types'

export type LocaleCode = 'ru' | 'en'

export interface LocalizedText {
    ru: string
    en: string
}

export type CmsDocument = Tables<'documents'>
export type CmsNews = Tables<'news'>
export type CmsDepartment = Tables<'departments'>
export type CmsStaffMember = Tables<'staff_members'>
export type CmsGallery = Tables<'gallery'>
export type CmsGalleryImage = Tables<'gallery_images'>

export type CmsPageStatus = 'draft' | 'review' | 'published' | 'archived'
export type CmsSectionType = 'hero' | 'content' | 'cards' | 'cta' | 'media' | 'custom'

export interface CmsPage {
    id: string
    slug: string
    title: LocalizedText
    status: CmsPageStatus
    version: number
    programCode?: string | null
    sections: CmsSection[]
    publishedAt?: string | null
    updatedAt: string
}

export interface CmsSection {
    id: string
    pageId: string
    key: string
    type: CmsSectionType
    orderIndex: number
    payload: Json
    isEnabled: boolean
    updatedAt: string
}

export interface CmsMediaAsset {
    id: string
    storageBucket: string
    storagePath: string
    mimeType: string
    sizeBytes: number
    alt: Partial<LocalizedText>
    createdAt: string
}

export interface CmsProgram {
    id: string
    code: string
    title: LocalizedText
    pageId: string
    isActive: boolean
    updatedAt: string
}

export interface CmsSetting {
    id: string
    scope: 'global' | 'page' | 'program'
    key: string
    value: Json
    updatedAt: string
}

export const CMS_IMPLEMENTED_TABLES = {
    documents: 'documents',
    news: 'news',
    departments: 'departments',
    staffMembers: 'staff_members',
    galleries: 'gallery',
    galleryImages: 'gallery_images',
} as const

export const CMS_CANONICAL_PENDING_TABLES = [
    'pages',
    'sections',
    'programs',
    'settings',
    'media_assets',
] as const

