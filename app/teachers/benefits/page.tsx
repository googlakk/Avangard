'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { useLanguage } from '@/contexts/LanguageContext';
import { getBenefitsData } from '@/lib/data/teachers';

export default function BenefitsPage() {
    const { t } = useLanguage();
    const data = getBenefitsData(t);
    const { hero, list } = data;
    return (
        <main className="min-h-screen pt-20">
            {/* Hero Section */}
            <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/api/placeholder/1920/1080"
                    alt="Условия работы"
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
                        {hero.title}
                    </motion.h1>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {list.map((item: any, idx: number) => (
                                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="w-12 h-12 bg-amber-100/50 rounded-lg flex items-center justify-center mb-6 text-2xl">
                                        {item.icon}
                                    </div>
                                    <h3 className="font-heading font-bold text-xl text-navy-900 mb-4">{item.title}</h3>
                                    <p className="text-gray-600">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
