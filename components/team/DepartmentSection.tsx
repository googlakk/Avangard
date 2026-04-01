'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Users, type LucideIcon } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import type { Tables } from '@/lib/database.types'
import StaffCard from './StaffCard'

type Department = Tables<'departments'>
type StaffMember = Tables<'staff_members'>

interface DepartmentSectionProps {
    department: Department & { staff_members: StaffMember[] }
    language: 'ru' | 'en'
    defaultOpen?: boolean
}

function resolveDepartmentIcon(iconName: string | null): LucideIcon {
    if (!iconName) return Users
    const icon = (LucideIcons as Record<string, unknown>)[iconName]
    return typeof icon === 'function' ? (icon as LucideIcon) : Users
}

export default function DepartmentSection({ department, language, defaultOpen = false }: DepartmentSectionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    const name = language === 'ru' ? department.name_ru : department.name_en
    const description = language === 'ru' ? department.description_ru : department.description_en
    const IconComponent = resolveDepartmentIcon(department.icon)
    const activeStaff = department.staff_members?.filter(m => m.is_active) || []

    return (
        <section className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_24px_60px_-42px_rgba(15,23,42,0.4)] transition-shadow hover:shadow-[0_28px_70px_-42px_rgba(15,23,42,0.45)]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center gap-4 px-5 py-5 text-left transition-colors hover:bg-slate-50/80 md:px-7 md:py-6"
            >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-slate-100">
                    <IconComponent className="h-5 w-5 text-navy-800" strokeWidth={1.5} />
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-4">
                        <h3 className="font-serif text-2xl font-semibold text-slate-900">
                            {name}
                        </h3>
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-900">
                            <Users className="h-3.5 w-3.5" />
                            {activeStaff.length} {language === 'ru' ? 'сотр.' : 'staff'}
                        </span>
                    </div>

                    <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                        {description || (language === 'ru'
                            ? 'Преподаватели и специалисты кафедры'
                            : 'Teachers and specialists of the department')}
                    </p>
                </div>

                <div className="flex flex-shrink-0 items-center gap-3">
                    <span className="hidden text-sm font-medium text-slate-400 md:inline">
                        {isOpen
                            ? (language === 'ru' ? 'Свернуть' : 'Collapse')
                            : (language === 'ru' ? 'Открыть' : 'Open')}
                    </span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-full border border-slate-200 p-2"
                    >
                        <ChevronDown className="h-4 w-4 text-slate-500" />
                    </motion.div>
                </div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden border-t border-slate-100"
                    >
                        <div className="px-5 pb-6 pt-5 md:px-7 md:pb-8">
                            {activeStaff.length > 0 ? (
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                    {activeStaff
                                        .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
                                        .map((member) => (
                                            <StaffCard
                                                key={member.id}
                                                member={member}
                                                language={language}
                                                variant="directory"
                                            />
                                        ))}
                                </div>
                            ) : (
                                <div className="rounded-[22px] border border-dashed border-slate-200 bg-slate-50/60 py-12 text-center text-slate-400">
                                    <Users className="mx-auto mb-3 h-10 w-10 opacity-50" />
                                    <p className="text-sm">
                                        {language === 'ru' ? 'Сотрудники скоро появятся' : 'Staff members coming soon'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
