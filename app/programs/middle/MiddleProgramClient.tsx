'use client';

import Link from 'next/link';
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
    const navItems = language === 'ru'
        ? [
            { href: '#middle-overview', label: 'Обзор' },
            { href: '#middle-environment', label: 'Среда' },
            { href: '#middle-skills', label: 'Навыки' },
            { href: '#middle-leadership', label: 'Лидерство' },
            { href: '#middle-pathways', label: 'Траектории' },
            { href: '#middle-cta', label: 'Поступление' },
        ]
        : [
            { href: '#middle-overview', label: 'Overview' },
            { href: '#middle-environment', label: 'Environment' },
            { href: '#middle-skills', label: 'Skills' },
            { href: '#middle-leadership', label: 'Leadership' },
            { href: '#middle-pathways', label: 'Pathways' },
            { href: '#middle-cta', label: 'Admissions' },
        ];

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
        <main className="bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_16%,#fffdf8_40%,#f8fafc_100%)]">
            {hasOverrideKey(cmsOverrides, 'middle-academic-breakthrough') && <AcademicBreakthrough {...academicBreakthroughData} />}

            <div className="sticky top-0 z-30 border-y border-slate-200/70 bg-white/85 backdrop-blur-xl">
                <div className="container mx-auto flex max-w-7xl gap-3 overflow-x-auto px-4 py-3 lg:px-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 transition-colors hover:border-navy-300 hover:text-navy-900"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>

            {hasOverrideKey(cmsOverrides, 'middle-discipline-environment') && <DisciplineEnvironment {...disciplineEnvironmentData} />}
            {hasOverrideKey(cmsOverrides, 'middle-twenty-first-skills') && <TwentyFirstSkills {...twentyFirstSkillsData} />}
            {hasOverrideKey(cmsOverrides, 'middle-leadership-governance') && <LeadershipGovernance {...leadershipGovernanceData} />}
            <MiddleAdditionalInfoSection />
            {hasOverrideKey(cmsOverrides, 'middle-cta') && <MiddleCTA {...middleCtaData} />}
        </main>
    );
}
