import { IconWrapper } from '@/lib/icon-wrapper';
import { ProgramFigure, ProgramSection, ProgramSectionHeader, programCardClassName } from '@/components/programs/shared/ProgramSection';
import { useLanguage } from '@/contexts/LanguageContext';

interface AcademicPillar {
    icon: string;
    title: string;
    description: string;
    details: string[];
}

interface AcademicResultsProps {
    headline: string;
    description: string;
    timeframe: string;
    pillars: AcademicPillar[];
    proofImage: string;
    proofCaption: string;
    bottomStrong: string;
    bottomText: string;
}

export default function AcademicResults({
    headline,
    description,
    timeframe,
    pillars,
    proofImage,
    proofCaption,
    bottomStrong,
    bottomText
}: AcademicResultsProps) {
    const { language } = useLanguage();
    const isRu = language !== 'en';

    return (
        <ProgramSection tone="white" className="relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,rgba(49,86,163,0.08),transparent_42%)]" />

            <div className="relative grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                <div>
                    <div className="mb-4 inline-flex rounded-full bg-slate-100 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-900">
                        {isRu ? 'Академический трек' : 'Academic Track'}
                    </div>
                    <ProgramSectionHeader title={headline} subtitle={description} className="mb-6" />

                    <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-[0_24px_60px_-48px_rgba(15,23,42,0.45)]">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                            {isRu ? 'Горизонт подготовки' : 'Preparation Horizon'}
                        </p>
                        <p className="mt-3 text-lg font-medium leading-8 text-navy-900">
                            {timeframe}
                        </p>
                        <p className="mt-4 text-sm leading-7 text-slate-600">
                            {bottomStrong} {bottomText}
                        </p>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {pillars.map((pillar, index) => (
                            <div
                                key={index}
                                className={`rounded-[24px] border p-5 shadow-[0_18px_48px_-42px_rgba(15,23,42,0.45)] ${index === 0 ? 'sm:col-span-2' : ''} ${index === 1 ? 'border-navy-900 bg-navy-900 text-white' : 'border-slate-200 bg-white'}`}
                            >
                                <div className="mb-4">
                                    <IconWrapper icon={pillar.icon} variant={index === 1 ? 'achievement' : 'navy'} size="sm" hoverable={false} />
                                </div>

                                <h3 className={`mb-2 font-heading text-xl font-semibold ${index === 1 ? 'text-white' : 'text-navy-900'}`}>
                                    {pillar.title}
                                </h3>

                                <p className={`mb-4 text-sm leading-7 ${index === 1 ? 'text-white/80' : 'text-slate-600'}`}>
                                    {pillar.description}
                                </p>

                                <ul className="space-y-2">
                                    {pillar.details.map((detail, idx) => (
                                        <li key={idx} className={`flex items-start gap-2 text-sm ${index === 1 ? 'text-white/82' : 'text-slate-700'}`}>
                                            <span className={`mt-0.5 ${index === 1 ? 'text-amber-300' : 'text-navy-900'}`}>•</span>
                                            <span className="leading-relaxed">{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:pt-8">
                    <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_28px_80px_-42px_rgba(15,23,42,0.4)]">
                        <ProgramFigure
                            src={proofImage}
                            alt="Расписание с интегрированной подготовкой к экзаменам"
                            caption={proofCaption}
                            aspectClassName="aspect-[4/4.3]"
                            sizes="(max-width: 1024px) 100vw, 640px"
                            className="[&>div]:rounded-none [&>div]:border-0 [&>figcaption]:px-6 [&>figcaption]:pb-5"
                        />
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
                        <div className="rounded-[26px] border border-slate-200 bg-slate-50 p-6">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-navy-500">
                                {isRu ? 'Admissions dossier' : 'Admissions Dossier'}
                            </p>
                            <p className="mt-3 text-base leading-7 text-slate-700">
                                {isRu
                                    ? 'Senior stage собирает в одну систему экзамены, академический английский, science-подготовку и доказательные результаты.'
                                    : 'Senior stage unifies exams, academic English, science preparation, and evidence-based outcomes into one system.'}
                            </p>
                        </div>
                        <div className="rounded-[26px] bg-gradient-to-br from-amber-200 to-amber-100 p-6 text-navy-950">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-navy-700">
                                {isRu ? 'Финальная цель' : 'End Goal'}
                            </p>
                            <p className="mt-3 text-base font-medium leading-7">
                                {isRu
                                    ? 'Не просто высокий балл, а сильная университетская траектория с ясным профилем ученика.'
                                    : 'Not just higher scores, but a strong university trajectory with a clear student profile.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ProgramSection>
    );
}
