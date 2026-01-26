'use client';

import Link from 'next/link';

interface CTAProps {
    title: string;
    description: string;
    primaryCTA: {
        text: string;
        link: string;
    };
    secondaryCTA: {
        text: string;
        link: string;
    };
}

export default function MiddleCTA({
    title,
    description,
    primaryCTA,
    secondaryCTA,
}: CTAProps) {
    return (
        <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-6">
                        {title}
                    </h2>

                    {/* Description */}
                    <p className="text-lg text-gray-700 mb-10 leading-relaxed font-sans">
                        {description}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href={primaryCTA.link}
                            className="px-8 py-4 bg-navy-900 text-white rounded-full text-lg font-semibold hover:bg-navy-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-sans"
                        >
                            {primaryCTA.text}
                        </a>
                        <a
                            href={secondaryCTA.link}
                            className="px-8 py-4 bg-white text-navy-900 border-2 border-navy-900 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all duration-300 font-sans"
                        >
                            {secondaryCTA.text}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
