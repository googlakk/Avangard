'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { getSitePageContent } from '@/lib/content/site-pages';

export default function FAQPage() {
    const { language } = useLanguage();
    const copy = getSitePageContent(language).parents.faq;
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <main className="min-h-screen">
            <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/api/placeholder/1920/1080"
                    alt={copy.heroAlt}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-navy-900/80" />
                <div className="relative container mx-auto px-4 text-center text-white z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-4xl md:text-6xl mb-6"
                    >
                        {copy.heroTitle}
                    </motion.h1>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="space-y-4">
                        {copy.items.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <div className="p-6 flex justify-between items-center">
                                    <h3 className="font-heading font-bold text-lg text-navy-900 pr-8">{faq.question}</h3>
                                    <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-transform duration-300 ${openIndex === index ? 'rotate-180 bg-amber-100' : ''}`}>
                                        <svg className={`w-4 h-4 ${openIndex === index ? 'text-amber-600' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
