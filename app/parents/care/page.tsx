'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { getSitePageContent } from '@/lib/content/site-pages';

export default function CarePage() {
    const { language } = useLanguage();
    const copy = getSitePageContent(language).parents.care;

    return (
        <main className="min-h-screen pt-[78px]">
            <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/рисует жуниор.jpg"
                    alt={copy.hero.imageAlt}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-navy-900/70" />
                <div className="relative container mx-auto px-4 text-center text-white z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-4xl md:text-6xl mb-6"
                    >
                        {copy.hero.title}
                    </motion.h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light">
                        {copy.hero.subtitle}
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2 relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="/api/placeholder/800/600"
                                alt={copy.security.imageAlt}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="md:w-1/2">
                            <div className="inline-block bg-navy-100 text-navy-900 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6">{copy.security.tag}</div>
                            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-6">{copy.security.title}</h2>
                            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                                {copy.security.text}
                            </p>
                            <ul className="space-y-4">
                                {copy.security.items.map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-700">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                        <div className="md:w-1/2 relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="/api/placeholder/800/600"
                                alt={copy.health.imageAlt}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="md:w-1/2">
                            <div className="inline-block bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6">{copy.health.tag}</div>
                            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-6">{copy.health.title}</h2>
                            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                                {copy.health.text}
                            </p>
                            <ul className="space-y-4">
                                {copy.health.items.map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-700">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
