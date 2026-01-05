import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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
        <html lang="ru" className={`${inter.variable} ${montserrat.variable}`}>
            <body>
                <Header />
                <main className="min-h-screen">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
