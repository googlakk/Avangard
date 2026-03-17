import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import StudentResultsPageRenderer from '@/components/cms/StudentResultsPageRenderer'
import { getCmsPageSections, getCmsPageSeoMeta, getPublishedCmsPageBySlug } from '@/lib/services/cms-public'

const STUDENT_RESULTS_SLUG = 'student-results'

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPublishedCmsPageBySlug(STUDENT_RESULTS_SLUG)
    if (!page) return {}

    const seo = await getCmsPageSeoMeta(page.id)
    const title = seo?.seo_title || page.title_ru
    const description = seo?.seo_description || page.title_en
    const canonical = seo?.canonical_url || '/students/results'
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

export default async function StudentResultsPage() {
    const page = await getPublishedCmsPageBySlug(STUDENT_RESULTS_SLUG)
    if (!page) {
        notFound()
    }

    const sections = await getCmsPageSections(page.id)
    return <StudentResultsPageRenderer page={page} sections={sections} />
}
