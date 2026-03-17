'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { getJuniorContent } from '@/lib/content/junior-content';
import { localizePathname } from '@/lib/i18n';

interface JuniorCTAProps {
    title?: string;
    description?: string;
    primaryText?: string;
    primaryLink?: string;
    secondaryText?: string;
    secondaryLink?: string;
}

export default function JuniorCTA({
    title,
    description,
    primaryText,
    primaryLink = '/parents/admission',
    secondaryText,
    secondaryLink = '/downloads/junior-brochure.pdf',
}: JuniorCTAProps) {
    const { language } = useLanguage();
    const copy = getJuniorContent(language).ui.cta;
    const resolvedTitle = title ?? copy.title;
    const resolvedDescription = description ?? copy.description;
    const resolvedPrimaryText = primaryText ?? copy.primaryText;
    const resolvedSecondaryText = secondaryText ?? copy.secondaryText;
    const localizedPrimaryLink = primaryLink.startsWith('/') && !primaryLink.endsWith('.pdf')
        ? localizePathname(primaryLink, language)
        : primaryLink;

    return (
        <section className="py-24 bg-oxford-blue relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-lora font-bold text-white mb-6">
                    {resolvedTitle}
                </h2>

                <p className="text-lg md:text-xl font-manrope text-blue-100 mb-12 max-w-2xl mx-auto">
                    {resolvedDescription}
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link
                        href={localizedPrimaryLink}
                        className="inline-block bg-white text-oxford-blue px-10 py-5 rounded-full text-lg font-manrope font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                        {resolvedPrimaryText}
                    </Link>
                    <Link
                        href={secondaryLink}
                        className="inline-block bg-transparent border border-white text-white px-10 py-5 rounded-full text-lg font-manrope font-bold hover:bg-white hover:text-oxford-blue transition-all duration-300"
                    >
                        {resolvedSecondaryText}
                    </Link>
                </div>
            </div>
        </section>
    );
}
