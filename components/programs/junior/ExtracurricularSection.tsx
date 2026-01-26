'use client';

import { motion } from 'framer-motion';
import { ExtracurricularActivity, MotivationSystem } from '@/lib/data/junior-program';

interface ExtracurricularSectionProps {
    activities: ExtracurricularActivity[];
    motivationSystems: MotivationSystem[];
}

export default function ExtracurricularSection({ activities, motivationSystems }: ExtracurricularSectionProps) {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Заголовок секции */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4 font-heading">
                        Внеклассная жизнь и Мотивация
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Кружки, секции и уникальная система мотивации для развития потенциала каждого ребенка
                    </p>
                </div>

                {/* Кружки и секции */}
                <div className="mb-16">
                    <h3 className="text-3xl font-bold text-navy-900 text-center mb-10">
                        Кружки и секции
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {activities.map((activity, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}

                                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                            >
                                {/* Иконка категории */}
                                <div className="text-6xl mb-6 text-center">
                                    {activity.icon}
                                </div>

                                {/* Категория */}
                                <h4 className="text-2xl font-bold text-navy-900 text-center mb-6">
                                    {activity.category}
                                </h4>

                                {/* Список активностей */}
                                <div className="flex flex-wrap gap-3 justify-center">
                                    {activity.activities.map((item, idx) => (
                                        <span
                                            key={idx}
                                            className="px-4 py-2 bg-white border border-gray-200 text-navy-800 rounded-full text-sm font-semibold hover:bg-gray-50 transition-all duration-300 cursor-default"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Система мотивации */}
                <div>
                    <h3 className="text-3xl font-bold text-navy-900 text-center mb-10">
                        Система мотивации
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        {motivationSystems.map((system, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="relative overflow-hidden"
                            >
                                {/* Фоновый градиент */}
                                <div className="absolute inset-0 bg-white rounded-3xl border border-gray-200"></div>

                                {/* Контент */}
                                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white">
                                    {/* Иконка */}
                                    <div className="text-5xl mb-4">{system.icon}</div>

                                    {/* Заголовок */}
                                    <h4 className="text-2xl font-bold text-navy-900 mb-4">
                                        {system.title}
                                    </h4>

                                    {/* Описание */}
                                    <p className="text-gray-700 leading-relaxed mb-6">
                                        {system.description}
                                    </p>

                                    {/* Преимущество */}
                                    <div className="bg-navy-800 text-white rounded-2xl p-4">
                                        <p className="font-semibold flex items-start">
                                            <span className="mr-2 text-xl">✓</span>
                                            <span>{system.benefit}</span>
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Дополнительный акцент */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}

                    className="mt-16 bg-navy-900 rounded-3xl p-10 md:p-14 text-white text-center shadow-xl"
                >
                    <div className="text-5xl mb-6">🌟</div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">
                        Культура похвалы — основа нашей философии
                    </h3>
                    <p className="text-xl md:text-2xl opacity-95 max-w-3xl mx-auto mb-6">
                        Мы хвалим за старание, а не только за результат
                    </p>
                    <p className="text-lg opacity-90 max-w-2xl mx-auto">
                        Это формирует у ребенка уверенность в себе и отсутствие страха перед ошибками —
                        ключевые качества для успешного будущего
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
