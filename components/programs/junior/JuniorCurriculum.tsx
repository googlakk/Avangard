'use client';

import { IconWrapper } from '@/lib/icon-wrapper';
import { useLanguage } from '@/contexts/LanguageContext';
import { getJuniorContent } from '@/lib/content/junior-content';

interface CurriculumBlock {
    icon: string;
    title: string;
    subtitle: string;
    description: string[];
    stats?: string;
}

interface JuniorCurriculumProps {
    blocks: CurriculumBlock[];
}

export default function JuniorCurriculum({ blocks }: JuniorCurriculumProps) {
    const { language } = useLanguage();
    const copy = getJuniorContent(language).ui.curriculumIntro;

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                        {copy.title}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {copy.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {blocks.map((block, index) => (
                        <div
                            key={index}
                            className="group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
                        >
                            <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                <IconWrapper icon={block.icon} variant="white" size="md" />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {block.title}
                            </h3>

                            <p className="text-sm font-medium text-navy-600 uppercase tracking-wide mb-4">
                                {block.subtitle}
                            </p>

                            <ul className="space-y-2 mt-auto pt-4">
                                {block.description.map((item, idx) => (
                                    <li key={idx} className="flex items-start text-sm text-gray-700">
                                        <svg
                                            className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {block.stats && (
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <p className="text-2xl font-bold text-navy-900">
                                        {block.stats}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
