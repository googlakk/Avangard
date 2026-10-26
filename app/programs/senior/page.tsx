import SeniorProgramClient from './SeniorProgramClient';
import { getPublishedCmsSectionPayloadsBySlug } from '@/lib/services/cms-public';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Intellect Senior (10-11 классы) | Intellect Pro',
    description: 'Cambridge IGCSE — основная программа 10–11 классов. Подготовка к SAT, IELTS, TOEFL и ОРТ на дополнительных занятиях.',
    openGraph: {
        title: 'Intellect Senior — Путь в ТОП-вузы и гранты',
        description: 'Основная программа Cambridge IGCSE и дополнительные занятия для подготовки к экзаменам',
        images: [{
            url: '/images/senior/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'Intellect Senior School'
        }]
    }
};

export default async function SeniorProgramPage() {
    const cmsOverrides = await getPublishedCmsSectionPayloadsBySlug('program-senior');
    return <SeniorProgramClient cmsOverrides={cmsOverrides || undefined} />;
}
