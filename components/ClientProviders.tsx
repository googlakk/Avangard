'use client';

import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { usePathname } from 'next/navigation';
import '@/app/home-brand.css';
import type { PublicLocale } from '@/lib/i18n';

export default function ClientProviders({
    children,
    initialLanguage,
}: {
    children: React.ReactNode
    initialLanguage: PublicLocale
}) {
    const pathname = usePathname();
    const isHomeRoute = /^\/(?:ru|en)?\/?$/.test(pathname || '/');
    const isAdminRoute = pathname?.startsWith('/admin');

    return (
        <LanguageProvider initialLanguage={initialLanguage}>
            <div className={isHomeRoute ? 'home-brand' : undefined}>
            {!isAdminRoute && <Header />}
            <main className="min-h-screen">{children}</main>
            {!isAdminRoute && <Footer />}
            </div>
        </LanguageProvider>
    );
}
