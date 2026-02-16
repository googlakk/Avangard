'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
    ArrowLeft,
    Plus,
    Edit2,
    Trash2,
    Save,
    X,
    Loader2,
    User,
    GripVertical,
    Eye,
    EyeOff,
} from 'lucide-react'
import { departmentsService, staffService } from '@/lib/services/api'
import type { Tables, TablesInsert, TablesUpdate } from '@/lib/database.types'

type Department = Tables<'departments'>
type StaffMember = Tables<'staff_members'>

interface StaffForm {
    name_ru: string
    name_en: string
    position_ru: string
    position_en: string
    bio_ru: string
    bio_en: string
    email: string
    phone: string
    photo_url: string
    subjects: string
    qualifications: string
}

const emptyStaffForm: StaffForm = {
    name_ru: '',
    name_en: '',
    position_ru: '',
    position_en: '',
    bio_ru: '',
    bio_en: '',
    email: '',
    phone: '',
    photo_url: '',
    subjects: '',
    qualifications: '',
}

export default function DepartmentStaffPage() {
    const params = useParams()
    const router = useRouter()
    const departmentId = params.id as string

    const [department, setDepartment] = useState<Department | null>(null)
    const [staff, setStaff] = useState<StaffMember[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [saving, setSaving] = useState(false)

    // Staff form
    const [showForm, setShowForm] = useState(false)
    const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null)
    const [form, setForm] = useState<StaffForm>(emptyStaffForm)

    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const [dept, staffData] = await Promise.all([
                departmentsService.getById(departmentId),
                staffService.getByDepartment(departmentId),
            ])
            setDepartment(dept)
            setStaff((staffData || []).sort((a, b) => (a.order_index || 0) - (b.order_index || 0)))
        } catch (err) {
            console.error('Failed to fetch data:', err)
            setError('Ошибка загрузки данных')
        } finally {
            setLoading(false)
        }
    }, [departmentId])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const openForm = (member?: StaffMember) => {
        if (member) {
            setEditingStaff(member)
            setForm({
                name_ru: member.name_ru,
                name_en: member.name_en,
                position_ru: member.position_ru,
                position_en: member.position_en,
                bio_ru: member.bio_ru || '',
                bio_en: member.bio_en || '',
                email: member.email || '',
                phone: member.phone || '',
                photo_url: member.photo_url || '',
                subjects: (member.subjects || []).join(', '),
                qualifications: (member.qualifications || []).join(', '),
            })
        } else {
            setEditingStaff(null)
            setForm(emptyStaffForm)
        }
        setShowForm(true)
    }

    const saveStaff = async () => {
        if (!form.name_ru || !form.name_en || !form.position_ru || !form.position_en) return

        try {
            setSaving(true)
            const payload = {
                name_ru: form.name_ru,
                name_en: form.name_en,
                position_ru: form.position_ru,
                position_en: form.position_en,
                bio_ru: form.bio_ru || null,
                bio_en: form.bio_en || null,
                email: form.email || null,
                phone: form.phone || null,
                photo_url: form.photo_url || null,
                subjects: form.subjects ? form.subjects.split(',').map(s => s.trim()).filter(Boolean) : null,
                qualifications: form.qualifications ? form.qualifications.split(',').map(s => s.trim()).filter(Boolean) : null,
                department_id: departmentId,
            }

            if (editingStaff) {
                await staffService.update(editingStaff.id, payload as TablesUpdate<'staff_members'>)
            } else {
                await staffService.create({
                    ...payload,
                    order_index: staff.length,
                } as TablesInsert<'staff_members'>)
            }

            setShowForm(false)
            setEditingStaff(null)
            await fetchData()
        } catch (err) {
            console.error('Failed to save staff member:', err)
            setError('Ошибка сохранения')
        } finally {
            setSaving(false)
        }
    }

    const deleteStaff = async (id: string) => {
        if (!confirm('Удалить сотрудника?')) return
        try {
            await staffService.delete(id)
            await fetchData()
        } catch (err) {
            console.error('Failed to delete staff:', err)
            setError('Ошибка удаления')
        }
    }

    const toggleStaffActive = async (member: StaffMember) => {
        try {
            await staffService.update(member.id, {
                is_active: !member.is_active,
            } as TablesUpdate<'staff_members'>)
            await fetchData()
        } catch (err) {
            console.error('Failed to toggle staff active:', err)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/admin/staff"
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {department?.name_ru || 'Кафедра'}
                                </h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    {department?.name_en} · {staff.length} сотр.
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => openForm()}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Добавить сотрудника
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Error */}
                {error && (
                    <div className="mb-6 bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {error}
                        <button onClick={() => setError(null)} className="ml-2 font-bold">✕</button>
                    </div>
                )}

                {/* Staff Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-12 overflow-y-auto">
                        <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 mb-12">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold text-gray-900">
                                    {editingStaff ? 'Редактировать сотрудника' : 'Новый сотрудник'}
                                </h2>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {/* Names */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            ФИО (РУ) *
                                        </label>
                                        <input
                                            type="text"
                                            value={form.name_ru}
                                            onChange={e => setForm({ ...form, name_ru: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                            placeholder="Иванов Иван Иванович"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name (EN) *
                                        </label>
                                        <input
                                            type="text"
                                            value={form.name_en}
                                            onChange={e => setForm({ ...form, name_en: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                            placeholder="Ivan Ivanov"
                                        />
                                    </div>
                                </div>

                                {/* Positions */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Должность (РУ) *
                                        </label>
                                        <input
                                            type="text"
                                            value={form.position_ru}
                                            onChange={e => setForm({ ...form, position_ru: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                            placeholder="Учитель математики"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Position (EN) *
                                        </label>
                                        <input
                                            type="text"
                                            value={form.position_en}
                                            onChange={e => setForm({ ...form, position_en: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                            placeholder="Mathematics Teacher"
                                        />
                                    </div>
                                </div>

                                {/* Bio */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Биография (РУ)
                                        </label>
                                        <textarea
                                            value={form.bio_ru}
                                            onChange={e => setForm({ ...form, bio_ru: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                            rows={3}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Bio (EN)
                                        </label>
                                        <textarea
                                            value={form.bio_en}
                                            onChange={e => setForm({ ...form, bio_en: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                            rows={3}
                                        />
                                    </div>
                                </div>

                                {/* Contact */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={e => setForm({ ...form, email: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Телефон
                                        </label>
                                        <input
                                            type="text"
                                            value={form.phone}
                                            onChange={e => setForm({ ...form, phone: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                        />
                                    </div>
                                </div>

                                {/* Photo & Subjects */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            URL фото
                                        </label>
                                        <input
                                            type="url"
                                            value={form.photo_url}
                                            onChange={e => setForm({ ...form, photo_url: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Предметы (через запятую)
                                        </label>
                                        <input
                                            type="text"
                                            value={form.subjects}
                                            onChange={e => setForm({ ...form, subjects: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                            placeholder="Алгебра, Геометрия"
                                        />
                                    </div>
                                </div>

                                {/* Qualifications */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Квалификации (через запятую)
                                    </label>
                                    <input
                                        type="text"
                                        value={form.qualifications}
                                        onChange={e => setForm({ ...form, qualifications: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                        placeholder="Высшая категория, Магистр педагогики"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Отмена
                                </button>
                                <button
                                    onClick={saveStaff}
                                    disabled={saving || !form.name_ru || !form.name_en || !form.position_ru || !form.position_en}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors disabled:opacity-50"
                                >
                                    {saving ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Save className="w-4 h-4" />
                                    )}
                                    Сохранить
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty state */}
                {staff.length === 0 && (
                    <div className="text-center py-24">
                        <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-gray-500 mb-4">Сотрудники ещё не добавлены</p>
                        <button
                            onClick={() => openForm()}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800"
                        >
                            <Plus className="w-4 h-4" />
                            Добавить первого сотрудника
                        </button>
                    </div>
                )}

                {/* Staff list */}
                {staff.length > 0 && (
                    <div className="space-y-2">
                        {staff.map(member => (
                            <div
                                key={member.id}
                                className={`bg-white rounded-xl border transition-colors ${member.is_active ? 'border-gray-200 hover:border-gray-300' : 'border-gray-100 opacity-60'
                                    }`}
                            >
                                <div className="flex items-center gap-4 p-4">
                                    <div className="text-gray-300 cursor-grab">
                                        <GripVertical className="w-5 h-5" />
                                    </div>

                                    {/* Avatar */}
                                    <div className="relative flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                                        {member.photo_url ? (
                                            <Image
                                                src={member.photo_url}
                                                alt={member.name_ru}
                                                fill
                                                sizes="40px"
                                                unoptimized
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 truncate text-sm">
                                            {member.name_ru}
                                        </h3>
                                        <p className="text-xs text-gray-400 truncate">
                                            {member.position_ru}
                                        </p>
                                    </div>

                                    {member.email && (
                                        <span className="hidden lg:block text-xs text-gray-400 truncate max-w-[180px]">
                                            {member.email}
                                        </span>
                                    )}

                                    <div className="flex items-center gap-1 flex-shrink-0">
                                        <button
                                            onClick={() => toggleStaffActive(member)}
                                            className={`p-2 rounded-lg transition-colors ${member.is_active
                                                ? 'text-green-500 hover:bg-green-50'
                                                : 'text-gray-300 hover:bg-gray-100'
                                                }`}
                                            title={member.is_active ? 'Активен' : 'Неактивен'}
                                        >
                                            {member.is_active ? (
                                                <Eye className="w-4 h-4" />
                                            ) : (
                                                <EyeOff className="w-4 h-4" />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => openForm(member)}
                                            className="p-2 text-gray-400 hover:text-navy-700 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => deleteStaff(member.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
        </div>
    )
}
