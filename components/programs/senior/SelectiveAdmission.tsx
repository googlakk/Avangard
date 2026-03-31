import Link from 'next/link';
import Image from 'next/image';
import { ProgramSection, ProgramSectionHeader } from '@/components/programs/shared/ProgramSection';

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
    return (
        <ProgramSection tone="white">
            <div className="mx-auto max-w-6xl">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    <div>
                        <ProgramSectionHeader title={headline} align="left" className="mb-6" />

                        <div className="mb-6 border-l-4 border-navy-900/20 bg-slate-50 p-6">
                            <p className="text-base font-medium leading-relaxed text-navy-900 md:text-lg">
                                {filterMessage}
                            </p>
                        </div>

                        <p className="mb-6 text-base leading-relaxed text-slate-600 md:text-lg">
                            {communityPromise}
                        </p>

                        <div className="mb-8 flex flex-wrap gap-2">
                            {communityValues.map((value, index) => (
                                <div
                                    key={index}
                                    className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
                                >
                                    {value}
                                </div>
                            ))}
                        </div>

                        <Link
                            href={ctaLink}
                            className="inline-flex items-center justify-center rounded-lg bg-navy-900 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 md:px-8 md:py-4 md:text-base"
                        >
                            {ctaText}
                        </Link>

                        <p className="mt-4 text-xs leading-relaxed text-slate-500">
                            {subText}
                        </p>
                    </div>

                    <div>
                        <figure>
                            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                                <Image
                                    src={proofImage}
                                    alt="Студент выступает на школьном мероприятии"
                                    width={800}
                                    height={600}
                                    className="h-auto w-full"
                                />
                            </div>
                            <figcaption className="mt-3 text-sm text-slate-600">
                                {proofCaption}
                            </figcaption>
                        </figure>

                        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-navy-900">
                            <p className="mb-2 font-heading text-base font-semibold">
                                {bottomBoxTitle}
                            </p>
                            <p className="text-sm leading-relaxed text-slate-600">
                                {bottomBoxText}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ProgramSection>
    );
}
