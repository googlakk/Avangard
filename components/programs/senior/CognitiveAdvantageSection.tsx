import { CognitiveAdvantage } from '@/lib/data/senior-program';
import { IconWrapper } from '@/lib/icon-wrapper';

interface CognitiveAdvantageSectionProps {
    advantages: CognitiveAdvantage[];
}

export default function CognitiveAdvantageSection({ advantages }: CognitiveAdvantageSectionProps) {
    return (
        <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Заголовок секции */}
                <div className="text-center mb-12 max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
                        «Взлом» экзаменов через технологии мозга
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        Обычный ученик тратит на подготовку к экзаменам <span className="font-bold text-gray-900">4 часа</span>.
                        Ученик Intellect Senior — <span className="font-bold text-navy-900">1 час</span>. Как?
                    </p>
                </div>

                {/* Преимущества */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {advantages.map((advantage, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 rounded-3xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 border border-gray-100"
                        >
                            {/* Иконка */}
                            <div className="w-16 h-16 bg-navy-900 rounded-2xl flex items-center justify-center text-3xl mb-5">
                                <IconWrapper icon={advantage.icon} variant="senior" size="md" />
                            </div>

                            {/* Заголовок */}
                            <h3 className="text-xl md:text-2xl font-bold font-heading text-gray-900 mb-2">
                                {advantage.title}
                            </h3>

                            {/* Подзаголовок */}
                            <p className="text-sm text-navy-900/70 mb-4 font-medium">
                                {advantage.subtitle}
                            </p>

                            {/* Описание */}
                            <ul className="space-y-2 mb-6">
                                {advantage.description.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                                        <span className="text-navy-900 mt-1">✓</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Benefit badge */}
                            <div className="bg-white border-2 border-navy-900 text-navy-900 px-4 py-2 rounded-full text-sm font-bold text-center">
                                {advantage.benefit}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Дополнительный акцент */}
                <div className="mt-12 text-center">
                    <div className="inline-block bg-navy-900 text-white px-8 py-4 rounded-full">
                        <p className="text-lg font-bold">
                            Умение учиться важнее самих знаний
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
