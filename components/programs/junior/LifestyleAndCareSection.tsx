import Image from 'next/image';
import { LifestyleCareFeature } from '@/lib/data/junior-program';

interface LifestyleAndCareSectionProps {
    features: LifestyleCareFeature[];
    photoProof: {
        images: { src: string; caption: string }[];
        message: string;
    };
}

export default function LifestyleAndCareSection({ features, photoProof }: LifestyleAndCareSectionProps) {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Заголовок секции */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
                        Школа остается в школе. Вечер — для семьи.
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Мы бережем ваше время и спины детей
                    </p>
                </div>

                {/* Сетка с фичами */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                            {/* Иконка */}
                            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>

                            {/* Заголовок */}
                            <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">
                                {feature.title}
                            </h3>

                            {/* Подзаголовок */}
                            <p className="text-sm text-navy-900/60 uppercase tracking-wider mb-3">
                                {feature.subtitle}
                            </p>

                            {/* Описание */}
                            <ul className="space-y-2">
                                {feature.description.map((item, idx) => (
                                    <li key={idx} className="text-sm text-gray-700 flex items-start">
                                        <span className="text-navy-900 mr-2 flex-shrink-0">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Бейдж бенефита если есть */}
                            {feature.benefit && (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <span className="text-xs font-bold text-navy-900 bg-navy-900/10 px-3 py-1 rounded-full">
                                        ✨ {feature.benefit}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Photo Proof - Две фотографии рядом */}
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white rounded-3xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold font-heading text-center text-gray-900 mb-6">
                            📸 Фото-доказательство
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                            {photoProof.images.map((photo, index) => (
                                <div key={index} className="relative">
                                    <div className="relative h-64 rounded-xl overflow-hidden">
                                        <Image
                                            src={photo.src}
                                            alt={photo.caption}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <p className="text-sm text-gray-600 text-center mt-3 italic">
                                        {photo.caption}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <p className="text-center text-lg font-semibold text-navy-900 mt-6">
                            ➜ {photoProof.message}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
