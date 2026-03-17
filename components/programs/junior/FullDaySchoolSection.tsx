'use client';

import { IconWrapper } from '@/lib/icon-wrapper';
import { motion } from 'framer-motion';
import { FullDayFeature } from '@/lib/data/junior-program';
import { useLanguage } from '@/contexts/LanguageContext';
import { getJuniorContent } from '@/lib/content/junior-content';

interface FullDaySchoolSectionProps {
    features: FullDayFeature[];
}

export default function FullDaySchoolSection({ features }: FullDaySchoolSectionProps) {
    const { language } = useLanguage();
    const copy = getJuniorContent(language).ui.fullDay;

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4 font-heading">
                        {copy.title}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {copy.subtitle}
                    </p>
                </div>

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
                            <div className="w-20 h-20 bg-navy-50 text-navy-900 rounded-2xl flex items-center justify-center mb-6 text-4xl shadow-sm border border-navy-100">
                                <IconWrapper icon={feature.icon} variant="junior" size="md" />
                            </div>

                            <h3 className="text-2xl font-bold text-navy-900 mb-2">
                                {feature.title}
                            </h3>

                            <p className="text-sm font-semibold text-navy-600 mb-2">
                                {feature.subtitle}
                            </p>

                            {feature.time && (
                                <div className="inline-block px-4 py-2 bg-navy-50 text-navy-800 rounded-full text-sm font-bold mb-4">
                                    🕐 {feature.time}
                                </div>
                            )}

                            <ul className="space-y-3 mb-6">
                                {feature.description.map((item, idx) => (
                                    <li key={idx} className="flex items-start text-gray-700">
                                        <span className="text-navy-500 mr-3 mt-1 flex-shrink-0 text-xl">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

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

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-navy-900 rounded-3xl p-10 md:p-14 text-white text-center shadow-xl"
                >
                    <div className="text-5xl mb-6">🏡</div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">
                        {copy.highlightTitle}
                    </h3>
                    <p className="text-xl md:text-2xl opacity-95 max-w-3xl mx-auto">
                        {copy.highlightDescription}
                    </p>
                </motion.div>

                <div className="mt-16 grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}

                        className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
                    >
                        <h4 className="text-2xl font-bold text-navy-900 mb-4 flex items-center">
                            <span className="text-3xl mr-3">🔒</span>
                            {copy.safetyTitle}
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                            {copy.safetyDescription}
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
                            {copy.healthTitle}
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                            {copy.healthDescription}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
