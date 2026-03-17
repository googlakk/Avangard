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
    Upload,
    Search,
} from 'lucide-react'
import { portalPostsService } from '@/lib/services/api'
import { uploadPortalImage } from '@/lib/services/storage'
import type { Tables, TablesInsert, TablesUpdate } from '@/lib/database.types'

type PortalPost = Tables<'portal_posts'>
type PortalType = 'parents_school' | 'parents_platforms' | 'teachers_school' | 'teachers_platforms'

const PORTALS: { key: PortalType; label: string }[] = [
    { key: 'parents_school', label: 'Школа родителей' },
    { key: 'parents_platforms', label: 'Платформы (родители)' },
    { key: 'teachers_school', label: 'Школа учителей' },
    { key: 'teachers_platforms', label: 'Платформы (учителя)' },
]

const CATEGORIES = ['event', 'course', 'seminar', 'platform', 'announcement', 'resource'] as const

interface PostForm {
    title_ru: string
    title_en: string
    description_ru: string
    description_en: string
    content_ru: string
    content_en: string
    category: string
    slug: string
    image_url: string
    link_url: string
    priority: number
    is_published: boolean
}

const emptyForm: PostForm = {
    title_ru: '',
    title_en: '',
    description_ru: '',
    description_en: '',
    content_ru: '',
    content_en: '',
    category: 'announcement',
    slug: '',
    image_url: '',
    link_url: '',
    priority: 0,
    is_published: false,
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

export default function AdminPortalPage() {
    const [activePortal, setActivePortal] = useState<PortalType>('parents_school')
    const [posts, setPosts] = useState<PortalPost[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [showForm, setShowForm] = useState(false)
    const [editingPost, setEditingPost] = useState<PortalPost | null>(null)
    const [form, setForm] = useState<PostForm>(emptyForm)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [slugTouched, setSlugTouched] = useState(false)

    const [searchQuery, setSearchQuery] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('all')

    const fetchPosts = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await portalPostsService.getAll({ portal: activePortal })
            const sorted = (data || []).sort((a, b) => {
                const priorityDiff = (b.priority || 0) - (a.priority || 0)
                if (priorityDiff !== 0) return priorityDiff
                const dateA = new Date(a.published_at || a.updated_at || 0).getTime()
                const dateB = new Date(b.published_at || b.updated_at || 0).getTime()
                return dateB - dateA
            })
            setPosts(sorted)
        } catch (err) {
            console.error('Failed to fetch portal posts:', err)
            setError('Ошибка загрузки материалов')
        } finally {
            setLoading(false)
        }
    }, [activePortal])

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesSearch = [post.title_ru, post.title_en, post.slug]
                .some(value => value.toLowerCase().includes(searchQuery.toLowerCase()))
            const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter
            return matchesSearch && matchesCategory
        })
    }, [posts, searchQuery, categoryFilter])

    const openForm = (post?: PortalPost) => {
        if (post) {
            setEditingPost(post)
            setForm({
                title_ru: post.title_ru,
                title_en: post.title_en,
                description_ru: post.description_ru,
                description_en: post.description_en,
                content_ru: post.content_ru,
                content_en: post.content_en,
                category: post.category,
                slug: post.slug,
                image_url: post.image_url || '',
                link_url: post.link_url || '',
                priority: post.priority || 0,
                is_published: !!post.is_published,
            })
            setSlugTouched(true)
        } else {
            setEditingPost(null)
            setForm(emptyForm)
            setSlugTouched(false)
        }
        setImageFile(null)
        setShowForm(true)
    }

    const closeForm = () => {
        setShowForm(false)
        setEditingPost(null)
        setForm(emptyForm)
        setImageFile(null)
        setSlugTouched(false)
    }

    const handleSlugAutofill = (titleValue: string) => {
        if (slugTouched) return
        setForm(prev => ({ ...prev, slug: generateSlug(titleValue) }))
    }

    const savePost = async () => {
        if (!form.title_ru || !form.title_en || !form.slug) return

        try {
            setSaving(true)
            const normalizedSlug = generateSlug(form.slug)
            const payload = {
                portal: activePortal,
                title_ru: form.title_ru,
                title_en: form.title_en,
                description_ru: form.description_ru,
                description_en: form.description_en,
                content_ru: form.content_ru,
                content_en: form.content_en,
                category: form.category,
                slug: normalizedSlug,
                image_url: form.image_url || null,
                link_url: form.link_url || null,
                priority: Number.isNaN(Number(form.priority)) ? 0 : Number(form.priority),
                is_published: form.is_published,
            }

            if (editingPost) {
                const nextPublishedAt = payload.is_published
                    ? (editingPost.published_at || new Date().toISOString())
                    : null
                await portalPostsService.update(editingPost.id, {
                    ...payload,
                    published_at: nextPublishedAt,
                } as TablesUpdate<'portal_posts'>)

                if (imageFile) {
                    setUploadingImage(true)
                    const uploaded = await uploadPortalImage(imageFile, normalizedSlug)
                    await portalPostsService.update(editingPost.id, {
                        image_url: uploaded.publicUrl,
                    } as TablesUpdate<'portal_posts'>)
                }
            } else {
                const created = await portalPostsService.create({
                    ...payload,
                    published_at: payload.is_published ? new Date().toISOString() : null,
                } as TablesInsert<'portal_posts'>)

                if (imageFile) {
                    setUploadingImage(true)
                    const uploaded = await uploadPortalImage(imageFile, normalizedSlug)
                    await portalPostsService.update(created.id, {
                        image_url: uploaded.publicUrl,
                    } as TablesUpdate<'portal_posts'>)
                }
            }

            closeForm()
            await fetchPosts()
        } catch (err) {
            console.error('Failed to save portal post:', err)
            setError('Ошибка сохранения материала')
        } finally {
            setSaving(false)
            setUploadingImage(false)
        }
    }

    const deletePost = async (id: string) => {
        if (!confirm('Удалить материал?')) return
        try {
            await portalPostsService.delete(id)
            await fetchPosts()
        } catch (err) {
            console.error('Failed to delete post:', err)
            setError('Ошибка удаления материала')
        }
    }

    const togglePublish = async (post: PortalPost) => {
        try {
            const nextPublished = !post.is_published
            await portalPostsService.update(post.id, {
                is_published: nextPublished,
                published_at: nextPublished ? (post.published_at || new Date().toISOString()) : null,
            } as TablesUpdate<'portal_posts'>)
            await fetchPosts()
        } catch (err) {
            console.error('Failed to toggle publish state:', err)
            setError('Ошибка смены статуса публикации')
        }
    }

    const categoryLabels: Record<string, string> = {
        event: 'Мероприятие',
        course: 'Курс',
        seminar: 'Семинар',
        platform: 'Платформа',
        announcement: 'Анонс',
        resource: 'Ресурс',
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
                                    Portal Posts
                                </h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    Материалы, курсы и платформы для родителей и учителей
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => openForm()}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Добавить материал
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

                {/* Portal Tabs */}
                <div className="mb-6 flex flex-wrap gap-2">
                    {PORTALS.map(portal => (
                        <button
                            key={portal.key}
                            onClick={() => setActivePortal(portal.key)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activePortal === portal.key
                                    ? 'bg-navy-900 text-white'
                                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            {portal.label}
                        </button>
                    ))}
                </div>

                {/* Filters */}
                <div className="mb-6 bg-white border border-gray-200 rounded-xl p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                            value={categoryFilter}
                            onChange={e => setCategoryFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                        >
                            <option value="all">Все категории</option>
                            {CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{categoryLabels[cat] || cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex items-center justify-center py-24 text-gray-400">
                        <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                )}

                {/* Empty State */}
                {!loading && filteredPosts.length === 0 && (
                    <div className="text-center py-24 bg-white rounded-xl border border-gray-200">
                        <p className="text-gray-500 mb-4">Материалов в этом разделе пока нет</p>
                        <button
                            onClick={() => openForm()}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800"
                        >
                            <Plus className="w-4 h-4" />
                            Создать первый материал
                        </button>
                    </div>
                )}

                {/* Posts List */}
                {!loading && filteredPosts.length > 0 && (
                    <div className="space-y-3">
                        {filteredPosts.map(post => (
                            <div
                                key={post.id}
                                className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
                            >
                                <div className="p-4 md:p-5 flex flex-col lg:flex-row lg:items-center gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <h3 className="font-semibold text-gray-900 truncate">
                                                {post.title_ru}
                                            </h3>
                                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                                                {categoryLabels[post.category] || post.category}
                                            </span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${post.is_published ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                                                {post.is_published ? 'Published' : 'Draft'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 truncate">{post.title_en}</p>
                                        <p className="text-xs text-gray-400 mt-1 truncate">slug: {post.slug}</p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2">
                                        {post.link_url && (
                                            <a
                                                href={post.link_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Внешняя ссылка"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        )}
                                        <button
                                            onClick={() => togglePublish(post)}
                                            className={`p-2 rounded-lg transition-colors ${post.is_published ? 'text-green-500 hover:bg-green-50' : 'text-gray-300 hover:bg-gray-100'}`}
                                            title={post.is_published ? 'Снять с публикации' : 'Опубликовать'}
                                        >
                                            {post.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                        </button>
                                        <button
                                            onClick={() => openForm(post)}
                                            className="p-2 text-gray-400 hover:text-navy-700 hover:bg-gray-100 rounded-lg transition-colors"
                                            title="Редактировать"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => deletePost(post.id)}
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

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-10 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full p-6 mb-10">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-gray-900">
                                {editingPost ? 'Редактировать материал' : 'Новый материал'}
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
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Описание (RU)</label>
                                    <textarea
                                        value={form.description_ru}
                                        onChange={e => setForm(prev => ({ ...prev, description_ru: e.target.value }))}
                                        rows={2}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label>
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
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Контент (RU)</label>
                                    <textarea
                                        value={form.content_ru}
                                        onChange={e => setForm(prev => ({ ...prev, content_ru: e.target.value }))}
                                        rows={6}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Content (EN)</label>
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
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
                                    <select
                                        value={form.category}
                                        onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    >
                                        {CATEGORIES.map(cat => (
                                            <option key={cat} value={cat}>{categoryLabels[cat] || cat}</option>
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
                                        placeholder="parents-workshop-2026"
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
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Внешняя ссылка (для платформ)</label>
                                    <input
                                        type="url"
                                        value={form.link_url}
                                        onChange={e => setForm(prev => ({ ...prev, link_url: e.target.value }))}
                                        placeholder="https://platform.example.com"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 items-start">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                    <input
                                        type="number"
                                        min={0}
                                        max={10}
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

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={closeForm}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Отменить
                            </button>
                            <button
                                onClick={savePost}
                                disabled={saving || !form.title_ru || !form.title_en || !form.slug}
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors disabled:opacity-50"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        {uploadingImage ? 'Загрузка изображения...' : 'Сохранение...'}
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Сохранить
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
