'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCareersData } from '@/lib/data/teachers';

export default function CareersPage() {
    const { t } = useLanguage();
    const data = getCareersData(t);
    const { hero, reserve, positions } = data;

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/api/placeholder/1920/1080"
                    alt="Вакансии"
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
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light">
                        {hero.subtitle}
                    </p>
                </div>
            </section>

            {/* Vacancies Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-navy-50 rounded-2xl p-8 mb-12 text-center">
                        <h2 className="text-2xl font-bold font-heading text-navy-900 mb-4">{reserve.title}</h2>
                        <p className="text-gray-600 mb-6">
                            {reserve.text}
                        </p>
                        <Button href="mailto:hr@avangard.school" size="lg">
                            {reserve.button}
                        </Button>
                    </div>

                    <h2 className="text-3xl font-display font-bold text-navy-900 mb-8 border-b pb-4">{positions.title}</h2>

                    <div className="space-y-6">
                        {positions.items.map((job: any) => (
                            <div key={job.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h3 className="text-xl font-bold text-navy-900 mb-2">{job.title}</h3>
                                    <div className="flex gap-4 text-sm text-gray-500">
                                        {job.tags.map((tag: string, idx: number) => (
                                            <span key={idx}>
                                                {tag} {idx < job.tags.length - 1 && '•'}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <Button
                                    href={`mailto:hr@avangard.school?subject=${job.subject}`}
                                    variant="outline"
                                    className="shrink-0"
                                >
                                    {positions.applyButton}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
