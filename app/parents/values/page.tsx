'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import LifestyleAndCareSection from '@/components/programs/junior/LifestyleAndCareSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLifestyleCareFeatures, getLifestyleCarePhotoProof } from '@/lib/data/junior-program';
import { getSitePageContent } from '@/lib/content/site-pages';
import { localizePathname } from '@/lib/i18n';

export default function ValuesPage() {
    const { t, language } = useLanguage();
    const copy = getSitePageContent(language).parents.values;

    return (
        <main className="min-h-screen pt-[78px]">
            <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/middle-entrance-group.jpg"
                    alt={copy.hero.imageAlt}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-navy-900/60" />
                <div className="relative container mx-auto px-4 text-center text-white z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-4xl md:text-6xl mb-6"
                    >
                        {copy.hero.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light"
                    >
                        {copy.hero.subtitle}
                    </motion.p>
                </div>
            </section>

            <LifestyleAndCareSection
                features={getLifestyleCareFeatures(t)}
                photoProof={getLifestyleCarePhotoProof(t)}
            />

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        {copy.stats.map((stat) => (
                            <div key={stat.label} className="bg-white p-8 rounded-2xl shadow-sm text-center">
                                <div className="text-5xl font-serif text-navy-900 font-bold mb-2">{stat.value}</div>
                                <div className="text-sm uppercase tracking-widest text-gray-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="font-display text-4xl md:text-5xl text-navy-900 mb-12">{copy.achievements.title}</h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            {copy.achievements.points.map((item) => (
                                <div key={item} className="flex gap-4">
                                    <span className="text-amber-500 text-2xl">•</span>
                                    <p className="text-lg text-gray-800 font-medium">{item}</p>
                                </div>
                            ))}
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {copy.achievements.cards.map((card) => (
                                <div key={card.title} className="bg-gray-50 rounded-2xl p-8">
                                    <div className="text-amber-600 text-4xl mb-4">{card.emoji}</div>
                                    <div className="text-5xl font-bold text-navy-900 mb-2">{card.value}</div>
                                    <div className="font-bold text-lg mb-2">{card.title}</div>
                                    <div className="text-gray-500 text-sm">{card.subtitle}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 container mx-auto px-4">
                <div className="bg-navy-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-10 left-10 text-white/20 text-6xl">★</div>
                    <div className="absolute bottom-10 right-10 text-white/20 text-4xl">★</div>

                    <h2 className="font-display text-3xl md:text-4xl mb-6 relative z-10 font-normal">{copy.stars.title}</h2>
                    <p className="max-w-3xl mx-auto text-base md:text-lg font-light leading-relaxed mb-8 relative z-10 opacity-90">
                        {copy.stars.description}
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 relative z-10">
                        {copy.stars.tags.map((tag) => (
                            <span key={tag} className="px-5 py-1.5 bg-white/20 rounded-full backdrop-blur-sm text-xs md:text-sm font-light tracking-wide">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-navy-900 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="font-display text-3xl md:text-5xl mb-8">{copy.cta.title}</h2>
                    <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                        {copy.cta.description}
                    </p>
                    <Button href={localizePathname('/contacts', language)} variant="primary" size="lg">{copy.cta.button}</Button>
                </div>
            </section>
        </main>
    );
}
