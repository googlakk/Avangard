import type { Metadata } from 'next';
import { Inter, Montserrat, Cormorant_Garamond, IBM_Plex_Serif } from 'next/font/google';
import './globals.css';
import ClientProviders from '@/components/ClientProviders';

const inter = Inter({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-inter',
    display: 'swap',
});

const montserrat = Montserrat({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-montserrat',
    display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-cormorant',
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
});

const ibmPlexSerif = IBM_Plex_Serif({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-ibm-plex-serif',
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
    title: 'Корпоративный Сайт | Ваша Компания',
    description:
        'Современное решение для вашего бизнеса. Профессиональные услуги и инновационные подходы.',
    keywords: ['корпоративный сайт', 'бизнес', 'услуги', 'компания'],
    authors: [{ name: 'Ваша Компания' }],
    openGraph: {
        title: 'Корпоративный Сайт | Ваша Компания',
        description: 'Современное решение для вашего бизнеса',
        type: 'website',
        locale: 'ru_RU',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" className={`${inter.variable} ${montserrat.variable} ${cormorantGaramond.variable} ${ibmPlexSerif.variable}`}>
            <body>
                <ClientProviders>{children}</ClientProviders>
            </body>
        </html>
    );
}
