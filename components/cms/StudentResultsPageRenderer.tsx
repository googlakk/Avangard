'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import type { PublicCmsPage, PublicCmsSection } from '@/lib/services/cms-public'

type Localized = string | { ru?: string; en?: string } | null | undefined

type ResultCard = {
    studentName: Localized
    achievementTitle: Localized
    resultText: Localized
    description?: Localized
    category?: Localized
    year?: number | string
    imageUrl?: string
    imageAlt?: Localized
    isFeatured?: boolean
    isEnabled?: boolean
    profileUrl?: string
}

function localized(value: Localized, language: 'ru' | 'en') {
    if (!value) return ''
    if (typeof value === 'string') return value
    return language === 'en'
        ? (value.en || '')
        : (value.ru || value.en || '')
}

function asRecord(value: unknown) {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
        ? (value as Record<string, unknown>)
        : {}
}

function asCards(value: unknown) {
    if (!Array.isArray(value)) return []
    return value.filter(item => typeof item === 'object' && item !== null) as ResultCard[]
}

function sectionByKey(sections: PublicCmsSection[]) {
    const map = new Map<string, PublicCmsSection>()
    sections.forEach(section => map.set(section.key, section))
    return map
}

// Stagger variants for regular cards
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }
}

export default function StudentResultsPageRenderer({
    page,
    sections,
}: {
    page: PublicCmsPage
    sections: PublicCmsSection[]
}) {
    const { language } = useLanguage()
    const map = useMemo(() => sectionByKey(sections), [sections])

    const heroPayload = asRecord(map.get('results-hero')?.payload)
    const gridPayload = asRecord(map.get('results-grid')?.payload)
    const ctaPayload = asRecord(map.get('results-cta')?.payload)

    const pageTitle = language === 'en' ? page.title_en : page.title_ru
    const heroEyebrow = localized(heroPayload.eyebrow as Localized, language)
    const heroTitle = localized(heroPayload.title as Localized, language) || pageTitle
    const heroSubtitle = localized(heroPayload.subtitle as Localized, language)
    const heroBackgroundImage = typeof heroPayload.backgroundImageUrl === 'string'
        ? heroPayload.backgroundImageUrl.replace('senior-medalists.png', 'senior-medalists.jpg').replace('middle-entrance-group.png', 'middle-entrance-group.jpg')
        : ''
    const heroKpis = asCards(heroPayload.kpis)

    const cardsTitle = localized(gridPayload.title as Localized, language)
    const cardsDescription = localized(gridPayload.description as Localized, language)
    const cards = asCards(gridPayload.items).filter(item => item.isEnabled !== false)
    const emptyTitle = localized(gridPayload.emptyTitle as Localized, language) || (language === 'en' ? 'Results coming soon' : 'Результаты скоро появятся')
    const emptyDescription = localized(gridPayload.emptyDescription as Localized, language) || (language === 'en' ? 'Our team is preparing the first achievement cards.' : 'Команда готовит первую подборку достижений.')

    const categories = useMemo(() => {
        const values = cards
            .map(item => localized(item.category, language).trim())
            .filter(Boolean)
        return Array.from(new Set(values))
    }, [cards, language])

    const [selectedCategory, setSelectedCategory] = useState('all')

    const visibleCards = useMemo(() => {
        if (selectedCategory === 'all') return cards
        return cards.filter(item => localized(item.category, language) === selectedCategory)
    }, [cards, language, selectedCategory])

    const ctaTitle = localized(ctaPayload.title as Localized, language)
    const ctaDescription = localized(ctaPayload.description as Localized, language)
    const ctaButton = asRecord(ctaPayload.button)
    const ctaLabel = localized(ctaButton.label as Localized, language)
    const ctaHref = typeof ctaButton.href === 'string' ? ctaButton.href : '/contacts'
    
    // Cards rendering
    const featuredCards = visibleCards.filter(card => card.isFeatured === true)
    const regularCards = visibleCards.filter(card => card.isFeatured !== true)
    const kpiDurationSeconds = Math.max(14, heroKpis.length * 4)

    return (
        <main className="relative overflow-hidden bg-[#020813] min-h-screen text-slate-300 font-sans">
            {/* Cinematic Background Glob */}
            <div className="pointer-events-none fixed inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] h-[70vh] w-[70vw] rounded-full bg-blue-900/10 blur-[130px]" />
                <div className="absolute bottom-[-20%] right-[-10%] h-[60vh] w-[60vw] rounded-full bg-amber-900/10 blur-[130px]" />
            </div>

            <section className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-white/5">
                {heroBackgroundImage && (
                    <motion.div 
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.3 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="absolute inset-0 z-0 origin-center"
                    >
                        <Image
                            src={heroBackgroundImage}
                            alt={heroTitle || 'Students results'}
                            fill
                            priority
                            className="object-cover"
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020813]/40 via-[#020813]/80 to-[#020813]" />
                    </motion.div>
                )}
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
                        {heroEyebrow && (
                            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 backdrop-blur-md mb-6">
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                                <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-amber-200 font-semibold">{heroEyebrow}</p>
                            </div>
                        )}
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-2 text-5xl md:text-7xl lg:text-8xl font-cormorant leading-[1.1] max-w-5xl mx-auto text-white text-balance"
                    >
                        {heroTitle}
                    </motion.h1>
                    
                    {heroSubtitle && (
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mt-6 md:mt-8 text-lg md:text-2xl text-blue-100/70 max-w-3xl mx-auto font-light leading-relaxed text-balance"
                        >
                            {heroSubtitle}
                        </motion.p>
                    )}
                </div>

                {heroKpis.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 1, delay: 0.5 }}
                        className="relative z-10 mt-20"
                    >
                        <div className="overflow-hidden" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)', maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)' }}>
                            <motion.div 
                                className="flex gap-6 px-4 w-max"
                                animate={{ x: ["0%", "calc(-50% - 0.75rem)"] }}
                                transition={{ repeat: Infinity, ease: "linear", duration: kpiDurationSeconds }}
                            >
                                {heroKpis.map((kpi, index) => (
                                    <div key={`kpi-a-${index}`} className="shrink-0 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl px-8 py-6 max-w-sm">
                                        <p className="text-4xl font-cormorant text-amber-400">
                                            {localized(kpi.resultText, language) || localized(kpi.achievementTitle, language)}
                                        </p>
                                        <p className="text-sm font-medium tracking-wide text-white/60 mt-3 uppercase">
                                            {localized(kpi.studentName, language) || localized(kpi.category, language)}
                                        </p>
                                    </div>
                                ))}
                                {heroKpis.map((kpi, index) => (
                                    <div key={`kpi-b-${index}`} aria-hidden="true" className="shrink-0 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl px-8 py-6 max-w-sm">
                                        <p className="text-4xl font-cormorant text-amber-400">
                                            {localized(kpi.resultText, language) || localized(kpi.achievementTitle, language)}
                                        </p>
                                        <p className="text-sm font-medium tracking-wide text-white/60 mt-3 uppercase">
                                            {localized(kpi.studentName, language) || localized(kpi.category, language)}
                                        </p>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </section>

            <section className="relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-32">
                
                {/* Header & Filters */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
                >
                    <div className="max-w-2xl">
                        {cardsTitle && <h2 className="text-4xl md:text-5xl font-cormorant text-white leading-tight">{cardsTitle}</h2>}
                        {cardsDescription && <p className="text-slate-400 mt-4 text-lg font-light leading-relaxed text-balance">{cardsDescription}</p>}
                    </div>

                    {categories.length > 0 && (
                        <div className="flex gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shrink-0 overflow-x-auto max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className="relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50"
                            >
                                {selectedCategory === 'all' && (
                                    <motion.div
                                        layoutId="activeFilterBg"
                                        className="absolute inset-0 bg-[#0a1526] rounded-full shadow-[0_0_15px_rgba(245,158,11,0.15)] border border-amber-500/20"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <span className={`relative z-10 ${selectedCategory === 'all' ? 'text-amber-400' : 'text-slate-300 hover:text-white'}`}>
                                    {language === 'en' ? 'All' : 'Все'}
                                </span>
                            </button>
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className="relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50"
                                >
                                    {selectedCategory === category && (
                                        <motion.div
                                            layoutId="activeFilterBg"
                                            className="absolute inset-0 bg-[#0a1526] rounded-full shadow-[0_0_15px_rgba(245,158,11,0.15)] border border-amber-500/20"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className={`relative z-10 ${selectedCategory === category ? 'text-amber-400' : 'text-slate-300 hover:text-white'}`}>
                                        {category}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </motion.div>

                {visibleCards.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="rounded-3xl border border-white/5 bg-white/5 p-16 text-center backdrop-blur-sm"
                    >
                        <h3 className="text-2xl font-cormorant text-white">{emptyTitle}</h3>
                        <p className="text-slate-400 mt-4">{emptyDescription}</p>
                    </motion.div>
                )}

                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Featured Cards - "Гордость школы" */}
                        {featuredCards.length > 0 && (
                            <div className="mb-16 md:mb-24">
                                <p className="text-sm uppercase tracking-[0.2em] text-amber-500/80 font-medium mb-8">
                                    {language === 'en' ? 'Hall of Distinction' : 'Зал особых достижений'}
                                </p>
                                <div className="space-y-8">
                                    {featuredCards.map((card, index) => {
                                        const name = localized(card.studentName, language)
                                        const title = localized(card.achievementTitle, language)
                                        const result = localized(card.resultText, language)
                                        const description = localized(card.description, language)
                                        let imageUrl = card.imageUrl || ''
                                        imageUrl = imageUrl.replace('senior-medalists.png', 'senior-medalists.jpg').replace('middle-entrance-group.png', 'middle-entrance-group.jpg')
                                        const imageAlt = localized(card.imageAlt, language) || name || title || 'Student result'
                                        const category = localized(card.category, language)
                                        const year = card.year ? String(card.year) : ''

                                        const featuredBody = (
                                            <motion.article 
                                                initial={{ opacity: 0, y: 40 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, margin: "-100px" }}
                                                transition={{ duration: 0.7, delay: index * 0.1 }}
                                                className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#061124]"
                                            >
                                                <div className="flex flex-col lg:flex-row min-h-[420px] lg:min-h-[480px]">
                                                    {/* Left: Student Photo — never covered by text */}
                                                    {imageUrl && (
                                                        <div className="relative lg:w-[45%] min-h-[320px] lg:min-h-full overflow-hidden shrink-0">
                                                            <motion.div
                                                                className="absolute inset-0"
                                                                whileHover={{ scale: 1.05 }}
                                                                transition={{ duration: 0.8, ease: "easeOut" }}
                                                            >
                                                                <Image
                                                                    src={imageUrl}
                                                                    alt={imageAlt}
                                                                    fill
                                                                    className="object-cover object-top group-hover:opacity-100 opacity-85 transition-all duration-700"
                                                                    sizes="(max-width: 1024px) 100vw, 45vw"
                                                                />
                                                            </motion.div>
                                                            {/* Subtle gradient at bottom for mobile, at right edge for desktop */}
                                                            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#061124] via-transparent to-transparent pointer-events-none" />
                                                            {/* Name overlay on photo */}
                                                            {name && (
                                                                <div className="absolute bottom-0 left-0 right-0 lg:hidden p-6 pt-16 bg-gradient-to-t from-[#061124] via-[#061124]/80 to-transparent">
                                                                    <p className="text-xl font-cormorant text-white font-medium">{name}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Right: Achievement Content */}
                                                    <div className="flex-1 p-8 lg:p-10 xl:p-12 flex flex-col justify-center relative">
                                                        {/* Glow effect on hover */}
                                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-r-[2rem] shadow-[inset_0_0_120px_rgba(245,158,11,0.08)]" />
                                                        
                                                        <div className="relative z-10">
                                                            <div className="flex flex-wrap gap-2.5 mb-5">
                                                                <span className="inline-flex items-center rounded-full border border-amber-500/50 bg-amber-500/10 px-3 py-1 text-[11px] uppercase tracking-widest text-amber-300 font-medium">
                                                                    {language === 'en' ? 'Featured' : 'Гордость школы'}
                                                                </span>
                                                                {year && <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/70">{year}</span>}
                                                                {category && <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/70">{category}</span>}
                                                            </div>
                                                            
                                                            {name && <p className="hidden lg:block mb-2 text-base font-medium tracking-wide text-white/50">{name}</p>}
                                                            <h3 className="mb-4 text-2xl lg:text-3xl xl:text-4xl font-cormorant text-white leading-tight group-hover:text-amber-50 transition-colors duration-500">{title}</h3>
                                                            
                                                            {result && (
                                                                <div className="mb-5 text-lg lg:text-xl text-amber-400 font-light leading-relaxed whitespace-pre-line line-clamp-4 group-hover:line-clamp-none transition-all duration-500">
                                                                    {result}
                                                                </div>
                                                            )}
                                                            
                                                            {description && (
                                                                <p className="text-sm text-white/50 leading-relaxed font-light line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                                                                    {description}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.article>
                                        )

                                        if (card.profileUrl) return <Link key={`featured-${index}`} href={card.profileUrl} className="block">{featuredBody}</Link>
                                        return <div key={`featured-${index}`}>{featuredBody}</div>
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Regular Grid */}
                        {regularCards.length > 0 && (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                            >
                                {regularCards.map((card, index) => {
                                    const name = localized(card.studentName, language)
                                    const title = localized(card.achievementTitle, language)
                                    const result = localized(card.resultText, language)
                                    const description = localized(card.description, language)
                                    let imageUrl = card.imageUrl || ''
                                    imageUrl = imageUrl.replace('senior-medalists.png', 'senior-medalists.jpg').replace('middle-entrance-group.png', 'middle-entrance-group.jpg')
                                    const imageAlt = localized(card.imageAlt, language) || name || title || 'Student result'
                                    const category = localized(card.category, language)
                                    const year = card.year ? String(card.year) : ''

                                    const cardBody = (
                                        <motion.article 
                                            variants={itemVariants}
                                            whileHover={{ y: -8 }}
                                            className="group rounded-3xl overflow-hidden border border-white/5 bg-[#0a1526]/40 backdrop-blur-md h-full flex flex-col transition-all duration-500 hover:border-white/20 hover:bg-[#0c1930]/80 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                                        >
                                            {imageUrl && (
                                                <div className="relative h-[280px] overflow-hidden bg-[#061124]">
                                                    <Image
                                                        src={imageUrl}
                                                        alt={imageAlt}
                                                        fill
                                                        className="object-cover object-top opacity-70 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                                                        sizes="(max-width: 1024px) 50vw, 33vw"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1526] via-transparent to-transparent opacity-90" />
                                                    <div className="absolute top-0 inset-x-0 h-1/3 bg-gradient-to-b from-[#0a1526]/50 to-transparent opacity-80" />
                                                    
                                                    <div className="absolute top-5 left-5 right-5 flex justify-between items-start">
                                                        <div className="flex gap-2 flex-wrap">
                                                            {category && <span className="px-3 py-1.5 text-[11px] uppercase tracking-wider bg-amber-500/90 text-[#020813] rounded-full font-bold backdrop-blur-md shadow-sm">{category}</span>}
                                                            {year && <span className="px-3 py-1.5 text-[11px] border border-white/20 bg-black/40 backdrop-blur-md rounded-full text-white font-medium">{year}</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="p-6 lg:p-8 flex-1 flex flex-col pt-6 relative z-10">
                                                {name && <p className="text-xs uppercase tracking-[0.18em] text-white/40 font-semibold mb-3">{name}</p>}
                                                <h3 className="text-xl font-cormorant text-white mb-3 leading-tight font-medium group-hover:text-amber-50 transition-colors line-clamp-2">{title}</h3>
                                                {result && <p className="text-base text-amber-500 font-medium mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-500">{result}</p>}
                                                {description && <p className="text-sm text-slate-400 leading-relaxed mt-auto font-light line-clamp-2">{description}</p>}
                                            </div>
                                        </motion.article>
                                    )

                                    if (card.profileUrl) return <Link key={`regular-${index}`} href={card.profileUrl} className="block h-full">{cardBody}</Link>
                                    return <div key={`regular-${index}`} className="h-full">{cardBody}</div>
                                })}
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </section>

            {(ctaTitle || ctaDescription || ctaLabel) && (
                <section className="relative z-10 max-w-7xl mx-auto px-4 pb-20 md:pb-32">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative overflow-hidden rounded-[2.5rem] border border-amber-500/20 bg-gradient-to-br from-[#0a1a36] via-[#0d2247] to-[#0a1a36] px-6 py-16 md:px-12 md:py-24 text-center shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
                    >
                        <div className="pointer-events-none absolute inset-0 bg-[#020813] mix-blend-overlay opacity-50" />
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.15),transparent_60%)]" />
                        <div className="relative z-10">
                            {ctaTitle && <h2 className="text-4xl md:text-6xl font-cormorant text-white leading-tight">{ctaTitle}</h2>}
                            {ctaDescription && <p className="mt-6 text-lg md:text-xl text-blue-100/70 max-w-2xl mx-auto font-light leading-relaxed text-balance">{ctaDescription}</p>}
                            
                            {ctaLabel && (
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="inline-block mt-10">
                                    <Link
                                        href={ctaHref}
                                        className="inline-flex px-8 py-4 rounded-full bg-amber-500 text-[#020813] font-semibold text-lg tracking-wide shadow-[0_0_40px_rgba(245,158,11,0.2)] hover:shadow-[0_0_60px_rgba(245,158,11,0.4)] transition-shadow"
                                    >
                                        {ctaLabel}
                                    </Link>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </section>
            )}
        </main>
    )
}
