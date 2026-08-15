/**
 * Structured Data (JSON-LD) generation for SEO
 * Generate schema.org compatible JSON-LD for social sharing and search engines
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://intel.edu.kg'
const LOGO_URL = `${SITE_URL}/logo.png`

export interface SchemaOrgData {
    '@context': string
    '@type': string
    [key: string]: unknown
}

/**
 * Organization schema - used on all pages
 * Provides basic information about the school
 */
export function getOrganizationSchema(): SchemaOrgData {
    return {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        'name': 'INTELLECT INTERNATIONAL SCHOOL',
        'alternateName': 'INTELLECT School',
        'url': SITE_URL,
        'logo': LOGO_URL,
        'description': 'Premium international school in Bishkek with an international curriculum, STEAM labs, and bilingual education',
        'address': {
            '@type': 'PostalAddress',
            'addressCountry': 'KG',
            'addressLocality': 'Bishkek',
        },
        'contactPoint': {
            '@type': 'ContactPoint',
            'contactType': 'Customer Service',
            'telephone': '+996-705-889-889',
        },
        'sameAs': [
            'https://instagram.com/intellect.bishkek',
        ],
    }
}

/**
 * Breadcrumb schema - auto-generated from URL path
 */
export function getBreadcrumbSchema(path: string): SchemaOrgData {
    const segments = path.split('/').filter(Boolean)
    const items = [
        {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': SITE_URL,
        },
    ]

    let currentPath = ''
    segments.forEach((segment, index) => {
        currentPath += `/${segment}`
        const name = segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')

        items.push({
            '@type': 'ListItem',
            'position': index + 2,
            'name': name,
            'item': `${SITE_URL}${currentPath}`,
        })
    })

    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': items,
    }
}

/**
 * Article schema - for news/blog posts
 */
export function getArticleSchema(data: {
    headline: string
    description: string
    image?: string
    datePublished?: string
    dateModified?: string
    author?: string
}): SchemaOrgData {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': data.headline,
        'description': data.description,
        'image': data.image ? [data.image] : [LOGO_URL],
        'datePublished': data.datePublished || new Date().toISOString(),
        'dateModified': data.dateModified || new Date().toISOString(),
        'author': data.author || 'INTELLECT INTERNATIONAL SCHOOL',
        'publisher': {
            '@type': 'Organization',
            'name': 'INTELLECT INTERNATIONAL SCHOOL',
            'logo': {
                '@type': 'ImageObject',
                'url': LOGO_URL,
            },
        },
    }
}

/**
 * Educational Program schema
 */
export function getProgramSchema(data: {
    name: string
    description: string
    ageRange?: string
    educationLevel?: string
    url?: string
}): SchemaOrgData {
    return {
        '@context': 'https://schema.org',
        '@type': 'EducationalOccupationalProgram',
        'name': data.name,
        'description': data.description,
        'url': data.url || SITE_URL,
        'provider': {
            '@type': 'EducationalOrganization',
            'name': 'INTELLECT INTERNATIONAL SCHOOL',
            'url': SITE_URL,
        },
        ...(data.ageRange && { 'typicalAgeRange': data.ageRange }),
        ...(data.educationLevel && { 'educationalLevel': data.educationLevel }),
    }
}

/**
 * Combine multiple schemas into a single JSON-LD array
 */
export function combineSchemas(...schemas: SchemaOrgData[]): string {
    return JSON.stringify(schemas)
}

/**
 * Generate a script tag with JSON-LD data
 */
export function generateJsonLdScript(schema: SchemaOrgData | SchemaOrgData[]): string {
    const schemas = Array.isArray(schema) ? schema : [schema]
    return `<script type="application/ld+json">${JSON.stringify(schemas)}</script>`
}
