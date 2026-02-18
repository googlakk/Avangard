import type { Metadata, Viewport } from 'next';
import './globals.css';
import ClientProviders from '@/components/ClientProviders';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: '#1e3a8a',
};

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://intel.edu.kg'),
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

    // Иконки
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },

    // Манифест для PWA
    manifest: '/site.webmanifest',

    // Категория
    category: 'education',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body>
                <ClientProviders>{children}</ClientProviders>
            </body>
        </html>
    );
}
