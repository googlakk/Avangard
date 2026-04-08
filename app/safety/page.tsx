'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Shield,
    FlameKindling,
    HeartPulse,
    DoorOpen,
    ShieldCheck,
    Cctv,
    CookingPot,
    AlertTriangle,
    Phone,
    FileDown,
    ArrowLeft,
    CheckCircle,
    LucideIcon,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SafetySection {
    key: string;
    icon: LucideIcon;
    colors: {
        bg: string;
        border: string;
        icon: string;
        iconBg: string;
    };
}

interface SafetyTranslationBlock {
    title: string;
    description: string;
    items?: string[];
}

interface SafetyTranslations {
    hero: {
        title: string;
        subtitle: string;
    };
    sections?: Record<string, SafetyTranslationBlock>;
    contact?: {
        title: string;
        description: string;
        items: Array<{
            label: string;
            value: string;
        }>;
    };
    downloads?: {
        title: string;
        items: Array<{
            title: string;
            size: string;
            format: string;
        }>;
    };
    emergencyContacts?: {
        title: string;
        contacts: Array<{
            type: string;
            number: string;
            note?: string;
        }>;
    };
    documents?: {
        title: string;
        subtitle: string;
        items: Array<{
            name: string;
            file: string;
        }>;
    };
}

const sections: SafetySection[] = [
    {
        key: 'evacuation',
        icon: FlameKindling,
        colors: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'text-orange-600', iconBg: 'bg-orange-100' },
    },
    {
        key: 'medical',
        icon: HeartPulse,
        colors: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-600', iconBg: 'bg-green-100' },
    },
    {
        key: 'access',
        icon: DoorOpen,
        colors: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', iconBg: 'bg-blue-100' },
    },
    {
        key: 'security',
        icon: ShieldCheck,
        colors: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600', iconBg: 'bg-purple-100' },
    },
    {
        key: 'surveillance',
        icon: Cctv,
        colors: { bg: 'bg-cyan-50', border: 'border-cyan-200', icon: 'text-cyan-600', iconBg: 'bg-cyan-100' },
    },
    {
        key: 'food',
        icon: CookingPot,
        colors: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-600', iconBg: 'bg-amber-100' },
    },
    {
        key: 'emergency',
        icon: AlertTriangle,
        colors: { bg: 'bg-red-50', border: 'border-red-200', icon: 'text-red-600', iconBg: 'bg-red-100' },
    },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1 },
    }),
};

export default function SafetyPage() {
    const { t, language } = useLanguage();

    const safety = (t as { senior?: { safety?: SafetyTranslations } }).senior?.safety;
    if (!safety) return null;

    const isEn = language === 'en';

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-[78px]">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-blue-900 text-white overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
                </div>

                <div className="relative container mx-auto px-4 py-20 md:py-28">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center text-blue-200 hover:text-white mb-8 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            {isEn ? 'Back to Home' : 'На главную'}
                        </Link>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                                <Shield className="w-10 h-10 text-blue-300" strokeWidth={1.5} />
                            </div>
                            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                        </div>

                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-3xl">
                            {safety.hero.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 max-w-2xl font-light leading-relaxed">
                            {safety.hero.subtitle}
                        </p>

                        {/* Quick stats */}
                        <div className="flex flex-wrap gap-6 mt-12">
                            {[
                                { value: '24/7', label: isEn ? 'Security' : 'Охрана' },
                                { value: '7', label: isEn ? 'Safety Protocols' : 'Протоколов' },
                                { value: 'CCTV', label: isEn ? 'Monitoring' : 'Мониторинг' },
                                { value: 'Face ID', label: isEn ? 'Access Control' : 'Пропускная система' },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                                    className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/10"
                                >
                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                    <div className="text-sm text-blue-200">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Safety Sections */}
            <section className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
                <div className="space-y-8">
                    {sections.map((section, index) => {
                        const IconComponent = section.icon;
                        const colors = section.colors;
                        const data = safety.sections?.[section.key];

                        if (!data) return null;

                        return (
                            <motion.div
                                key={section.key}
                                custom={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-50px' }}
                                variants={fadeInUp}
                                className={`${colors.bg} ${colors.border} border rounded-2xl p-6 md:p-8 transition-all hover:shadow-lg`}
                            >
                                {/* Section Header */}
                                <div className="flex items-start gap-4 mb-6">
                                    <div className={`${colors.iconBg} rounded-xl p-3 flex-shrink-0`}>
                                        <IconComponent className={`w-7 h-7 ${colors.icon}`} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                                            {data.title}
                                        </h2>
                                        <p className="text-gray-600 text-lg">
                                            {data.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Items List */}
                                {data.items && Array.isArray(data.items) && (
                                    <ul className="grid md:grid-cols-2 gap-3 ml-0 md:ml-16">
                                        {data.items.map((item: string, i: number) => (
                                            <li key={i} className="flex items-start gap-3 group">
                                                <div className="flex-shrink-0 mt-1">
                                                    <CheckCircle className={`h-5 w-5 ${colors.icon}`} strokeWidth={2} />
                                                </div>
                                                <span className="text-gray-700 leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Emergency Contacts */}
            <section className="bg-navy-900 text-white py-16 md:py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-4 mb-10">
                            <div className="bg-white/10 rounded-xl p-3">
                                <Phone className="w-7 h-7 text-blue-300" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold font-display">
                                    {safety.contact?.title}
                                </h2>
                                <p className="text-blue-200 mt-1">
                                    {safety.contact?.description}
                                </p>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {safety.contact?.items && Array.isArray(safety.contact.items) &&
                                safety.contact.items.map((contact: { label: string; value: string }, i: number) => (
                                    <motion.a
                                        key={i}
                                        href={
                                            contact.value.includes('@')
                                                ? `mailto:${contact.value}`
                                                : `tel:${contact.value.replace(/\s/g, '')}`
                                        }
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.1 }}
                                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all group"
                                    >
                                        <div className="text-sm text-blue-300 mb-2 uppercase tracking-wider font-medium">
                                            {contact.label}
                                        </div>
                                        <div className="text-lg font-bold text-white group-hover:text-blue-200 transition-colors">
                                            {contact.value}
                                        </div>
                                    </motion.a>
                                ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Downloads Section */}
            <section className="container mx-auto px-4 py-16 md:py-20 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-4 mb-10">
                        <div className="bg-navy-900/5 rounded-xl p-3">
                            <FileDown className="w-7 h-7 text-navy-900" strokeWidth={1.5} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-display">
                            {safety.downloads?.title}
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {safety.downloads?.items && Array.isArray(safety.downloads.items) &&
                            safety.downloads.items.map((doc: { title: string; size: string; format: string }, i: number) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all group cursor-pointer"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                {doc.title}
                                            </h3>
                                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                                <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded font-medium">
                                                    {doc.format}
                                                </span>
                                                <span>{doc.size}</span>
                                            </div>
                                        </div>
                                        <div className="bg-gray-100 rounded-lg p-2 group-hover:bg-blue-100 transition-colors">
                                            <FileDown className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
