import Link from 'next/link';
import Image from 'next/image';

interface SelectiveAdmissionProps {
    headline: string;
    filterMessage: string;
    communityPromise: string;
    ctaText: string;
    ctaLink: string;
    communityValues: string[];
    proofImage: string;
    subText: string;
    proofCaption: string;
    bottomBoxTitle: string;
    bottomBoxText: string;
}

export default function SelectiveAdmission({
    headline,
    filterMessage,
    communityPromise,
    ctaText,
    ctaLink,
    communityValues,
    proofImage,
    subText,
    proofCaption,
    bottomBoxTitle,
    bottomBoxText
}: SelectiveAdmissionProps) {
    return (
        <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Two-column layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Content */}
                        <div>
                            {/* Headline */}
                            <h2 className="text-4xl md:text-5xl font-bold font-ibm-plex-serif text-gray-900 mb-6">
                                {headline}
                            </h2>

                            {/* Filter Message */}
                            <div className="bg-navy-900/5 border-l-4 border-navy-900 p-6 rounded-r-2xl mb-8">
                                <p className="text-lg text-gray-800 font-medium leading-relaxed">
                                    {filterMessage}
                                </p>
                            </div>

                            {/* Community Promise */}
                            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                                {communityPromise}
                            </p>

                            {/* Community Values */}
                            <div className="flex flex-wrap gap-3 mb-10">
                                {communityValues.map((value, index) => (
                                    <div
                                        key={index}
                                        className="bg-white border-2 border-navy-900 text-navy-900 px-5 py-2 rounded-full font-bold text-sm"
                                    >
                                        {value}
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <Link
                                href={ctaLink}
                                className="inline-block bg-navy-900 text-white px-12 py-5 rounded-full text-lg font-bold hover:bg-navy-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                            >
                                {ctaText}
                            </Link>

                            {/* Subtext */}
                            <p className="mt-6 text-sm text-gray-500">
                                {subText}
                            </p>
                        </div>

                        {/* Right: Proof Image */}
                        <div>
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src={proofImage}
                                    alt="Студент выступает на школьном мероприятии"
                                    width={800}
                                    height={600}
                                    className="w-full h-auto"
                                />
                                {/* Caption */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                    <p className="text-white text-sm md:text-base font-medium">
                                        {proofCaption}
                                    </p>
                                </div>
                            </div>

                            {/* Additional emphasis */}
                            <div className="mt-8 bg-navy-900 text-white p-6 rounded-2xl text-center">
                                <p className="text-lg font-bold mb-2">
                                    {bottomBoxTitle}
                                </p>
                                <p className="text-gray-300">
                                    {bottomBoxText}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
