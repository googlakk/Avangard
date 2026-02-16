'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

    // Dynamically resolve icon
    const IconComponent = resolveDepartmentIcon(department.icon)

    const activeStaff = department.staff_members?.filter(m => m.is_active) || []

    return (
        <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white hover:shadow-sm transition-shadow">
            {/* Header - Clickable */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center gap-4 p-5 md:p-6 text-left hover:bg-gray-50/50 transition-colors"
            >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-navy-900/5 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-navy-800" strokeWidth={1.5} />
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="font-bold font-display text-gray-900 text-lg md:text-xl truncate">
                        {name}
                    </h3>
                    {description && (
                        <p className="text-sm text-gray-500 truncate mt-0.5">
                            {description}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="hidden sm:inline-flex items-center gap-1.5 text-sm text-gray-400 font-medium">
                        <Users className="w-4 h-4" />
                        {activeStaff.length}
                    </span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                </div>
            </button>

            {/* Content - Staff grid */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 md:px-6 pb-6 pt-2">
                            {activeStaff.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {activeStaff
                                        .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
                                        .map((member) => (
                                            <StaffCard
                                                key={member.id}
                                                member={member}
                                                language={language}
                                                variant="compact"
                                            />
                                        ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-400">
                                    <Users className="w-10 h-10 mx-auto mb-3 opacity-50" />
                                    <p className="text-sm">
                                        {language === 'ru' ? 'Сотрудники скоро появятся' : 'Staff members coming soon'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
