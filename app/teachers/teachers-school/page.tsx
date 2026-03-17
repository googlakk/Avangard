'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import PortalPostsPage from '@/components/portal/PortalPostsPage'
import { getSitePageContent } from '@/lib/content/site-pages'

export default function TeachersSchoolPage() {
    const { language } = useLanguage()
    const copy = getSitePageContent(language).teachers.portals.teachersSchool

    return (
        <PortalPostsPage
            portal="teachers_school"
            heroTitle={copy.title}
            heroSubtitle={copy.subtitle}
        />
    )
}
