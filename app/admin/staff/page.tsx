'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    ArrowLeft,
    Plus,
    Edit2,
    Trash2,
    Users,
    Building2,
    Save,
    X,
    Loader2,
    ChevronRight,
    GripVertical,
} from 'lucide-react'
import { departmentsService, staffService } from '@/lib/services/api'
import type { Tables, TablesInsert, TablesUpdate } from '@/lib/database.types'

type Department = Tables<'departments'>
type StaffMember = Tables<'staff_members'>

// Department form type
interface DepartmentForm {
    name_ru: string
    name_en: string
    description_ru: string
    description_en: string
    type: 'leadership' | 'academic' | 'support'
    icon: string
}

const emptyDeptForm: DepartmentForm = {
    name_ru: '',
    name_en: '',
    description_ru: '',
    description_en: '',
    type: 'academic',
    icon: 'Users',
}

export default function AdminStaffPage() {
    const router = useRouter()

    // State
    const [departments, setDepartments] = useState<Department[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [saving, setSaving] = useState(false)

    // Department form
    const [showDeptForm, setShowDeptForm] = useState(false)
    const [editingDept, setEditingDept] = useState<Department | null>(null)
    const [deptForm, setDeptForm] = useState<DepartmentForm>(emptyDeptForm)

    // Fetch departments
    const fetchDepartments = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await departmentsService.getAll()
            setDepartments(
                (data || []).sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
            )
        } catch (err) {
            console.error('Failed to fetch departments:', err)
            setError('Ошибка загрузки кафедр')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchDepartments()
    }, [fetchDepartments])

    // Department CRUD
    const openDeptForm = (dept?: Department) => {
        if (dept) {
            setEditingDept(dept)
            setDeptForm({
                name_ru: dept.name_ru,
                name_en: dept.name_en,
                description_ru: dept.description_ru || '',
                description_en: dept.description_en || '',
                type: dept.type as DepartmentForm['type'],
                icon: dept.icon || 'Users',
            })
        } else {
            setEditingDept(null)
            setDeptForm(emptyDeptForm)
        }
        setShowDeptForm(true)
    }

    const saveDepartment = async () => {
        if (!deptForm.name_ru || !deptForm.name_en) return

        try {
            setSaving(true)
            if (editingDept) {
                await departmentsService.update(editingDept.id, deptForm as TablesUpdate<'departments'>)
            } else {
                await departmentsService.create({
                    ...deptForm,
                    order_index: departments.length,
                } as TablesInsert<'departments'>)
            }
            setShowDeptForm(false)
            setEditingDept(null)
            await fetchDepartments()
        } catch (err) {
            console.error('Failed to save department:', err)
            setError('Ошибка сохранения')
        } finally {
            setSaving(false)
        }
    }

    const deleteDepartment = async (id: string) => {
        if (!confirm('Удалить кафедру? Все сотрудники в ней будут удалены.')) return
        try {
            await departmentsService.delete(id)
            await fetchDepartments()
        } catch (err) {
            console.error('Failed to delete department:', err)
            setError('Ошибка удаления')
        }
    }

    const typeLabels: Record<string, string> = {
        leadership: '🏛 Руководство',
        academic: '📚 Учебная',
        support: '🔧 Обслуживающая',
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
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
                                    Управление персоналом
                                </h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    Кафедры и сотрудники школы
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => openDeptForm()}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Добавить кафедру
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

                {/* Department Form Modal */}
                {showDeptForm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold text-gray-900">
                                    {editingDept ? 'Редактировать кафедру' : 'Новая кафедра'}
                                </h2>
                                <button
                                    onClick={() => setShowDeptForm(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Название (РУ) *
                                        </label>
                                        <input
                                            type="text"
                                            value={deptForm.name_ru}
                                            onChange={e => setDeptForm({ ...deptForm, name_ru: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                            placeholder="Кафедра математики"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Name (EN) *
                                        </label>
                                        <input
                                            type="text"
                                            value={deptForm.name_en}
                                            onChange={e => setDeptForm({ ...deptForm, name_en: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                            placeholder="Mathematics Department"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Описание (РУ)
                                        </label>
                                        <textarea
                                            value={deptForm.description_ru}
                                            onChange={e => setDeptForm({ ...deptForm, description_ru: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                            rows={2}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description (EN)
                                        </label>
                                        <textarea
                                            value={deptForm.description_en}
                                            onChange={e => setDeptForm({ ...deptForm, description_en: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                            rows={2}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Тип
                                        </label>
                                        <select
                                            value={deptForm.type}
                                            onChange={e => setDeptForm({ ...deptForm, type: e.target.value as DepartmentForm['type'] })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                        >
                                            <option value="leadership">Руководство</option>
                                            <option value="academic">Учебная</option>
                                            <option value="support">Обслуживающая</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Иконка (Lucide)
                                        </label>
                                        <input
                                            type="text"
                                            value={deptForm.icon}
                                            onChange={e => setDeptForm({ ...deptForm, icon: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                            placeholder="Calculator"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setShowDeptForm(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Отмена
                                </button>
                                <button
                                    onClick={saveDepartment}
                                    disabled={saving || !deptForm.name_ru || !deptForm.name_en}
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

                {/* Loading */}
                {loading && (
                    <div className="flex items-center justify-center py-24 text-gray-400">
                        <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                )}

                {/* Departments list */}
                {!loading && departments.length === 0 && (
                    <div className="text-center py-24">
                        <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-gray-500 mb-4">Кафедры ещё не созданы</p>
                        <button
                            onClick={() => openDeptForm()}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800"
                        >
                            <Plus className="w-4 h-4" />
                            Создать первую кафедру
                        </button>
                    </div>
                )}

                {!loading && departments.length > 0 && (
                    <div className="space-y-3">
                        {departments.map(dept => (
                            <div
                                key={dept.id}
                                className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
                            >
                                <div className="flex items-center gap-4 p-4 md:p-5">
                                    <div className="text-gray-300 cursor-grab">
                                        <GripVertical className="w-5 h-5" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-gray-900 truncate">
                                                {dept.name_ru}
                                            </h3>
                                            <span className="flex-shrink-0 text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                                                {typeLabels[dept.type] || dept.type}
                                            </span>
                                            {!dept.is_active && (
                                                <span className="flex-shrink-0 text-xs px-2 py-0.5 bg-red-50 text-red-500 rounded-full">
                                                    Неактивна
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-400 truncate">
                                            {dept.name_en}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <button
                                            onClick={() => openDeptForm(dept)}
                                            className="p-2 text-gray-400 hover:text-navy-700 hover:bg-gray-100 rounded-lg transition-colors"
                                            title="Редактировать"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => deleteDepartment(dept.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Удалить"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <Link
                                            href={`/admin/staff/${dept.id}`}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-navy-700 hover:bg-navy-50 rounded-lg transition-colors"
                                        >
                                            <Users className="w-4 h-4" />
                                            Сотрудники
                                            <ChevronRight className="w-3.5 h-3.5" />
                                        </Link>
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
