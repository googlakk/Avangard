'use client'

/**
 * Admin Dashboard Page
 * Stage 2 - INT-33: CMS Metrics & Content Health Widgets
 */

import { useUser } from '@/lib/auth/client'
import { signOut } from '@/lib/auth/client'
import { documentsService, galleryService, newsService } from '@/lib/services/api'
import { listCmsPages, type CmsPageRecord } from '@/lib/services/page-builder'
import type { Tables } from '@/lib/database.types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type NewsItem = Tables<'news'>
type DocumentItem = Tables<'documents'>
type GalleryItem = Tables<'gallery'>

interface HealthMetrics {
    draftCount: number
    outdatedCount: number
    brokenLinksCount: number
    publishQueueCount: number
}

function isValidUrl(value: string | null) {
    if (!value) return false
    try {
        const parsed = new URL(value)
        return parsed.protocol === 'http:' || parsed.protocol === 'https:'
    } catch {
        return false
    }
}

export default function AdminDashboardPage() {
    const { user, loading } = useUser()
    const router = useRouter()
    const [metricsLoading, setMetricsLoading] = useState(true)
    const [metricsError, setMetricsError] = useState<string | null>(null)
    const [newsItems, setNewsItems] = useState<NewsItem[]>([])
    const [documents, setDocuments] = useState<DocumentItem[]>([])
    const [galleries, setGalleries] = useState<GalleryItem[]>([])
    const [pages, setPages] = useState<CmsPageRecord[]>([])

    const fetchMetricsData = useCallback(async () => {
        try {
            setMetricsLoading(true)
            setMetricsError(null)

            const [newsData, documentsData, galleriesData, pagesData] = await Promise.all([
                newsService.getAll().catch(() => []),
                documentsService.getAll().catch(() => []),
                galleryService.getAll().catch(() => []),
                listCmsPages().catch(() => []),
            ])

            setNewsItems(newsData || [])
            setDocuments(documentsData || [])
            setGalleries(galleriesData || [])
            setPages(pagesData || [])
        } catch (err) {
            console.error('Failed to fetch dashboard metrics:', err)
            setMetricsError('Не удалось загрузить метрики CMS')
        } finally {
            setMetricsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchMetricsData()
    }, [fetchMetricsData])

    const metrics: HealthMetrics = useMemo(() => {
        const now = new Date()
        const staleThreshold = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 90) // 90 days

        const newsDrafts = newsItems.filter(item => !item.is_published)
        const galleryDrafts = galleries.filter(item => !item.is_published)
        const pageDrafts = pages.filter(item => item.status !== 'published')

        const outdatedNews = newsItems.filter(item => {
            if (!item.is_published) return false
            const updatedAt = item.updated_at || item.published_at
            return !!updatedAt && new Date(updatedAt) < staleThreshold
        })
        const outdatedDocs = documents.filter(item => {
            if (item.is_archived) return false
            const updatedAt = item.updated_at || item.published_at
            return !!updatedAt && new Date(updatedAt) < staleThreshold
        })
        const outdatedGalleries = galleries.filter(item => {
            if (!item.is_published) return false
            const updatedAt = item.updated_at
            return !!updatedAt && new Date(updatedAt) < staleThreshold
        })
        const outdatedPages = pages.filter(item => {
            if (item.status !== 'published') return false
            const updatedAt = item.updated_at || item.published_at
            return !!updatedAt && new Date(updatedAt) < staleThreshold
        })

        const brokenDocumentLinks = documents.filter(item => !isValidUrl(item.file_url))
        const brokenNewsImageLinks = newsItems.filter(item => item.image_url && !isValidUrl(item.image_url))
        const brokenGalleryCoverLinks = galleries.filter(item => item.cover_image_url && !isValidUrl(item.cover_image_url))

        const publishQueueCount =
            newsDrafts.length
            + galleryDrafts.length
            + pageDrafts.length

        return {
            draftCount: publishQueueCount,
            outdatedCount:
                outdatedNews.length
                + outdatedDocs.length
                + outdatedGalleries.length
                + outdatedPages.length,
            brokenLinksCount:
                brokenDocumentLinks.length
                + brokenNewsImageLinks.length
                + brokenGalleryCoverLinks.length,
            publishQueueCount,
        }
    }, [documents, galleries, newsItems, pages])

    const publishQueuePreview = useMemo(() => {
        const queue: Array<{ id: string; title: string; module: string }> = []

        newsItems
            .filter(item => !item.is_published)
            .slice(0, 3)
            .forEach(item => queue.push({ id: item.id, title: item.title_ru, module: 'News' }))
        galleries
            .filter(item => !item.is_published)
            .slice(0, 3)
            .forEach(item => queue.push({ id: item.id, title: item.album_name_ru, module: 'Gallery' }))
        pages
            .filter(item => item.status !== 'published')
            .slice(0, 3)
            .forEach(item => queue.push({ id: item.id, title: item.title_ru, module: 'Pages' }))

        return queue.slice(0, 6)
    }, [galleries, newsItems, pages])

    const handleSignOut = async () => {
        await signOut()
        router.push('/admin/login')
        router.refresh()
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Admin Dashboard
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Welcome back, {user?.email}
                            </p>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {metricsError && (
                    <div className="mb-6 bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {metricsError}
                    </div>
                )}

                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">CMS Content Health</h2>
                    <button
                        onClick={fetchMetricsData}
                        className="px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Refresh
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                            Draft Count
                        </h3>
                        <p className="text-3xl font-bold text-gray-900">
                            {metricsLoading ? '...' : metrics.draftCount}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">News + Gallery + Pages</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                            Outdated Content
                        </h3>
                        <p className="text-3xl font-bold text-gray-900">
                            {metricsLoading ? '...' : metrics.outdatedCount}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">Older than 90 days</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                            Broken Links
                        </h3>
                        <p className="text-3xl font-bold text-gray-900">
                            {metricsLoading ? '...' : metrics.brokenLinksCount}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">Invalid URL metadata in CMS</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                            Publish Queue
                        </h3>
                        <p className="text-3xl font-bold text-gray-900">
                            {metricsLoading ? '...' : metrics.publishQueueCount}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">Items waiting to publish</p>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-base font-semibold text-gray-900 mb-3">Publish Queue Preview</h3>
                        {publishQueuePreview.length === 0 && (
                            <p className="text-sm text-gray-500">Очередь публикации пуста</p>
                        )}
                        {publishQueuePreview.length > 0 && (
                            <ul className="space-y-2">
                                {publishQueuePreview.map(item => (
                                    <li key={item.id} className="text-sm text-gray-700 flex justify-between gap-3">
                                        <span className="truncate">{item.title}</span>
                                        <span className="text-xs text-gray-400">{item.module}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-base font-semibold text-gray-900 mb-3">Module Shortcuts</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <Link href="/admin/staff" className="px-3 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">Staff</Link>
                            <Link href="/admin/news" className="px-3 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">News</Link>
                            <Link href="/admin/documents" className="px-3 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">Documents</Link>
                            <Link href="/admin/gallery" className="px-3 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">Gallery</Link>
                            <Link href="/admin/pages" className="px-3 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">Pages Builder</Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
