'use client';

import Card from '@/components/ui/Card';
import { FEATURES } from '@/lib/constants';
import { Icon } from '@/lib/icons';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Features() {
    const { t } = useLanguage();

    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4">
                        {t.features.title} <span className="gradient-text">{t.features.titleHighlight}</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        {t.features.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FEATURES.map((feature, index) => (
                        <Card
                            key={index}
                            title={feature.title}
                            description={feature.description}
                            icon={feature.icon}
                            className="animate-slide-up"
                            style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
