'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
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
        <section className="py-24 md:py-32 bg-[#0A2463] relative overflow-hidden">
            {/* Subtle Glow Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[150px]" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[150px]" />

            {/* Noise Texture */}
            <div
                className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
                    {/* Left: Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:max-w-xl"
                    >
                        <h2
                            className="font-heading font-bold text-white leading-tight mb-5"
                            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
                        >
                            {resolvedTitle}
                        </h2>
                        <p className="text-base md:text-lg font-manrope text-blue-100/60 leading-relaxed">
                            {resolvedDescription}
                        </p>
                    </motion.div>

                    {/* Right: Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link
                            href={localizedPrimaryLink}
                            className="inline-flex items-center justify-center bg-white text-[#0A2463] px-8 py-4 rounded-[4px] text-base font-manrope font-bold hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl group"
                        >
                            {resolvedPrimaryText}
                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <Link
                            href={secondaryLink}
                            className="inline-flex items-center justify-center bg-transparent border border-white/20 text-white px-8 py-4 rounded-[4px] text-base font-manrope font-bold hover:bg-white/10 transition-all duration-300"
                        >
                            {resolvedSecondaryText}
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
