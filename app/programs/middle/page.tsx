'use client';

import AcademicBreakthrough from '@/components/programs/middle/AcademicBreakthrough';
import DisciplineEnvironment from '@/components/programs/middle/DisciplineEnvironment';
import TwentyFirstSkills from '@/components/programs/middle/TwentyFirstSkills';
import LeadershipGovernance from '@/components/programs/middle/LeadershipGovernance';
import MiddleCTA from '@/components/programs/middle/MiddleCTA';
import MiddleAdditionalInfoSection from '@/components/programs/middle/MiddleAdditionalInfoSection';
import { useLanguage } from '@/contexts/LanguageContext';
import {
    getAcademicBreakthroughData,
    getDisciplineEnvironmentData,
    getTwentyFirstSkillsData,
    getLeadershipGovernanceData,
    getMiddleCTAData,
} from '@/lib/data/middle-program';

export default function MiddleProgramPage() {
    const { t } = useLanguage();

    return (
        <main className="bg-white">
            {/* Блок 1: Академический прорыв (Оффер) */}
            <AcademicBreakthrough {...getAcademicBreakthroughData(t)} />

            {/* Блок 2: Дисциплина и Среда (Pain Killer) */}
            <DisciplineEnvironment {...getDisciplineEnvironmentData(t)} />

            {/* Блок 3: Навыки XXI века (Hard & Soft Skills) */}
            <TwentyFirstSkills {...getTwentyFirstSkillsData(t)} />

            {/* Блок 4: Лидерство и Самоуправление (Motivation) */}
            <LeadershipGovernance {...getLeadershipGovernanceData(t)} />

            {/* Узнать больше - гибридная секция */}
            <MiddleAdditionalInfoSection />

            {/* CTA секция */}
            <MiddleCTA {...getMiddleCTAData(t)} />
        </main>
    );
}

