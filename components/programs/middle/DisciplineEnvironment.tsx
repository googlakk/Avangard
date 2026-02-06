'use client';

import { IconWrapper } from '@/lib/icon-wrapper';

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
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-heading text-navy-900 mb-6">
                        {title}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>

                <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        {/* Left Column: Cards List */}
                        <div className="lg:col-span-5 space-y-6">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group p-6 rounded-2xl bg-gray-50 border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="flex items-start gap-5">
                                        <div className="shrink-0 mt-1">
                                            <IconWrapper icon={feature.icon} variant="middle" size="md" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold font-heading text-navy-900">
                                                    {feature.title}
                                                </h3>
                                                <span className="text-[10px] uppercase font-bold tracking-wider text-white bg-navy-900 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {feature.highlight}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Column: Visual */}
                        <div className="lg:col-span-7 h-full min-h-[400px] lg:min-h-[600px] relative rounded-3xl overflow-hidden">
                            <Image
                                src={proofImage}
                                alt="Environment"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                            {/* Overlay Caption */}
                            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-navy-900 font-medium text-sm">
                                        {proofCaption}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
