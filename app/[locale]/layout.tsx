import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { PUBLIC_LOCALES, type PublicLocale } from '@/lib/i18n'

export function generateStaticParams() {
    return PUBLIC_LOCALES.map(locale => ({ locale }))
}

export default function LocaleLayout({
    children,
    params,
}: {
    children: ReactNode
    params: { locale: PublicLocale }
}) {
    if (!PUBLIC_LOCALES.includes(params.locale)) {
        notFound()
    }

    return children
}
