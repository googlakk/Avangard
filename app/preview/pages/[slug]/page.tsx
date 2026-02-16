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

export default async function PreviewCmsPage({
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
    const { data: page } = await supabase
        .from('cms_pages')
        .select('*')
        .eq('slug', params.slug)
        .maybeSingle()

    if (!page) {
        notFound()
    }

    const isValid = await validateAndConsumePreviewLink({
        entityType: 'page',
        entityId: page.id,
        token,
    })

    if (!isValid) {
        notFound()
    }

    const { data: sections } = await supabase
        .from('cms_sections')
        .select('*')
        .eq('page_id', page.id)
        .eq('is_enabled', true)
        .order('order_index', { ascending: true })

    return (
        <main className="max-w-5xl mx-auto px-4 py-12">
            <header className="mb-8">
                <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-amber-700 bg-amber-50 border border-amber-100 inline-flex px-2.5 py-1 rounded-full">
                    Preview Mode
                </div>
                <h1 className="text-3xl font-bold text-gray-900">{page.title_ru}</h1>
                <p className="text-gray-500 mt-2">
                    {page.title_en} · status: {page.status}
                </p>
            </header>

            <div className="space-y-4">
                {(sections || []).map(section => (
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
