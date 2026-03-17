'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import PortalPostsPage from '@/components/portal/PortalPostsPage'

export default function TeachersPlatformsPage() {
    const { language } = useLanguage()

    return (
        <PortalPostsPage
            portal="teachers_platforms"
            heroTitle={language === 'ru' ? 'Полезные платформы' : 'Useful Platforms'}
            heroSubtitle={
                language === 'ru'
                    ? 'Инструменты и платформы для педагогов'
                    : 'Tools and platforms for educators'
            }
        />
    )
}
