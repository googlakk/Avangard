'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import PortalPostsPage from '@/components/portal/PortalPostsPage'

export default function TeachersSchoolPage() {
    const { language } = useLanguage()

    return (
        <PortalPostsPage
            portal="teachers_school"
            heroTitle={language === 'ru' ? 'Школа для учителей' : 'Teachers School'}
            heroSubtitle={
                language === 'ru'
                    ? 'Профессиональное развитие и повышение квалификации'
                    : 'Professional growth and development programs'
            }
        />
    )
}
