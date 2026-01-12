import MiddleHero from '@/components/programs/middle/MiddleHero';
import TransitionSupport from '@/components/programs/middle/TransitionSupport';
import CambridgePathway from '@/components/programs/middle/CambridgePathway';
import STEAMLabs from '@/components/programs/middle/STEAMLabs';
import HouseSystem from '@/components/programs/middle/HouseSystem';
import SkillsDevelopment from '@/components/programs/middle/SkillsDevelopment';
import BeyondClassroom from '@/components/programs/middle/BeyondClassroom';
import MiddleCTA from '@/components/programs/middle/MiddleCTA';
import {
    middleHeroData,
    transitionSupportData,
    cambridgePathwayData,
    steamLabsData,
    houseSystemData,
    skillsDevelopmentData,
    beyondClassroomData,
    middleCTAData,
} from '@/lib/data/middle-program';

export const metadata = {
    title: 'Intellect Middle (5-9 классы) — Средняя школа | Intellect Pro',
    description:
        'Средняя школа Intellect Middle: точные науки на английском по Cambridge Assessment, STEAM-лаборатории, система домов. Запишитесь на экскурсию!',
    keywords:
        'средняя школа, 5-9 классы, Cambridge Checkpoint, STEAM, английский язык, Бишкек, Intellect Pro',
    openGraph: {
        title: 'Intellect Middle — Раскрытие потенциала',
        description:
            'Cambridge Pathway, STEAM-лаборатории, система домов, проектная деятельность',
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
            {/* Hero секция */}
            <MiddleHero {...middleHeroData} />

            {/* Переходный период и забота */}
            <TransitionSupport {...transitionSupportData} />

            {/* Cambridge Pathway */}
            <CambridgePathway {...cambridgePathwayData} />

            {/* STEAM & Tech */}
            <STEAMLabs {...steamLabsData} />

            {/* Система домов */}
            <HouseSystem {...houseSystemData} />

            {/* Развитие навыков */}
            <SkillsDevelopment {...skillsDevelopmentData} />

            {/* За пределами класса */}
            <BeyondClassroom {...beyondClassroomData} />

            {/* CTA секция */}
            <MiddleCTA {...middleCTAData} />
        </main>
    );
}
