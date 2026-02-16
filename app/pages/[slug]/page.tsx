import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}

async function getPublishedPageBySlug(slug: string) {
    const supabase = getSupabase()
    const { data } = await supabase
        .from('cms_pages')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle()

    return data
}

async function getPageSections(pageId: string) {
    const supabase = getSupabase()
    const { data } = await supabase
        .from('cms_sections')
        .select('*')
        .eq('page_id', pageId)
        .eq('is_enabled', true)
        .order('order_index', { ascending: true })

    return data || []
}

async function getSeoMeta(entityId: string) {
    const supabase = getSupabase()
    const { data } = await supabase
        .from('cms_seo_metadata')
        .select('*')
        .eq('entity_type', 'page')
        .eq('entity_id', entityId)
        .eq('locale', 'all')
        .maybeSingle()

    return data
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const page = await getPublishedPageBySlug(params.slug)
    if (!page) return {}

    const seo = await getSeoMeta(page.id)
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
    const page = await getPublishedPageBySlug(params.slug)
    if (!page) {
        notFound()
    }

    const sections = await getPageSections(page.id)

    return (
        <main className="max-w-5xl mx-auto px-4 py-12">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">{page.title_ru}</h1>
                <p className="text-gray-500 mt-2">{page.title_en}</p>
            </header>

            <div className="space-y-4">
                {sections.map(section => (
                    <section key={section.id} className="border border-gray-200 rounded-xl p-4 bg-white">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-gray-500 uppercase">{section.type}</span>
                            <span className="text-xs text-gray-400">{section.key}</span>
                        </div>
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap break-words">
                            {JSON.stringify(section.payload, null, 2)}
                        </pre>
                    </section>
                ))}
            </div>
        </main>
    )
}
