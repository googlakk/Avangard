'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PhilosophySection() {
    const { t } = useLanguage();

    // Философия образования
    const philosophy = [
        {
            id: 1,
            title: t.philosophy.memory.title,
            description: t.philosophy.memory.description,
            image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800',
            badge: t.philosophy.memory.badge,
        },
        {
            id: 2,
            title: t.philosophy.criticalThinking.title,
            description: t.philosophy.criticalThinking.description,
            image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800',
            badge: t.philosophy.criticalThinking.badge,
        },
        {
            id: 3,
            title: t.philosophy.gamification.title,
            description: t.philosophy.gamification.description,
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800',
            badge: t.philosophy.gamification.badge,
        },
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Заголовок */}
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900">
                        {t.philosophy.title}
                    </h2>
                    <button className="text-gray-600 hover:text-gray-900 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Сетка */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {philosophy.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                            {/* Изображение с бейджем */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Бейдж */}
                                <div className="absolute top-4 left-4">
                                    <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                                        {item.badge}
                                    </span>
                                </div>
                            </div>

                            {/* Текст */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                    {item.description}
                                </p>

                                {/* Кнопка */}
                                <button className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg">
                                    {t.philosophy.learnMore}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
