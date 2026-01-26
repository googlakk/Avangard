import Image from 'next/image';

interface CognitiveAdvantage {
    title: string;
    tagline: string;
    description: string;
    benefits: string[];
    multiplier?: string;
}

interface CognitiveSuperiorityAIProps {
    headline: string;
    hook: string;
    advantages: CognitiveAdvantage[];
    proofImage: string;
}

export default function CognitiveSuperiorityAI({
    headline,
    hook,
    advantages,
    proofImage
}: CognitiveSuperiorityAIProps) {
    return (
        <section className="py-20 md:py-28 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold font-ibm-plex-serif mb-6">
                        {headline}
                    </h2>
                    <p className="text-2xl md:text-3xl text-gray-300 font-medium">
                        {hook}
                    </p>
                </div>

                {/* Two Main Advantages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
                    {advantages.map((advantage, index) => (
                        <div
                            key={index}
                            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-10 hover:bg-white/15 transition-all duration-300"
                        >
                            {/* Title */}
                            <h3 className="text-3xl font-bold font-heading mb-2">
                                {advantage.title}
                            </h3>

                            {/* Tagline */}
                            <p className="text-gray-300 text-lg mb-6 italic">
                                {advantage.tagline}
                            </p>

                            {/* Description */}
                            <p className="text-gray-200 mb-6 leading-relaxed">
                                {advantage.description}
                            </p>

                            {/* Benefits */}
                            <ul className="space-y-3">
                                {advantage.benefits.map((benefit, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className="text-2xl shrink-0">→</span>
                                        <span className="text-gray-100">{benefit}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Multiplier badge */}
                            {advantage.multiplier && (
                                <div className="mt-6 inline-block bg-white text-navy-900 px-6 py-3 rounded-full font-bold text-lg">
                                    {advantage.multiplier}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Proof Image Section */}
                <div className="max-w-5xl mx-auto">
                    <div className="relative rounded-3xl overflow-hidden border border-white/30 shadow-2xl">
                        <Image
                            src={proofImage}
                            alt="Студент работает с AI и mind map"
                            width={1200}
                            height={600}
                            className="w-full h-auto"
                        />
                        {/* Caption */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                            <p className="text-white text-sm md:text-base font-medium">
                                📸 Фото-доказательство: ChatGPT/Python на экране + Mind Map в тетради — современные инструменты, не устаревшие методы
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Emphasis */}
                <div className="mt-16 text-center">
                    <div className="inline-block bg-white/10 backdrop-blur-xl border border-white/30 px-10 py-6 rounded-3xl">
                        <p className="text-xl md:text-2xl font-bold mb-2">
                            Это современная школа XXI века
                        </p>
                        <p className="text-gray-300">
                            Мы учим использовать AI как второго пилота, а не бояться его
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
