import Link from 'next/link';
import Image from 'next/image';
import { ProgramSection, ProgramSectionHeader } from '@/components/programs/shared/ProgramSection';
import { useLanguage } from '@/contexts/LanguageContext';

interface SelectiveAdmissionProps {
    headline: string;
    filterMessage: string;
    communityPromise: string;
    ctaText: string;
    ctaLink: string;
    communityValues: string[];
    proofImage: string;
    subText: string;
    proofCaption: string;
    bottomBoxTitle: string;
    bottomBoxText: string;
}

export default function SelectiveAdmission({
    headline,
    filterMessage,
    communityPromise,
    ctaText,
    ctaLink,
    communityValues,
    proofImage,
    subText,
    proofCaption,
    bottomBoxTitle,
    bottomBoxText
}: SelectiveAdmissionProps) {
    const { language } = useLanguage();
    const isRu = language !== 'en';

    return (
        <ProgramSection tone="white" className="relative overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(circle_at_bottom,rgba(250,204,21,0.10),transparent_36%)]" />
            <div className="mx-auto max-w-6xl">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
                    <div>
                        <div className="mb-4 inline-flex rounded-full bg-slate-100 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-900">
                            {isRu ? 'Selective community' : 'Selective Community'}
                        </div>
                        <ProgramSectionHeader title={headline} align="left" className="mb-6" />

                        <div className="mb-6 rounded-[26px] border border-slate-200 bg-slate-50 p-6 shadow-[0_20px_54px_-46px_rgba(15,23,42,0.45)]">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                {isRu ? 'Кого мы ищем' : 'Who We Look For'}
                            </p>
                            <p className="mt-3 text-base font-medium leading-8 text-navy-900 md:text-lg">
                                {filterMessage}
                            </p>
                        </div>

                        <p className="mb-6 text-base leading-relaxed text-slate-600 md:text-lg">
                            {communityPromise}
                        </p>

                        <div className="mb-8 flex flex-wrap gap-2">
                            {communityValues.map((value, index) => (
                                <div key={index} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
                                    {value}
                                </div>
                            ))}
                        </div>

                        <Link
                            href={ctaLink}
                            className="inline-flex items-center justify-center rounded-full bg-navy-900 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 md:px-8 md:py-4 md:text-base"
                        >
                            {ctaText}
                        </Link>

                        <p className="mt-4 text-xs leading-relaxed text-slate-500">
                            {subText}
                        </p>
                    </div>

                    <div>
                        <figure className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_28px_80px_-42px_rgba(15,23,42,0.4)]">
                            <div className="overflow-hidden bg-slate-50">
                                <Image
                                    src={proofImage}
                                    alt="Студент выступает на школьном мероприятии"
                                    width={800}
                                    height={600}
                                    className="h-auto w-full"
                                />
                            </div>
                            <figcaption className="px-6 py-5 text-sm text-slate-600">
                                {proofCaption}
                            </figcaption>
                        </figure>

                        <div className="mt-6 grid gap-4 md:grid-cols-[1.08fr_0.92fr]">
                            <div className="rounded-[26px] border border-slate-200 bg-navy-900 p-6 text-white">
                                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300">
                                    {isRu ? 'Почему это важно' : 'Why It Matters'}
                                </p>
                                <p className="font-heading text-base font-semibold">
                                    {bottomBoxTitle}
                                </p>
                                <p className="mt-3 text-sm leading-7 text-white/78">
                                    {bottomBoxText}
                                </p>
                            </div>
                            <div className="rounded-[26px] border border-slate-200 bg-gradient-to-br from-amber-100 to-white p-6 text-navy-900">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-navy-700">
                                    {isRu ? 'Следующий шаг' : 'Next Step'}
                                </p>
                                <p className="mt-3 text-sm leading-7 text-slate-700">
                                    {isRu
                                        ? 'Подача в senior — это вход в более сильную академическую и карьерную среду, а не просто перевод в следующий класс.'
                                        : 'Applying to senior means entering a stronger academic and career-oriented environment, not just moving to the next grade.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProgramSection>
    );
}
