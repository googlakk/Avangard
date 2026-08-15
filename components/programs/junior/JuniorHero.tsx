'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface JuniorHeroProps {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage: string;
    badge?: string;
}

const HERO_IMAGES = [
    '/images/junior-morning-exercise.jpg',
    '/images/1.jpg',
    '/images/1-2.jpg',
];

export default function JuniorHero({
    title,
    subtitle,
    ctaText,
    ctaLink,
    badge
}: JuniorHeroProps) {
    const { language } = useLanguage();
    const [currentImage, setCurrentImage] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [mounted]);

    const stats = language === 'ru'
        ? [
            { value: '1–4', label: 'классы' },
            { value: '100%', label: 'Native Speakers' },
            { value: '08:00–17:00', label: 'школа полного дня' },
        ]
        : [
            { value: '1–4', label: 'grades' },
            { value: '100%', label: 'Native Speakers' },
            { value: '08:00–17:00', label: 'full-day school' },
        ];

    return (
        <section className="relative min-h-screen flex items-end overflow-hidden" style={{ backgroundColor: '#001d3d' }}>
            {/* Ken Burns Parallax Background — 3 rotating images */}
            {HERO_IMAGES.map((src, index) => (
                <div
                    key={src}
                    className="absolute inset-0 z-0"
                    style={{
                        opacity: mounted && currentImage === index ? 1 : index === 0 && !mounted ? 1 : 0,
                        transition: 'opacity 2000ms ease-in-out',
                    }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={src}
                        alt={`Intellect Primary School ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading={index === 0 ? 'eager' : 'lazy'}
                        style={{
                            animation: (mounted ? currentImage === index : index === 0)
                                ? 'kenBurns 24s ease-in-out infinite alternate'
                                : 'none',
                        }}
                    />
                </div>
            ))}

            {/* 5-Layer Cinematic Overlay */}
            {/* Layer 1: Vertical Depth */}
            <div
                className="absolute inset-0 z-[1]"
                style={{
                    background: 'linear-gradient(to bottom, rgba(0,20,50,0.92) 0%, rgba(0,20,50,0.5) 40%, rgba(0,20,50,0.7) 100%)',
                }}
            />
            {/* Layer 2: Horizontal Readability */}
            <div
                className="absolute inset-0 z-[2]"
                style={{
                    background: 'linear-gradient(to right, rgba(0,15,40,0.7) 0%, transparent 65%)',
                }}
            />
            {/* Layer 3: Academic Gold Glow */}
            <div
                className="absolute inset-0 z-[3]"
                style={{
                    background: 'radial-gradient(ellipse at 75% 25%, rgba(198,169,107,0.12) 0%, transparent 60%)',
                }}
            />
            {/* Layer 4: Depth Vignette */}
            <div
                className="absolute inset-0 z-[4]"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,10,30,0.5) 100%)',
                }}
            />
            {/* Layer 5: Noise Texture */}
            <div
                className="absolute inset-0 z-[5] opacity-[0.015] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Content */}
            <div className="container mx-auto px-4 md:px-8 relative z-10 pb-32 pt-40">
                {/* Badge */}
                {badge && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-6"
                    >
                        <span className="inline-block px-5 py-2 bg-white/[0.08] backdrop-blur-md border border-white/[0.15] rounded-[4px] text-xs font-manrope font-semibold tracking-[0.15em] uppercase text-education-amber">
                            {badge}
                        </span>
                    </motion.div>
                )}

                {/* Main Title — Left Aligned, Giant */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="font-heading text-white font-bold leading-[0.95] tracking-tight max-w-4xl mb-6 text-left"
                    style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}
                >
                    {title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.7 }}
                    className="font-lora text-xl md:text-2xl text-blue-100/80 italic max-w-2xl mb-10 text-left"
                >
                    {subtitle}
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.0 }}
                    className="text-left"
                >
                    <a
                        href={ctaLink}
                        className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-oxford-blue rounded-[4px] text-base font-manrope font-bold overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {ctaText}
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-education-amber/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </a>
                </motion.div>
            </div>

            {/* Stats Bar — Bottom */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="absolute bottom-0 left-0 right-0 z-10 bg-oxford-blue/60 backdrop-blur-md border-t border-white/10"
            >
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-3 md:flex md:items-center md:justify-start gap-0 divide-x divide-white/[0.15]">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-1 md:gap-3 py-4 px-2 md:py-5 md:px-10">
                                <span className="font-heading font-bold text-white text-base md:text-xl tracking-tight">
                                    {stat.value}
                                </span>
                                <span className="font-manrope text-[10px] md:text-sm text-blue-200/70 uppercase tracking-[0.1em]">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Ken Burns Animation */}
            <style jsx global>{`
                @keyframes kenBurns {
                    0% { transform: scale(1) translate(0, 0); }
                    100% { transform: scale(1.12) translate(-1.5%, -1%); }
                }
            `}</style>
        </section>
    );
}
