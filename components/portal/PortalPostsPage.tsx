'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { portalPostsService } from '@/lib/services/api'
import type { Tables } from '@/lib/database.types'
import PortalPostCard from './PortalPostCard'

type PortalPost = Tables<'portal_posts'>

const categoryLabels: Record<string, { ru: string; en: string }> = {
    all: { ru: 'Все', en: 'All' },
    event: { ru: 'Мероприятия', en: 'Events' },
    course: { ru: 'Курсы', en: 'Courses' },
    seminar: { ru: 'Семинары', en: 'Seminars' },
    platform: { ru: 'Платформы', en: 'Platforms' },
    announcement: { ru: 'Анонсы', en: 'Announcements' },
    resource: { ru: 'Ресурсы', en: 'Resources' },
}

interface PortalPostsPageProps {
    portal: string
    heroTitle: string
    heroSubtitle: string
    heroImage?: string
}

export default function PortalPostsPage({
    portal,
    heroTitle,
    heroSubtitle,
    heroImage,
}: PortalPostsPageProps) {
    const { language } = useLanguage()
    const [posts, setPosts] = useState<PortalPost[]>([])
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState('all')

    const fetchPosts = useCallback(async () => {
        try {
            setLoading(true)
            const data = await portalPostsService.getByPortal(portal)
            setPosts(data || [])
        } catch (err) {
            console.error('Failed to fetch portal posts:', err)
        } finally {
            setLoading(false)
        }
    }, [portal])

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    const categories = useMemo(() => {
        const unique = new Set(posts.map(p => p.category))
        return ['all', ...Array.from(unique)]
    }, [posts])

    const filteredPosts = useMemo(() => {
        if (activeCategory === 'all') return posts
        return posts.filter(p => p.category === activeCategory)
    }, [posts, activeCategory])

    const emptyMessage = language === 'ru'
        ? 'Материалы скоро появятся. Следите за обновлениями!'
        : 'Content coming soon. Stay tuned!'

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative h-[45vh] min-h-[320px] flex items-center justify-center overflow-hidden">
                {heroImage ? (
                    <Image
                        src={heroImage}
                        alt={heroTitle}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950" />
                )}
                <div className="absolute inset-0 bg-navy-900/75" />

                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-[0.04]" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '32px 32px',
                }} />

                <div className="relative container mx-auto px-4 text-center text-white z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block mb-4">
                            <div className="h-1 w-12 bg-[#C6A96B] rounded-full mx-auto" />
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 tracking-tight">
                            {heroTitle}
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                            {heroSubtitle}
                        </p>
                    </motion.div>
                </div>

                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
            </section>

            {/* Category Filter */}
            {categories.length > 2 && (
                <section className="sticky top-[72px] z-20 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
                    <div className="container mx-auto px-4">
                        <div className="flex gap-1 py-3 overflow-x-auto scrollbar-hide">
                            {categories.map(cat => {
                                const label = categoryLabels[cat]?.[language] || cat
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${activeCategory === cat
                                                ? 'bg-navy-900 text-white shadow-sm'
                                                : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        {label}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Posts Grid */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4">
                    {loading && (
                        <div className="flex items-center justify-center py-24">
                            <div className="w-8 h-8 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}

                    {!loading && filteredPosts.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-24"
                        >
                            <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <p className="text-gray-500 text-lg">{emptyMessage}</p>
                        </motion.div>
                    )}

                    {!loading && filteredPosts.length > 0 && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {filteredPosts.map((post, idx) => (
                                <PortalPostCard key={post.id} post={post} index={idx} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-navy-900 text-white mt-8">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl md:text-3xl font-display mb-4">
                            {language === 'ru' ? 'Есть вопросы?' : 'Have questions?'}
                        </h2>
                        <p className="text-white/70 mb-8 max-w-xl mx-auto">
                            {language === 'ru'
                                ? 'Свяжитесь с нами для получения дополнительной информации'
                                : 'Contact us for more information'}
                        </p>
                        <a
                            href="/contacts"
                            className="inline-flex px-8 py-3 bg-[#C6A96B] text-navy-900 font-semibold rounded-full hover:bg-[#d4b87a] transition-colors"
                        >
                            {language === 'ru' ? 'Связаться' : 'Contact Us'}
                        </a>
                    </motion.div>
                </div>
            </section>
        </main>
    )
}
