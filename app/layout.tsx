import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import {
    Cinzel,
    Cormorant_Garamond,
    IBM_Plex_Serif,
    Inter,
    Montserrat,
} from 'next/font/google';
import './globals.css';
import ClientProviders from '@/components/ClientProviders';
import { DEFAULT_LOCALE, isValidLocale, LOCALE_COOKIE_NAME, type PublicLocale } from '@/lib/i18n';
import { getOrganizationSchema } from '@/lib/services/structured-data';

const inter = Inter({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-inter',
    display: 'swap',
})

const montserrat = Montserrat({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-montserrat',
    display: 'swap',
})

const cormorant = Cormorant_Garamond({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-cormorant',
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
})

const ibmPlexSerif = IBM_Plex_Serif({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-ibm-plex-serif',
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
})

const cinzel = Cinzel({
    subsets: ['latin'],
    variable: '--font-cinzel',
    display: 'swap',
    weight: ['400', '500', '600', '700'],
})

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: '#1e3a8a',
};

const siteMetadata: Record<PublicLocale, { title: string; description: string; keywords: string[] }> = {
    ru: {
        title: 'INTELLECT INTERNATIONAL SCHOOL | Школа нового поколения',
        description: 'Частная школа в Бишкеке. Cambridge pathway, STEAM-лаборатории и билингвальное обучение.',
        keywords: [
            'INTELLECT INTERNATIONAL SCHOOL',
            'частная школа Бишкек',
            'Cambridge школа',
            'STEAM образование',
            'билингвальная школа',
            'международная школа Кыргызстан',
        ],
    },
    en: {
        title: 'INTELLECT INTERNATIONAL SCHOOL | School for the Next Generation',
        description: 'Private school in Bishkek with Cambridge pathway, STEAM labs and bilingual learning.',
        keywords: [
            'INTELLECT INTERNATIONAL SCHOOL',
            'private school Bishkek',
            'Cambridge school',
            'STEAM education',
            'bilingual school',
            'international school Kyrgyzstan',
        ],
    },
}

function resolveRequestLocale(): PublicLocale {
    const cookieValue = cookies().get(LOCALE_COOKIE_NAME)?.value
    return isValidLocale(cookieValue) ? cookieValue : DEFAULT_LOCALE
}

export async function generateMetadata(): Promise<Metadata> {
    const locale = resolveRequestLocale()
    const meta = siteMetadata[locale]

    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://intel.edu.kg'),
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords,
        authors: [{ name: 'INTELLECT INTERNATIONAL SCHOOL' }],
        creator: 'INTELLECT INTERNATIONAL SCHOOL',
        publisher: 'INTELLECT INTERNATIONAL SCHOOL',
        applicationName: 'INTELLECT INTERNATIONAL SCHOOL',
        alternates: {
            languages: {
                ru: '/ru',
                en: '/en',
            },
        },
        openGraph: {
            title: meta.title,
            description: meta.description,
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://intel.edu.kg',
            siteName: 'INTELLECT INTERNATIONAL SCHOOL',
            images: [
                {
                    url: '/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'INTELLECT INTERNATIONAL SCHOOL',
                }
            ],
            locale: locale === 'en' ? 'en_US' : 'ru_RU',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: meta.title,
            description: meta.description,
            images: ['/og-image.jpg'],
            creator: '@IntellectProKG',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        icons: {
            icon: '/favicon.ico',
            shortcut: '/favicon-16x16.png',
            apple: '/apple-touch-icon.png',
        },
        manifest: '/site.webmanifest',
        category: 'education',
    };
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = resolveRequestLocale()
    return (
        <html lang={locale}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(getOrganizationSchema()),
                    }}
                />
            </head>
            <body className={`${inter.variable} ${montserrat.variable} ${cormorant.variable} ${ibmPlexSerif.variable} ${cinzel.variable}`}>
                <ClientProviders initialLanguage={locale}>{children}</ClientProviders>
            </body>
        </html>
    );
}
