import { ProgramFigure, ProgramSection, ProgramSectionHeader, programCardClassName } from '@/components/programs/shared/ProgramSection';
import { useLanguage } from '@/contexts/LanguageContext';

interface CognitiveAdvantage {
    title: string;
    tagline: string;
    description: string;
    benefits: string[];
    multiplier?: string;
}

interface CognitiveSuperiorityAIProps {
    headline: string;
    hook: string;
    advantages: CognitiveAdvantage[];
    proofImage: string;
    proofCaption: string;
    bottomTitle: string;
    bottomText: string;
}

export default function CognitiveSuperiorityAI({
    headline,
    hook,
    advantages,
    proofImage,
    proofCaption,
    bottomTitle,
    bottomText
}: CognitiveSuperiorityAIProps) {
    const { language } = useLanguage();
    const isRu = language !== 'en';

    return (
        <ProgramSection tone="muted" className="relative overflow-hidden">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(49,86,163,0.08),transparent_52%)]" />

            <div className="relative grid items-start gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
                <div>
                    <div className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-900 shadow-sm ring-1 ring-slate-200">
                        {isRu ? 'Senior Lab' : 'Senior Lab'}
                    </div>
                    <ProgramSectionHeader title={headline} subtitle={hook} className="mb-6" />

                    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-48px_rgba(15,23,42,0.45)]">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                            {isRu ? 'Как это работает' : 'How It Works'}
                        </p>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            {isRu
                                ? 'Здесь cognitive training и AI-инструменты встроены в реальную академическую нагрузку, а не существуют отдельно как факультатив.'
                                : 'Here, cognitive training and AI tools are embedded into the real academic load, not isolated as extras.'}
                        </p>
                    </div>

                    <div className="mt-6 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_28px_80px_-42px_rgba(15,23,42,0.4)]">
                        <ProgramFigure
                            src={proofImage || 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?q=80&w=2000'}
                            alt="Студент за учебой"
                            caption={proofCaption}
                            aspectClassName="aspect-[4/4.5]"
                            sizes="(max-width: 1024px) 100vw, 560px"
                            className="[&>div]:rounded-none [&>div]:border-0 [&>figcaption]:px-6 [&>figcaption]:pb-5"
                        />
                    </div>
                </div>

                <div className="lg:pt-8">
                    <ol className="space-y-5">
                        {advantages.map((advantage, index) => (
                            <li
                                key={index}
                                className={`${programCardClassName} rounded-[28px] border-slate-200/80 shadow-[0_22px_54px_-44px_rgba(15,23,42,0.4)] ${index === 0 ? 'bg-white' : 'bg-white/80'}`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-sm font-semibold text-navy-900">
                                        {index + 1}
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="mb-1 font-heading text-xl font-semibold text-navy-900">
                                            {advantage.title}
                                        </h3>
                                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                                            {advantage.tagline}
                                        </p>

                                        <p className="mt-3 text-sm leading-7 text-slate-600">
                                            {advantage.description}
                                        </p>

                                        <ul className="mt-4 space-y-2">
                                            {advantage.benefits.map((benefit, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                                                    <span className="mt-0.5 text-navy-900">•</span>
                                                    <span className="leading-relaxed">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {advantage.multiplier ? (
                                            <div className="mt-4 inline-flex rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-navy-900 ring-1 ring-inset ring-slate-200">
                                                {advantage.multiplier}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>

                    <div className="mt-8 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                        <div className="rounded-[26px] border border-slate-200 bg-navy-900 p-7 text-white shadow-[0_28px_70px_-42px_rgba(15,23,42,0.65)]">
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300">
                                {isRu ? 'Результат для senior' : 'Senior Outcome'}
                            </p>
                            <p className="font-heading text-lg font-semibold">
                                {bottomTitle}
                            </p>
                            <p className="mt-3 text-sm leading-7 text-white/78 md:text-base">
                                {bottomText}
                            </p>
                        </div>
                        <div className="rounded-[26px] border border-slate-200 bg-white p-7">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                {isRu ? 'Профиль выпускника' : 'Graduate Profile'}
                            </p>
                            <p className="mt-3 text-base leading-7 text-slate-700">
                                {isRu
                                    ? 'Более быстрый анализ, устойчивый фокус и уверенное использование AI как инструмента, а не костыля.'
                                    : 'Faster analysis, steadier focus, and confident use of AI as a tool rather than a crutch.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ProgramSection>
    );
}
