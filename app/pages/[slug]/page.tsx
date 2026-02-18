import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CmsProgramPageRenderer from '@/components/cms/CmsProgramPageRenderer'
import { getCmsPageSections, getCmsPageSeoMeta, getPublishedCmsPageBySlug } from '@/lib/services/cms-public'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const page = await getPublishedCmsPageBySlug(params.slug)
    if (!page) return {}

    const seo = await getCmsPageSeoMeta(page.id)
    const title = seo?.seo_title || page.title_ru
    const description = seo?.seo_description || page.title_en
    const canonical = seo?.canonical_url || `/pages/${page.slug}`
    const ogImage = seo?.og_image_url || '/og-image.jpg'

    return {
        title,
        description,
        alternates: { canonical },
        openGraph: {
            title,
            description,
            images: [{ url: ogImage }],
            type: 'website',
        },
        robots: {
            index: seo?.robots_index ?? true,
            follow: seo?.robots_follow ?? true,
        },
    }
}

export default async function CmsPage({ params }: { params: { slug: string } }) {
    const page = await getPublishedCmsPageBySlug(params.slug)
    if (!page) {
        notFound()
    }

    const sections = await getCmsPageSections(page.id)
    return <CmsProgramPageRenderer page={page} sections={sections} />
}
