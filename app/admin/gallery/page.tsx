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
    Image as ImageIcon,
    Upload,
    Star,
    Search,
} from 'lucide-react'
import { galleryImagesService, galleryService } from '@/lib/services/api'
import { uploadGalleryImage } from '@/lib/services/storage'
import type { Tables, TablesInsert, TablesUpdate } from '@/lib/database.types'

type GalleryAlbum = Tables<'gallery'>
type GalleryImage = Tables<'gallery_images'>

interface AlbumForm {
    album_name_ru: string
    album_name_en: string
    description_ru: string
    description_en: string
    category: string
    event_date: string
    cover_image_url: string
    is_published: boolean
}

interface ImageForm {
    caption_ru: string
    caption_en: string
    image_url: string
}

const emptyAlbumForm: AlbumForm = {
    album_name_ru: '',
    album_name_en: '',
    description_ru: '',
    description_en: '',
    category: 'events',
    event_date: '',
    cover_image_url: '',
    is_published: false,
}

const emptyImageForm: ImageForm = {
    caption_ru: '',
    caption_en: '',
    image_url: '',
}

export default function AdminGalleryPage() {
    const [albums, setAlbums] = useState<GalleryAlbum[]>([])
    const [images, setImages] = useState<GalleryImage[]>([])
    const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null)

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [showAlbumForm, setShowAlbumForm] = useState(false)
    const [editingAlbum, setEditingAlbum] = useState<GalleryAlbum | null>(null)
    const [albumForm, setAlbumForm] = useState<AlbumForm>(emptyAlbumForm)

    const [showImageForm, setShowImageForm] = useState(false)
    const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
    const [imageForm, setImageForm] = useState<ImageForm>(emptyImageForm)
    const [imageFile, setImageFile] = useState<File | null>(null)

    const [searchQuery, setSearchQuery] = useState('')

    const selectedAlbum = useMemo(
        () => albums.find(album => album.id === selectedAlbumId) || null,
        [albums, selectedAlbumId]
    )

    const filteredAlbums = useMemo(() => {
        return albums.filter(album => {
            const haystack = [album.album_name_ru, album.album_name_en, album.category]
                .join(' ')
                .toLowerCase()
            return haystack.includes(searchQuery.toLowerCase())
        })
    }, [albums, searchQuery])

    const fetchAlbums = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await galleryService.getAll()
            const sorted = (data || []).sort((a, b) => {
                const dateA = new Date(a.event_date || a.updated_at || 0).getTime()
                const dateB = new Date(b.event_date || b.updated_at || 0).getTime()
                return dateB - dateA
            })
            setAlbums(sorted)
            if (!selectedAlbumId && sorted.length > 0) {
                setSelectedAlbumId(sorted[0].id)
            }
        } catch (err) {
            console.error('Failed to fetch albums:', err)
            setError('Ошибка загрузки альбомов')
        } finally {
            setLoading(false)
        }
    }, [selectedAlbumId])

    const fetchImages = useCallback(async (albumId: string) => {
        try {
            const data = await galleryImagesService.getByGallery(albumId)
            const sorted = (data || []).sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
            setImages(sorted)
        } catch (err) {
            console.error('Failed to fetch gallery images:', err)
            setError('Ошибка загрузки изображений')
        }
    }, [])

    useEffect(() => {
        fetchAlbums()
    }, [fetchAlbums])

    useEffect(() => {
        if (selectedAlbumId) {
            fetchImages(selectedAlbumId)
        } else {
            setImages([])
        }
    }, [selectedAlbumId, fetchImages])

    const openAlbumForm = (album?: GalleryAlbum) => {
        if (album) {
            setEditingAlbum(album)
            setAlbumForm({
                album_name_ru: album.album_name_ru,
                album_name_en: album.album_name_en,
                description_ru: album.description_ru || '',
                description_en: album.description_en || '',
                category: album.category || 'events',
                event_date: album.event_date || '',
                cover_image_url: album.cover_image_url || '',
                is_published: !!album.is_published,
            })
        } else {
            setEditingAlbum(null)
            setAlbumForm(emptyAlbumForm)
        }
        setShowAlbumForm(true)
    }

    const closeAlbumForm = () => {
        setShowAlbumForm(false)
        setEditingAlbum(null)
        setAlbumForm(emptyAlbumForm)
    }

    const saveAlbum = async () => {
        if (!albumForm.album_name_ru || !albumForm.album_name_en) return
        try {
            setSaving(true)
            const payload = {
                album_name_ru: albumForm.album_name_ru,
                album_name_en: albumForm.album_name_en,
                description_ru: albumForm.description_ru || null,
                description_en: albumForm.description_en || null,
                category: albumForm.category || null,
                event_date: albumForm.event_date || null,
                cover_image_url: albumForm.cover_image_url || null,
                is_published: albumForm.is_published,
            }

            if (editingAlbum) {
                await galleryService.update(editingAlbum.id, payload as TablesUpdate<'gallery'>)
            } else {
                const created = await galleryService.create(payload as TablesInsert<'gallery'>)
                setSelectedAlbumId(created.id)
            }

            closeAlbumForm()
            await fetchAlbums()
        } catch (err) {
            console.error('Failed to save album:', err)
            setError('Ошибка сохранения альбома')
        } finally {
            setSaving(false)
        }
    }

    const deleteAlbum = async (id: string) => {
        if (!confirm('Удалить альбом и все его изображения?')) return
        try {
            await galleryService.delete(id)
            if (selectedAlbumId === id) {
                setSelectedAlbumId(null)
            }
            await fetchAlbums()
        } catch (err) {
            console.error('Failed to delete album:', err)
            setError('Ошибка удаления альбома')
        }
    }

    const togglePublish = async (album: GalleryAlbum) => {
        try {
            await galleryService.update(album.id, {
                is_published: !album.is_published,
            } as TablesUpdate<'gallery'>)
            await fetchAlbums()
        } catch (err) {
            console.error('Failed to toggle album publish:', err)
            setError('Ошибка изменения статуса публикации')
        }
    }

    const openImageForm = (image?: GalleryImage) => {
        if (!selectedAlbumId) return
        if (image) {
            setEditingImage(image)
            setImageForm({
                caption_ru: image.caption_ru || '',
                caption_en: image.caption_en || '',
                image_url: image.image_url,
            })
        } else {
            setEditingImage(null)
            setImageForm(emptyImageForm)
        }
        setImageFile(null)
        setShowImageForm(true)
    }

    const closeImageForm = () => {
        setShowImageForm(false)
        setEditingImage(null)
        setImageForm(emptyImageForm)
        setImageFile(null)
    }

    const saveImage = async () => {
        if (!selectedAlbumId) return
        if (!editingImage && !imageFile && !imageForm.image_url) {
            setError('Для нового изображения нужен файл или image URL')
            return
        }

        try {
            setSaving(true)
            let nextImageUrl = imageForm.image_url
            if (imageFile) {
                setUploadingImage(true)
                const uploaded = await uploadGalleryImage(imageFile, selectedAlbumId)
                nextImageUrl = uploaded.publicUrl
            }

            const payload = {
                gallery_id: selectedAlbumId,
                caption_ru: imageForm.caption_ru || null,
                caption_en: imageForm.caption_en || null,
                image_url: nextImageUrl,
            }

            if (editingImage) {
                await galleryImagesService.update(editingImage.id, payload as TablesUpdate<'gallery_images'>)
            } else {
                await galleryImagesService.create({
                    ...payload,
                    order_index: images.length,
                } as TablesInsert<'gallery_images'>)
            }

            closeImageForm()
            await fetchImages(selectedAlbumId)
        } catch (err) {
            console.error('Failed to save gallery image:', err)
            setError('Ошибка сохранения изображения')
        } finally {
            setSaving(false)
            setUploadingImage(false)
        }
    }

    const deleteImage = async (id: string) => {
        if (!selectedAlbumId) return
        if (!confirm('Удалить изображение?')) return
        try {
            await galleryImagesService.delete(id)
            await fetchImages(selectedAlbumId)
        } catch (err) {
            console.error('Failed to delete gallery image:', err)
            setError('Ошибка удаления изображения')
        }
    }

    const moveImage = async (index: number, direction: 'up' | 'down') => {
        if (!selectedAlbumId) return
        const targetIndex = direction === 'up' ? index - 1 : index + 1
        if (targetIndex < 0 || targetIndex >= images.length) return

        const nextImages = [...images]
        const [moved] = nextImages.splice(index, 1)
        nextImages.splice(targetIndex, 0, moved)
        setImages(nextImages)

        try {
            await galleryImagesService.reorder(
                nextImages.map((img, idx) => ({ id: img.id, order_index: idx }))
            )
            await fetchImages(selectedAlbumId)
        } catch (err) {
            console.error('Failed to reorder images:', err)
            setError('Ошибка сортировки изображений')
            await fetchImages(selectedAlbumId)
        }
    }

    const setAsCover = async (image: GalleryImage) => {
        if (!selectedAlbumId) return
        try {
            await galleryService.update(selectedAlbumId, {
                cover_image_url: image.image_url,
            } as TablesUpdate<'gallery'>)
            await fetchAlbums()
        } catch (err) {
            console.error('Failed to set cover image:', err)
            setError('Ошибка установки обложки')
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
                                <h1 className="text-2xl font-bold text-gray-900">Gallery CMS</h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    Альбомы, изображения, сортировка, cover image, publish controls
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => openAlbumForm()}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Добавить альбом
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
                                    placeholder="Поиск альбомов"
                                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                />
                            </label>

                            <div className="space-y-2">
                                {filteredAlbums.map(album => (
                                    <div
                                        key={album.id}
                                        className={`rounded-lg border p-3 ${selectedAlbumId === album.id ? 'border-navy-300 bg-navy-50/40' : 'border-gray-200'}`}
                                    >
                                        <button
                                            onClick={() => setSelectedAlbumId(album.id)}
                                            className="w-full text-left"
                                        >
                                            <div className="flex items-center justify-between gap-2">
                                                <h3 className="font-semibold text-sm text-gray-900 truncate">
                                                    {album.album_name_ru}
                                                </h3>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${album.is_published ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                                                    {album.is_published ? 'Published' : 'Draft'}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 truncate mt-1">{album.album_name_en}</p>
                                            <p className="text-xs text-gray-400 truncate">{album.category || 'other'} · {album.event_date || 'no date'}</p>
                                        </button>
                                        <div className="mt-2 flex items-center gap-1.5">
                                            <button
                                                onClick={() => togglePublish(album)}
                                                className={`p-1.5 rounded transition-colors ${album.is_published ? 'text-green-500 hover:bg-green-50' : 'text-gray-300 hover:bg-gray-100'}`}
                                                title={album.is_published ? 'Снять с публикации' : 'Опубликовать'}
                                            >
                                                {album.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => openAlbumForm(album)}
                                                className="p-1.5 text-gray-400 hover:text-navy-700 hover:bg-gray-100 rounded transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => deleteAlbum(album.id)}
                                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {filteredAlbums.length === 0 && (
                                    <div className="text-center py-10 text-gray-500 text-sm">
                                        Альбомы не найдены
                                    </div>
                                )}
                            </div>
                        </section>

                        <section className="xl:col-span-3 bg-white rounded-xl border border-gray-200 p-4">
                            <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {selectedAlbum ? selectedAlbum.album_name_ru : 'Выберите альбом'}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {selectedAlbum ? `${images.length} изображений` : 'Управление изображениями'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => openImageForm()}
                                    disabled={!selectedAlbum}
                                    className="inline-flex items-center gap-2 px-3 py-2 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Plus className="w-4 h-4" />
                                    Добавить изображение
                                </button>
                            </div>

                            {!selectedAlbum && (
                                <div className="text-center py-14 text-gray-500">
                                    Выберите альбом слева
                                </div>
                            )}

                            {selectedAlbum && images.length === 0 && (
                                <div className="text-center py-14 text-gray-500">
                                    В альбоме пока нет изображений
                                </div>
                            )}

                            {selectedAlbum && images.length > 0 && (
                                <div className="space-y-2">
                                    {images.map((image, index) => (
                                        <div
                                            key={image.id}
                                            className="border border-gray-200 rounded-lg p-3 flex flex-col lg:flex-row lg:items-center gap-3"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <ImageIcon className="w-4 h-4 text-gray-400" />
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {image.caption_ru || 'Без подписи'}
                                                    </p>
                                                    {selectedAlbum.cover_image_url === image.image_url && (
                                                        <span className="text-xs px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full">
                                                            cover
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500 truncate mt-0.5">{image.caption_en || 'No caption EN'}</p>
                                                <p className="text-xs text-gray-400 truncate">{image.image_url}</p>
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <button
                                                    onClick={() => moveImage(index, 'up')}
                                                    disabled={index === 0}
                                                    className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded disabled:opacity-30"
                                                    title="Вверх"
                                                >
                                                    <ArrowUp className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => moveImage(index, 'down')}
                                                    disabled={index === images.length - 1}
                                                    className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded disabled:opacity-30"
                                                    title="Вниз"
                                                >
                                                    <ArrowDown className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setAsCover(image)}
                                                    className="p-1.5 text-gray-400 hover:text-amber-700 hover:bg-amber-50 rounded transition-colors"
                                                    title="Сделать обложкой"
                                                >
                                                    <Star className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => openImageForm(image)}
                                                    className="p-1.5 text-gray-400 hover:text-navy-700 hover:bg-gray-100 rounded transition-colors"
                                                    title="Редактировать"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => deleteImage(image.id)}
                                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                    title="Удалить"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                )}
            </main>

            {showAlbumForm && (
                <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-10 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-6 mb-10">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-gray-900">
                                {editingAlbum ? 'Редактировать альбом' : 'Новый альбом'}
                            </h2>
                            <button onClick={closeAlbumForm} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Название (RU) *</label>
                                    <input
                                        type="text"
                                        value={albumForm.album_name_ru}
                                        onChange={e => setAlbumForm(prev => ({ ...prev, album_name_ru: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name (EN) *</label>
                                    <input
                                        type="text"
                                        value={albumForm.album_name_en}
                                        onChange={e => setAlbumForm(prev => ({ ...prev, album_name_en: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Описание (RU)</label>
                                    <textarea
                                        value={albumForm.description_ru}
                                        onChange={e => setAlbumForm(prev => ({ ...prev, description_ru: e.target.value }))}
                                        rows={2}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label>
                                    <textarea
                                        value={albumForm.description_en}
                                        onChange={e => setAlbumForm(prev => ({ ...prev, description_en: e.target.value }))}
                                        rows={2}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <input
                                        type="text"
                                        value={albumForm.category}
                                        onChange={e => setAlbumForm(prev => ({ ...prev, category: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Event date</label>
                                    <input
                                        type="date"
                                        value={albumForm.event_date}
                                        onChange={e => setAlbumForm(prev => ({ ...prev, event_date: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                                <label className="inline-flex items-center gap-2 mt-8 text-sm text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={albumForm.is_published}
                                        onChange={e => setAlbumForm(prev => ({ ...prev, is_published: e.target.checked }))}
                                        className="rounded border-gray-300"
                                    />
                                    Published
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cover image URL</label>
                                <input
                                    type="url"
                                    value={albumForm.cover_image_url}
                                    onChange={e => setAlbumForm(prev => ({ ...prev, cover_image_url: e.target.value }))}
                                    placeholder="https://..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={closeAlbumForm}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={saveAlbum}
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

            {showImageForm && (
                <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-10 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 mb-10">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-gray-900">
                                {editingImage ? 'Редактировать изображение' : 'Новое изображение'}
                            </h2>
                            <button onClick={closeImageForm} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Caption (RU)</label>
                                    <input
                                        type="text"
                                        value={imageForm.caption_ru}
                                        onChange={e => setImageForm(prev => ({ ...prev, caption_ru: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Caption (EN)</label>
                                    <input
                                        type="text"
                                        value={imageForm.caption_en}
                                        onChange={e => setImageForm(prev => ({ ...prev, caption_en: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                <input
                                    type="url"
                                    value={imageForm.image_url}
                                    onChange={e => setImageForm(prev => ({ ...prev, image_url: e.target.value }))}
                                    placeholder="https://..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                />
                                <label className="mt-2 inline-flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                                    <Upload className="w-3.5 h-3.5" />
                                    Загрузить файл
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
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={closeImageForm}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={saveImage}
                                disabled={saving || uploadingImage}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors disabled:opacity-50"
                            >
                                {(saving || uploadingImage) ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                {uploadingImage ? 'Загрузка...' : 'Сохранить'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
