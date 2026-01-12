'use client';

interface Subject {
    name: string;
    icon: string;
    description: string;
    language: string;
}

interface PathwayStage {
    grade: string;
    stage: string;
    description: string;
}

interface Stats {
    englishHours: string;
    certification: string;
    recognition: string;
}

interface CambridgePathwayProps {
    title: string;
    subtitle: string;
    description: string;
    subjects: Subject[];
    pathway: PathwayStage[];
    stats: Stats;
}

export default function CambridgePathway({
    title,
    subtitle,
    description,
    subjects,
    pathway,
    stats,
}: CambridgePathwayProps) {
    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
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

                {/* Subjects Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16 max-w-5xl mx-auto">
                    {subjects.map((subject, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:border-[#0f1419] hover:shadow-lg transition-all duration-300"
                        >
                            <div className="text-4xl mb-3">{subject.icon}</div>
                            <h3 className="text-sm font-bold text-gray-900 mb-2">
                                {subject.name}
                            </h3>
                            <p className="text-xs text-gray-600 mb-2">
                                {subject.description}
                            </p>
                            <span className="inline-block text-xs font-semibold text-[#0f1419] bg-gray-100 px-2 py-1 rounded">
                                {subject.language}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Pathway Timeline */}
                <div className="max-w-4xl mx-auto mb-16">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        Академический путь
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {pathway.map((stage, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-8 border-2 border-gray-200 relative"
                            >
                                {/* Stage Number */}
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#0f1419] text-white rounded-full flex items-center justify-center text-xl font-bold">
                                    {index + 1}
                                </div>

                                <h4 className="text-sm uppercase tracking-wider text-gray-600 mb-2 font-medium">
                                    {stage.grade}
                                </h4>
                                <h5 className="text-xl font-bold text-gray-900 mb-3">
                                    {stage.stage}
                                </h5>
                                <p className="text-gray-700 leading-relaxed">
                                    {stage.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="bg-[#0f1419] text-white rounded-2xl p-10 max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold mb-2">
                                {stats.englishHours.split(' ')[0]}
                            </div>
                            <p className="text-sm text-gray-300">
                                {stats.englishHours.split(' ').slice(1).join(' ')}
                            </p>
                        </div>
                        <div>
                            <div className="text-lg font-bold mb-2">Cambridge</div>
                            <p className="text-sm text-gray-300">
                                {stats.certification.replace('Cambridge Assessment International Education', 'Assessment')}
                            </p>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-2">160+</div>
                            <p className="text-sm text-gray-300">
                                стран признают сертификат
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
