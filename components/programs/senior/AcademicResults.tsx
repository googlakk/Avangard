import Image from 'next/image';

interface AcademicPillar {
    icon: string;
    title: string;
    description: string;
    details: string[];
}

interface AcademicResultsProps {
    headline: string;
    description: string;
    timeframe: string;
    pillars: AcademicPillar[];
    proofImage: string;
}

export default function AcademicResults({
    headline,
    description,
    timeframe,
    pillars,
    proofImage
}: AcademicResultsProps) {
    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold font-ibm-plex-serif text-gray-900 mb-6">
                        {headline}
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-600 mb-4 leading-relaxed">
                        {description}
                    </p>
                    <div className="inline-block bg-navy-900 text-white px-6 py-3 rounded-full font-bold text-lg">
                        ⏰ {timeframe}
                    </div>
                </div>

                {/* 3 Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
                    {pillars.map((pillar, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:border-navy-900/30"
                        >
                            {/* Icon */}
                            <div className="text-6xl mb-6">{pillar.icon}</div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold font-heading text-gray-900 mb-3">
                                {pillar.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 mb-5 leading-relaxed">
                                {pillar.description}
                            </p>

                            {/* Details */}
                            <ul className="space-y-2">
                                {pillar.details.map((detail, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                        <span className="text-navy-900 mt-1 font-bold">✓</span>
                                        <span>{detail}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Proof Section */}
                <div className="max-w-5xl mx-auto">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src={proofImage}
                            alt="Расписание с интегрированной подготовкой к экзаменам"
                            width={1200}
                            height={600}
                            className="w-full h-auto"
                        />
                        {/* Caption overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                            <p className="text-white text-sm md:text-base font-medium">
                                📸 Фото-доказательство: Расписание с блоками IELTS Prep, SAT Math, Science (Eng) + Native Speaker
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom emphasis */}
                <div className="mt-12 text-center">
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        <strong className="text-navy-900">Зашито в наш процесс.</strong>{' '}
                        Каждый день с 08:00 до 17:00 ваш ребенок получает то, за что другие родители платят репетиторам отдельно.
                    </p>
                </div>
            </div>
        </section>
    );
}
