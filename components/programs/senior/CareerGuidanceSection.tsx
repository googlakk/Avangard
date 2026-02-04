import { CareerGuidanceItem } from '@/lib/data/senior-program';
import { IconWrapper } from '@/lib/icon-wrapper';

interface CareerGuidanceSectionProps {
    items: CareerGuidanceItem[];
}

export default function CareerGuidanceSection({ items }: CareerGuidanceSectionProps) {
    return (
        <section className="py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Заголовок секции */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
                        Помогаем найти «СВОЕ» дело
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Персонализированный путь к успешной карьере
                    </p>
                </div>

                {/* Блоки профориентации */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                            {/* Иконка */}
                            <div className="mb-5">
                                <IconWrapper icon={item.icon} variant="senior" size="md" />
                            </div>

                            {/* Заголовок */}
                            <h3 className="text-xl md:text-2xl font-bold font-heading text-gray-900 mb-4">
                                {item.title}
                            </h3>

                            {/* Описание */}
                            <ul className="space-y-3">
                                {item.description.map((desc, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                                        <span className="text-navy-900 mt-1 shrink-0">→</span>
                                        <span>{desc}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Highlight */}
                            {item.highlight && (
                                <div className="mt-6 inline-flex items-center gap-2 bg-navy-900/5 text-navy-900 px-4 py-2 rounded-full text-sm font-bold">
                                    <span>✓</span>
                                    <span>{item.highlight}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
