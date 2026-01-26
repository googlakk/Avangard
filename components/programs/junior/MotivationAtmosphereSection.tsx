import Image from 'next/image';
import { MotivationCultureFeature } from '@/lib/data/junior-program';

interface MotivationAtmosphereSectionProps {
    features: MotivationCultureFeature[];
    photoProof: {
        image: string;
        caption: string;
    };
}

export default function MotivationAtmosphereSection({ features, photoProof }: MotivationAtmosphereSectionProps) {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Заголовок секции */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
                        Учеба как увлекательная игра
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Мы не заставляем — мы вовлекаем через геймификацию
                    </p>
                </div>

                {/* Сетка с фичами - 3 колонки */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                            {/* Иконка */}
                            <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>

                            {/* Заголовок */}
                            <h3 className="text-2xl font-bold font-heading text-gray-900 mb-2">
                                {feature.title}
                            </h3>

                            {/* Подзаголовок */}
                            <p className="text-sm text-navy-900/60 uppercase tracking-wider mb-4">
                                {feature.subtitle}
                            </p>

                            {/* Описание */}
                            <ul className="space-y-3 mb-4">
                                {feature.description.map((item, idx) => (
                                    <li key={idx} className="text-sm text-gray-700 flex items-start">
                                        <span className="text-navy-900 mr-2 flex-shrink-0">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Пример если есть */}
                            {feature.example && (
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <p className="text-xs text-gray-600 italic bg-gray-50 p-3 rounded-lg">
                                        <strong className="text-navy-900">Пример:</strong><br />
                                        {feature.example}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Photo Proof */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl p-6 shadow-lg">
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

                        <p className="text-center text-gray-700 italic mb-4">
                            {photoProof.caption}
                        </p>

                        <p className="text-center text-lg font-semibold text-navy-900">
                            ➜ Ребенок бежит в школу с радостью, ему здесь нравится побеждать
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
