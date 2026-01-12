'use client';

import Link from 'next/link';

interface CTAButton {
    text: string;
    link: string;
}

interface MiddleCTAProps {
    title: string;
    description: string;
    primaryCTA: CTAButton;
    secondaryCTA: CTAButton;
}

export default function MiddleCTA({
    title,
    description,
    primaryCTA,
    secondaryCTA,
}: MiddleCTAProps) {
    return (
        <section className="py-20 bg-gradient-to-br from-[#0f1419] to-[#1a1f26] text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Title */}
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        {title}
                    </h2>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
                        {description}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        {/* Primary CTA */}
                        <Link
                            href={primaryCTA.link}
                            className="inline-block px-8 py-4 bg-white text-[#0f1419] rounded-full text-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                        >
                            {primaryCTA.text}
                        </Link>

                        {/* Secondary CTA */}
                        <Link
                            href={secondaryCTA.link}
                            className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white rounded-full text-lg font-bold hover:bg-white hover:text-[#0f1419] transition-all duration-300"
                        >
                            {secondaryCTA.text}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
