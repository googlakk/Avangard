import type { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

function getBaseUrl() {
    return process.env.NEXT_PUBLIC_SITE_URL || 'https://intel.edu.kg'
}

function getSupabase() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const supabase = getSupabase()
    const baseUrl = getBaseUrl()

    const [{ data: pages }, { data: news }] = await Promise.all([
        supabase
            .from('cms_pages')
            .select('slug, updated_at, published_at')
            .eq('status', 'published'),
        supabase
            .from('news')
            .select('slug, updated_at, published_at')
            .eq('is_published', true),
    ])

    const staticRoutes: MetadataRoute.Sitemap = [
        '',
        '/about',
        '/contacts',
        '/services',
        '/programs',
        '/programs/primary',
        '/programs/middle',
        '/programs/senior',
    ].map(path => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: path === '' ? 1 : 0.8,
    }))

    const cmsPageRoutes: MetadataRoute.Sitemap = (pages || []).map(page => ({
        url: `${baseUrl}/pages/${page.slug}`,
        lastModified: new Date(page.updated_at || page.published_at || new Date().toISOString()),
        changeFrequency: 'weekly',
        priority: 0.7,
    }))

    const newsRoutes: MetadataRoute.Sitemap = (news || []).map(item => ({
        url: `${baseUrl}/news/${item.slug}`,
        lastModified: new Date(item.updated_at || item.published_at || new Date().toISOString()),
        changeFrequency: 'daily',
        priority: 0.6,
    }))

    return [...staticRoutes, ...cmsPageRoutes, ...newsRoutes]
}
