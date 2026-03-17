'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import PortalPostsPage from '@/components/portal/PortalPostsPage'
import { getSitePageContent } from '@/lib/content/site-pages'

export default function ParentsSchoolPage() {
    const { language } = useLanguage()
    const copy = getSitePageContent(language).parents.portals.parentsSchool

    return (
        <PortalPostsPage
            portal="parents_school"
            heroTitle={copy.title}
            heroSubtitle={copy.subtitle}
        />
    )
}
