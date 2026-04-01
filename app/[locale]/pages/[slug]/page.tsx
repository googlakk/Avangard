import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CmsProgramPageRenderer from '@/components/cms/CmsProgramPageRenderer'
import { getCmsPageSections, getCmsPageSeoMeta, getPublishedCmsPageBySlug } from '@/lib/services/cms-public'
import type { PublicLocale } from '@/lib/i18n'
import { localizePathname } from '@/lib/i18n'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
    params,
}: {
    params: { locale: PublicLocale; slug: string }
}): Promise<Metadata> {
    const page = await getPublishedCmsPageBySlug(params.slug)
    if (!page) return {}

    const localizedTitle = params.locale === 'en' ? page.title_en : page.title_ru
    if (!localizedTitle || (params.locale === 'en' && !page.title_en?.trim())) {
        return {}
    }

    const seo = await getCmsPageSeoMeta(page.id)
    const description = seo?.seo_description || localizedTitle
    const canonical = localizePathname(`/pages/${page.slug}`, params.locale)
    const ogImage = seo?.og_image_url || '/og-image.jpg'

    return {
        title: seo?.seo_title || localizedTitle,
        description,
        alternates: {
            canonical,
            languages: {
                ru: localizePathname(`/pages/${page.slug}`, 'ru'),
                en: localizePathname(`/pages/${page.slug}`, 'en'),
            },
        },
        openGraph: {
            title: seo?.seo_title || localizedTitle,
            description,
            images: [{ url: ogImage }],
            type: 'website',
            locale: params.locale === 'en' ? 'en_US' : 'ru_RU',
        },
        robots: {
            index: seo?.robots_index ?? true,
            follow: seo?.robots_follow ?? true,
        },
    }
}

export default async function LocalizedCmsPage({
    params,
}: {
    params: { locale: PublicLocale; slug: string }
}) {
    const page = await getPublishedCmsPageBySlug(params.slug)
    if (!page || (params.locale === 'en' && !page.title_en?.trim())) {
        notFound()
    }

    const sections = await getCmsPageSections(page.id)
    return <CmsProgramPageRenderer page={page} sections={sections} />
}
