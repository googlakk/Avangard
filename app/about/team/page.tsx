'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
    ArrowLeft,
    Users,
    Crown,
    GraduationCap,
    Wrench,
    Loader2
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { departmentsService } from '@/lib/services/api'
import type { Tables } from '@/lib/database.types'
import StaffCard from '@/components/team/StaffCard'
import DepartmentSection from '@/components/team/DepartmentSection'

type Department = Tables<'departments'>
type StaffMember = Tables<'staff_members'>
type DepartmentWithStaff = Department & { staff_members: StaffMember[] }

const sectionIcons = {
    leadership: Crown,
    academic: GraduationCap,
    support: Wrench,
}

const sectionLabels = {
    ru: {
        leadership: 'Руководство',
        academic: 'Учебные кафедры',
        support: 'Техническо-обслуживающий персонал',
    },
    en: {
        leadership: 'Leadership',
        academic: 'Academic Departments',
        support: 'Support Staff',
    },
}

const pageText = {
    ru: {
        heroTitle: 'Наш коллектив',
        heroSubtitle: 'Команда профессионалов, преданных образованию и развитию каждого ученика',
        backToAbout: 'О школе',
        totalStaff: 'Сотрудников',
        departments: 'Кафедр',
        loading: 'Загрузка...',
        error: 'Ошибка загрузки данных',
        retry: 'Попробовать снова',
        noData: 'Данные о коллективе скоро появятся',
        leadershipIntro: 'Ключевые лица школы, отвечающие за стратегию, академическое качество и ежедневную организацию.',
        departmentsIntro: 'Кафедры и академические команды, формирующие учебную среду и сопровождающие развитие учеников.',
    },
    en: {
        heroTitle: 'Our Team',
        heroSubtitle: 'A team of professionals dedicated to the education and development of every student',
        backToAbout: 'About',
        totalStaff: 'Staff Members',
        departments: 'Departments',
        loading: 'Loading...',
        error: 'Error loading data',
        retry: 'Try again',
        noData: 'Team information coming soon',
        leadershipIntro: 'Key school leaders responsible for strategy, academic quality, and day-to-day coordination.',
        departmentsIntro: 'Departments and academic teams shaping the learning environment and supporting student growth.',
    },
}

export default function TeamPage() {
    const { language } = useLanguage()
    const lang = (language || 'ru') as 'ru' | 'en'
    const text = pageText[lang]

    const [departments, setDepartments] = useState<DepartmentWithStaff[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await departmentsService.getWithStaff()
            setDepartments((data || []) as DepartmentWithStaff[])
        } catch (err) {
            console.error('Failed to fetch team data:', err)
            setError(text.error)
        } finally {
            setLoading(false)
        }
    }, [text.error])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    // Group departments by type
    const leadership = departments.filter(d => d.type === 'leadership')
    const academic = departments.filter(d => d.type === 'academic')
    const support = departments.filter(d => d.type === 'support')

    const totalStaff = departments.reduce(
        (sum, d) => sum + (d.staff_members?.filter(m => m.is_active)?.length || 0),
        0
    )

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-blue-900 text-white overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
                </div>

                <div className="relative container mx-auto px-4 py-20 md:py-28">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            href="/about"
                            className="inline-flex items-center text-blue-200 hover:text-white mb-8 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            {text.backToAbout}
                        </Link>

                        <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
                            {text.heroTitle}
                        </h1>
                        <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
                            {text.heroSubtitle}
                        </p>

                        {/* Stats */}
                        <div className="flex gap-8 mt-10">
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-white">
                                    {loading ? '—' : totalStaff}
                                </div>
                                <div className="text-sm text-blue-200 mt-1">{text.totalStaff}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-white">
                                    {loading ? '—' : departments.length}
                                </div>
                                <div className="text-sm text-blue-200 mt-1">{text.departments}</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <div className="container mx-auto px-4 py-12 md:py-16">
                {/* Loading state */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                        <Loader2 className="w-8 h-8 animate-spin mb-4" />
                        <p>{text.loading}</p>
                    </div>
                )}

                {/* Error state */}
                {error && !loading && (
                    <div className="text-center py-24">
                        <p className="text-red-500 mb-4">{error}</p>
                        <button
                            onClick={fetchData}
                            className="px-6 py-2 bg-navy-900 text-white rounded-lg hover:bg-navy-800 transition-colors"
                        >
                            {text.retry}
                        </button>
                    </div>
                )}

                {/* Data loaded */}
                {!loading && !error && departments.length === 0 && (
                    <div className="text-center py-24 text-gray-400">
                        <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">{text.noData}</p>
                    </div>
                )}

                {!loading && !error && departments.length > 0 && (
                    <div className="space-y-16">
                        {/* Leadership Section */}
                        {leadership.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                                        <Crown className="w-5 h-5 text-amber-600" strokeWidth={1.5} />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold font-display text-gray-900">
                                        {sectionLabels[lang].leadership}
                                    </h2>
                                </div>

                                <p className="mb-8 max-w-3xl text-base leading-7 text-slate-600">
                                    {text.leadershipIntro}
                                </p>

                                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    {leadership.map(dept => (
                                        <div key={dept.id} className="contents">
                                            {dept.staff_members?.filter(m => m.is_active)
                                                .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
                                                .map(member => (
                                                    <StaffCard
                                                        key={member.id}
                                                        member={member}
                                                        language={lang}
                                                        variant="feature"
                                                    />
                                                ))}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Academic Departments */}
                        {academic.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                        <GraduationCap className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold font-display text-gray-900">
                                        {sectionLabels[lang].academic}
                                    </h2>
                                </div>

                                <p className="mb-8 max-w-3xl text-base leading-7 text-slate-600">
                                    {text.departmentsIntro}
                                </p>

                                <div className="space-y-6">
                                    {academic
                                        .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
                                        .map((dept, i) => (
                                            <DepartmentSection
                                                key={dept.id}
                                                department={dept}
                                                language={lang}
                                                defaultOpen={i === 0}
                                            />
                                        ))}
                                </div>
                            </section>
                        )}

                        {/* Support Staff */}
                        {support.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                                        <Wrench className="w-5 h-5 text-green-600" strokeWidth={1.5} />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold font-display text-gray-900">
                                        {sectionLabels[lang].support}
                                    </h2>
                                </div>

                                <div className="space-y-6">
                                    {support
                                        .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
                                        .map(dept => (
                                            <DepartmentSection
                                                key={dept.id}
                                                department={dept}
                                                language={lang}
                                            />
                                        ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
