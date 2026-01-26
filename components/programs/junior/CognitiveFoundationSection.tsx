import Image from 'next/image';
import { CognitiveFoundationFeature } from '@/lib/data/junior-program';

interface CognitiveFoundationSectionProps {
    features: CognitiveFoundationFeature[];
    photoProof: {
        image: string;
        caption: string;
    };
}

export default function CognitiveFoundationSection({ features, photoProof }: CognitiveFoundationSectionProps) {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                {/* Заголовок секции */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
                        Разгоняем мозг, пока он пластичен
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        В возрасте 6–10 лет мозг развивается быстрее всего. Мы используем это окно возможностей:
                    </p>
                </div>

                {/* Сетка с фичами - 3 колонки */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="relative bg-navy-900 text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden"
                        >
                            {/* Декоративный элемент */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>

                            {/* Иконка */}
                            <div className="text-6xl mb-4 relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>

                            {/* Статистика если есть */}
                            {feature.stats && (
                                <div className="mb-2">
                                    <span className="text-4xl font-ibm-plex-serif font-bold text-white">
                                        {feature.stats}
                                    </span>
                                </div>
                            )}

                            {/* Заголовок */}
                            <h3 className="text-2xl font-bold font-heading mb-2">
                                {feature.title}
                            </h3>

                            {/* Подзаголовок */}
                            <p className="text-sm text-gray-300 uppercase tracking-wider mb-4">
                                {feature.subtitle}
                            </p>

                            {/* Описание */}
                            <ul className="space-y-3 mb-4">
                                {feature.description.map((item, idx) => (
                                    <li key={idx} className="text-sm text-gray-200 flex items-start">
                                        <span className="text-white mr-2 flex-shrink-0">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Хайлайт бейдж если есть */}
                            {feature.highlight && (
                                <div className="mt-4">
                                    <span className="text-xs font-bold text-navy-900 bg-white px-3 py-1 rounded-full">
                                        ⭐ {feature.highlight}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Photo Proof */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-50 rounded-3xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold font-heading text-center text-gray-900 mb-6">
                            📸 Фото-доказательство
                        </h3>

                        <div className="relative h-96 rounded-2xl overflow-hidden mb-4">
                            <Image
                                src={photoProof.image}
                                alt={photoProof.caption}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <p className="text-center text-gray-700 italic">
                            {photoProof.caption}
                        </p>

                        <p className="text-center text-lg font-semibold text-navy-900 mt-6">
                            ➜ Мы учим не только читать и писать, мы тренируем мозг
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
