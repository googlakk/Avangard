import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { validateAndConsumePreviewLink } from '@/lib/services/preview-links'
import CmsProgramPageRenderer from '@/components/cms/CmsProgramPageRenderer'
import type { PublicCmsPage, PublicCmsSection } from '@/lib/services/cms-public'

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
        <div>
            <div className="max-w-7xl mx-auto px-4 pt-6">
                <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-amber-700 bg-amber-50 border border-amber-100 inline-flex px-2.5 py-1 rounded-full">
                    Preview Mode · {page.status}
                </div>
            </div>
            <CmsProgramPageRenderer
                page={page as PublicCmsPage}
                sections={(sections || []) as unknown as PublicCmsSection[]}
            />
        </div>
    )
}
