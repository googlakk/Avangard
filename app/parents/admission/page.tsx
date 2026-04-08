'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';
import { getSitePageContent } from '@/lib/content/site-pages';
import { localizePathname } from '@/lib/i18n';

export default function AdmissionPage() {
    const { language } = useLanguage();
    const copy = getSitePageContent(language).parents.admission;

    return (
        <main className="min-h-screen pt-[78px]">
            <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/senior-medalists.jpg"
                    alt={copy.hero.imageAlt}
                    fill
                    sizes="100vw"
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-navy-900/80" />
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

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {copy.steps.map((step, index) => (
                            <div key={index} className="relative p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow bg-white group">
                                <div className="text-6xl font-display font-bold text-navy-900/10 mb-6 group-hover:text-navy-900/20 transition-colors">
                                    {step.number}
                                </div>
                                <h3 className="text-2xl font-bold font-heading text-navy-900 mb-4 h-16 flex items-end pb-2">
                                    {step.title}
                                </h3>
                                <div className="h-1 w-12 bg-amber-500 mb-6 group-hover:w-20 transition-all" />
                                <p className="text-gray-600 leading-relaxed">
                                    {step.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-3xl p-10 shadow-lg">
                        <h2 className="text-3xl font-bold font-display text-center mb-10 text-navy-900">{copy.documents.title}</h2>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                            {copy.documents.items.map((doc, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-navy-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 font-medium">{doc}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 text-center">
                            <Button href={localizePathname('/contacts', language)} size="lg" className="w-full md:w-auto">
                                {copy.documents.button}
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
