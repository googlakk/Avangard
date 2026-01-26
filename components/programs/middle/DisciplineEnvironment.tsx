'use client';

import Image from 'next/image';

interface Feature {
    icon: string;
    title: string;
    description: string;
    highlight: string;
}

interface DisciplineEnvironmentProps {
    title: string;
    subtitle: string;
    features: Feature[];
    proofImage: string;
    proofCaption: string;
}

export default function DisciplineEnvironment({
    title,
    subtitle,
    features,
    proofImage,
    proofCaption,
}: DisciplineEnvironmentProps) {
    return (
        <section className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
                        {title}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                        {subtitle}
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                            {/* Icon */}
                            <div className="text-5xl mb-4">{feature.icon}</div>

                            {/* Title */}
                            <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-700 leading-relaxed mb-4 font-sans">
                                {feature.description}
                            </p>

                            {/* Highlight Badge */}
                            <span className="inline-block text-sm font-semibold text-navy-900 bg-gray-100 px-3 py-1 rounded-full">
                                {feature.highlight}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Proof Image Section */}
                <div className="max-w-5xl mx-auto">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                        <div className="relative aspect-[16/9]">
                            <Image
                                src={proofImage}
                                alt="Digital Detox Zone"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    {/* Caption */}
                    <p className="text-center text-sm text-gray-600 italic mt-4 font-sans">
                        📸 {proofCaption}
                    </p>
                </div>
            </div>
        </section>
    );
}
