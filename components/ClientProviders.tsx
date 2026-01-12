'use client';

import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <LanguageProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
        </LanguageProvider>
    );
}
