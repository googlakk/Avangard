'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { IconWrapper } from '@/lib/icon-wrapper';
import { useLanguage } from '@/contexts/LanguageContext';
import { getSitePageContent } from '@/lib/content/site-pages';
import { localizePathname } from '@/lib/i18n';

export default function AcademicsPage() {
    const { language } = useLanguage();
    const copy = getSitePageContent(language).parents.academics;

    return (
        <main className="min-h-screen pt-[78px]">
            <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/класс.jpg"
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
                    <p className="text-xl text-gray-200 max-w-3xl mx-auto font-light">
                        {copy.hero.subtitle}
                    </p>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-3xl md:text-4xl text-navy-900 mb-4">{copy.stages.title}</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {copy.stages.subtitle}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {copy.stages.items.map((program) => (
                        <Link key={program.href} href={localizePathname(program.href, language)} className="group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all flex flex-col h-full">
                            <div className="h-48 relative bg-blue-50 shrink-0">
                                <Image
                                    src={program.image}
                                    alt={program.imageAlt}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-navy-900/10 group-hover:bg-navy-900/0 transition-colors" />
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="font-heading font-bold text-2xl text-navy-900 mb-2">{program.title}</h3>
                                <div className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-4">{program.badge}</div>
                                <p className="text-gray-600 mb-6">
                                    {program.description}
                                </p>
                                <ul className="space-y-2 text-sm text-gray-500 mb-6 flex-grow">
                                    {program.bullets.map((item) => (
                                        <li key={item}>• {item}</li>
                                    ))}
                                </ul>
                                <span className="inline-flex items-center justify-center font-medium transition-all rounded-lg px-4 py-2 text-sm border-2 border-navy-900 text-navy-900 group-hover:bg-navy-900 group-hover:text-white w-full mt-auto">{copy.stages.more}</span>
                            </div>
                        </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="font-display text-3xl md:text-4xl text-navy-900 mb-12 text-center">{copy.focus.title}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {copy.focus.items.map((subject, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 hover:border-amber-200 transition-colors flex flex-col items-center text-center group">
                                <IconWrapper
                                    icon={subject.icon}
                                    variant="navy"
                                    size="md"
                                    className="mb-4 group-hover:scale-110 transition-transform duration-300"
                                />
                                <h3 className="font-bold text-navy-900 mb-1">{subject.name}</h3>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">{subject.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-navy-900 text-white">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <h2 className="font-display text-3xl md:text-5xl mb-6">{copy.extracurricular.title}</h2>
                        <p className="text-xl text-white/80 mb-8 font-light leading-relaxed">
                            {copy.extracurricular.subtitle}
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            {copy.extracurricular.columns.map((column, index) => (
                                <ul key={index} className="space-y-3">
                                    {column.map((item) => (
                                        <li key={item} className="flex items-center gap-2"><span className="text-amber-500">•</span> {item}</li>
                                    ))}
                                </ul>
                            ))}
                        </div>
                    </div>
                    <div className="md:w-1/2 relative h-[400px] w-full rounded-2xl overflow-hidden border border-white/20">
                        <Image
                            src="/api/placeholder/800/600"
                            alt={copy.extracurricular.imageAlt}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
