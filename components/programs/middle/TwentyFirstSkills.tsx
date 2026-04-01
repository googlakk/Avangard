import { IconWrapper } from '@/lib/icon-wrapper';
import Link from 'next/link';
import { ProgramFigure, ProgramSection, ProgramSectionHeader, programCardClassName } from '@/components/programs/shared/ProgramSection';
import { useLanguage } from '@/contexts/LanguageContext';

interface Skill {
    icon: string;
    title: string;
    description: string;
}

interface TwentyFirstSkillsProps {
    title: string;
    subtitle: string;
    skills: Skill[];
    proofImage: string;
    proofCaption: string;
}

export default function TwentyFirstSkills({
    title,
    subtitle,
    skills,
    proofImage,
    proofCaption,
}: TwentyFirstSkillsProps) {
    const { language } = useLanguage();
    const isRu = language !== 'en';
    const timeline = isRu
        ? ['Освоить инструмент', 'Применить в проекте', 'Презентовать результат']
        : ['Learn the tool', 'Apply in projects', 'Present the result'];

    return (
        <ProgramSection id="middle-skills" tone="muted" className="relative overflow-hidden">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(49,86,163,0.08),transparent_52%)]" />

            <div className="grid items-start gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
                <div className="order-2 lg:order-1">
                    <div className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-navy-900 shadow-sm ring-1 ring-slate-200">
                        {isRu ? 'Навыки следующего этапа' : 'Future Toolkit'}
                    </div>
                    <ProgramSectionHeader title={title} subtitle={subtitle} className="mb-8" />

                    <div className="grid gap-5 sm:grid-cols-2">
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                className={`${programCardClassName} rounded-[24px] border-slate-200/80 shadow-[0_20px_54px_-46px_rgba(15,23,42,0.45)] ${index === 0 ? 'sm:col-span-2 bg-white' : 'bg-white/85'}`}
                            >
                                <div className="mb-4">
                                    <IconWrapper icon={skill.icon} variant={index === 1 ? 'achievement' : 'navy'} size="sm" hoverable={false} />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-navy-900">
                                    {skill.title}
                                </h3>
                                <p className="text-sm leading-7 text-slate-600">
                                    {skill.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 rounded-[24px] border border-slate-200 bg-white px-5 py-5 shadow-[0_24px_60px_-48px_rgba(15,23,42,0.45)]">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-navy-500">
                            {isRu ? 'Логика развития' : 'Skills progression'}
                        </p>
                        <div className="mt-4 grid gap-3 md:grid-cols-3">
                            {timeline.map((step, index) => (
                                <div key={step} className="rounded-2xl bg-slate-50 px-4 py-4">
                                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
                                        {isRu ? `Шаг ${index + 1}` : `Step ${index + 1}`}
                                    </div>
                                    <div className="mt-2 text-sm font-medium leading-6 text-slate-700">
                                        {step}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="order-1 lg:order-2 lg:pt-8">
                    <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_28px_80px_-42px_rgba(15,23,42,0.4)]">
                        <div className="absolute left-6 top-6 z-10 flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <span
                                    key={skill.title}
                                    className="rounded-full bg-white/88 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-900 backdrop-blur-sm"
                                >
                                    {skill.title}
                                </span>
                            ))}
                        </div>
                        <ProgramFigure
                            src={proofImage || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000'}
                            alt="21st Century Skills"
                            caption={proofCaption}
                            aspectClassName="aspect-[4/5]"
                            sizes="(max-width: 1024px) 100vw, 620px"
                            className="[&>div]:rounded-none [&>div]:border-0 [&>figcaption]:px-6 [&>figcaption]:pb-5"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-12 border-t border-slate-200 pt-8">
                <Link
                    href="/programs/middle/it-steam"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-navy-700"
                >
                    {isRu ? 'Подробнее о треке IT & STEAM' : 'Explore the IT & STEAM track'}
                    <span aria-hidden className="text-base">
                        →
                    </span>
                </Link>
            </div>
        </ProgramSection>
    );
}
