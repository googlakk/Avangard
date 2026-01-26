import AcademicBreakthrough from '@/components/programs/middle/AcademicBreakthrough';
import DisciplineEnvironment from '@/components/programs/middle/DisciplineEnvironment';
import TwentyFirstSkills from '@/components/programs/middle/TwentyFirstSkills';
import LeadershipGovernance from '@/components/programs/middle/LeadershipGovernance';
import MiddleCTA from '@/components/programs/middle/MiddleCTA';
import MiddleAdditionalInfoSection from '@/components/programs/middle/MiddleAdditionalInfoSection';
import {
    academicBreakthroughData,
    disciplineEnvironmentData,
    twentyFirstSkillsData,
    leadershipGovernanceData,
    middleCTAData,
} from '@/lib/data/middle-program';

export const metadata = {
    title: 'Intellect Middle (5-9 классы) — Средняя школа | Intellect Pro',
    description:
        'Средняя школа Intellect Middle: точные науки на английском по Cambridge Assessment, Digital Detox, School Parliament. Амбиции, дисциплина, международный стандарт.',
    keywords:
        'средняя школа, 5-9 классы, Cambridge Checkpoint, программирование, английский язык, Бишкек, Intellect Pro, дисциплина, лидерство',
    openGraph: {
        title: 'Intellect Middle — Трансформация мышления',
        description:
            'Точные науки на английском, Digital Detox, School Parliament, подготовка к международному будущему',
        images: [
            {
                url: '/images/middle/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Intellect Middle School',
            },
        ],
    },
};

export default function MiddleProgramPage() {
    return (
        <main className="bg-white">
            {/* Блок 1: Академический прорыв (Оффер) */}
            <AcademicBreakthrough {...academicBreakthroughData} />

            {/* Блок 2: Дисциплина и Среда (Pain Killer) */}
            <DisciplineEnvironment {...disciplineEnvironmentData} />

            {/* Блок 3: Навыки XXI века (Hard & Soft Skills) */}
            <TwentyFirstSkills {...twentyFirstSkillsData} />

            {/* Блок 4: Лидерство и Самоуправление (Motivation) */}
            <LeadershipGovernance {...leadershipGovernanceData} />

            {/* Узнать больше - гибридная секция */}
            <MiddleAdditionalInfoSection />

            {/* CTA секция */}
            <MiddleCTA {...middleCTAData} />
        </main>
    );
}

