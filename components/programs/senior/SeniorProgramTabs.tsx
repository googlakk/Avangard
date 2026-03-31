'use client';

import { IconWrapper } from '@/lib/icon-wrapper';
import {
    getUniversityPathwayBlocks,
    getEnglishProficiencyBlocks,
    getCognitiveAdvantages,
    getXXICenturySkills,
    getStudentLifeFeatures,
    getCareerGuidanceItems
} from '@/lib/data/senior-program';
import Tabs from '@/components/ui/Tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProgramSection, ProgramSectionHeader, programCardClassName } from '@/components/programs/shared/ProgramSection';

export default function SeniorProgramTabs() {
    const { t } = useLanguage();

    const tabs = [
        {
            id: 'academic-track',
            label: t.senior.tabs.tabNames.academic,
            icon: 'GraduationCap',
            content: <AcademicTrackContent />
        },
        {
            id: 'skills-development',
            label: t.senior.tabs.tabNames.skills,
            icon: 'Brain',
            content: <SkillsDevelopmentContent />
        },
        {
            id: 'student-experience',
            label: t.senior.tabs.tabNames.life,
            icon: 'Sparkles',
            content: <StudentExperienceContent />
        }
    ];

    return (
        <ProgramSection id="program-details" tone="muted" spacing="md">
            <ProgramSectionHeader title={t.senior.tabs.title} subtitle={t.senior.tabs.subtitle} align="center" />

            <div className="mx-auto max-w-6xl">
                <Tabs tabs={tabs} defaultTab="academic-track" />
            </div>
        </ProgramSection>
    );
}

// Tab 1: Academic Track (University Pathway + English)
function AcademicTrackContent() {
    const { t } = useLanguage();
    const universityPathwayBlocks = getUniversityPathwayBlocks(t);
    const englishProficiencyBlocks = getEnglishProficiencyBlocks(t);

    return (
        <div className="space-y-12">
            {/* University Pathway */}
            <div>
                <h3 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                    {t.senior.tabs.academic.strategyTitle}
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                    {t.senior.tabs.academic.strategyText}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {universityPathwayBlocks.map((block) => (
                        <div
                            key={block.id}
                            className={programCardClassName}
                        >
                            <div className="mb-4">
                                <IconWrapper icon={block.icon} variant="navy" size="sm" hoverable={false} />
                            </div>
                            <h4 className="text-xl font-bold font-heading text-gray-900 mb-2">
                                {block.title}
                            </h4>
                            <p className="text-sm text-navy-900/60 uppercase tracking-wider mb-4 font-medium">
                                {block.subtitle}
                            </p>
                            <ul className="space-y-2">
                                {block.description.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                        <span className="text-navy-900 mt-1">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* English Proficiency */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-8">
                <h3 className="text-2xl font-bold font-heading text-navy-900 mb-4">
                    {t.senior.tabs.academic.englishTitle}
                </h3>
                <p className="text-slate-600 mb-8 text-base md:text-lg">
                    {t.senior.tabs.academic.englishText}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {englishProficiencyBlocks.map((block, idx) => (
                        <div key={idx} className={programCardClassName}>
                            <div className="mb-4">
                                <IconWrapper icon={block.icon} variant="navy" size="sm" hoverable={false} />
                            </div>
                            <h4 className="text-lg font-bold font-heading text-navy-900 mb-2">{block.title}</h4>
                            <p className="text-sm text-slate-600 mb-4">{block.subtitle}</p>
                            <ul className="space-y-2">
                                {block.description.map((item, itemIdx) => (
                                    <li key={itemIdx} className="flex items-start gap-2 text-sm text-slate-700">
                                        <span className="shrink-0 text-navy-900">•</span>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            {block.target && (
                                <div className="mt-4 inline-flex rounded-md bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-700 ring-1 ring-inset ring-slate-200">
                                    {block.target}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Tab 2: Skills Development (Cognitive Advantage + AI Skills)
function SkillsDevelopmentContent() {
    const { t } = useLanguage();
    const cognitiveAdvantages = getCognitiveAdvantages(t);
    const xxiCenturySkills = getXXICenturySkills(t);

    return (
        <div className="space-y-12">
            {/* Cognitive Advantage */}
            <div>
                <h3 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                    {t.senior.tabs.skills.brainTitle}
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                    {t.senior.tabs.skills.brainText}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cognitiveAdvantages.map((advantage, idx) => (
                        <div key={idx} className={programCardClassName}>
                            <div className="mb-4">
                                <IconWrapper icon={advantage.icon} variant="navy" size="sm" hoverable={false} />
                            </div>
                            <h4 className="text-xl font-bold font-heading text-gray-900 mb-2">
                                {advantage.title}
                            </h4>
                            <p className="text-sm text-navy-900/70 mb-4">{advantage.subtitle}</p>
                            <ul className="space-y-2 mb-4">
                                {advantage.description.map((item, itemIdx) => (
                                    <li key={itemIdx} className="flex items-start gap-2 text-sm text-slate-700">
                                        <span className="text-navy-900">•</span>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="rounded-md bg-slate-50 px-2 py-1 text-xs font-semibold text-navy-900 ring-1 ring-inset ring-slate-200">
                                {advantage.benefit}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* XXI Century Skills */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-8">
                <h3 className="text-2xl font-bold font-heading text-navy-900 mb-4">
                    {t.senior.tabs.skills.xxiTitle}
                </h3>
                <p className="text-slate-600 mb-8 text-base md:text-lg">
                    {t.senior.tabs.skills.xxiText}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {xxiCenturySkills.map((skill, idx) => (
                        <div key={idx} className={programCardClassName}>
                            <div className="mb-4">
                                <IconWrapper icon={skill.icon} variant="navy" size="sm" hoverable={false} />
                            </div>
                            <h4 className="text-xl font-bold font-heading text-navy-900 mb-2">{skill.title}</h4>
                            <p className="text-sm text-gray-500 font-medium mb-4">{skill.subtitle}</p>
                            <div className="space-y-2 mb-5">
                                {skill.description.map((item, itemIdx) => (
                                    <p key={itemIdx} className="text-sm text-slate-600">
                                        {item}
                                    </p>
                                ))}
                            </div>
                            {skill.keyPoints && (
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {skill.keyPoints.map((point, pointIdx) => (
                                        <span key={pointIdx} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700">
                                            {point}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Tab 3: Student Experience (Student Life + Career Guidance)
function StudentExperienceContent() {
    const { t } = useLanguage();
    const studentLifeFeatures = getStudentLifeFeatures(t);
    const careerGuidanceItems = getCareerGuidanceItems(t);

    return (
        <div className="space-y-12">
            {/* Student Life */}
            <div>
                <h3 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                    {t.senior.tabs.life.communityTitle}
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                    {t.senior.tabs.life.communityText}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {studentLifeFeatures.map((feature, idx) => (
                        <div key={idx} className={programCardClassName}>
                            <div className="mb-4">
                                <IconWrapper icon={feature.icon} variant="navy" size="sm" hoverable={false} />
                            </div>
                            <h4 className="text-xl font-bold font-heading text-gray-900 mb-2">
                                {feature.title}
                            </h4>
                            <p className="text-sm text-navy-900/60 uppercase tracking-wider mb-4">
                                {feature.subtitle}
                            </p>
                            <ul className="space-y-2 mb-4">
                                {feature.description.map((item, itemIdx) => (
                                    <li key={itemIdx} className="flex items-start gap-2 text-sm text-slate-700">
                                        <span className="text-navy-900">•</span>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            {feature.benefit && (
                                <div className="inline-flex rounded-md bg-slate-50 px-2 py-1 text-xs font-semibold text-navy-900 ring-1 ring-inset ring-slate-200">
                                    {feature.benefit}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Career Guidance */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-8">
                <h3 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                    {t.senior.tabs.life.careerTitle}
                </h3>
                <p className="text-slate-600 mb-8 text-base md:text-lg">
                    {t.senior.tabs.life.careerText}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {careerGuidanceItems.map((item, idx) => (
                        <div key={idx} className={programCardClassName}>
                            <div className="mb-4">
                                <IconWrapper icon={item.icon} variant="navy" size="sm" hoverable={false} />
                            </div>
                            <h4 className="text-lg font-bold font-heading text-gray-900 mb-4">
                                {item.title}
                            </h4>
                            <ul className="space-y-2">
                                {item.description.map((desc, descIdx) => (
                                    <li key={descIdx} className="flex items-start gap-2 text-sm text-slate-700">
                                        <span className="text-navy-900 shrink-0">→</span>
                                        <span className="leading-relaxed">{desc}</span>
                                    </li>
                                ))}
                            </ul>
                            {item.highlight && (
                                <div className="mt-4 inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1 text-xs font-semibold text-navy-900 ring-1 ring-inset ring-slate-200">
                                    <span aria-hidden>✓</span>
                                    <span>{item.highlight}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
