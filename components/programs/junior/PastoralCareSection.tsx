'use client';

import { IconWrapper } from '@/lib/icon-wrapper';

interface CareItem {
    icon: string;
    title: string;
    description: string;
}

interface PastoralCareProps {
    items: CareItem[];
}

export default function PastoralCareSection({ items }: PastoralCareProps) {
    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
                {/* Заголовок секции */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                        Забота о каждом ребенке
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Создаем безопасную и поддерживающую среду, где каждый ребенок чувствует себя ценным
                    </p>
                </div>

                {/* 4 карточки */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100 group"
                        >
                            {/* Иконка */}
                            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                <IconWrapper icon={item.icon} variant="junior" size="md" />
                            </div>

                            {/* Заголовок */}
                            <h3 className="text-lg font-bold text-gray-900 mb-3">
                                {item.title}
                            </h3>

                            {/* Описание */}
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
