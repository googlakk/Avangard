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
        <ProgramSection id="program-details" tone="muted" spacing="md" className="relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,rgba(49,86,163,0.08),transparent_42%)]" />
            <ProgramSectionHeader title={t.senior.tabs.title} subtitle={t.senior.tabs.subtitle} align="center" />

            <div className="mx-auto max-w-6xl">
                <Tabs tabs={tabs} defaultTab="academic-track" />
            </div>
        </ProgramSection>
    );
}

function AcademicTrackContent() {
    const { t, language } = useLanguage();
    const isRu = language !== 'en';
    const universityPathwayBlocks = getUniversityPathwayBlocks(t);
    const englishProficiencyBlocks = getEnglishProficiencyBlocks(t);

    return (
        <div className="space-y-8">
            <div className="space-y-6">
                <div className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_22px_60px_-48px_rgba(15,23,42,0.45)]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                        {isRu ? 'Admissions Strategy' : 'Admissions Strategy'}
                    </p>
                    <h3 className="mt-3 font-heading text-3xl font-semibold text-navy-900">
                        {t.senior.tabs.academic.strategyTitle}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-slate-600">
                        {t.senior.tabs.academic.strategyText}
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {universityPathwayBlocks.map((block, index) => (
                        <div
                            key={block.id}
                            className={`rounded-[26px] border p-6 shadow-[0_20px_50px_-44px_rgba(15,23,42,0.4)] ${index === 0 ? 'md:col-span-2' : ''} ${index === 1 ? 'border-navy-900 bg-navy-900 text-white' : 'border-slate-200 bg-white'}`}
                        >
                            <div className="mb-4">
                                <IconWrapper icon={block.icon} variant={index === 1 ? 'achievement' : 'navy'} size="sm" hoverable={false} />
                            </div>
                            <h4 className={`text-xl font-bold font-heading ${index === 1 ? 'text-white' : 'text-gray-900'}`}>
                                {block.title}
                            </h4>
                            <p className={`mb-4 mt-2 text-xs font-semibold uppercase tracking-[0.16em] ${index === 1 ? 'text-white/60' : 'text-navy-900/60'}`}>
                                {block.subtitle}
                            </p>
                            <ul className="space-y-2">
                                {block.description.map((item, idx) => (
                                    <li key={idx} className={`flex items-start gap-2 text-sm ${index === 1 ? 'text-white/78' : 'text-gray-600'}`}>
                                        <span className={index === 1 ? 'text-amber-300' : 'text-navy-900'}>•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_26px_70px_-52px_rgba(15,23,42,0.45)] md:p-8">
                <div className="mb-8 grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                            {isRu ? 'Academic English' : 'Academic English'}
                        </p>
                        <h3 className="mt-3 font-heading text-3xl font-semibold text-navy-900">
                            {t.senior.tabs.academic.englishTitle}
                        </h3>
                    </div>
                    <p className="text-base leading-7 text-slate-600">
                        {t.senior.tabs.academic.englishText}
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {englishProficiencyBlocks.map((block, idx) => (
                        <div key={idx} className={`${programCardClassName} rounded-[24px] border-slate-200/80 bg-slate-50`}>
                            <div className="mb-4">
                                <IconWrapper icon={block.icon} variant="navy" size="sm" hoverable={false} />
                            </div>
                            <h4 className="text-lg font-bold font-heading text-navy-900">{block.title}</h4>
                            <p className="mb-4 mt-2 text-sm text-slate-500">{block.subtitle}</p>
                            <ul className="space-y-2">
                                {block.description.map((item, itemIdx) => (
                                    <li key={itemIdx} className="flex items-start gap-2 text-sm text-slate-700">
                                        <span className="shrink-0 text-navy-900">•</span>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            {block.target ? (
                                <div className="mt-4 inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-inset ring-slate-200">
                                    {block.target}
                                </div>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function SkillsDevelopmentContent() {
    const { t, language } = useLanguage();
    const isRu = language !== 'en';
    const cognitiveAdvantages = getCognitiveAdvantages(t);
    const xxiCenturySkills = getXXICenturySkills(t);

    return (
        <div className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-[1.06fr_0.94fr]">
                <div className="rounded-[32px] border border-slate-200 bg-navy-900 p-7 text-white shadow-[0_28px_70px_-42px_rgba(15,23,42,0.65)]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300">
                        {isRu ? 'Cognitive Edge' : 'Cognitive Edge'}
                    </p>
                    <h3 className="mt-3 font-heading text-3xl font-semibold">
                        {t.senior.tabs.skills.brainTitle}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-white/78">
                        {t.senior.tabs.skills.brainText}
                    </p>
                </div>
                <div className="rounded-[32px] border border-slate-200 bg-white p-7">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                        {isRu ? 'Профиль senior' : 'Senior Profile'}
                    </p>
                    <p className="mt-3 text-base leading-7 text-slate-700">
                        {isRu
                            ? 'Senior stage требует не только знаний, но и скорости мышления, устойчивого внимания и умения работать с новыми инструментами.'
                            : 'Senior stage demands not only knowledge, but speed of thinking, stable attention, and fluency with new tools.'}
                    </p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {cognitiveAdvantages.map((advantage, idx) => (
                    <div key={idx} className={`${programCardClassName} rounded-[26px] border-slate-200/80 bg-white shadow-[0_20px_52px_-46px_rgba(15,23,42,0.4)]`}>
                        <div className="mb-4">
                            <IconWrapper icon={advantage.icon} variant="navy" size="sm" hoverable={false} />
                        </div>
                        <h4 className="text-xl font-bold font-heading text-gray-900">
                            {advantage.title}
                        </h4>
                        <p className="mb-4 mt-2 text-sm text-navy-900/70">{advantage.subtitle}</p>
                        <ul className="space-y-2 mb-4">
                            {advantage.description.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex items-start gap-2 text-sm text-slate-700">
                                    <span className="text-navy-900">•</span>
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-navy-900 ring-1 ring-inset ring-slate-200">
                            {advantage.benefit}
                        </div>
                    </div>
                ))}
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_26px_70px_-52px_rgba(15,23,42,0.45)] md:p-8">
                <div className="mb-8 grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                            {isRu ? 'Future-ready stack' : 'Future-ready Stack'}
                        </p>
                        <h3 className="mt-3 font-heading text-3xl font-semibold text-navy-900">
                            {t.senior.tabs.skills.xxiTitle}
                        </h3>
                    </div>
                    <p className="text-base leading-7 text-slate-600">
                        {t.senior.tabs.skills.xxiText}
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {xxiCenturySkills.map((skill, idx) => (
                        <div key={idx} className={`${programCardClassName} rounded-[24px] border-slate-200/80 ${idx === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                            <div className="mb-4">
                                <IconWrapper icon={skill.icon} variant={idx === 0 ? 'achievement' : 'navy'} size="sm" hoverable={false} />
                            </div>
                            <h4 className="text-xl font-bold font-heading text-navy-900">{skill.title}</h4>
                            <p className="mt-2 text-sm text-gray-500 font-medium">{skill.subtitle}</p>
                            <div className="space-y-2 mb-5 mt-4">
                                {skill.description.map((item, itemIdx) => (
                                    <p key={itemIdx} className="text-sm leading-7 text-slate-600">
                                        {item}
                                    </p>
                                ))}
                            </div>
                            {skill.keyPoints ? (
                                <div className="mt-auto flex flex-wrap gap-2">
                                    {skill.keyPoints.map((point, pointIdx) => (
                                        <span key={pointIdx} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700">
                                            {point}
                                        </span>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function StudentExperienceContent() {
    const { t, language } = useLanguage();
    const isRu = language !== 'en';
    const studentLifeFeatures = getStudentLifeFeatures(t);
    const careerGuidanceItems = getCareerGuidanceItems(t);

    return (
        <div className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-[0.94fr_1.06fr]">
                <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-[0_22px_60px_-48px_rgba(15,23,42,0.45)]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                        {isRu ? 'Student Experience' : 'Student Experience'}
                    </p>
                    <h3 className="mt-3 font-heading text-3xl font-semibold text-navy-900">
                        {t.senior.tabs.life.communityTitle}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-slate-600">
                        {t.senior.tabs.life.communityText}
                    </p>
                </div>
                <div className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-amber-100 to-white p-7">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-navy-700">
                        {isRu ? 'Среда выпускника' : 'Graduate Atmosphere'}
                    </p>
                    <p className="mt-3 text-base leading-7 text-slate-700">
                        {isRu
                            ? 'Senior — это не только экзамены, но и среда, где школьник собирает академическую, социальную и профессиональную идентичность.'
                            : 'Senior is not only about exams, but a setting where students shape academic, social, and professional identity.'}
                    </p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {studentLifeFeatures.map((feature, idx) => (
                    <div key={idx} className={`${programCardClassName} rounded-[26px] border-slate-200/80 bg-white shadow-[0_20px_52px_-46px_rgba(15,23,42,0.4)]`}>
                        <div className="mb-4">
                            <IconWrapper icon={feature.icon} variant={idx === 0 ? 'achievement' : 'navy'} size="sm" hoverable={false} />
                        </div>
                        <h4 className="text-xl font-bold font-heading text-gray-900">
                            {feature.title}
                        </h4>
                        <p className="mb-4 mt-2 text-xs uppercase tracking-[0.16em] text-navy-900/60">
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
                        {feature.benefit ? (
                            <div className="inline-flex rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-navy-900 ring-1 ring-inset ring-slate-200">
                                {feature.benefit}
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_26px_70px_-52px_rgba(15,23,42,0.45)] md:p-8">
                <div className="mb-8 grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                            {isRu ? 'Career navigation' : 'Career Navigation'}
                        </p>
                        <h3 className="mt-3 font-heading text-3xl font-semibold text-gray-900">
                            {t.senior.tabs.life.careerTitle}
                        </h3>
                    </div>
                    <p className="text-base leading-7 text-slate-600">
                        {t.senior.tabs.life.careerText}
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {careerGuidanceItems.map((item, idx) => (
                        <div key={idx} className={`${programCardClassName} rounded-[24px] border-slate-200/80 ${idx === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                            <div className="mb-4">
                                <IconWrapper icon={item.icon} variant="navy" size="sm" hoverable={false} />
                            </div>
                            <h4 className="mb-4 text-lg font-bold font-heading text-gray-900">
                                {item.title}
                            </h4>
                            <ul className="space-y-2">
                                {item.description.map((desc, descIdx) => (
                                    <li key={descIdx} className="flex items-start gap-2 text-sm text-slate-700">
                                        <span className="shrink-0 text-navy-900">→</span>
                                        <span className="leading-relaxed">{desc}</span>
                                    </li>
                                ))}
                            </ul>
                            {item.highlight ? (
                                <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-navy-900 ring-1 ring-inset ring-slate-200">
                                    <span aria-hidden>✓</span>
                                    <span>{item.highlight}</span>
                                </div>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
