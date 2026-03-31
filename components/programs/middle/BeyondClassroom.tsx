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

                {/* Activities Grid */}
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
                    {activities.map((activity, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                        >
                            {/* Image */}
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <Image
                                    src={activity.image}
                                    alt={activity.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 320px"
                                />
                            </div>

                            <div className="p-5">
                                <h3 className="mb-2 font-heading text-base font-semibold text-navy-900">
                                    {activity.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-slate-600">
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
