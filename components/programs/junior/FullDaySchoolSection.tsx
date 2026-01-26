'use client';

import { motion } from 'framer-motion';
import { FullDayFeature } from '@/lib/data/junior-program';

interface FullDaySchoolSectionProps {
    features: FullDayFeature[];
}

export default function FullDaySchoolSection({ features }: FullDaySchoolSectionProps) {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Заголовок секции */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4 font-heading">
                        Школа полного дня
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Режим с 08:00 до 17:00 — школа берет на себя все заботы об обучении и досуге ребенка
                    </p>
                </div>

                {/* Карточки особенностей */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                        >
                            {/* Иконка */}
                            <div className="w-20 h-20 bg-navy-50 text-navy-900 rounded-2xl flex items-center justify-center mb-6 text-4xl shadow-sm border border-navy-100">
                                {feature.icon}
                            </div>

                            {/* Заголовок */}
                            <h3 className="text-2xl font-bold text-navy-900 mb-2">
                                {feature.title}
                            </h3>

                            {/* Подзаголовок */}
                            <p className="text-sm font-semibold text-navy-600 mb-2">
                                {feature.subtitle}
                            </p>

                            {/* Время (если есть) */}
                            {feature.time && (
                                <div className="inline-block px-4 py-2 bg-navy-50 text-navy-800 rounded-full text-sm font-bold mb-4">
                                    🕐 {feature.time}
                                </div>
                            )}

                            {/* Описание */}
                            <ul className="space-y-3 mb-6">
                                {feature.description.map((item, idx) => (
                                    <li key={idx} className="flex items-start text-gray-700">
                                        <span className="text-navy-500 mr-3 mt-1 flex-shrink-0 text-xl">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Преимущества (если есть) */}
                            {feature.benefits && (
                                <div className="pt-4 border-t border-gray-200">
                                    <div className="flex flex-wrap gap-2">
                                        {feature.benefits.map((benefit, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold"
                                            >
                                                ✓ {benefit}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Акцент на освобождении родителей */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-navy-900 rounded-3xl p-10 md:p-14 text-white text-center shadow-xl"
                >
                    <div className="text-5xl mb-6">🏡</div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">
                        Родители освобождены от вечерних уроков
                    </h3>
                    <p className="text-xl md:text-2xl opacity-95 max-w-3xl mx-auto">
                        Дома вы только отдыхаете и общаетесь с ребенком — все домашние задания выполняются в школе под присмотром преподавателей
                    </p>
                </motion.div>

                {/* Дополнительная информация */}
                <div className="mt-16 grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}

                        className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
                    >
                        <h4 className="text-2xl font-bold text-navy-900 mb-4 flex items-center">
                            <span className="text-3xl mr-3">🔒</span>
                            Безопасность
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                            Закрытая территория с контролируемым доступом. Система входa Face ID обеспечивает
                            безопасность детей. Постоянное медицинское сопровождение и контроль.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}

                        className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
                    >
                        <h4 className="text-2xl font-bold text-navy-900 mb-4 flex items-center">
                            <span className="text-3xl mr-3">❤️</span>
                            Здоровье детей
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                            Личные шкафчики позволяют не носить тяжелые рюкзаки — это сохраняет здоровую осанку.
                            Сбалансированное питание и медицинский контроль на протяжении всего дня.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
