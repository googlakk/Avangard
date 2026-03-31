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
                <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/40 to-navy-900/90"></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10 text-center text-white py-20">
                {/* Badge */}
                <div className="inline-block mb-8 opacity-0 animate-[fadeInDown_1s_ease-out_0.2s_forwards]">
                    <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[13px] font-semibold tracking-widest uppercase shadow-sm">
                        Академический прорыв
                    </span>
                </div>

                {/* Main Title */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards] leading-tight">
                    {title}
                </h1>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl font-serif font-light mb-10 opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards] max-w-3xl mx-auto text-blue-50">
                    {subtitle}
                </p>



                {/* CTA Button */}
                <div className="opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards]">
                    <a
                        href={ctaLink}
                        className="inline-block px-10 py-4 bg-white text-navy-900 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-2xl"
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
