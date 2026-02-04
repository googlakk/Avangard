import SeniorProgramClient from './SeniorProgramClient';

export const metadata = {
    title: 'Intellect Senior (10-11 классы) | Intellect Pro',
    description: 'Ваш прямой путь в ТОП-вузы мира. Подготовка к SAT, IELTS, TOEFL и поступлению в университеты США, Европы и Азии. Грантовое обучение.',
    openGraph: {
        title: 'Intellect Senior — Путь в ТОП-вузы и гранты',
        description: 'SAT, IELTS, Essay, карьерное планирование и развитие навыков XXI века',
        images: [{
            url: '/images/senior/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'Intellect Senior School'
        }]
    }
};

export default function SeniorProgramPage() {
    return <SeniorProgramClient />;
}
