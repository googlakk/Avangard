'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { getJuniorContent } from '@/lib/content/junior-content';
import { localizePathname } from '@/lib/i18n';

export default function BrainMethodologyPage() {
    const { language } = useLanguage();
    const copy = getJuniorContent(language).nested.brain;

    return (
        <main className="bg-white">
            <section className="py-16 bg-navy-900 text-white">
                <div className="container mx-auto px-4">
                    <Link
                        href={localizePathname('/programs/primary', language)}
                        className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors"
                    >
                        ← {copy.back}
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-ibm-plex-serif font-bold mb-4">
                        {copy.heroTitle}
                    </h1>
                    <p className="text-xl text-gray-200 max-w-3xl">
                        {copy.heroDescription}
                    </p>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-6">
                            {copy.windowTitle}
                        </h2>
                        <p className="text-lg text-gray-700 mb-8">
                            {copy.windowDescription}
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white rounded-3xl p-8 shadow-lg">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {copy.stats.map(stat => (
                                    <div key={stat.label} className="text-center">
                                        <div className="text-5xl font-ibm-plex-serif font-bold text-navy-900 mb-2">
                                            {stat.value}
                                        </div>
                                        <p className="text-sm text-gray-600">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto space-y-12">
                        {copy.methods.map((method, index) => (
                            <div
                                key={method.name}
                                className="bg-gray-50 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex items-start mb-6">
                                    <div className="bg-navy-900 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                                        {index + 1}
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-2xl font-bold font-heading text-gray-900">
                                            {method.name}
                                        </h3>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <h4 className="text-lg font-bold text-navy-900 mb-2">🔧 {copy.labels.how}</h4>
                                        <p className="text-gray-700">{method.how}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-navy-900 mb-2">💡 {copy.labels.why}</h4>
                                        <p className="text-gray-700">{method.why}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-navy-900 mb-2">📊 {copy.labels.evidence}</h4>
                                        <p className="text-gray-700">{method.evidence}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-navy-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8">
                            {copy.infographicTitle}
                        </h2>

                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                            <div className="space-y-6 text-left">
                                {copy.infographicSteps.map((step, index) => (
                                    <div key={step} className="flex items-start">
                                        <div className="bg-white text-navy-900 rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                                            {index === copy.infographicSteps.length - 1 ? '✓' : index + 1}
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-gray-200">{step}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                        {copy.ctaTitle}
                    </h3>
                    <Link
                        href={localizePathname('/parents/admission', language)}
                        className="inline-block bg-navy-900 text-white px-10 py-4 rounded-full text-base font-bold hover:bg-navy-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                        {copy.ctaButton}
                    </Link>
                </div>
            </section>
        </main>
    );
}
