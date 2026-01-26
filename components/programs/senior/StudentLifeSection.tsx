import { StudentLifeFeature } from '@/lib/data/senior-program';

interface StudentLifeSectionProps {
    features: StudentLifeFeature[];
}

export default function StudentLifeSection({ features }: StudentLifeSectionProps) {
    return (
        <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Заголовок секции */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
                        Сообщество лидеров
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Здесь нет «детей». Здесь есть партнеры.
                    </p>
                </div>

                {/* Особенности студенческой жизни */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 md:p-8 overflow-hidden group hover:shadow-lg transition-all duration-300"
                        >
                            {/* Декоративный элемент */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-navy-900/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>

                            <div className="relative z-10">
                                {/* Иконка */}
                                <div className="text-5xl mb-4">{feature.icon}</div>

                                {/* Заголовок */}
                                <h3 className="text-xl md:text-2xl font-bold font-heading text-gray-900 mb-2">
                                    {feature.title}
                                </h3>

                                {/* Подзаголовок */}
                                <p className="text-sm text-navy-900/60 uppercase tracking-wider mb-4 font-medium">
                                    {feature.subtitle}
                                </p>

                                {/* Описание */}
                                <ul className="space-y-2 mb-6">
                                    {feature.description.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                                            <span className="text-navy-900 mt-1">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Benefit badge */}
                                {feature.benefit && (
                                    <div className="bg-navy-900 text-white px-4 py-2 rounded-full text-sm font-bold inline-block">
                                        {feature.benefit}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Дополнительная информация */}
                <div className="mt-12 text-center bg-navy-900 text-white py-8 px-6 rounded-3xl">
                    <p className="text-lg md:text-xl font-bold mb-2">
                        Атмосфера взрослой жизни и ответственности
                    </p>
                    <p className="text-gray-300">
                        Мы готовим не школьников, а будущих студентов и профессионалов
                    </p>
                </div>
            </div>
        </section>
    );
}
