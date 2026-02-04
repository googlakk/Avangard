'use client';

import Image from 'next/image';

interface AcademicBreakthroughProps {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage: string;
}

export default function AcademicBreakthrough({
    title,
    subtitle,
    description,
    ctaText,
    ctaLink,
    backgroundImage,
}: AcademicBreakthroughProps) {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={backgroundImage}
                    alt="Cambridge Science Education"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/70 to-navy-900/90"></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10 text-center text-white py-20">
                {/* Badge */}
                <div className="inline-block mb-6 opacity-0 animate-[fadeInDown_1s_ease-out_0.2s_forwards]">
                    <span className="inline-block px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/30 rounded-full text-sm font-medium tracking-wider uppercase">
                        Академический прорыв
                    </span>
                </div>

                {/* Main Title */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards] leading-tight">
                    {title}
                </h1>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl font-light mb-6 opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards] max-w-4xl mx-auto text-gray-100">
                    {subtitle}
                </p>



                {/* CTA Button */}
                <div className="opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards]">
                    <a
                        href={ctaLink}
                        className="inline-block px-8 py-4 bg-white text-navy-900 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 font-sans"
                    >
                        {ctaText}
                    </a>
                </div>



                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-[fadeIn_1s_ease-out_1.5s_forwards]">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
                        <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
