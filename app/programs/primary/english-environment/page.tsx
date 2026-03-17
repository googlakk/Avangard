'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { getNativeTeachers } from '@/lib/data/junior-program';
import { getJuniorContent } from '@/lib/content/junior-content';
import { localizePathname } from '@/lib/i18n';

export default function EnglishEnvironmentPage() {
    const { t, language } = useLanguage();
    const copy = getJuniorContent(language).nested.english;
    const nativeTeachers = getNativeTeachers(t);

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
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center text-gray-900 mb-12">
                            {copy.reasonsTitle}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {copy.reasons.map(reason => (
                                <div key={reason.title} className="bg-gray-50 rounded-2xl p-6">
                                    <div className="text-4xl mb-3">{reason.icon}</div>
                                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">
                                        {reason.title}
                                    </h3>
                                    <p className="text-gray-700">{reason.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center text-gray-900 mb-12">
                            {copy.coteachingTitle}
                        </h2>

                        <div className="bg-white rounded-3xl p-8 shadow-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h3 className="text-2xl font-bold font-heading text-navy-900 mb-4">
                                        {copy.coteachingSubtitle}
                                    </h3>
                                    <ul className="space-y-3">
                                        {copy.coteachingItems.map((item, index) => (
                                            <li key={item} className="flex items-start">
                                                <span className="text-navy-900 mr-2 flex-shrink-0 font-bold">{index + 1}.</span>
                                                <span className="text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-navy-900 text-white rounded-2xl p-6">
                                    <h4 className="text-xl font-bold mb-4">{copy.immersionTitle}</h4>
                                    <div className="space-y-4">
                                        {copy.immersionStats.map(stat => (
                                            <div key={stat.label}>
                                                <div className="text-3xl font-ibm-plex-serif font-bold">{stat.value}</div>
                                                <p className="text-sm text-gray-300">{stat.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center text-gray-900 mb-12">
                            {copy.teamTitle}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {nativeTeachers.map((teacher) => (
                                <div
                                    key={teacher.name}
                                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                                >
                                    <div className="relative h-80">
                                        <Image
                                            src={teacher.photo}
                                            alt={teacher.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold font-heading text-gray-900 mb-1">
                                            {teacher.name}
                                        </h3>
                                        <p className="text-navy-900 font-medium mb-2">{teacher.country}</p>
                                        <p className="text-sm text-gray-600 mb-4">{teacher.experience}</p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {teacher.subjects.map(subject => (
                                                <span
                                                    key={subject}
                                                    className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                                                >
                                                    {subject}
                                                </span>
                                            ))}
                                        </div>

                                        <blockquote className="border-l-4 border-navy-900 pl-4 italic text-gray-700 text-sm">
                                            &ldquo;{teacher.quote}&rdquo;
                                        </blockquote>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-8">
                            {copy.galleryTitle}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {copy.gallery.map((photo) => (
                                <div key={photo.caption} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                                    <div className="relative h-64">
                                        <Image
                                            src={photo.src}
                                            alt={photo.caption}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <p className="text-gray-700 italic">{photo.caption}</p>
                                    </div>
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
