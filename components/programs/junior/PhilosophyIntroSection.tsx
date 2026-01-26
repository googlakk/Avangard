'use client';

import { motion } from 'framer-motion';

export default function PhilosophyIntroSection() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Заголовок */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6 font-heading">
                        Философия: Фундамент будущего гения
                    </h2>
                </motion.div>

                {/* Основной контент */}
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}

                        className="bg-white rounded-3xl p-10 md:p-14 shadow-xl mb-12 border border-gray-100"
                    >
                        <p className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-8">
                            Начальная школа <span className="font-bold text-navy-700">Intellect Junior</span> — это пространство,
                            где мы не просто даем знания, а <span className="font-bold">формируем архитектуру мозга ребенка</span>.
                        </p>

                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                            В возрасте от <span className="font-bold text-navy-900">6 до 10 лет</span> мозг обладает максимальной
                            нейропластичностью, и наша задача — использовать этот период для развития когнитивных способностей,
                            критического мышления и любви к учебе.
                        </p>

                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                            <p className="text-lg text-gray-800 leading-relaxed">
                                Мы объединили <span className="font-semibold text-navy-600">государственный образовательный стандарт</span>,
                                методики <span className="font-semibold text-navy-600">Cambridge International</span> и
                                авторские курсы <span className="font-semibold text-navy-600">когнитивного развития</span> в
                                единую <span className="font-bold text-navy-900">экосистему полного дня</span>.
                            </p>
                        </div>
                    </motion.div>

                    {/* Ключевые показатели */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-center"
                        >
                            <div className="w-20 h-20 bg-navy-50 text-navy-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-navy-100">
                                <span className="text-4xl">🧠</span>
                            </div>
                            <h3 className="text-2xl font-bold text-navy-900 mb-2">
                                Нейропластичность
                            </h3>
                            <p className="text-gray-600">
                                Используем максимальную способность мозга к обучению в возрасте 6-10 лет
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-center"
                        >
                            <div className="w-20 h-20 bg-navy-50 text-navy-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-navy-100">
                                <span className="text-4xl">🌍</span>
                            </div>
                            <h3 className="text-2xl font-bold text-navy-900 mb-2">
                                Международные стандарты
                            </h3>
                            <p className="text-gray-600">
                                Cambridge International + МОиН КР в одной программе
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-center"
                        >
                            <div className="w-20 h-20 bg-navy-50 text-navy-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-navy-100">
                                <span className="text-4xl">❤️</span>
                            </div>
                            <h3 className="text-2xl font-bold text-navy-900 mb-2">
                                Любовь к учебе
                            </h3>
                            <p className="text-gray-600">
                                Формируем внутреннюю мотивацию и радость от познания
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
