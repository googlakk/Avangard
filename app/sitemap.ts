import type { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import { localizePathname, STATIC_PUBLIC_ROUTE_KEYS } from '@/lib/i18n'

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
            .select('slug, title_en, updated_at, published_at')
            .eq('status', 'published'),
        supabase
            .from('news')
            .select('slug, title_en, content_en, updated_at, published_at')
            .eq('is_published', true),
    ])

    const staticRoutes: MetadataRoute.Sitemap = STATIC_PUBLIC_ROUTE_KEYS.flatMap((pathKey) => {
        const pathname = pathKey ? `/${pathKey}` : '/'
        return [
            {
                url: `${baseUrl}${localizePathname(pathname, 'ru')}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: pathname === '/' ? 1 : 0.8,
            },
            {
                url: `${baseUrl}${localizePathname(pathname, 'en')}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: pathname === '/' ? 1 : 0.8,
            },
        ]
    })

    const cmsPageRoutes: MetadataRoute.Sitemap = (pages || []).flatMap(page => {
        const lastModified = new Date(page.updated_at || page.published_at || new Date().toISOString())
        const routes: MetadataRoute.Sitemap = [{
            url: `${baseUrl}${localizePathname(`/pages/${page.slug}`, 'ru')}`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.7,
        }]
        if (page.title_en?.trim()) {
            routes.push({
                url: `${baseUrl}${localizePathname(`/pages/${page.slug}`, 'en')}`,
                lastModified,
                changeFrequency: 'weekly',
                priority: 0.7,
            })
        }
        return routes
    })

    const newsRoutes: MetadataRoute.Sitemap = (news || []).flatMap(item => {
        const lastModified = new Date(item.updated_at || item.published_at || new Date().toISOString())
        const routes: MetadataRoute.Sitemap = [{
            url: `${baseUrl}${localizePathname(`/news/${item.slug}`, 'ru')}`,
            lastModified,
            changeFrequency: 'daily',
            priority: 0.6,
        }]
        if (item.title_en?.trim() && item.content_en?.trim()) {
            routes.push({
                url: `${baseUrl}${localizePathname(`/news/${item.slug}`, 'en')}`,
                lastModified,
                changeFrequency: 'daily',
                priority: 0.6,
            })
        }
        return routes
    })

    return [...staticRoutes, ...cmsPageRoutes, ...newsRoutes]
}
