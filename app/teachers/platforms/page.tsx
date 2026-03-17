'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import PortalPostsPage from '@/components/portal/PortalPostsPage'

export default function TeachersPlatformsPage() {
    const { language } = useLanguage()
    const copy = {
        ru: {
            title: 'Полезные платформы',
            subtitle: 'Инструменты и платформы для педагогов',
        },
        en: {
            title: 'Useful Platforms',
            subtitle: 'Tools and platforms for educators',
        },
    }[language]

    return (
        <PortalPostsPage
            portal="teachers_platforms"
            heroTitle={copy.title}
            heroSubtitle={copy.subtitle}
        />
    )
}
