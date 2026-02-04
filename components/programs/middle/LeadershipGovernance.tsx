'use client';
import { IconWrapper } from '@/lib/icon-wrapper';
import { Icon } from '@/lib/icons';

import Image from 'next/image';

interface Feature {
    icon: string;
    title: string;
    description: string;
}

interface LeadershipGovernanceProps {
    title: string;
    subtitle: string;
    features: Feature[];
    ctaText: string;
    ctaLink: string;
    proofImage: string;
    proofCaption: string;
}

export default function LeadershipGovernance({
    title,
    subtitle,
    features,
    ctaText,
    ctaLink,
    proofImage,
    proofCaption,
}: LeadershipGovernanceProps) {
    return (
        <section className="py-16 md:py-24 bg-navy-900 text-white relative overflow-hidden">
            {/* Background Pattern (optional subtle effect) */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4">
                        {title}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                        {subtitle}
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="text-center group"
                        >
                            {/* Icon */}
                            <div className="text-5xl mb-4 transition-transform group-hover:scale-110 duration-300">
                                <IconWrapper icon={feature.icon} variant="white" size="md" />
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold font-heading mb-3">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-300 leading-relaxed font-sans">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Proof Image */}
                <div className="max-w-5xl mx-auto mb-10">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                        <div className="relative aspect-[16/9]">
                            <Image
                                src={proofImage}
                                alt="Student Leadership"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    {/* Caption */}
                    <p className="text-center text-sm text-gray-400 italic mt-4 font-sans">
                        📸 {proofCaption}
                    </p>
                </div>

                {/* CTA Button */}
                <div className="text-center">
                    <a
                        href={ctaLink}
                        className="inline-block px-8 py-4 bg-white text-navy-900 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 font-sans"
                    >
                        {ctaText}
                    </a>
                </div>
            </div>
        </section>
    );
}
