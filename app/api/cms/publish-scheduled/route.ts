import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function getServiceClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const workflowToken = process.env.CMS_WORKFLOW_TOKEN

    if (!supabaseUrl || !serviceRoleKey || !workflowToken) {
        throw new Error('Missing production workflow configuration')
    }

    return createClient(supabaseUrl, serviceRoleKey)
}

function isAuthorized(request: NextRequest) {
    const workflowToken = process.env.CMS_WORKFLOW_TOKEN
    if (!workflowToken) return false
    return request.headers.get('x-workflow-token') === workflowToken
}

export async function POST(request: NextRequest) {
    if (!isAuthorized(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const supabase = getServiceClient()
        const nowIso = new Date().toISOString()

        const { data: duePages, error: dueError } = await supabase
            .from('cms_pages')
            .select('id')
            .eq('status', 'scheduled')
            .lte('scheduled_at', nowIso)
            .not('scheduled_at', 'is', null)

        if (dueError) {
            throw dueError
        }

        if (!duePages || duePages.length === 0) {
            return NextResponse.json({
                publishedCount: 0,
                publishedPageIds: [],
                timestamp: nowIso,
            })
        }

        const dueIds = duePages.map(item => item.id)
        const { data: publishedPages, error: publishError } = await supabase
            .from('cms_pages')
            .update({
                status: 'published',
                published_at: nowIso,
                scheduled_at: null,
            })
            .in('id', dueIds)
            .eq('status', 'scheduled')
            .select('id, slug, status, published_at')

        if (publishError) {
            throw publishError
        }

        return NextResponse.json({
            publishedCount: publishedPages?.length || 0,
            publishedPageIds: (publishedPages || []).map(page => page.id),
            pages: publishedPages || [],
            timestamp: nowIso,
        })
    } catch (error) {
        console.error('Failed to publish scheduled CMS pages:', error)
        return NextResponse.json(
            { error: 'Failed to publish scheduled pages' },
            { status: 500 }
        )
    }
}
