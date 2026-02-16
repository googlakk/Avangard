/**
 * Intellect School Website - Storage Service
 * File upload/download utilities for Supabase Storage
 * Sprint 0 - INT-6: Storage Buckets Configuration
 */

import { createClient } from '@/lib/supabase/client'

export type StorageBucket =
    | 'documents'
    | 'administration-photos'
    | 'news-images'
    | 'gallery-images'

/**
 * Upload file to Supabase Storage
 */
export async function uploadFile(
    bucket: StorageBucket,
    path: string,
    file: File,
    options?: { cacheControl?: string; upsert?: boolean }
) {
    const supabase = createClient()

    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
            cacheControl: options?.cacheControl || '3600',
            upsert: options?.upsert || false,
        })

    if (error) throw error

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path)

    return {
        path: data.path,
        publicUrl,
    }
}

/**
 * Delete file from Supabase Storage
 */
export async function deleteFile(bucket: StorageBucket, path: string) {
    const supabase = createClient()

    const { error } = await supabase.storage
        .from(bucket)
        .remove([path])

    if (error) throw error
    return true
}

/**
 * Get public URL for a file
 */
export function getPublicUrl(bucket: StorageBucket, path: string) {
    const supabase = createClient()

    const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(path)

    return data.publicUrl
}

/**
 * List files in a bucket path
 */
export async function listFiles(bucket: StorageBucket, path?: string) {
    const supabase = createClient()

    const { data, error } = await supabase.storage
        .from(bucket)
        .list(path, {
            limit: 100,
            offset: 0,
            sortBy: { column: 'created_at', order: 'desc' },
        })

    if (error) throw error
    return data
}

/**
 * Upload document (PDF)
 * Max size: 50MB
 */
export async function uploadDocument(file: File, category: string, version = 1) {
    // Validate file type
    if (file.type !== 'application/pdf') {
        throw new Error('Only PDF files are allowed for documents')
    }

    // Validate file size (50MB)
    if (file.size > 52428800) {
        throw new Error('Document size must be less than 50MB')
    }

    const timestamp = Date.now()
    const sanitizedVersion = Math.max(1, Math.trunc(version || 1))
    const fileName = `${category}/v${sanitizedVersion}/${timestamp}-${file.name}`

    return uploadFile('documents', fileName, file)
}

/**
 * Upload administration photo
 * Max size: 5MB
 */
export async function uploadAdministrationPhoto(file: File, adminId: string) {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
        throw new Error('Only JPEG, PNG, and WebP images are allowed')
    }

    // Validate file size (5MB)
    if (file.size > 5242880) {
        throw new Error('Image size must be less than 5MB')
    }

    const timestamp = Date.now()
    const extension = file.name.split('.').pop()
    const fileName = `${adminId}/${timestamp}.${extension}`

    return uploadFile('administration-photos', fileName, file, { upsert: true })
}

/**
 * Upload news image
 * Max size: 5MB
 */
export async function uploadNewsImage(file: File, slug: string) {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
        throw new Error('Only JPEG, PNG, and WebP images are allowed')
    }

    // Validate file size (5MB)
    if (file.size > 5242880) {
        throw new Error('Image size must be less than 5MB')
    }

    const timestamp = Date.now()
    const extension = file.name.split('.').pop()
    const fileName = `${slug}/${timestamp}.${extension}`

    return uploadFile('news-images', fileName, file)
}

/**
 * Upload gallery image
 * Max size: 10MB
 */
export async function uploadGalleryImage(file: File, galleryId: string) {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
        throw new Error('Only JPEG, PNG, and WebP images are allowed')
    }

    // Validate file size (10MB)
    if (file.size > 10485760) {
        throw new Error('Image size must be less than 10MB')
    }

    const timestamp = Date.now()
    const extension = file.name.split('.').pop()
    const fileName = `${galleryId}/${timestamp}.${extension}`

    return uploadFile('gallery-images', fileName, file)
}

/**
 * Upload multiple gallery images
 */
export async function uploadGalleryImages(files: File[], galleryId: string) {
    const uploadPromises = files.map(file => uploadGalleryImage(file, galleryId))
    return Promise.all(uploadPromises)
}

/**
 * Storage bucket configuration
 */
export const STORAGE_CONFIG = {
    documents: {
        maxSize: 52428800, // 50MB
        allowedTypes: ['application/pdf'],
        bucket: 'documents' as StorageBucket,
    },
    'administration-photos': {
        maxSize: 5242880, // 5MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
        bucket: 'administration-photos' as StorageBucket,
    },
    'news-images': {
        maxSize: 5242880, // 5MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
        bucket: 'news-images' as StorageBucket,
    },
    'gallery-images': {
        maxSize: 10485760, // 10MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
        bucket: 'gallery-images' as StorageBucket,
    },
} as const
