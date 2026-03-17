'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import PortalPostsPage from '@/components/portal/PortalPostsPage'

export default function ParentsPlatformsPage() {
    const { language } = useLanguage()

    return (
        <PortalPostsPage
            portal="parents_platforms"
            heroTitle={language === 'ru' ? 'Полезные платформы' : 'Useful Platforms'}
            heroSubtitle={
                language === 'ru'
                    ? 'Образовательные ресурсы и платформы для родителей'
                    : 'Educational resources and platforms for parents'
            }
        />
    )
}
