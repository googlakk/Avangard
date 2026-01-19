'use client';

import Image from 'next/image';

interface Lab {
    title: string;
    description: string;
    image: string;
}

interface UniqueDiscipline {
    name: string;
    icon: string;
    description: string;
}

interface STEAMLabsProps {
    title: string;
    subtitle: string;
    description: string;
    labs: Lab[];
    uniqueDisciplines: UniqueDiscipline[];
}

export default function STEAMLabs({
    title,
    subtitle,
    description,
    labs,
    uniqueDisciplines,
}: STEAMLabsProps) {
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

                {/* Labs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
                    {labs.map((lab, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="aspect-[4/3] overflow-hidden relative">
                                <Image
                                    src={lab.image}
                                    alt={lab.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h3 className="text-2xl font-bold mb-2">{lab.title}</h3>
                                <p className="text-gray-200">{lab.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Unique Disciplines */}
                <div className="max-w-5xl mx-auto">
                    <h3 className="text-3xl font-bold text-gray-900 mb-10 text-center">
                        Уникальные дисциплины
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {uniqueDisciplines.map((discipline, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-[#0f1419] hover:shadow-lg transition-all duration-300"
                            >
                                {/* Icon */}
                                <div className="text-5xl mb-4">{discipline.icon}</div>

                                {/* Name */}
                                <h4 className="text-xl font-bold text-gray-900 mb-3">
                                    {discipline.name}
                                </h4>

                                {/* Description */}
                                <p className="text-gray-700 leading-relaxed">
                                    {discipline.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
