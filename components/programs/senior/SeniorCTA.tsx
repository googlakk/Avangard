import Link from 'next/link';

interface SeniorCTAProps {
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    benefits: string[];
}

export default function SeniorCTA({
    title,
    description,
    ctaText,
    ctaLink,
    benefits
}: SeniorCTAProps) {
    return (
        <section className="py-16 md:py-20 bg-gradient-to-r from-navy-900 to-navy-800">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Заголовок */}
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-6">
                        {title}
                    </h2>

                    {/* Описание */}
                    <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                        {description}
                    </p>

                    {/* Преимущества */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-white"
                            >
                                <div className="flex items-center gap-2 justify-center">
                                    <span className="text-xl">✓</span>
                                    <span className="text-sm font-medium">{benefit}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA кнопка */}
                    <Link
                        href={ctaLink}
                        className="inline-block bg-white text-navy-900 px-12 py-5 rounded-full text-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                        {ctaText}
                    </Link>

                    {/* Дополнительная информация */}
                    <p className="mt-6 text-sm text-gray-400">
                        Консультация бесплатная. Мы ответим на все ваши вопросы.
                    </p>
                </div>
            </div>
        </section>
    );
}
