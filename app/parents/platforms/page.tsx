'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import PortalPostsPage from '@/components/portal/PortalPostsPage'
import { getSitePageContent } from '@/lib/content/site-pages'

export default function ParentsPlatformsPage() {
    const { language } = useLanguage()
    const copy = getSitePageContent(language).parents.portals.parentsPlatforms

    return (
        <PortalPostsPage
            portal="parents_platforms"
            heroTitle={copy.title}
            heroSubtitle={copy.subtitle}
        />
    )
}
