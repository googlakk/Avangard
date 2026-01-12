import JuniorHero from '@/components/programs/junior/JuniorHero';
import HeadOfJuniorMessage from '@/components/programs/junior/HeadOfJuniorMessage';
import JuniorCurriculum from '@/components/programs/junior/JuniorCurriculum';
import PastoralCareSection from '@/components/programs/junior/PastoralCareSection';
import DayInLifeSchedule from '@/components/programs/junior/DayInLifeSchedule';
import JuniorPhotoGallery from '@/components/programs/junior/JuniorPhotoGallery';
import ParentTestimonials from '@/components/programs/junior/ParentTestimonials';
import JuniorCTA from '@/components/programs/junior/JuniorCTA';
import {
    juniorHeroData,
    headOfJuniorData,
    curriculumBlocks,
    pastoralCareItems,
    dailySchedule,
    galleryImages,
    testimonials
} from '@/lib/data/junior-program';

export const metadata = {
    title: 'Intellect Junior (1-4 классы) — Начальная школа | Intellect Pro',
    description: 'Начальная школа Intellect Junior: билингвальная программа, мягкая адаптация, продленка. Запишитесь на экскурсию уже сегодня!',
    keywords: 'начальная школа, 1-4 классы, билингвальное образование, английский, Бишкек, Intellect Pro',
    openGraph: {
        title: 'Intellect Junior — Фундамент будущего',
        description: 'Мягкая адаптация, Soft Skills, билингвальная среда',
        images: [{
            url: '/images/junior/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'Intellect Junior School'
        }]
    }
};

export default function JuniorProgramPage() {
    return (
        <main className="bg-white">
            {/* Hero секция */}
            <JuniorHero {...juniorHeroData} />

            {/* Приветствие главы школы */}
            <HeadOfJuniorMessage {...headOfJuniorData} />

            {/* Академический подход */}
            <JuniorCurriculum blocks={curriculumBlocks} />

            {/* Забота о детях */}
            <PastoralCareSection items={pastoralCareItems} />

            {/* Расписание дня */}
            <DayInLifeSchedule schedule={dailySchedule} />

            {/* Фотогалерея */}
            <JuniorPhotoGallery images={galleryImages} />

            {/* Отзывы родителей */}
            <ParentTestimonials testimonials={testimonials} />

            {/* CTA секция */}
            <JuniorCTA />
        </main>
    );
}
