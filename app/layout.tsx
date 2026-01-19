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
    title: 'Intellect Pro School | Школа Нового Поколения',
    description:
        'Intellect Pro School - элитная частная школа в Бишкеке. Кембриджская программа, STEAM-лаборатории, билингвальное обучение. С 2016 года воспитываем лидеров будущего.',
    keywords: [
        'Intellect Pro School',
        'частная школа Бишкек',
        'Кембриджская школа',
        'Cambridge Assessment',
        'STEAM образование',
        'билингвальная школа',
        'международная школа Кыргызстан',
        'элитная школа',
        'школа нового поколения',
        'качественное образование',
        'начальная школа',
        'средняя школа',
        'старшая школа'
    ],
    authors: [{ name: 'Intellect Pro School' }],
    creator: 'Intellect Pro School',
    publisher: 'Intellect Pro School',
    applicationName: 'Intellect Pro School',

    // Open Graph для социальных сетей
    openGraph: {
        title: 'Intellect Pro School | Школа Нового Поколения',
        description: 'Элитная частная школа в Бишкеке. Кембриджская программа, STEAM-лаборатории, билингвальное обучение. С 2016 года воспитываем лидеров будущего.',
        url: 'https://intel.edu.kg',
        siteName: 'Intellect Pro School',
        images: [
            {
                url: '/og-image.jpg', // Создадим это изображение
                width: 1200,
                height: 630,
                alt: 'Intellect Pro School - Школа Нового Поколения',
            }
        ],
        locale: 'ru_RU',
        type: 'website',
    },

    // Twitter Card
    twitter: {
        card: 'summary_large_image',
        title: 'Intellect Pro School | Школа Нового Поколения',
        description: 'Элитная частная школа в Бишкеке. Кембриджская программа, STEAM-лаборатории, билингвальное обучение.',
        images: ['/og-image.jpg'],
        creator: '@IntellectProKG',
    },

    // Дополнительные мета-теги
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

    // Для мобильных устройств
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 5,
    },

    // Иконки
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },

    // Манифест для PWA
    manifest: '/site.webmanifest',

    // Тема для браузера
    themeColor: '#1e3a8a', // Темно-синий цвет школы

    // Категория
    category: 'education',
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
