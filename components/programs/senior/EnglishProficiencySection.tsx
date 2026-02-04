import { EnglishProficiencyBlock } from '@/lib/data/senior-program';
import { IconWrapper } from '@/lib/icon-wrapper';

interface EnglishProficiencySectionProps {
    blocks: EnglishProficiencyBlock[];
}

export default function EnglishProficiencySection({ blocks }: EnglishProficiencySectionProps) {
    return (
        <section className="py-16 md:py-20 bg-gradient-to-br from-navy-900 to-navy-800 text-white">
            <div className="container mx-auto px-4">
                {/* Заголовок секции */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                        English for Academic Purposes
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                        Английский как рабочий инструмент для академического и профессионального успеха
                    </p>
                </div>

                {/* Блоки английского */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {blocks.map((block, index) => (
                        <div
                            key={index}
                            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 hover:bg-white/15 transition-all duration-300"
                        >
                            {/* Иконка */}
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mb-5">
                                <IconWrapper icon={block.icon} variant="senior" size="md" />
                            </div>

                            {/* Заголовок */}
                            <h3 className="text-xl md:text-2xl font-bold font-heading mb-2">
                                {block.title}
                            </h3>

                            {/* Подзаголовок */}
                            <p className="text-sm text-gray-300 mb-4 font-medium">
                                {block.subtitle}
                            </p>

                            {/* Описание */}
                            <ul className="space-y-2 mb-6">
                                {block.description.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-gray-200 text-sm">
                                        <span className="text-white mt-1 shrink-0">✓</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Target badge */}
                            {block.target && (
                                <div className="bg-white text-navy-900 px-4 py-2 rounded-full text-sm font-bold text-center">
                                    🎯 {block.target}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Дополнительный акцент */}
                <div className="mt-12 text-center">
                    <div className="inline-block bg-white/10 backdrop-blur-xl border border-white/30 px-8 py-4 rounded-full">
                        <p className="text-lg font-bold">
                            Цель: уровень C1 к выпуску — свободное владение языком
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
