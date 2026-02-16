import type { MetadataRoute } from 'next'

function getBaseUrl() {
    return process.env.NEXT_PUBLIC_SITE_URL || 'https://intel.edu.kg'
}

export default function robots(): MetadataRoute.Robots {
    const baseUrl = getBaseUrl()

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/preview/', '/api/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    }
}
