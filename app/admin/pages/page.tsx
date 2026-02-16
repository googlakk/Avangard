'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
    ArrowLeft,
    ArrowUp,
    ArrowDown,
    Plus,
    Edit2,
    Trash2,
    Save,
    X,
    Loader2,
    Eye,
    EyeOff,
    ExternalLink,
    Search,
} from 'lucide-react'
import {
    canTransitionPageStatus,
    createCmsPage,
    createCmsSection,
    deleteCmsPage,
    deleteCmsSection,
    listCmsPages,
    listCmsSections,
    reorderCmsSections,
    updateCmsPage,
    updateCmsSection,
    type CmsPageRecord,
    type CmsPageStatus,
    type CmsSectionRecord,
    type CmsSectionType,
} from '@/lib/services/page-builder'
import { DEFAULT_SEO_META, getSeoMeta, upsertSeoMeta } from '@/lib/services/seo'

interface PageForm {
    slug: string
    title_ru: string
    title_en: string
    status: CmsPageStatus
    version: number
    scheduled_at: string
    published_at: string
    seo_title: string
    seo_description: string
    canonical_url: string
    og_image_url: string
    robots_index: boolean
    robots_follow: boolean
    structured_data_enabled: boolean
    structured_data_type: string
}

interface SectionForm {
    key: string
    type: CmsSectionType
    payloadText: string
    is_enabled: boolean
}

const emptyPageForm: PageForm = {
    slug: '',
    title_ru: '',
    title_en: '',
    status: 'draft',
    version: 1,
    scheduled_at: '',
    published_at: '',
    seo_title: DEFAULT_SEO_META.seo_title,
    seo_description: DEFAULT_SEO_META.seo_description,
    canonical_url: DEFAULT_SEO_META.canonical_url,
    og_image_url: DEFAULT_SEO_META.og_image_url,
    robots_index: DEFAULT_SEO_META.robots_index,
    robots_follow: DEFAULT_SEO_META.robots_follow,
    structured_data_enabled: DEFAULT_SEO_META.structured_data_enabled,
    structured_data_type: DEFAULT_SEO_META.structured_data_type,
}

const emptySectionForm: SectionForm = {
    key: '',
    type: 'content',
    payloadText: '{\n  "ru": "",\n  "en": ""\n}',
    is_enabled: true,
}

function toDateTimeLocal(isoDate: string | null) {
    if (!isoDate) return ''
    const date = new Date(isoDate)
    if (Number.isNaN(date.getTime())) return ''
    const pad = (value: number) => String(value).padStart(2, '0')
    const y = date.getFullYear()
    const m = pad(date.getMonth() + 1)
    const d = pad(date.getDate())
    const h = pad(date.getHours())
    const min = pad(date.getMinutes())
    return `${y}-${m}-${d}T${h}:${min}`
}

function generateSlug(value: string) {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9а-яё]+/gi, '-')
        .replace(/^-+|-+$/g, '')
        .replace(/-{2,}/g, '-')
}

function getStatusBadgeClass(status: CmsPageStatus) {
    switch (status) {
    case 'published':
        return 'bg-green-50 text-green-700'
    case 'scheduled':
        return 'bg-blue-50 text-blue-700'
    case 'review':
        return 'bg-amber-50 text-amber-700'
    case 'archived':
        return 'bg-gray-100 text-gray-600'
    default:
        return 'bg-slate-100 text-slate-700'
    }
}

export default function AdminPagesBuilderPage() {
    const [pages, setPages] = useState<CmsPageRecord[]>([])
    const [sections, setSections] = useState<CmsSectionRecord[]>([])
    const [selectedPageId, setSelectedPageId] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [creatingPreviewId, setCreatingPreviewId] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const [showPageForm, setShowPageForm] = useState(false)
    const [editingPage, setEditingPage] = useState<CmsPageRecord | null>(null)
    const [pageForm, setPageForm] = useState<PageForm>(emptyPageForm)

    const [showSectionForm, setShowSectionForm] = useState(false)
    const [editingSection, setEditingSection] = useState<CmsSectionRecord | null>(null)
    const [sectionForm, setSectionForm] = useState<SectionForm>(emptySectionForm)

    const selectedPage = useMemo(
        () => pages.find(page => page.id === selectedPageId) || null,
        [pages, selectedPageId]
    )

    const filteredPages = useMemo(() => {
        return pages.filter(page => {
            const haystack = [page.slug, page.title_ru, page.title_en].join(' ').toLowerCase()
            return haystack.includes(searchQuery.toLowerCase())
        })
    }, [pages, searchQuery])

    const fetchPages = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await listCmsPages()
            setPages(data)
            if (!selectedPageId && data.length > 0) {
                setSelectedPageId(data[0].id)
            }
        } catch (err) {
            console.error('Failed to fetch cms pages:', err)
            setError('Ошибка загрузки страниц')
        } finally {
            setLoading(false)
        }
    }, [selectedPageId])

    const fetchSections = useCallback(async (pageId: string) => {
        try {
            const data = await listCmsSections(pageId)
            setSections(data)
        } catch (err) {
            console.error('Failed to fetch sections:', err)
            setError('Ошибка загрузки секций')
        }
    }, [])

    useEffect(() => {
        fetchPages()
    }, [fetchPages])

    useEffect(() => {
        if (selectedPageId) {
            fetchSections(selectedPageId)
        } else {
            setSections([])
        }
    }, [selectedPageId, fetchSections])

    const openPageForm = async (page?: CmsPageRecord) => {
        if (page) {
            setEditingPage(page)
            let seoMeta = null
            try {
                seoMeta = await getSeoMeta('page', page.id)
            } catch (err) {
                console.error('Failed to fetch page SEO metadata:', err)
            }
            setPageForm({
                slug: page.slug,
                title_ru: page.title_ru,
                title_en: page.title_en,
                status: page.status,
                version: page.version,
                scheduled_at: toDateTimeLocal(page.scheduled_at),
                published_at: toDateTimeLocal(page.published_at),
                seo_title: seoMeta?.seo_title || '',
                seo_description: seoMeta?.seo_description || '',
                canonical_url: seoMeta?.canonical_url || '',
                og_image_url: seoMeta?.og_image_url || '',
                robots_index: seoMeta?.robots_index ?? true,
                robots_follow: seoMeta?.robots_follow ?? true,
                structured_data_enabled: seoMeta?.structured_data_enabled ?? false,
                structured_data_type: seoMeta?.structured_data_type || '',
            })
        } else {
            setEditingPage(null)
            setPageForm(emptyPageForm)
        }
        setShowPageForm(true)
    }

    const closePageForm = () => {
        setShowPageForm(false)
        setEditingPage(null)
        setPageForm(emptyPageForm)
    }

    const savePage = async () => {
        if (!pageForm.slug || !pageForm.title_ru || !pageForm.title_en) return

        if (editingPage && !canTransitionPageStatus(editingPage.status, pageForm.status)) {
            setError(`Недопустимый переход статуса: ${editingPage.status} → ${pageForm.status}`)
            return
        }

        if (pageForm.status === 'scheduled' && !pageForm.scheduled_at) {
            setError('Для scheduled необходимо указать дату и время публикации')
            return
        }

        try {
            setSaving(true)
            const payload = {
                slug: generateSlug(pageForm.slug),
                title_ru: pageForm.title_ru,
                title_en: pageForm.title_en,
                status: pageForm.status,
                version: Math.max(1, Math.trunc(pageForm.version || 1)),
                scheduled_at: pageForm.status === 'scheduled'
                    ? new Date(pageForm.scheduled_at).toISOString()
                    : null,
                published_at: pageForm.status === 'published'
                    ? (pageForm.published_at ? new Date(pageForm.published_at).toISOString() : new Date().toISOString())
                    : null,
            }

            if (editingPage) {
                await updateCmsPage(editingPage.id, payload)
                await upsertSeoMeta('page', editingPage.id, {
                    seo_title: pageForm.seo_title,
                    seo_description: pageForm.seo_description,
                    canonical_url: pageForm.canonical_url,
                    og_image_url: pageForm.og_image_url,
                    robots_index: pageForm.robots_index,
                    robots_follow: pageForm.robots_follow,
                    structured_data_enabled: pageForm.structured_data_enabled,
                    structured_data_type: pageForm.structured_data_type,
                })
            } else {
                const created = await createCmsPage(payload)
                await upsertSeoMeta('page', created.id, {
                    seo_title: pageForm.seo_title,
                    seo_description: pageForm.seo_description,
                    canonical_url: pageForm.canonical_url,
                    og_image_url: pageForm.og_image_url,
                    robots_index: pageForm.robots_index,
                    robots_follow: pageForm.robots_follow,
                    structured_data_enabled: pageForm.structured_data_enabled,
                    structured_data_type: pageForm.structured_data_type,
                })
                setSelectedPageId(created.id)
            }

            closePageForm()
            await fetchPages()
        } catch (err) {
            console.error('Failed to save page:', err)
            setError('Ошибка сохранения страницы')
        } finally {
            setSaving(false)
        }
    }

    const removePage = async (pageId: string) => {
        if (!confirm('Удалить страницу и все её секции?')) return
        try {
            await deleteCmsPage(pageId)
            if (selectedPageId === pageId) setSelectedPageId(null)
            await fetchPages()
        } catch (err) {
            console.error('Failed to delete page:', err)
            setError('Ошибка удаления страницы')
        }
    }

    const togglePagePublish = async (page: CmsPageRecord) => {
        try {
            const nextStatus: CmsPageStatus = page.status === 'published' ? 'draft' : 'published'
            if (!canTransitionPageStatus(page.status, nextStatus)) {
                setError(`Недопустимый переход статуса: ${page.status} → ${nextStatus}`)
                return
            }
            await updateCmsPage(page.id, {
                status: nextStatus,
                scheduled_at: null,
                published_at: nextStatus === 'published' ? (page.published_at || new Date().toISOString()) : null,
            })
            await fetchPages()
        } catch (err) {
            console.error('Failed to toggle page publish:', err)
            setError('Ошибка изменения статуса страницы')
        }
    }

    const openSectionForm = (section?: CmsSectionRecord) => {
        if (section) {
            setEditingSection(section)
            setSectionForm({
                key: section.key,
                type: section.type,
                payloadText: JSON.stringify(section.payload || {}, null, 2),
                is_enabled: section.is_enabled,
            })
        } else {
            setEditingSection(null)
            setSectionForm(emptySectionForm)
        }
        setShowSectionForm(true)
    }

    const closeSectionForm = () => {
        setShowSectionForm(false)
        setEditingSection(null)
        setSectionForm(emptySectionForm)
    }

    const saveSection = async () => {
        if (!selectedPageId || !sectionForm.key) return
        let parsedPayload: Record<string, unknown> = {}
        try {
            parsedPayload = JSON.parse(sectionForm.payloadText || '{}')
        } catch {
            setError('Payload должен быть валидным JSON')
            return
        }

        try {
            setSaving(true)
            const payload = {
                page_id: selectedPageId,
                key: sectionForm.key,
                type: sectionForm.type,
                payload: parsedPayload,
                is_enabled: sectionForm.is_enabled,
            }

            if (editingSection) {
                await updateCmsSection(editingSection.id, payload)
            } else {
                await createCmsSection({
                    ...payload,
                    order_index: sections.length,
                })
            }

            closeSectionForm()
            await fetchSections(selectedPageId)
        } catch (err) {
            console.error('Failed to save section:', err)
            setError('Ошибка сохранения секции')
        } finally {
            setSaving(false)
        }
    }

    const removeSection = async (sectionId: string) => {
        if (!selectedPageId) return
        if (!confirm('Удалить секцию?')) return
        try {
            await deleteCmsSection(sectionId)
            await fetchSections(selectedPageId)
        } catch (err) {
            console.error('Failed to delete section:', err)
            setError('Ошибка удаления секции')
        }
    }

    const toggleSectionEnabled = async (section: CmsSectionRecord) => {
        if (!selectedPageId) return
        try {
            await updateCmsSection(section.id, { is_enabled: !section.is_enabled })
            await fetchSections(selectedPageId)
        } catch (err) {
            console.error('Failed to toggle section:', err)
            setError('Ошибка изменения статуса секции')
        }
    }

    const moveSection = async (index: number, direction: 'up' | 'down') => {
        if (!selectedPageId) return
        const targetIndex = direction === 'up' ? index - 1 : index + 1
        if (targetIndex < 0 || targetIndex >= sections.length) return

        const nextSections = [...sections]
        const [moved] = nextSections.splice(index, 1)
        nextSections.splice(targetIndex, 0, moved)
        setSections(nextSections)

        try {
            await reorderCmsSections(nextSections.map((item, idx) => ({ id: item.id, order_index: idx })))
            await fetchSections(selectedPageId)
        } catch (err) {
            console.error('Failed to reorder sections:', err)
            setError('Ошибка сортировки секций')
            await fetchSections(selectedPageId)
        }
    }

    const openSecurePreview = async (page: CmsPageRecord) => {
        try {
            setCreatingPreviewId(page.id)
            const response = await fetch('/api/cms/preview-links', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    entityType: 'page',
                    entityId: page.id,
                    slug: page.slug,
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
            console.error('Failed to open secure page preview:', err)
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
                            <Link href="/admin/dashboard" className="text-gray-400 hover:text-gray-600 transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Static Pages Builder</h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    Конфигурируемые секции публичных страниц
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => openPageForm()}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Добавить страницу
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

                {loading && (
                    <div className="flex items-center justify-center py-24 text-gray-400">
                        <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                )}

                {!loading && (
                    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                        <section className="xl:col-span-2 bg-white rounded-xl border border-gray-200 p-4">
                            <label className="relative block mb-4">
                                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="Поиск страниц"
                                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                />
                            </label>

                            <div className="space-y-2">
                                {filteredPages.map(page => (
                                    <div
                                        key={page.id}
                                        className={`rounded-lg border p-3 ${selectedPageId === page.id ? 'border-navy-300 bg-navy-50/40' : 'border-gray-200'}`}
                                    >
                                        <button
                                            onClick={() => setSelectedPageId(page.id)}
                                            className="w-full text-left"
                                        >
                                            <div className="flex items-center justify-between gap-2">
                                                <h3 className="font-semibold text-sm text-gray-900 truncate">
                                                    {page.title_ru}
                                                </h3>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadgeClass(page.status)}`}>
                                                    {page.status}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 truncate mt-1">{page.title_en}</p>
                                            <p className="text-xs text-gray-400 truncate">
                                                /{page.slug} · v{page.version}
                                                {page.status === 'scheduled' && page.scheduled_at
                                                    ? ` · scheduled ${new Date(page.scheduled_at).toLocaleString()}`
                                                    : ''}
                                            </p>
                                        </button>

                                        <div className="mt-2 flex items-center gap-1.5">
                                            <button
                                                onClick={() => togglePagePublish(page)}
                                                className={`p-1.5 rounded transition-colors ${page.status === 'published' ? 'text-green-500 hover:bg-green-50' : 'text-gray-300 hover:bg-gray-100'}`}
                                                title={page.status === 'published' ? 'Снять с публикации' : 'Опубликовать'}
                                            >
                                                {page.status === 'published' ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => openSecurePreview(page)}
                                                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                                                title="Preview"
                                                disabled={creatingPreviewId === page.id}
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => openPageForm(page)}
                                                className="p-1.5 text-gray-400 hover:text-navy-700 hover:bg-gray-100 rounded transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => removePage(page.id)}
                                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {filteredPages.length === 0 && (
                                    <div className="text-center py-10 text-gray-500 text-sm">
                                        Страницы не найдены
                                    </div>
                                )}
                            </div>
                        </section>

                        <section className="xl:col-span-3 bg-white rounded-xl border border-gray-200 p-4">
                            <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {selectedPage ? selectedPage.title_ru : 'Выберите страницу'}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {selectedPage ? `${sections.length} секций` : 'Управление секциями'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => openSectionForm()}
                                    disabled={!selectedPage}
                                    className="inline-flex items-center gap-2 px-3 py-2 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Plus className="w-4 h-4" />
                                    Добавить секцию
                                </button>
                            </div>

                            {!selectedPage && (
                                <div className="text-center py-14 text-gray-500">
                                    Выберите страницу слева
                                </div>
                            )}

                            {selectedPage && sections.length === 0 && (
                                <div className="text-center py-14 text-gray-500">
                                    Секций пока нет
                                </div>
                            )}

                            {selectedPage && sections.length > 0 && (
                                <div className="space-y-2">
                                    {sections.map((section, index) => (
                                        <div key={section.id} className="border border-gray-200 rounded-lg p-3">
                                            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-sm font-medium text-gray-900 truncate">{section.key}</p>
                                                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                                            {section.type}
                                                        </span>
                                                        <span className={`text-xs px-2 py-0.5 rounded-full ${section.is_enabled ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                            {section.is_enabled ? 'enabled' : 'disabled'}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 truncate mt-1">
                                                        {JSON.stringify(section.payload)}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-1.5">
                                                    <button
                                                        onClick={() => moveSection(index, 'up')}
                                                        disabled={index === 0}
                                                        className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded disabled:opacity-30"
                                                        title="Вверх"
                                                    >
                                                        <ArrowUp className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => moveSection(index, 'down')}
                                                        disabled={index === sections.length - 1}
                                                        className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded disabled:opacity-30"
                                                        title="Вниз"
                                                    >
                                                        <ArrowDown className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => toggleSectionEnabled(section)}
                                                        className={`p-1.5 rounded transition-colors ${section.is_enabled ? 'text-green-500 hover:bg-green-50' : 'text-gray-300 hover:bg-gray-100'}`}
                                                        title={section.is_enabled ? 'Отключить секцию' : 'Включить секцию'}
                                                    >
                                                        {section.is_enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                                    </button>
                                                    <button
                                                        onClick={() => openSectionForm(section)}
                                                        className="p-1.5 text-gray-400 hover:text-navy-700 hover:bg-gray-100 rounded transition-colors"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => removeSection(section.id)}
                                                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                )}
            </main>

            {showPageForm && (
                <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-10 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-6 mb-10">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-gray-900">
                                {editingPage ? 'Редактировать страницу' : 'Новая страница'}
                            </h2>
                            <button onClick={closePageForm} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title (RU) *</label>
                                    <input
                                        type="text"
                                        value={pageForm.title_ru}
                                        onChange={e => {
                                            const value = e.target.value
                                            setPageForm(prev => ({ ...prev, title_ru: value }))
                                            if (!pageForm.slug) {
                                                setPageForm(prev => ({ ...prev, slug: generateSlug(value) }))
                                            }
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title (EN) *</label>
                                    <input
                                        type="text"
                                        value={pageForm.title_en}
                                        onChange={e => setPageForm(prev => ({ ...prev, title_en: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                                    <input
                                        type="text"
                                        value={pageForm.slug}
                                        onChange={e => setPageForm(prev => ({ ...prev, slug: e.target.value }))}
                                        placeholder="about-team"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        value={pageForm.status}
                                        onChange={e => setPageForm(prev => ({ ...prev, status: e.target.value as CmsPageStatus }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    >
                                        <option value="draft">draft</option>
                                        <option value="review">review</option>
                                        <option value="scheduled">scheduled</option>
                                        <option value="published">published</option>
                                        <option value="archived">archived</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Version</label>
                                    <input
                                        type="number"
                                        min={1}
                                        value={pageForm.version}
                                        onChange={e => setPageForm(prev => ({ ...prev, version: Math.max(1, Number(e.target.value) || 1) }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled at</label>
                                <input
                                    type="datetime-local"
                                    value={pageForm.scheduled_at}
                                    onChange={e => setPageForm(prev => ({ ...prev, scheduled_at: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Published at</label>
                                <input
                                    type="datetime-local"
                                    value={pageForm.published_at}
                                    onChange={e => setPageForm(prev => ({ ...prev, published_at: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                />
                            </div>

                            <div className="border border-gray-200 rounded-xl p-4 space-y-4">
                                <h3 className="text-sm font-semibold text-gray-900">SEO Metadata</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">SEO title</label>
                                    <input
                                        type="text"
                                        value={pageForm.seo_title}
                                        onChange={e => setPageForm(prev => ({ ...prev, seo_title: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">SEO description</label>
                                    <textarea
                                        rows={3}
                                        value={pageForm.seo_description}
                                        onChange={e => setPageForm(prev => ({ ...prev, seo_description: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL</label>
                                        <input
                                            type="url"
                                            value={pageForm.canonical_url}
                                            onChange={e => setPageForm(prev => ({ ...prev, canonical_url: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">OG image URL</label>
                                        <input
                                            type="url"
                                            value={pageForm.og_image_url}
                                            onChange={e => setPageForm(prev => ({ ...prev, og_image_url: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={pageForm.robots_index}
                                            onChange={e => setPageForm(prev => ({ ...prev, robots_index: e.target.checked }))}
                                            className="rounded border-gray-300"
                                        />
                                        Robots index
                                    </label>
                                    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={pageForm.robots_follow}
                                            onChange={e => setPageForm(prev => ({ ...prev, robots_follow: e.target.checked }))}
                                            className="rounded border-gray-300"
                                        />
                                        Robots follow
                                    </label>
                                    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={pageForm.structured_data_enabled}
                                            onChange={e => setPageForm(prev => ({ ...prev, structured_data_enabled: e.target.checked }))}
                                            className="rounded border-gray-300"
                                        />
                                        Structured data
                                    </label>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Structured data type</label>
                                    <input
                                        type="text"
                                        value={pageForm.structured_data_type}
                                        onChange={e => setPageForm(prev => ({ ...prev, structured_data_type: e.target.value }))}
                                        placeholder="WebPage, Article..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={closePageForm}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={savePage}
                                disabled={saving}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors disabled:opacity-50"
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSectionForm && (
                <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-10 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-6 mb-10">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-gray-900">
                                {editingSection ? 'Редактировать секцию' : 'Новая секция'}
                            </h2>
                            <button onClick={closeSectionForm} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Section key *</label>
                                    <input
                                        type="text"
                                        value={sectionForm.key}
                                        onChange={e => setSectionForm(prev => ({ ...prev, key: e.target.value }))}
                                        placeholder="hero-main"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Section type</label>
                                    <select
                                        value={sectionForm.type}
                                        onChange={e => setSectionForm(prev => ({ ...prev, type: e.target.value as CmsSectionType }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    >
                                        <option value="hero">hero</option>
                                        <option value="content">content</option>
                                        <option value="cards">cards</option>
                                        <option value="cta">cta</option>
                                        <option value="media">media</option>
                                        <option value="custom">custom</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Payload JSON</label>
                                <textarea
                                    value={sectionForm.payloadText}
                                    onChange={e => setSectionForm(prev => ({ ...prev, payloadText: e.target.value }))}
                                    rows={10}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                />
                            </div>

                            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={sectionForm.is_enabled}
                                    onChange={e => setSectionForm(prev => ({ ...prev, is_enabled: e.target.checked }))}
                                    className="rounded border-gray-300"
                                />
                                Секция включена
                            </label>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={closeSectionForm}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={saveSection}
                                disabled={saving}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors disabled:opacity-50"
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
