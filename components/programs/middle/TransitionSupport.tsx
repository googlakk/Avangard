'use client';
import { IconWrapper } from '@/lib/icon-wrapper';

interface Feature {
    icon: string;
    title: string;
    description: string;
    highlight: string;
}

interface TransitionSupportProps {
    title: string;
    subtitle: string;
    description: string;
    features: Feature[];
}

export default function TransitionSupport({
    title,
    subtitle,
    description,
    features,
}: TransitionSupportProps) {
    return (
        <section className="bg-white py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mx-auto mb-10 max-w-3xl text-center">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                        {subtitle}
                    </p>
                    <h2 className="mb-4 font-heading text-2xl font-semibold text-navy-900 md:text-3xl">
                        {title}
                    </h2>
                    <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                        {description}
                    </p>
                </div>

                {/* Features Grid */}
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="rounded-xl border border-slate-200 bg-white p-6"
                        >
                            {/* Icon */}
                            <div className="mb-4">
                                <IconWrapper icon={feature.icon} variant="navy" size="sm" hoverable={false} />
                            </div>

                            {/* Highlight Badge */}
                            <div className="inline-block mb-4">
                                <span className="rounded-md bg-slate-50 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-inset ring-slate-200">
                                    {feature.highlight}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="mb-2 font-heading text-base font-semibold text-navy-900">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm leading-relaxed text-slate-600">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
