import JuniorProgramClient from './JuniorProgramClient';

export const metadata = {
    title: 'Начальная школа Intellect Junior (1-4 классы) | Intellect Pro',
    description: 'Счастливое детство с интеллектом будущего. Школа полного дня (08:00-17:00) с носителями языка. Мягкая адаптация, развитие мозга и безопасность 360°. ',
    keywords: 'начальная школа, 1-4 классы, билингвальное образование, английский, носители языка, Cambridge Primary, ментальная арифметика, школа полного дня, Бишкек, Intellect Pro',
    openGraph: {
        title: 'Intellect Junior — Счастливое детство с интеллектом будущего',
        description: 'Школа полного дня с Native Speakers, когнитивное развитие, безопасность 360°',
        images: [{
            url: '/images/junior/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'Intellect Junior School'
        }]
    }
};

export default function JuniorProgramPage() {
    return <JuniorProgramClient />;
}
