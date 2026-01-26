import { UniversityPathwayBlock } from '@/lib/data/senior-program';

interface UniversityPathwaySectionProps {
    blocks: UniversityPathwayBlock[];
}

export default function UniversityPathwaySection({ blocks }: UniversityPathwaySectionProps) {
    return (
        <section className="py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Заголовок секции */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
                        Мы готовим не к экзаменам, а к поступлению
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        В 10-11 классе школа работает как Career Center
                    </p>
                </div>

                {/* Блоки стратегии */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {blocks.map((block, index) => (
                        <div
                            key={block.id}
                            className="bg-white rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 group"
                            style={{
                                animationDelay: `${index * 0.1}s`
                            }}
                        >
                            {/* Иконка */}
                            <div className="text-5xl mb-4">{block.icon}</div>

                            {/* Заголовок */}
                            <h3 className="text-xl md:text-2xl font-bold font-heading text-gray-900 mb-2">
                                {block.title}
                            </h3>

                            {/* Подзаголовок */}
                            <p className="text-sm uppercase tracking-wider text-navy-900/60 mb-4 font-medium">
                                {block.subtitle}
                            </p>

                            {/* Описание */}
                            <ul className="space-y-3">
                                {block.description.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-gray-600">
                                        <span className="text-navy-900 mt-1">•</span>
                                        <span className="text-sm md:text-base leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Highlight badge */}
                            {block.highlight && (
                                <div className="mt-6 inline-block bg-navy-900 text-white px-4 py-2 rounded-full text-sm font-medium">
                                    {block.highlight}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
