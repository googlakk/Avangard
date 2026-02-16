import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { validateAndConsumePreviewLink } from '@/lib/services/preview-links'

export const dynamic = 'force-dynamic'

function getServiceClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) throw new Error('Missing Supabase service role configuration')
    return createClient(url, key)
}

export default async function PreviewNewsPage({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { token?: string }
}) {
    const token = searchParams.token
    if (!token) {
        notFound()
    }

    const supabase = getServiceClient()
    const { data: article } = await supabase
        .from('news')
        .select('*')
        .eq('slug', params.slug)
        .maybeSingle()

    if (!article) {
        notFound()
    }

    const isValid = await validateAndConsumePreviewLink({
        entityType: 'news',
        entityId: article.id,
        token,
    })

    if (!isValid) {
        notFound()
    }

    return (
        <main className="max-w-4xl mx-auto px-4 py-12">
            <article className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
                <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-amber-700 bg-amber-50 border border-amber-100 inline-flex px-2.5 py-1 rounded-full">
                    Preview Mode
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{article.title_ru}</h1>
                <p className="text-sm text-gray-500 mb-6">status: {article.is_published ? 'published' : 'draft'}</p>
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
