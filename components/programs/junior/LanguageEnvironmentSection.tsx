'use client';

import { motion } from 'framer-motion';
import { LanguageFeature } from '@/lib/data/junior-program';

interface LanguageEnvironmentSectionProps {
    features: LanguageFeature[];
}

export default function LanguageEnvironmentSection({ features }: LanguageEnvironmentSectionProps) {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Заголовок секции */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4 font-heading">
                        Языковая среда и международные стандарты
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Наше ключевое отличие — не «уроки английского», а <span className="font-bold text-navy-900 font-ibm-plex-serif">жизнь на английском</span>
                    </p>
                </div>

                {/* Карточки особенностей */}
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                        >
                            {/* Иконка */}
                            <div className="w-16 h-16 bg-navy-50 rounded-2xl flex items-center justify-center mb-6 text-4xl transform hover:rotate-12 transition-transform duration-300 text-navy-900 border border-navy-100">
                                {feature.icon}
                            </div>

                            {/* Заголовок */}
                            <h3 className="text-2xl font-bold text-navy-900 mb-2">
                                {feature.title}
                            </h3>

                            {/* Подзаголовок */}
                            <p className="text-sm uppercase tracking-wider text-navy-600 font-semibold mb-4">
                                {feature.subtitle}
                            </p>

                            {/* Highlight Badge (опционально) */}
                            {feature.highlight && (
                                <div className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold mb-4">
                                    ⭐ {feature.highlight}
                                </div>
                            )}

                            {/* Описание */}
                            <ul className="space-y-3">
                                {feature.description.map((item, idx) => (
                                    <li key={idx} className="flex items-start text-gray-700">
                                        <span className="text-green-500 mr-3 mt-1 flex-shrink-0">✓</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Дополнительный акцент */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16 bg-navy-900 rounded-3xl p-10 text-white text-center shadow-xl"
                >
                    <p className="text-2xl md:text-3xl font-bold mb-4 font-ibm-plex-serif">
                        🌍 К концу 4 класса — свободное владение английским языком
                    </p>
                    <p className="text-lg opacity-90">
                        Ребенок не просто знает грамматику, он живет в языковой среде каждый день
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
