import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import type { PublicLocale } from '@/lib/i18n'
import { localizePathname } from '@/lib/i18n'

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

function getLocalizedArticleField(article: any, locale: PublicLocale, baseKey: string) {
    const value = article?.[`${baseKey}_${locale}`]
    if (typeof value === 'string' && value.trim()) {
        return value.trim()
    }
    return locale === 'ru' ? article?.[`${baseKey}_en`] || '' : ''
}

export async function generateMetadata({
    params,
}: {
    params: { locale: PublicLocale; slug: string }
}): Promise<Metadata> {
    const article = await getPublishedNewsBySlug(params.slug)
    if (!article) {
        return {}
    }

    const title = getLocalizedArticleField(article, params.locale, 'title')
    const description = getLocalizedArticleField(article, params.locale, 'description')
    if (!title || !description) {
        return {}
    }

    const seo = await getSeoMeta(article.id)
    const ogImage = seo?.og_image_url || article.image_url || '/og-image.jpg'
    const canonical = localizePathname(`/news/${article.slug}`, params.locale)

    return {
        title: seo?.seo_title || title,
        description: seo?.seo_description || description,
        alternates: {
            canonical,
            languages: {
                ru: localizePathname(`/news/${article.slug}`, 'ru'),
                en: localizePathname(`/news/${article.slug}`, 'en'),
            },
        },
        openGraph: {
            title: seo?.seo_title || title,
            description: seo?.seo_description || description,
            images: [{ url: ogImage }],
            type: 'article',
            locale: params.locale === 'en' ? 'en_US' : 'ru_RU',
        },
        robots: {
            index: seo?.robots_index ?? true,
            follow: seo?.robots_follow ?? true,
        },
    }
}

export default async function LocalizedNewsArticlePage({
    params,
}: {
    params: { locale: PublicLocale; slug: string }
}) {
    const article = await getPublishedNewsBySlug(params.slug)
    if (!article) {
        notFound()
    }

    const title = getLocalizedArticleField(article, params.locale, 'title')
    const content = getLocalizedArticleField(article, params.locale, 'content')
    const description = getLocalizedArticleField(article, params.locale, 'description')
    if (!title || !content || !description) {
        notFound()
    }

    return (
        <main className="max-w-4xl mx-auto px-4 py-12">
            <article className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">{article.category}</p>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>
                <p className="text-sm text-gray-500 mb-4">{description}</p>
                <p className="text-sm text-gray-500 mb-6">
                    {article.published_at ? new Date(article.published_at).toLocaleString(params.locale === 'en' ? 'en-US' : 'ru-RU') : 'Draft'}
                </p>
                {article.image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={article.image_url}
                        alt={title}
                        className="w-full max-h-[420px] object-cover rounded-xl border border-gray-200 mb-6"
                    />
                )}
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{content}</p>
            </article>
        </main>
    )
}
