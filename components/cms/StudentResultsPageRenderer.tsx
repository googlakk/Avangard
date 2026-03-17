'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
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
        ? heroPayload.backgroundImageUrl
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
    const featuredCards = visibleCards.filter(card => card.isFeatured === true)
    const regularCards = visibleCards.filter(card => card.isFeatured !== true)
    const kpiDurationSeconds = Math.max(14, heroKpis.length * 4)

    return (
        <main className="relative overflow-hidden bg-[#f6f8fc]">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-200/30 blur-3xl" />
                <div className="absolute top-[28rem] -left-20 h-72 w-72 rounded-full bg-amber-100/50 blur-3xl" />
                <div className="absolute bottom-20 -right-16 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />
            </div>

            <section className="relative overflow-hidden border-b border-white/20 bg-[#08162b]">
                {heroBackgroundImage && (
                    <Image
                        src={heroBackgroundImage}
                        alt={heroTitle || 'Students results'}
                        fill
                        priority
                        className="object-cover scale-105"
                        sizes="100vw"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-[#050d1d]/90 via-[#081a34]/80 to-[#0f2a56]/70" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.28),transparent_35%)]" />
                <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 text-white">
                    {heroEyebrow && (
                        <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/40 bg-amber-300/10 px-4 py-1.5">
                            <span className="h-2 w-2 rounded-full bg-amber-300" />
                            <p className="text-xs md:text-sm uppercase tracking-[0.18em] text-amber-200 font-semibold">{heroEyebrow}</p>
                        </div>
                    )}
                    <h1 className="mt-5 text-4xl md:text-6xl font-display leading-tight max-w-4xl text-balance">
                        {heroTitle}
                    </h1>
                    {heroSubtitle && (
                        <p className="mt-5 text-base md:text-xl text-blue-50/90 max-w-3xl leading-relaxed">
                            {heroSubtitle}
                        </p>
                    )}
                    {heroKpis.length > 0 && (
                        <>
                            <div className="mt-10 md:hidden">
                                <div className="results-kpi-marquee-mask">
                                    <div
                                        className="results-kpi-marquee-track"
                                        style={{ ['--kpi-duration' as string]: `${kpiDurationSeconds}s` }}
                                    >
                                        {heroKpis.map((kpi, index) => (
                                            <div
                                                key={`kpi-mobile-a-${index}`}
                                                className="results-kpi-card rounded-2xl border border-white/25 bg-white/12 backdrop-blur-xl px-4 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                                            >
                                                <p className="text-3xl font-semibold text-amber-200">
                                                    {localized(kpi.resultText, language) || localized(kpi.achievementTitle, language)}
                                                </p>
                                                <p className="text-sm text-blue-100/90 mt-1">
                                                    {localized(kpi.studentName, language) || localized(kpi.category, language)}
                                                </p>
                                            </div>
                                        ))}
                                        {heroKpis.map((kpi, index) => (
                                            <div
                                                key={`kpi-mobile-b-${index}`}
                                                aria-hidden="true"
                                                className="results-kpi-card rounded-2xl border border-white/25 bg-white/12 backdrop-blur-xl px-4 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                                            >
                                                <p className="text-3xl font-semibold text-amber-200">
                                                    {localized(kpi.resultText, language) || localized(kpi.achievementTitle, language)}
                                                </p>
                                                <p className="text-sm text-blue-100/90 mt-1">
                                                    {localized(kpi.studentName, language) || localized(kpi.category, language)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:grid mt-10 grid-cols-4 gap-3 max-w-5xl">
                                {heroKpis.map((kpi, index) => (
                                    <div
                                        key={`kpi-desktop-${index}`}
                                        className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl px-4 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                                    >
                                        <p className="text-2xl md:text-3xl font-semibold text-amber-200">
                                            {localized(kpi.resultText, language) || localized(kpi.achievementTitle, language)}
                                        </p>
                                        <p className="text-xs md:text-sm text-blue-100/90 mt-1">
                                            {localized(kpi.studentName, language) || localized(kpi.category, language)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            <section className="relative z-10 max-w-7xl mx-auto px-4 py-10 md:py-12">
                <div className="rounded-3xl border border-white/70 bg-white/85 backdrop-blur-sm shadow-[0_18px_45px_rgba(15,23,42,0.1)] p-5 md:p-7">
                    <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                        <div>
                            {cardsTitle && <h2 className="text-2xl md:text-4xl font-cormorant text-navy-950">{cardsTitle}</h2>}
                            {cardsDescription && <p className="text-slate-600 mt-2 max-w-3xl">{cardsDescription}</p>}
                        </div>
                        {categories.length > 0 && (
                            <div className="flex gap-2 overflow-x-auto pb-1 max-w-full">
                                <button
                                    onClick={() => setSelectedCategory('all')}
                                    className={`shrink-0 px-3 py-1.5 rounded-full text-sm border transition-colors ${
                                        selectedCategory === 'all'
                                            ? 'bg-navy-900 border-navy-900 text-white'
                                            : 'bg-white border-slate-300 text-slate-700 hover:border-navy-300'
                                    }`}
                                >
                                    {language === 'en' ? 'All' : 'Все'}
                                </button>
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`shrink-0 px-3 py-1.5 rounded-full text-sm border transition-colors ${
                                            selectedCategory === category
                                                ? 'bg-navy-900 border-navy-900 text-white'
                                                : 'bg-white border-slate-300 text-slate-700 hover:border-navy-300'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {visibleCards.length === 0 && (
                        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                            <h3 className="text-xl font-semibold text-navy-900">{emptyTitle}</h3>
                            <p className="text-slate-600 mt-2">{emptyDescription}</p>
                        </div>
                    )}

                    {featuredCards.length > 0 && (
                        <div className="space-y-4 mb-7">
                            <p className="text-xs uppercase tracking-[0.18em] text-amber-700 font-semibold">
                                {language === 'en' ? 'Hall of Distinction' : 'Зал особых достижений'}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {featuredCards.map((card, index) => {
                                    const name = localized(card.studentName, language)
                                    const title = localized(card.achievementTitle, language)
                                    const result = localized(card.resultText, language)
                                    const description = localized(card.description, language)
                                    const imageUrl = card.imageUrl || ''
                                    const imageAlt = localized(card.imageAlt, language) || name || title || 'Student result'
                                    const category = localized(card.category, language)
                                    const year = card.year ? String(card.year) : ''

                                    const featuredBody = (
                                        <article className="group relative overflow-hidden rounded-3xl border border-amber-100/70 bg-gradient-to-br from-[#0a1f40] via-[#10284e] to-[#173868] text-white h-full shadow-[0_20px_50px_rgba(9,20,42,0.35)]">
                                            {imageUrl && (
                                                <div className="absolute inset-0">
                                                    <Image
                                                        src={imageUrl}
                                                        alt={imageAlt}
                                                        fill
                                                        className="object-cover opacity-35 group-hover:opacity-45 transition-opacity"
                                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                                    />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(8,20,40,0.92),rgba(17,44,84,0.72))]" />
                                            <div className="relative p-5 md:p-7 flex flex-col min-h-[300px] md:min-h-[320px]">
                                                <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/40 bg-amber-300/10 px-3 py-1 w-fit">
                                                    <span className="text-xs uppercase tracking-[0.18em] text-amber-100 font-semibold">
                                                        {language === 'en' ? 'Featured' : 'Гордость школы'}
                                                    </span>
                                                </div>
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {year && <span className="text-xs bg-white/90 text-navy-900 px-2.5 py-1 rounded-full font-semibold">{year}</span>}
                                                    {category && <span className="text-xs bg-amber-300 text-navy-900 px-2.5 py-1 rounded-full font-semibold">{category}</span>}
                                                </div>
                                                {name && <p className="mt-5 text-sm text-blue-100/90 font-medium">{name}</p>}
                                                <h3 className="mt-1 text-2xl md:text-3xl font-semibold text-white text-balance leading-tight">{title}</h3>
                                                {result && <p className="mt-4 text-lg md:text-xl text-amber-200 font-semibold">{result}</p>}
                                                {description && <p className="mt-3 text-sm md:text-base text-blue-100/90 leading-relaxed max-w-xl">{description}</p>}
                                            </div>
                                        </article>
                                    )

                                    if (card.profileUrl) {
                                        return (
                                            <Link key={`featured-result-card-${index}`} href={card.profileUrl} className="block">
                                                {featuredBody}
                                            </Link>
                                        )
                                    }
                                    return <div key={`featured-result-card-${index}`}>{featuredBody}</div>
                                })}
                            </div>
                        </div>
                    )}

                    {regularCards.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {regularCards.map((card, index) => {
                                const name = localized(card.studentName, language)
                                const title = localized(card.achievementTitle, language)
                                const result = localized(card.resultText, language)
                                const description = localized(card.description, language)
                                const imageUrl = card.imageUrl || ''
                                const imageAlt = localized(card.imageAlt, language) || name || title || 'Student result'
                                const category = localized(card.category, language)
                                const year = card.year ? String(card.year) : ''

                                const cardBody = (
                                    <article className="group rounded-2xl overflow-hidden border border-slate-200/80 bg-white h-full transition-all hover:-translate-y-1 hover:shadow-xl">
                                        {imageUrl && (
                                            <div className="relative h-64 md:h-56">
                                                <Image
                                                    src={imageUrl}
                                                    alt={imageAlt}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 1024px) 50vw, 33vw"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                                                <div className="absolute left-4 bottom-4 flex gap-2">
                                                    {year && <span className="text-xs bg-white/95 text-navy-900 px-2.5 py-1 rounded-full font-medium">{year}</span>}
                                                    {category && <span className="text-xs bg-amber-300/95 text-navy-900 px-2.5 py-1 rounded-full font-medium">{category}</span>}
                                                </div>
                                            </div>
                                        )}
                                        <div className="p-5 md:p-5">
                                            {name && <p className="text-sm text-navy-700 font-semibold">{name}</p>}
                                            <h3 className="mt-1 text-xl md:text-xl font-semibold text-navy-950 text-balance leading-tight">{title}</h3>
                                            {result && <p className="mt-3 text-base text-amber-700 font-semibold">{result}</p>}
                                            {description && <p className="mt-3 text-sm md:text-sm text-slate-600 leading-relaxed">{description}</p>}
                                        </div>
                                    </article>
                                )

                                if (card.profileUrl) {
                                    return (
                                        <Link key={`result-card-${index}`} href={card.profileUrl} className="block">
                                            {cardBody}
                                        </Link>
                                    )
                                }

                                return <div key={`result-card-${index}`}>{cardBody}</div>
                            })}
                        </div>
                    )}
                </div>
            </section>

            {(ctaTitle || ctaDescription || ctaLabel) && (
                <section className="relative z-10 max-w-7xl mx-auto px-4 pb-14 md:pb-20">
                    <div className="relative overflow-hidden rounded-3xl border border-amber-200/40 bg-gradient-to-r from-[#0a1f3e] via-[#0f2d57] to-[#0b1f3c] text-white px-6 py-12 md:px-10 md:py-16 text-center shadow-[0_20px_55px_rgba(10,25,50,0.35)]">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.25),transparent_40%)]" />
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04),transparent_35%,rgba(255,255,255,0.02))]" />
                        <div className="relative">
                            {ctaTitle && <h2 className="text-2xl md:text-5xl font-cormorant text-balance">{ctaTitle}</h2>}
                            {ctaDescription && <p className="mt-4 text-blue-100/90 max-w-3xl mx-auto leading-relaxed">{ctaDescription}</p>}
                        </div>
                        {ctaLabel && (
                            <Link
                                href={ctaHref}
                                className="relative inline-flex mt-8 px-7 py-3 rounded-full bg-white text-navy-900 font-semibold hover:bg-amber-50 transition-colors shadow-lg"
                            >
                                {ctaLabel}
                            </Link>
                        )}
                    </div>
                </section>
            )}
            <style jsx>{`
                .results-kpi-marquee-mask {
                    overflow: hidden;
                    mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
                }

                .results-kpi-marquee-track {
                    display: inline-flex;
                    width: max-content;
                    gap: 0.75rem;
                    animation: results-kpi-marquee var(--kpi-duration, 18s) linear infinite;
                    will-change: transform;
                }

                .results-kpi-card {
                    width: 78vw;
                    flex-shrink: 0;
                }

                @keyframes results-kpi-marquee {
                    from {
                        transform: translate3d(0, 0, 0);
                    }
                    to {
                        transform: translate3d(calc(-50% - 0.375rem), 0, 0);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .results-kpi-marquee-mask {
                        overflow-x: auto;
                        mask-image: none;
                        -webkit-mask-image: none;
                    }

                    .results-kpi-marquee-track {
                        animation: none;
                    }
                }
            `}</style>
        </main>
    )
}
