'use client';

import Image from 'next/image';

interface Activity {
    title: string;
    description: string;
    image: string;
}

interface BeyondClassroomProps {
    title: string;
    subtitle: string;
    description: string;
    activities: Activity[];
}

export default function BeyondClassroom({
    title,
    subtitle,
    description,
    activities,
}: BeyondClassroomProps) {
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

                {/* Activities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {activities.map((activity, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="aspect-[3/4] overflow-hidden relative">
                                <Image
                                    src={activity.image}
                                    alt={activity.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h3 className="text-2xl font-bold mb-3">{activity.title}</h3>
                                <p className="text-gray-200 leading-relaxed">
                                    {activity.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
