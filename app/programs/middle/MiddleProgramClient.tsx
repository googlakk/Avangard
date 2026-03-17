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
import { deepMerge, hasOverrideKey, pickOverride, resolveLocalizedContent, type CmsOverrideMap } from '@/lib/cms/program-content';

interface MiddleProgramClientProps {
    cmsOverrides?: CmsOverrideMap;
}

export default function MiddleProgramClient({ cmsOverrides }: MiddleProgramClientProps) {
    const { t, language } = useLanguage();

    const academicBreakthroughData = resolveLocalizedContent(
        deepMerge(getAcademicBreakthroughData(t), pickOverride(cmsOverrides, 'middle-academic-breakthrough')),
        language
    );
    const disciplineEnvironmentData = resolveLocalizedContent(
        deepMerge(getDisciplineEnvironmentData(t), pickOverride(cmsOverrides, 'middle-discipline-environment')),
        language
    );
    const twentyFirstSkillsData = resolveLocalizedContent(
        deepMerge(getTwentyFirstSkillsData(t), pickOverride(cmsOverrides, 'middle-twenty-first-skills')),
        language
    );
    const leadershipGovernanceData = resolveLocalizedContent(
        deepMerge(getLeadershipGovernanceData(t), pickOverride(cmsOverrides, 'middle-leadership-governance')),
        language
    );
    const middleCtaData = resolveLocalizedContent(
        deepMerge(getMiddleCTAData(t), pickOverride(cmsOverrides, 'middle-cta')),
        language
    );

    return (
        <main className="bg-white">
            {hasOverrideKey(cmsOverrides, 'middle-academic-breakthrough') && <AcademicBreakthrough {...academicBreakthroughData} />}
            {hasOverrideKey(cmsOverrides, 'middle-discipline-environment') && <DisciplineEnvironment {...disciplineEnvironmentData} />}
            {hasOverrideKey(cmsOverrides, 'middle-twenty-first-skills') && <TwentyFirstSkills {...twentyFirstSkillsData} />}
            {hasOverrideKey(cmsOverrides, 'middle-leadership-governance') && <LeadershipGovernance {...leadershipGovernanceData} />}
            <MiddleAdditionalInfoSection />
            {hasOverrideKey(cmsOverrides, 'middle-cta') && <MiddleCTA {...middleCtaData} />}
        </main>
    );
}
