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
    Archive,
    ArchiveRestore,
    ExternalLink,
    Search,
    Upload,
} from 'lucide-react'
import { documentsService } from '@/lib/services/api'
import { uploadDocument } from '@/lib/services/storage'
import type { Tables, TablesInsert, TablesUpdate } from '@/lib/database.types'

type DocumentRecord = Tables<'documents'>
type ArchiveFilter = 'active' | 'archived' | 'all'

interface DocumentForm {
    title_ru: string
    title_en: string
    category: 'academic' | 'administrative' | 'regulatory' | 'reports' | 'other'
    file_url: string
    published_at: string
    version: number
}

const emptyForm: DocumentForm = {
    title_ru: '',
    title_en: '',
    category: 'academic',
    file_url: '',
    published_at: '',
    version: 1,
}

function formatBytes(bytes: number | null) {
    if (!bytes || bytes <= 0) return '—'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1048576).toFixed(2)} MB`
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

function getVersionFromUrl(url: string | null) {
    if (!url) return 1
    const pathMatch = url.match(/\/v(\d+)\//i)
    if (pathMatch) {
        return Math.max(1, Number(pathMatch[1]))
    }

    try {
        const parsed = new URL(url)
        const queryVersion = Number(parsed.searchParams.get('v') || '1')
        return Number.isFinite(queryVersion) ? Math.max(1, queryVersion) : 1
    } catch {
        return 1
    }
}

function applyVersionToUrl(url: string, version: number) {
    if (!url) return url
    const safeVersion = Math.max(1, Math.trunc(version || 1))
    try {
        const parsed = new URL(url)
        parsed.searchParams.set('v', String(safeVersion))
        return parsed.toString()
    } catch {
        const separator = url.includes('?') ? '&' : '?'
        return `${url}${separator}v=${safeVersion}`
    }
}

export default function AdminDocumentsPage() {
    const [documents, setDocuments] = useState<DocumentRecord[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploadingFile, setUploadingFile] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [showForm, setShowForm] = useState(false)
    const [editingDocument, setEditingDocument] = useState<DocumentRecord | null>(null)
    const [form, setForm] = useState<DocumentForm>(emptyForm)
    const [pdfFile, setPdfFile] = useState<File | null>(null)

    const [searchQuery, setSearchQuery] = useState('')
    const [categoryFilter, setCategoryFilter] = useState<'all' | DocumentForm['category']>('all')
    const [archiveFilter, setArchiveFilter] = useState<ArchiveFilter>('active')

    const fetchDocuments = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await documentsService.getAll()
            const sorted = (data || []).sort((a, b) => {
                const archivedDiff = Number(!!a.is_archived) - Number(!!b.is_archived)
                if (archivedDiff !== 0) return archivedDiff
                const updatedA = new Date(a.updated_at || a.published_at || 0).getTime()
                const updatedB = new Date(b.updated_at || b.published_at || 0).getTime()
                return updatedB - updatedA
            })
            setDocuments(sorted)
        } catch (err) {
            console.error('Failed to fetch documents:', err)
            setError('Ошибка загрузки документов')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchDocuments()
    }, [fetchDocuments])

    const filteredDocuments = useMemo(() => {
        return documents.filter(document => {
            const matchesSearch = [document.title_ru, document.title_en, document.file_url]
                .some(value => value.toLowerCase().includes(searchQuery.toLowerCase()))
            const matchesCategory = categoryFilter === 'all' || document.category === categoryFilter
            const matchesArchive = archiveFilter === 'all'
                || (archiveFilter === 'archived' ? !!document.is_archived : !document.is_archived)
            return matchesSearch && matchesCategory && matchesArchive
        })
    }, [documents, searchQuery, categoryFilter, archiveFilter])

    const openForm = (document?: DocumentRecord) => {
        if (document) {
            setEditingDocument(document)
            setForm({
                title_ru: document.title_ru,
                title_en: document.title_en,
                category: document.category as DocumentForm['category'],
                file_url: document.file_url,
                published_at: toDateTimeLocal(document.published_at),
                version: getVersionFromUrl(document.file_url),
            })
        } else {
            setEditingDocument(null)
            setForm(emptyForm)
        }
        setPdfFile(null)
        setShowForm(true)
    }

    const closeForm = () => {
        setShowForm(false)
        setEditingDocument(null)
        setForm(emptyForm)
        setPdfFile(null)
    }

    const saveDocument = async () => {
        if (!form.title_ru || !form.title_en || !form.category) return
        if (!editingDocument && !pdfFile && !form.file_url) {
            setError('Для нового документа нужен PDF файл или file URL')
            return
        }

        try {
            setSaving(true)

            let nextFileUrl = form.file_url
            let nextFileType: string | null = editingDocument?.file_type || null
            let nextFileSize: number | null = editingDocument?.file_size || null
            const nextVersion = Math.max(1, Math.trunc(form.version || 1))

            if (pdfFile) {
                setUploadingFile(true)
                const uploaded = await uploadDocument(pdfFile, form.category, nextVersion)
                nextFileUrl = uploaded.publicUrl
                nextFileType = pdfFile.type || 'application/pdf'
                nextFileSize = pdfFile.size
            } else if (nextFileUrl) {
                nextFileUrl = applyVersionToUrl(nextFileUrl, nextVersion)
            }

            const payload = {
                title_ru: form.title_ru,
                title_en: form.title_en,
                category: form.category,
                file_url: nextFileUrl,
                file_type: nextFileType,
                file_size: nextFileSize,
                published_at: form.published_at ? new Date(form.published_at).toISOString() : new Date().toISOString(),
            }

            if (editingDocument) {
                await documentsService.update(editingDocument.id, payload as TablesUpdate<'documents'>)
            } else {
                await documentsService.create({
                    ...payload,
                    is_archived: false,
                } as TablesInsert<'documents'>)
            }

            closeForm()
            await fetchDocuments()
        } catch (err) {
            console.error('Failed to save document:', err)
            setError('Ошибка сохранения документа')
        } finally {
            setSaving(false)
            setUploadingFile(false)
        }
    }

    const deleteDocument = async (id: string) => {
        if (!confirm('Удалить документ?')) return
        try {
            await documentsService.delete(id)
            await fetchDocuments()
        } catch (err) {
            console.error('Failed to delete document:', err)
            setError('Ошибка удаления документа')
        }
    }

    const toggleArchive = async (document: DocumentRecord) => {
        try {
            await documentsService.update(document.id, {
                is_archived: !document.is_archived,
            } as TablesUpdate<'documents'>)
            await fetchDocuments()
        } catch (err) {
            console.error('Failed to archive document:', err)
            setError('Ошибка изменения статуса архива')
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
                                <h1 className="text-2xl font-bold text-gray-900">Documents CMS</h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    Загрузка PDF, категории, метаданные, версии и архив
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => openForm()}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Добавить документ
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
                                placeholder="Поиск по названию / URL"
                                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                            />
                        </label>

                        <select
                            value={categoryFilter}
                            onChange={e => setCategoryFilter(e.target.value as 'all' | DocumentForm['category'])}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                        >
                            <option value="all">Все категории</option>
                            <option value="academic">academic</option>
                            <option value="administrative">administrative</option>
                            <option value="regulatory">regulatory</option>
                            <option value="reports">reports</option>
                            <option value="other">other</option>
                        </select>

                        <select
                            value={archiveFilter}
                            onChange={e => setArchiveFilter(e.target.value as ArchiveFilter)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                        >
                            <option value="active">Только активные</option>
                            <option value="archived">Только архив</option>
                            <option value="all">Все документы</option>
                        </select>
                    </div>
                </div>

                {loading && (
                    <div className="flex items-center justify-center py-24 text-gray-400">
                        <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                )}

                {!loading && filteredDocuments.length === 0 && (
                    <div className="text-center py-24 bg-white rounded-xl border border-gray-200">
                        <p className="text-gray-500 mb-4">Документов по фильтрам нет</p>
                        <button
                            onClick={() => openForm()}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800"
                        >
                            <Plus className="w-4 h-4" />
                            Создать первый документ
                        </button>
                    </div>
                )}

                {!loading && filteredDocuments.length > 0 && (
                    <div className="space-y-3">
                        {filteredDocuments.map(document => (
                            <div
                                key={document.id}
                                className={`bg-white rounded-xl border transition-colors ${document.is_archived ? 'border-amber-200' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <div className="p-4 md:p-5 flex flex-col lg:flex-row lg:items-center gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-gray-900 truncate">
                                                {document.title_ru}
                                            </h3>
                                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                                {document.category}
                                            </span>
                                            <span className="text-xs px-2 py-0.5 bg-navy-50 text-navy-700 rounded-full">
                                                v{getVersionFromUrl(document.file_url)}
                                            </span>
                                            {document.is_archived && (
                                                <span className="text-xs px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full">
                                                    archived
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500 truncate">{document.title_en}</p>
                                        <p className="text-xs text-gray-400 mt-1 truncate">
                                            {document.file_type || 'unknown'} · {formatBytes(document.file_size)} · published {document.published_at ? new Date(document.published_at).toLocaleString() : '—'}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2">
                                        <button
                                            onClick={() => window.open(document.file_url, '_blank', 'noopener,noreferrer')}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                            title="Открыть файл"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Open
                                        </button>
                                        <button
                                            onClick={() => toggleArchive(document)}
                                            className="p-2 text-gray-400 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                                            title={document.is_archived ? 'Восстановить из архива' : 'В архив'}
                                        >
                                            {document.is_archived ? (
                                                <ArchiveRestore className="w-4 h-4" />
                                            ) : (
                                                <Archive className="w-4 h-4" />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => openForm(document)}
                                            className="p-2 text-gray-400 hover:text-navy-700 hover:bg-gray-100 rounded-lg transition-colors"
                                            title="Редактировать"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => deleteDocument(document.id)}
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
                    <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-6 mb-10">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-gray-900">
                                {editingDocument ? 'Редактировать документ' : 'Новый документ'}
                            </h2>
                            <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Название (RU) *</label>
                                    <input
                                        type="text"
                                        value={form.title_ru}
                                        onChange={e => setForm(prev => ({ ...prev, title_ru: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title (EN) *</label>
                                    <input
                                        type="text"
                                        value={form.title_en}
                                        onChange={e => setForm(prev => ({ ...prev, title_en: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Категория *</label>
                                    <select
                                        value={form.category}
                                        onChange={e => setForm(prev => ({ ...prev, category: e.target.value as DocumentForm['category'] }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    >
                                        <option value="academic">academic</option>
                                        <option value="administrative">administrative</option>
                                        <option value="regulatory">regulatory</option>
                                        <option value="reports">reports</option>
                                        <option value="other">other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Version *</label>
                                    <input
                                        type="number"
                                        min={1}
                                        value={form.version}
                                        onChange={e => setForm(prev => ({ ...prev, version: Math.max(1, Number(e.target.value) || 1) }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Published At (metadata)</label>
                                    <input
                                        type="datetime-local"
                                        value={form.published_at}
                                        onChange={e => setForm(prev => ({ ...prev, published_at: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">PDF File</label>
                                <label className="inline-flex items-center gap-2 text-sm text-gray-600 cursor-pointer px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                    <Upload className="w-4 h-4" />
                                    Загрузить PDF
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        className="hidden"
                                        onChange={e => setPdfFile(e.target.files?.[0] || null)}
                                    />
                                </label>
                                {pdfFile && (
                                    <p className="mt-2 text-xs text-green-600">
                                        {pdfFile.name} · {formatBytes(pdfFile.size)}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">File URL</label>
                                <input
                                    type="url"
                                    value={form.file_url}
                                    onChange={e => setForm(prev => ({ ...prev, file_url: e.target.value }))}
                                    placeholder="https://... (если не загружаете файл)"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                />
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
                                onClick={saveDocument}
                                disabled={saving || uploadingFile}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors disabled:opacity-50"
                            >
                                {(saving || uploadingFile) ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                {uploadingFile ? 'Загрузка файла...' : 'Сохранить'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
