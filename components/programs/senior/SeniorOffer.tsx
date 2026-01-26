import Link from 'next/link';
import Image from 'next/image';

interface SeniorOfferProps {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage: string;
}

export default function SeniorOffer({
    headline,
    subheadline,
    ctaText,
    ctaLink,
    backgroundImage
}: SeniorOfferProps) {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={backgroundImage}
                    alt="Intellect Senior Students"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Dark gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/90 to-navy-900/85"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Main Headline */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-ibm-plex-serif font-bold text-white mb-8 leading-tight opacity-0 animate-[fadeInDown_1s_ease-out_0.2s_forwards]">
                        {headline}
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
                        {subheadline}
                    </p>

                    {/* CTA Button */}
                    <div className="opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]">
                        <Link
                            href={ctaLink}
                            className="inline-block bg-white text-navy-900 px-12 py-5 rounded-full text-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
                        >
                            {ctaText}
                        </Link>
                    </div>

                    {/* Subtle indicator */}
                    <div className="mt-16 opacity-0 animate-[fadeIn_1.5s_ease-out_1s_forwards]">
                        <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">
                            Двухлетний карьерный инкубатор
                        </p>
                        <div className="flex justify-center">
                            <svg className="w-6 h-6 text-gray-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
