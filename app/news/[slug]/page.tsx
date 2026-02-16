import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}

async function getPublishedNewsBySlug(slug: string) {
    const supabase = getSupabase()
    const { data } = await supabase
        .from('news')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle()

    return data
}

async function getSeoMeta(entityId: string) {
    const supabase = getSupabase()
    const { data } = await supabase
        .from('cms_seo_metadata')
        .select('*')
        .eq('entity_type', 'news')
        .eq('entity_id', entityId)
        .eq('locale', 'all')
        .maybeSingle()

    return data
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const article = await getPublishedNewsBySlug(params.slug)
    if (!article) {
        return {}
    }

    const seo = await getSeoMeta(article.id)
    const title = seo?.seo_title || article.title_ru
    const description = seo?.seo_description || article.description_ru
    const canonical = seo?.canonical_url || `/news/${article.slug}`
    const ogImage = seo?.og_image_url || article.image_url || '/og-image.jpg'

    return {
        title,
        description,
        alternates: { canonical },
        openGraph: {
            title,
            description,
            images: [{ url: ogImage }],
            type: 'article',
        },
        robots: {
            index: seo?.robots_index ?? true,
            follow: seo?.robots_follow ?? true,
        },
    }
}

export default async function NewsArticlePage({ params }: { params: { slug: string } }) {
    const article = await getPublishedNewsBySlug(params.slug)
    if (!article) {
        notFound()
    }

    return (
        <main className="max-w-4xl mx-auto px-4 py-12">
            <article className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">{article.category}</p>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{article.title_ru}</h1>
                <p className="text-sm text-gray-500 mb-6">
                    {article.published_at ? new Date(article.published_at).toLocaleString() : 'Draft'}
                </p>
                {article.image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={article.image_url}
                        alt={article.title_ru}
                        className="w-full max-h-[420px] object-cover rounded-xl border border-gray-200 mb-6"
                    />
                )}
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{article.content_ru}</p>
            </article>
        </main>
    )
}
