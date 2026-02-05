'use client';

import Image from 'next/image';

interface JuniorHeroProps {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage: string;
    badge?: string;
}

export default function JuniorHero({
    title,
    subtitle,
    description,
    ctaText,
    ctaLink,
    backgroundImage,
    badge
}: JuniorHeroProps) {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={backgroundImage}
                    alt={`${title} Hero Background`}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-oxford-blue/60 via-oxford-blue/40 to-oxford-blue/80 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10 text-center text-white">
                {/* Badge */}
                {badge && (
                    <div className="inline-block mb-6 opacity-0 animate-[fadeInDown_1s_ease-out_0.2s_forwards]">
                        <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-manrope font-medium tracking-wider uppercase text-education-amber">
                            {badge}
                        </span>
                    </div>
                )}

                {/* Main Title */}
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium mb-8 opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards] leading-tight">
                    {title}
                </h1>

                {/* Subtitle */}
                <p className="font-serif text-2xl md:text-3xl font-medium mb-10 opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards] italic text-blue-100">
                    {subtitle}
                </p>



                {/* CTA Button */}
                <div className="opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards]">
                    <a
                        href={ctaLink}
                        className="group relative inline-flex items-center justify-center px-10 py-5 bg-electric-blue/90 backdrop-blur-sm text-white rounded-full text-lg font-manrope font-bold overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-electric-blue shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(37,99,235,0.8)] border border-white/10"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {ctaText}
                            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </a>
                </div>
            </div>

            {/* Floating Widget - Bottom Right */}
            <div className="absolute bottom-10 right-4 md:right-10 z-20 opacity-0 animate-[fadeIn_1s_ease-out_1.2s_forwards] hidden md:block">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-2xl max-w-xs transform rotate-2 hover:rotate-0 transition-transform duration-300">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 rounded-full bg-education-amber flex items-center justify-center text-oxford-blue font-bold text-xl">
                            100%
                        </div>
                        <div>
                            <p className="text-white font-display font-medium text-lg leading-tight">Native Speakers</p>
                            <p className="text-slate-300 text-sm font-manrope">from UK & USA</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-[fadeIn_1s_ease-out_1.5s_forwards]">
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
                    <div className="w-1 h-2 bg-education-amber rounded-full animate-bounce"></div>
                </div>
            </div>
        </section>
    );
}
