'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import PortalPostsPage from '@/components/portal/PortalPostsPage'

export default function ParentsSchoolPage() {
    const { language } = useLanguage()

    return (
        <PortalPostsPage
            portal="parents_school"
            heroTitle={language === 'ru' ? 'Школа родителей' : 'Parents School'}
            heroSubtitle={
                language === 'ru'
                    ? 'Мероприятия, курсы и семинары для родителей нашей школы'
                    : 'Events, courses and seminars for parents of our school'
            }
        />
    )
}
