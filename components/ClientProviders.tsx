'use client';

import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { usePathname } from 'next/navigation';
import type { PublicLocale } from '@/lib/i18n';

export default function ClientProviders({
    children,
    initialLanguage,
}: {
    children: React.ReactNode
    initialLanguage: PublicLocale
}) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith('/admin');

    return (
        <LanguageProvider initialLanguage={initialLanguage}>
            {!isAdminRoute && <Header />}
            <main className="min-h-screen">{children}</main>
            {!isAdminRoute && <Footer />}
        </LanguageProvider>
    );
}
