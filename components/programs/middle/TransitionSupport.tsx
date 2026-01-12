'use client';

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
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <p className="text-sm uppercase tracking-wider text-gray-600 mb-3 font-medium">
                        {subtitle}
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {title}
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-all duration-300 hover:shadow-lg"
                        >
                            {/* Icon */}
                            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>

                            {/* Highlight Badge */}
                            <div className="inline-block mb-4">
                                <span className="text-xs uppercase tracking-wider text-[#0f1419] font-bold bg-yellow-100 px-3 py-1 rounded-full">
                                    {feature.highlight}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-700 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
