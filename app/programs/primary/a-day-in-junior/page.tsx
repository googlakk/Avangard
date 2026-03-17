'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { getDailySchedule } from '@/lib/data/junior-program';
import { getJuniorContent } from '@/lib/content/junior-content';
import { localizePathname } from '@/lib/i18n';

export default function ADayInJuniorPage() {
    const { t, language } = useLanguage();
    const copy = getJuniorContent(language).nested.day;
    const schedule = getDailySchedule(t);

    return (
        <main className="bg-white">
            <section className="py-16 bg-navy-900 text-white">
                <div className="container mx-auto px-4">
                    <Link
                        href={localizePathname('/programs/primary', language)}
                        className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors"
                    >
                        ← {copy.back}
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-ibm-plex-serif font-bold mb-4">
                        {copy.heroTitle}
                    </h1>
                    <p className="text-xl text-gray-200 max-w-3xl">
                        {copy.heroDescription}
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto space-y-6">
                        {schedule.map((item, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-navy-900 text-white p-6 flex flex-col justify-center items-center">
                                        <div className="text-6xl mb-3">{item.icon}</div>
                                        <div className="text-3xl font-ibm-plex-serif font-bold">
                                            {item.time}
                                        </div>
                                    </div>

                                    <div className="p-6 md:col-span-2 flex flex-col justify-center">
                                        <h3 className="text-2xl font-bold font-heading text-gray-900 mb-2">
                                            {item.activity}
                                        </h3>
                                        {item.description && (
                                            <p className="text-gray-700">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {item.image && (
                                    <div className="relative h-48 md:h-64">
                                        <Image
                                            src={item.image}
                                            alt={item.activity}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center text-gray-900 mb-8">
                            {copy.menuTitle}
                        </h2>

                        <div className="bg-white rounded-3xl p-8 shadow-lg">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {copy.menuSections.map(section => (
                                    <div key={section.title}>
                                        <h3 className="text-xl font-bold font-heading text-navy-900 mb-3">
                                            {section.title}
                                        </h3>
                                        <ul className="space-y-2 text-gray-700">
                                            {section.items.map(item => <li key={item}>• {item}</li>)}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                                <p className="text-sm text-gray-600">{copy.menuFootnote}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-8">
                            {copy.clubsTitle}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {copy.clubs.map((club, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="text-5xl mb-3">{club.icon}</div>
                                    <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">
                                        {club.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">{club.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 bg-navy-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-2xl font-bold font-heading mb-4">
                        {copy.ctaTitle}
                    </h3>
                    <Link
                        href={localizePathname('/parents/admission', language)}
                        className="inline-block bg-white text-navy-900 px-10 py-4 rounded-full text-base font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                        {copy.ctaButton}
                    </Link>
                </div>
            </section>
        </main>
    );
}
