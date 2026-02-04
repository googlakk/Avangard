import type { Metadata } from 'next';
import { Inter, Montserrat, Cormorant_Garamond, IBM_Plex_Serif, Cinzel, Lora, Manrope } from 'next/font/google';
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

const cinzel = Cinzel({
    subsets: ['latin'],
    variable: '--font-cinzel',
    display: 'swap',
    weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
    title: 'INTELLECT INTERNATIONAL SCHOOL | Школа Нового Поколения',
    description:
        'INTELLECT INTERNATIONAL SCHOOL - элитная частная школа в Бишкеке. Кембриджская программа, STEAM-лаборатории, билингвальное обучение. С 2016 года воспитываем лидеров будущего.',
    keywords: [
        'INTELLECT INTERNATIONAL SCHOOL',
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
    authors: [{ name: 'INTELLECT INTERNATIONAL SCHOOL' }],
    creator: 'INTELLECT INTERNATIONAL SCHOOL',
    publisher: 'INTELLECT INTERNATIONAL SCHOOL',
    applicationName: 'INTELLECT INTERNATIONAL SCHOOL',

    // Open Graph для социальных сетей
    openGraph: {
        title: 'INTELLECT INTERNATIONAL SCHOOL | Школа Нового Поколения',
        description: 'Элитная частная школа в Бишкеке. Кембриджская программа, STEAM-лаборатории, билингвальное обучение. С 2016 года воспитываем лидеров будущего.',
        url: 'https://intel.edu.kg',
        siteName: 'INTELLECT INTERNATIONAL SCHOOL',
        images: [
            {
                url: '/og-image.jpg', // Создадим это изображение
                width: 1200,
                height: 630,
                alt: 'INTELLECT INTERNATIONAL SCHOOL - Школа Нового Поколения',
            }
        ],
        locale: 'ru_RU',
        type: 'website',
    },

    // Twitter Card
    twitter: {
        card: 'summary_large_image',
        title: 'INTELLECT INTERNATIONAL SCHOOL | Школа Нового Поколения',
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

const lora = Lora({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-lora',
    display: 'swap',
});

const manrope = Manrope({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-manrope',
    display: 'swap',
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" className={`${inter.variable} ${montserrat.variable} ${cormorantGaramond.variable} ${ibmPlexSerif.variable} ${cinzel.variable} ${lora.variable} ${manrope.variable}`}>
            <body>
                <ClientProviders>{children}</ClientProviders>
            </body>
        </html>
    );
}
