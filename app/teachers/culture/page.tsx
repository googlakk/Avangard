'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { useLanguage } from '@/contexts/LanguageContext';
import { getCultureData } from '@/lib/data/teachers';

export default function CulturePage() {
    const { t } = useLanguage();
    const data = getCultureData(t);
    const { hero, manifesto, slider } = data;
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/api/placeholder/1920/1080"
                    alt="Учителя школы"
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
                        {hero.title}
                    </motion.h1>
                    <p className="text-xl text-gray-200 max-w-3xl mx-auto font-light">
                        {hero.subtitle}
                    </p>
                </div>
            </section>

            {/* Manifesto Block */}
            <section className="py-24 bg-white text-center">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-amber-500 text-6xl font-serif mb-8">❝</div>
                    <h2 className="font-display text-3xl md:text-5xl text-navy-900 leading-tight mb-8">
                        {manifesto.text}
                    </h2>
                    <p className="text-xl text-gray-500 font-light">
                        {manifesto.label}
                    </p>
                </div>
            </section>

            {/* Atmosphere Slider (Static for MVP) */}
            <section className="py-0 pb-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-4 h-[500px]">
                        <div className="relative rounded-2xl overflow-hidden h-full md:col-span-1">
                            <Image
                                src="/api/placeholder/600/800"
                                alt="Учительская"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div className="relative rounded-2xl overflow-hidden h-full md:col-span-2">
                            <Image
                                src="/api/placeholder/1200/800"
                                alt="Команда на тимбилдинге"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                                <h3 className="text-white text-2xl font-bold">{slider.community.title}</h3>
                                <p className="text-white/80">{slider.community.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
