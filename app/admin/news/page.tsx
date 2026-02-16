'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
    ArrowLeft,
    Plus,
    Edit2,
    Trash2,
    Save,
    X,
    Loader2,
    Eye,
    EyeOff,
    ExternalLink,
    Pin,
    Upload,
    Search,
} from 'lucide-react'
import { newsService } from '@/lib/services/api'
import { uploadNewsImage } from '@/lib/services/storage'
import { DEFAULT_SEO_META, getSeoMeta, upsertSeoMeta } from '@/lib/services/seo'
import type { Tables, TablesInsert, TablesUpdate } from '@/lib/database.types'

type NewsArticle = Tables<'news'>
type NewsStatusFilter = 'all' | 'draft' | 'published'

interface NewsForm {
    title_ru: string
    title_en: string
    description_ru: string
    description_en: string
    content_ru: string
    content_en: string
    category: string
    slug: string
    image_url: string
    priority: number
    is_published: boolean
    seo_title: string
    seo_description: string
    canonical_url: string
    og_image_url: string
    robots_index: boolean
    robots_follow: boolean
    structured_data_enabled: boolean
    structured_data_type: string
}

const NEWS_CATEGORIES = ['news', 'achievement', 'event', 'announcement'] as const

const emptyForm: NewsForm = {
    title_ru: '',
    title_en: '',
    description_ru: '',
    description_en: '',
    content_ru: '',
    content_en: '',
    category: 'news',
    slug: '',
    image_url: '',
    priority: 0,
    is_published: false,
    seo_title: DEFAULT_SEO_META.seo_title,
    seo_description: DEFAULT_SEO_META.seo_description,
    canonical_url: DEFAULT_SEO_META.canonical_url,
    og_image_url: DEFAULT_SEO_META.og_image_url,
    robots_index: DEFAULT_SEO_META.robots_index,
    robots_follow: DEFAULT_SEO_META.robots_follow,
    structured_data_enabled: DEFAULT_SEO_META.structured_data_enabled,
    structured_data_type: DEFAULT_SEO_META.structured_data_type,
}

const ruToLatin: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y',
    к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f',
    х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
}

function generateSlug(value: string) {
    const transliterated = value
        .trim()
        .toLowerCase()
        .split('')
        .map(char => ruToLatin[char] ?? char)
        .join('')

    return transliterated
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .replace(/-{2,}/g, '-')
}

export default function AdminNewsPage() {
    const [articles, setArticles] = useState<NewsArticle[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [creatingPreviewId, setCreatingPreviewId] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const [showForm, setShowForm] = useState(false)
    const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null)
    const [form, setForm] = useState<NewsForm>(emptyForm)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [slugTouched, setSlugTouched] = useState(false)

    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<NewsStatusFilter>('all')
    const [categoryFilter, setCategoryFilter] = useState('all')

    const fetchNews = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await newsService.getAll()
            const sorted = (data || []).sort((a, b) => {
                const priorityDiff = (b.priority || 0) - (a.priority || 0)
                if (priorityDiff !== 0) return priorityDiff
                const dateA = new Date(a.published_at || a.updated_at || 0).getTime()
                const dateB = new Date(b.published_at || b.updated_at || 0).getTime()
                return dateB - dateA
            })
            setArticles(sorted)
        } catch (err) {
            console.error('Failed to fetch news:', err)
            setError('Ошибка загрузки новостей')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchNews()
    }, [fetchNews])

    const categories = useMemo(() => {
        const unique = new Set([...NEWS_CATEGORIES, ...articles.map(article => article.category)])
        return ['all', ...Array.from(unique)]
    }, [articles])

    const filteredArticles = useMemo(() => {
        return articles.filter(article => {
            const matchesSearch = [article.title_ru, article.title_en, article.slug]
                .some(value => value.toLowerCase().includes(searchQuery.toLowerCase()))
            const matchesStatus = statusFilter === 'all'
                || (statusFilter === 'published' ? !!article.is_published : !article.is_published)
            const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter
            return matchesSearch && matchesStatus && matchesCategory
        })
    }, [articles, searchQuery, statusFilter, categoryFilter])

    const openForm = async (article?: NewsArticle) => {
        if (article) {
            setEditingArticle(article)
            let seoMeta = null
            try {
                seoMeta = await getSeoMeta('news', article.id)
            } catch (err) {
                console.error('Failed to fetch news SEO metadata:', err)
            }
            setForm({
                title_ru: article.title_ru,
                title_en: article.title_en,
                description_ru: article.description_ru,
                description_en: article.description_en,
                content_ru: article.content_ru,
                content_en: article.content_en,
                category: article.category,
                slug: article.slug,
                image_url: article.image_url || '',
                priority: article.priority || 0,
                is_published: !!article.is_published,
                seo_title: seoMeta?.seo_title || '',
                seo_description: seoMeta?.seo_description || '',
                canonical_url: seoMeta?.canonical_url || '',
                og_image_url: seoMeta?.og_image_url || '',
                robots_index: seoMeta?.robots_index ?? true,
                robots_follow: seoMeta?.robots_follow ?? true,
                structured_data_enabled: seoMeta?.structured_data_enabled ?? false,
                structured_data_type: seoMeta?.structured_data_type || '',
            })
            setSlugTouched(true)
        } else {
            setEditingArticle(null)
            setForm(emptyForm)
            setSlugTouched(false)
        }
        setImageFile(null)
        setShowForm(true)
    }

    const closeForm = () => {
        setShowForm(false)
        setEditingArticle(null)
        setForm(emptyForm)
        setImageFile(null)
        setSlugTouched(false)
    }

    const handleSlugAutofill = (titleValue: string) => {
        if (slugTouched) return
        setForm(prev => ({
            ...prev,
            slug: generateSlug(titleValue),
        }))
    }

    const saveArticle = async () => {
        if (
            !form.title_ru || !form.title_en || !form.description_ru || !form.description_en
            || !form.content_ru || !form.content_en || !form.category || !form.slug
        ) {
            return
        }

        try {
            setSaving(true)
            const normalizedSlug = generateSlug(form.slug)
            const normalizedCategory = form.category.trim().toLowerCase()
            if (!NEWS_CATEGORIES.includes(normalizedCategory as (typeof NEWS_CATEGORIES)[number])) {
                setError('Недопустимая категория новости')
                return
            }
            const payload = {
                title_ru: form.title_ru,
                title_en: form.title_en,
                description_ru: form.description_ru,
                description_en: form.description_en,
                content_ru: form.content_ru,
                content_en: form.content_en,
                category: normalizedCategory,
                slug: normalizedSlug,
                image_url: form.image_url || null,
                priority: Number.isNaN(Number(form.priority)) ? 0 : Number(form.priority),
                is_published: form.is_published,
            }

            if (editingArticle) {
                const nextPublishedAt = payload.is_published
                    ? (editingArticle.published_at || new Date().toISOString())
                    : null

                await newsService.update(editingArticle.id, {
                    ...payload,
                    published_at: nextPublishedAt,
                } as TablesUpdate<'news'>)
                await upsertSeoMeta('news', editingArticle.id, {
                    seo_title: form.seo_title,
                    seo_description: form.seo_description,
                    canonical_url: form.canonical_url,
                    og_image_url: form.og_image_url,
                    robots_index: form.robots_index,
                    robots_follow: form.robots_follow,
                    structured_data_enabled: form.structured_data_enabled,
                    structured_data_type: form.structured_data_type,
                })

                if (imageFile) {
                    setUploadingImage(true)
                    const uploaded = await uploadNewsImage(imageFile, normalizedSlug)
                    await newsService.update(editingArticle.id, {
                        image_url: uploaded.publicUrl,
                    } as TablesUpdate<'news'>)
                }
            } else {
                const created = await newsService.create({
                    ...payload,
                    published_at: payload.is_published ? new Date().toISOString() : null,
                } as TablesInsert<'news'>)
                await upsertSeoMeta('news', created.id, {
                    seo_title: form.seo_title,
                    seo_description: form.seo_description,
                    canonical_url: form.canonical_url,
                    og_image_url: form.og_image_url,
                    robots_index: form.robots_index,
                    robots_follow: form.robots_follow,
                    structured_data_enabled: form.structured_data_enabled,
                    structured_data_type: form.structured_data_type,
                })

                if (imageFile) {
                    setUploadingImage(true)
                    const uploaded = await uploadNewsImage(imageFile, normalizedSlug)
                    await newsService.update(created.id, {
                        image_url: uploaded.publicUrl,
                    } as TablesUpdate<'news'>)
                }
            }

            closeForm()
            await fetchNews()
        } catch (err) {
            console.error('Failed to save news article:', err)
            setError('Ошибка сохранения новости')
        } finally {
            setSaving(false)
            setUploadingImage(false)
        }
    }

    const deleteArticle = async (id: string) => {
        if (!confirm('Удалить новость?')) return
        try {
            await newsService.delete(id)
            await fetchNews()
        } catch (err) {
            console.error('Failed to delete article:', err)
            setError('Ошибка удаления новости')
        }
    }

    const togglePublish = async (article: NewsArticle) => {
        try {
            const nextPublished = !article.is_published
            await newsService.update(article.id, {
                is_published: nextPublished,
                published_at: nextPublished ? (article.published_at || new Date().toISOString()) : null,
            } as TablesUpdate<'news'>)
            await fetchNews()
        } catch (err) {
            console.error('Failed to toggle publish state:', err)
            setError('Ошибка смены статуса публикации')
        }
    }

    const adjustPriority = async (article: NewsArticle, delta: number) => {
        try {
            await newsService.update(article.id, {
                priority: Math.max(0, (article.priority || 0) + delta),
            } as TablesUpdate<'news'>)
            await fetchNews()
        } catch (err) {
            console.error('Failed to update priority:', err)
            setError('Ошибка обновления приоритета')
        }
    }

    const openSecurePreview = async (article: NewsArticle) => {
        try {
            setCreatingPreviewId(article.id)
            const response = await fetch('/api/cms/preview-links', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    entityType: 'news',
                    entityId: article.id,
                    slug: article.slug,
                    expiresInMinutes: 120,
                    maxUses: 5,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to generate preview link')
            }

            const data = await response.json()
            if (!data?.url) {
                throw new Error('Preview URL was not generated')
            }

            window.open(data.url, '_blank', 'noopener,noreferrer')
        } catch (err) {
            console.error('Failed to open secure preview:', err)
            setError('Ошибка генерации preview-ссылки')
        } finally {
            setCreatingPreviewId(null)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/admin/dashboard"
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    News CMS
                                </h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    Список, фильтры, draft/published и управление приоритетами
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => openForm()}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Добавить новость
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error && (
                    <div className="mb-6 bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {error}
                        <button onClick={() => setError(null)} className="ml-2 font-bold">✕</button>
                    </div>
                )}

                <div className="mb-6 bg-white border border-gray-200 rounded-xl p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <label className="relative">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Поиск по заголовку / slug"
                                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                            />
                        </label>

                        <select
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value as NewsStatusFilter)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                        >
                            <option value="all">Все статусы</option>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>

                        <select
                            value={categoryFilter}
                            onChange={e => setCategoryFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category === 'all' ? 'Все категории' : category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {loading && (
                    <div className="flex items-center justify-center py-24 text-gray-400">
                        <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                )}

                {!loading && filteredArticles.length === 0 && (
                    <div className="text-center py-24 bg-white rounded-xl border border-gray-200">
                        <p className="text-gray-500 mb-4">Новостей по выбранным фильтрам нет</p>
                        <button
                            onClick={() => openForm()}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800"
                        >
                            <Plus className="w-4 h-4" />
                            Создать первую новость
                        </button>
                    </div>
                )}

                {!loading && filteredArticles.length > 0 && (
                    <div className="space-y-3">
                        {filteredArticles.map(article => (
                            <div
                                key={article.id}
                                className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
                            >
                                <div className="p-4 md:p-5 flex flex-col lg:flex-row lg:items-center gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-gray-900 truncate">
                                                {article.title_ru}
                                            </h3>
                                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                                                {article.category}
                                            </span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${article.is_published ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                                                {article.is_published ? 'Published' : 'Draft'}
                                            </span>
                                            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-navy-50 text-navy-700 rounded-full">
                                                <Pin className="w-3 h-3" />
                                                {article.priority || 0}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 truncate">
                                            {article.title_en}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1 truncate">
                                            slug: {article.slug}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2">
                                        <button
                                            onClick={() => adjustPriority(article, 1)}
                                            className="px-2.5 py-1.5 text-xs font-medium text-navy-700 hover:bg-navy-50 rounded-lg border border-navy-100"
                                            title="Повысить приоритет (pin)"
                                        >
                                            + Priority
                                        </button>
                                        <button
                                            onClick={() => adjustPriority(article, -1)}
                                            className="px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-200"
                                            title="Понизить приоритет"
                                        >
                                            - Priority
                                        </button>
                                        <button
                                            onClick={() => openSecurePreview(article)}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                            title="Preview"
                                            disabled={creatingPreviewId === article.id}
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            {creatingPreviewId === article.id ? 'Generating...' : 'Preview'}
                                        </button>
                                        <button
                                            onClick={() => togglePublish(article)}
                                            className={`p-2 rounded-lg transition-colors ${article.is_published ? 'text-green-500 hover:bg-green-50' : 'text-gray-300 hover:bg-gray-100'}`}
                                            title={article.is_published ? 'Снять с публикации' : 'Опубликовать'}
                                        >
                                            {article.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                        </button>
                                        <button
                                            onClick={() => openForm(article)}
                                            className="p-2 text-gray-400 hover:text-navy-700 hover:bg-gray-100 rounded-lg transition-colors"
                                            title="Редактировать"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => deleteArticle(article.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Удалить"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-10 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full p-6 mb-10">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-gray-900">
                                {editingArticle ? 'Редактировать новость' : 'Новая новость'}
                            </h2>
                            <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Заголовок (RU) *</label>
                                    <input
                                        type="text"
                                        value={form.title_ru}
                                        onChange={e => {
                                            const value = e.target.value
                                            setForm(prev => ({ ...prev, title_ru: value }))
                                            if (!form.title_en) handleSlugAutofill(value)
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title (EN) *</label>
                                    <input
                                        type="text"
                                        value={form.title_en}
                                        onChange={e => {
                                            const value = e.target.value
                                            setForm(prev => ({ ...prev, title_en: value }))
                                            handleSlugAutofill(value)
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Описание (RU) *</label>
                                    <textarea
                                        value={form.description_ru}
                                        onChange={e => setForm(prev => ({ ...prev, description_ru: e.target.value }))}
                                        rows={2}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description (EN) *</label>
                                    <textarea
                                        value={form.description_en}
                                        onChange={e => setForm(prev => ({ ...prev, description_en: e.target.value }))}
                                        rows={2}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Контент (RU) *</label>
                                    <textarea
                                        value={form.content_ru}
                                        onChange={e => setForm(prev => ({ ...prev, content_ru: e.target.value }))}
                                        rows={6}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Content (EN) *</label>
                                    <textarea
                                        value={form.content_en}
                                        onChange={e => setForm(prev => ({ ...prev, content_en: e.target.value }))}
                                        rows={6}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                                    <select
                                        value={form.category}
                                        onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    >
                                        {NEWS_CATEGORIES.map(category => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                                    <input
                                        type="text"
                                        value={form.slug}
                                        onChange={e => {
                                            setSlugTouched(true)
                                            setForm(prev => ({ ...prev, slug: e.target.value }))
                                        }}
                                        placeholder="open-day-2026"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                    <input
                                        type="url"
                                        value={form.image_url}
                                        onChange={e => setForm(prev => ({ ...prev, image_url: e.target.value }))}
                                        placeholder="https://..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                    <label className="mt-2 inline-flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                                        <Upload className="w-3.5 h-3.5" />
                                        Загрузить изображение
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            className="hidden"
                                            onChange={e => setImageFile(e.target.files?.[0] || null)}
                                        />
                                    </label>
                                    {imageFile && (
                                        <p className="mt-1 text-xs text-green-600 truncate">
                                            Выбран файл: {imageFile.name}
                                        </p>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-4 items-start">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Priority (pin)</label>
                                        <input
                                            type="number"
                                            min={0}
                                            value={form.priority}
                                            onChange={e => setForm(prev => ({ ...prev, priority: Number(e.target.value) }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                        />
                                    </div>
                                    <label className="inline-flex items-center gap-2 mt-8 text-sm text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={form.is_published}
                                            onChange={e => setForm(prev => ({ ...prev, is_published: e.target.checked }))}
                                            className="rounded border-gray-300"
                                        />
                                        Опубликовано
                                    </label>
                                </div>
                            </div>

                            <div className="border border-gray-200 rounded-xl p-4 space-y-4">
                                <h3 className="text-sm font-semibold text-gray-900">SEO Metadata</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">SEO title</label>
                                    <input
                                        type="text"
                                        value={form.seo_title}
                                        onChange={e => setForm(prev => ({ ...prev, seo_title: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">SEO description</label>
                                    <textarea
                                        rows={3}
                                        value={form.seo_description}
                                        onChange={e => setForm(prev => ({ ...prev, seo_description: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL</label>
                                        <input
                                            type="url"
                                            value={form.canonical_url}
                                            onChange={e => setForm(prev => ({ ...prev, canonical_url: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">OG image URL</label>
                                        <input
                                            type="url"
                                            value={form.og_image_url}
                                            onChange={e => setForm(prev => ({ ...prev, og_image_url: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={form.robots_index}
                                            onChange={e => setForm(prev => ({ ...prev, robots_index: e.target.checked }))}
                                            className="rounded border-gray-300"
                                        />
                                        Robots index
                                    </label>
                                    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={form.robots_follow}
                                            onChange={e => setForm(prev => ({ ...prev, robots_follow: e.target.checked }))}
                                            className="rounded border-gray-300"
                                        />
                                        Robots follow
                                    </label>
                                    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={form.structured_data_enabled}
                                            onChange={e => setForm(prev => ({ ...prev, structured_data_enabled: e.target.checked }))}
                                            className="rounded border-gray-300"
                                        />
                                        Structured data
                                    </label>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Structured data type</label>
                                    <input
                                        type="text"
                                        value={form.structured_data_type}
                                        onChange={e => setForm(prev => ({ ...prev, structured_data_type: e.target.value }))}
                                        placeholder="NewsArticle, Article..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={closeForm}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={saveArticle}
                                disabled={saving || uploadingImage}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors disabled:opacity-50"
                            >
                                {(saving || uploadingImage) ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                {uploadingImage ? 'Загрузка изображения...' : 'Сохранить'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
