'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { AcademicBlock } from '@/lib/data/junior-program';

interface AcademicProgramSectionProps {
    blocks: AcademicBlock[];
}

export default function AcademicProgramSection({ blocks }: AcademicProgramSectionProps) {
    const [activeBlock, setActiveBlock] = useState(0);

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Заголовок секции */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4 font-heading">
                        Академическая программа
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Обучение строится на интеграции трех компонентов: государственный стандарт, когнитивное развитие и IT-технологии
                    </p>
                </div>

                {/* Табы для переключения между блоками */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {blocks.map((block, index) => (
                        <button
                            key={block.id}
                            onClick={() => setActiveBlock(index)}
                            className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ${activeBlock === index
                                ? 'bg-navy-900 text-white shadow-xl scale-105'
                                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                }`}
                        >
                            <span className="mr-2 text-2xl">{block.icon}</span>
                            {block.title}
                        </button>
                    ))}
                </div>

                {/* Контент активного блока */}
                <motion.div
                    key={activeBlock}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-50 rounded-3xl p-10 md:p-14 border border-gray-100"
                >
                    {/* Заголовок блока */}
                    <div className="text-center mb-10">
                        <div className="inline-block px-6 py-2 bg-white rounded-full text-sm font-bold text-navy-900 mb-4 shadow-sm border border-gray-100">
                            {blocks[activeBlock].subtitle}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-navy-900 mb-2">
                            {blocks[activeBlock].title}
                        </h3>
                    </div>

                    {/* Предметы/Дисциплины */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {blocks[activeBlock].subjects.map((subject, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                {subject.icon && (
                                    <div className="text-4xl mb-3">{subject.icon}</div>
                                )}
                                <h4 className="text-xl font-bold text-navy-900 mb-2">
                                    {subject.name}
                                </h4>
                                <p className="text-gray-600 leading-relaxed">
                                    {subject.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Результат (если есть) */}
                    {blocks[activeBlock].result && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-navy-900 rounded-2xl p-6 text-white text-center"
                        >
                            <p className="text-xl md:text-2xl font-bold font-ibm-plex-serif">
                                🎯 {blocks[activeBlock].result}
                            </p>
                        </motion.div>
                    )}
                </motion.div>

                {/* Дополнительная информация */}
                <div className="mt-16 grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}

                        className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <h4 className="text-2xl font-bold text-navy-900 mb-4 font-heading">
                            💡 Brain Fitness
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                            Авторские дисциплины для развития мозга, эффективность которых доказана наукой
                            (Evidence-based education). Мы используем нейропластичность мозга для формирования
                            когнитивных способностей.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}

                        className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <h4 className="text-2xl font-bold text-navy-900 mb-4 font-heading">
                            📊 МОиН КР
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                            Мы обеспечиваем сильную академическую базу, соответствующую требованиям
                            Министерства образования и науки Кыргызской Республики. Наши ученики показывают
                            высокие результаты на олимпиадах.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
