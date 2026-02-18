'use client'

import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import type { PublicCmsPage, PublicCmsSection } from '@/lib/services/cms-public'

type LocalizedLike = string | { ru?: string; en?: string } | null | undefined

function localized(value: LocalizedLike, language: 'ru' | 'en') {
    if (!value) return ''
    if (typeof value === 'string') return value
    return value[language] || value.ru || value.en || ''
}

function toItems(value: unknown): Array<Record<string, unknown>> {
    if (!Array.isArray(value)) return []
    return value.filter(item => typeof item === 'object' && item !== null) as Array<Record<string, unknown>>
}

function ProgramHeroSection({ payload }: { payload: Record<string, unknown> }) {
    const { language } = useLanguage()
    const title = localized(payload.title as LocalizedLike, language)
    const subtitle = localized(payload.subtitle as LocalizedLike, language)
    const description = localized(payload.description as LocalizedLike, language)
    const imageUrl = typeof payload.imageUrl === 'string' ? payload.imageUrl : ''
    const button = (payload.button || {}) as Record<string, unknown>
    const buttonLabel = localized(button.label as LocalizedLike, language)
    const buttonHref = typeof button.href === 'string' ? button.href : '#'

    return (
        <section className="relative overflow-hidden rounded-3xl bg-navy-900 text-white">
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt={title || 'Program hero'}
                    fill
                    className="object-cover opacity-45"
                    sizes="100vw"
                    priority
                />
            )}
            <div className="relative z-10 px-6 py-16 md:px-10 md:py-24 bg-gradient-to-r from-navy-950/85 to-navy-900/50">
                <p className="text-sm md:text-base text-gray-200">{subtitle}</p>
                <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight max-w-4xl">{title}</h1>
                {description && <p className="mt-4 max-w-3xl text-gray-100 text-base md:text-lg">{description}</p>}
                {buttonLabel && (
                    <a
                        href={buttonHref}
                        className="inline-flex mt-8 px-6 py-3 rounded-full bg-white text-navy-900 font-semibold hover:bg-gray-100 transition-colors"
                    >
                        {buttonLabel}
                    </a>
                )}
            </div>
        </section>
    )
}

function ProgramContentSection({ payload }: { payload: Record<string, unknown> }) {
    const { language } = useLanguage()
    const title = localized(payload.title as LocalizedLike, language)
    const text = localized(payload.text as LocalizedLike, language)
    const imageUrl = typeof payload.imageUrl === 'string' ? payload.imageUrl : ''
    const imageAlt = localized(payload.imageAlt as LocalizedLike, language) || title

    return (
        <section className="bg-white rounded-3xl border border-gray-200 p-6 md:p-10">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-navy-900">{title}</h2>
                    <p className="mt-4 text-gray-700 whitespace-pre-line">{text}</p>
                </div>
                {imageUrl && (
                    <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
                        <Image src={imageUrl} alt={imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                )}
            </div>
        </section>
    )
}

function ProgramCardsSection({ payload }: { payload: Record<string, unknown> }) {
    const { language } = useLanguage()
    const title = localized(payload.title as LocalizedLike, language)
    const items = toItems(payload.items)

    return (
        <section className="bg-white rounded-3xl border border-gray-200 p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900">{title}</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
                {items.map((item, idx) => {
                    const cardTitle = localized(item.title as LocalizedLike, language)
                    const cardText = localized(item.description as LocalizedLike, language)
                    const badge = localized(item.badge as LocalizedLike, language)
                    const imageUrl = typeof item.imageUrl === 'string' ? item.imageUrl : ''
                    return (
                        <article key={`${cardTitle}-${idx}`} className="rounded-2xl border border-gray-200 overflow-hidden bg-gray-50">
                            {imageUrl && (
                                <div className="relative h-40">
                                    <Image src={imageUrl} alt={cardTitle || 'Card'} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                                </div>
                            )}
                            <div className="p-4">
                                {badge && <p className="text-xs font-semibold uppercase tracking-wide text-navy-700">{badge}</p>}
                                <h3 className="mt-2 text-lg font-semibold text-gray-900">{cardTitle}</h3>
                                {cardText && <p className="mt-2 text-sm text-gray-600">{cardText}</p>}
                            </div>
                        </article>
                    )
                })}
            </div>
        </section>
    )
}

function ProgramMediaSection({ payload }: { payload: Record<string, unknown> }) {
    const { language } = useLanguage()
    const title = localized(payload.title as LocalizedLike, language)
    const images = toItems(payload.images)

    return (
        <section className="bg-white rounded-3xl border border-gray-200 p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900">{title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
                {images.map((item, idx) => {
                    const imageUrl = typeof item.url === 'string' ? item.url : ''
                    const imageAlt = localized(item.alt as LocalizedLike, language) || `Media ${idx + 1}`
                    if (!imageUrl) return null
                    return (
                        <div key={`${imageUrl}-${idx}`} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                            <Image src={imageUrl} alt={imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 33vw" />
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

function ProgramCtaSection({ payload }: { payload: Record<string, unknown> }) {
    const { language } = useLanguage()
    const title = localized(payload.title as LocalizedLike, language)
    const description = localized(payload.description as LocalizedLike, language)
    const button = (payload.button || {}) as Record<string, unknown>
    const buttonLabel = localized(button.label as LocalizedLike, language)
    const buttonHref = typeof button.href === 'string' ? button.href : '#'

    return (
        <section className="rounded-3xl bg-navy-900 text-white px-6 py-10 md:px-10 md:py-14 text-center">
            <h2 className="text-2xl md:text-4xl font-bold">{title}</h2>
            {description && <p className="mt-3 text-gray-200 max-w-3xl mx-auto">{description}</p>}
            {buttonLabel && (
                <a
                    href={buttonHref}
                    className="inline-flex mt-6 px-6 py-3 rounded-full bg-white text-navy-900 font-semibold hover:bg-gray-100 transition-colors"
                >
                    {buttonLabel}
                </a>
            )}
        </section>
    )
}

function ProgramCustomSection({ payload }: { payload: Record<string, unknown> }) {
    const { language } = useLanguage()
    const title = localized(payload.title as LocalizedLike, language)
    const text = localized(payload.text as LocalizedLike, language)

    return (
        <section className="bg-white rounded-3xl border border-gray-200 p-6 md:p-10">
            {title && <h2 className="text-2xl font-bold text-navy-900">{title}</h2>}
            {text && <p className="mt-4 text-gray-700 whitespace-pre-line">{text}</p>}
        </section>
    )
}

function renderSection(section: PublicCmsSection) {
    const payload = (section.payload || {}) as Record<string, unknown>
    switch (section.type) {
    case 'hero':
        return <ProgramHeroSection payload={payload} />
    case 'content':
        return <ProgramContentSection payload={payload} />
    case 'cards':
        return <ProgramCardsSection payload={payload} />
    case 'media':
        return <ProgramMediaSection payload={payload} />
    case 'cta':
        return <ProgramCtaSection payload={payload} />
    default:
        return <ProgramCustomSection payload={payload} />
    }
}

export default function CmsProgramPageRenderer({
    page,
    sections,
}: {
    page: PublicCmsPage
    sections: PublicCmsSection[]
}) {
    const { language } = useLanguage()
    const title = language === 'en' ? page.title_en : page.title_ru
    return (
        <main className="bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-10">
                {!sections.some(section => section.type === 'hero') && (
                    <header className="mb-8">
                        <h1 className="text-3xl md:text-5xl font-bold text-navy-900">{title}</h1>
                    </header>
                )}
                <div className="space-y-6">
                    {sections.map(section => (
                        <div key={section.id}>{renderSection(section)}</div>
                    ))}
                </div>
            </div>
        </main>
    )
}
