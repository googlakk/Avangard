'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { localizePathname } from '@/lib/i18n';
import { Icon } from '@/lib/icons';

type RulesKind = 'teachers' | 'students' | 'parents';

const HERO_STYLES: Record<RulesKind, string> = {
    teachers: 'from-blue-600 to-blue-800',
    students: 'from-green-600 to-green-800',
    parents: 'from-purple-600 to-purple-800',
};

const HIGHLIGHT_ICONS: Record<string, string> = {
    professional: 'Award',
    classroom: 'BookOpen',
    students: 'Users',
    conduct: 'Shield',
    integrity: 'BookOpen',
    dress: 'Shirt',
    communication: 'MessageCircle',
    visits: 'Calendar',
    partnership: 'Heart',
} as const;

const SECTION_ICONS: Record<string, string> = {
    professional: 'Award',
    classroom: 'BookOpen',
    students: 'Users',
    assessment: 'BookOpen',
    communication: 'MessageCircle',
    conduct: 'Shield',
    academic: 'BookOpen',
    integrity: 'BookOpen',
    dress: 'Users',
    technology: 'Smartphone',
    behavior: 'CheckCircle',
    visits: 'Calendar',
    pickup: 'Bus',
    volunteer: 'Handshake',
    volunteering: 'Handshake',
    complaints: 'MessageSquare',
    support: 'Heart',
} as const;

const SECTION_ORDER: Record<RulesKind, string[]> = {
    teachers: ['professional', 'classroom', 'students', 'assessment', 'communication'],
    students: ['conduct', 'academic', 'dress', 'technology', 'behavior'],
    parents: ['communication', 'visits', 'pickup', 'volunteer', 'complaints', 'support'],
};

const RULES_UI_TEXT = {
    ru: {
        backHome: 'Назад на главную',
        schoolContacts: 'Контакты школы',
    },
    en: {
        backHome: 'Back to home',
        schoolContacts: 'School contacts',
    },
} as const;

export default function RulesPage({ kind }: { kind: RulesKind }) {
    const { t, language } = useLanguage();
    const rules = t.rules[kind];
    const uiText = RULES_UI_TEXT[language];
    const navItems: Array<{ kind: RulesKind; href: string; label: string }> = [
        { kind: 'teachers', href: '/rules/teachers', label: t.header.rulesMenu.items.teachers.title },
        { kind: 'students', href: '/rules/students', label: t.header.rulesMenu.items.students.title },
        { kind: 'parents', href: '/rules/parents', label: t.header.rulesMenu.items.parents.title },
    ];

    const sections = SECTION_ORDER[kind]
        .map(sectionKey => {
            const section = rules.sections?.[sectionKey as keyof typeof rules.sections];
            return section ? { sectionKey, section } : null;
        })
        .filter(Boolean) as Array<{
        sectionKey: string;
        section: {
            title: string;
            items: Array<{ title: string; description: string }>;
        };
    }>;

    const highlights = Object.entries(rules.highlights || {}) as Array<[string, { title: string; description: string }]>;
    const localizedHome = localizePathname('/', language);
    const localizedContacts = localizePathname('/contacts', language);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className={`bg-gradient-to-r ${HERO_STYLES[kind]} text-white py-8`}>
                <div className="container mx-auto px-4">
                    <Link
                        href={localizedHome}
                        className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
                    >
                        <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
                        {uiText.backHome}
                    </Link>
                    <h1 className="text-4xl font-bold">{rules.hero.title}</h1>
                    <p className="text-white/80 mt-2">{rules.hero.subtitle}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-6xl">
                <div className="grid md:grid-cols-3 gap-4 mb-12">
                    {navItems.map(item => (
                        <Link
                            key={item.kind}
                            href={localizePathname(item.href, language)}
                            className={`p-4 rounded-xl font-semibold text-center transition-colors ${item.kind === kind
                                ? 'bg-navy-900 text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <section className="mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{rules.mainTitle}</h2>
                    <p className="text-gray-600 mt-3 max-w-3xl mx-auto">{rules.mainSubtitle}</p>
                    {'effectiveDate' in rules && rules.effectiveDate && (
                        <p className="text-sm text-gray-500 mt-4">
                            {t.rules.meta.effectiveDate}: {rules.effectiveDate}
                        </p>
                    )}
                </section>

                <section className="grid md:grid-cols-3 gap-6 mb-12">
                    {highlights.map(([highlightKey, highlight]) => (
                        <div key={highlightKey} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center mb-4">
                                <Icon name={HIGHLIGHT_ICONS[highlightKey] || 'Sparkles'} className="w-6 h-6 text-navy-700" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{highlight.title}</h3>
                            <p className="text-gray-600">{highlight.description}</p>
                        </div>
                    ))}
                </section>

                <div className="space-y-10">
                    {sections.map(({ sectionKey, section }) => (
                        <section key={sectionKey}>
                            <div className="flex items-center mb-6">
                                <div className="bg-white p-3 rounded-xl mr-4 border border-gray-200">
                                    <Icon name={SECTION_ICONS[sectionKey] || 'CheckCircle'} className="w-6 h-6 text-navy-700" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
                            </div>
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                <ul className="space-y-5">
                                    {section.items.map((item, index) => (
                                        <li key={`${sectionKey}-${index}`} className="flex items-start">
                                            <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                                <p className="text-gray-600 mt-1">{item.description}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    ))}
                </div>

                {kind === 'students' && rules.consequences && (
                    <section className="mt-12">
                        <div className="flex items-start p-6 bg-red-50 border-l-4 border-red-500 rounded-r-xl">
                            <Icon name="AlertTriangle" className="w-6 h-6 text-red-600 mr-4 mt-1 shrink-0" />
                            <div>
                                <h3 className="font-bold text-lg mb-2 text-red-900">{rules.consequences.title}</h3>
                                <p className="text-gray-700 mb-3">{rules.consequences.description}</p>
                                <ul className="space-y-2 text-gray-700">
                                    {rules.consequences.steps.map((step: string, index: number) => (
                                        <li key={`consequence-${index}`}>• {step}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                )}

                <section className="mt-12">
                    <div className="bg-gradient-to-r from-navy-900 to-blue-900 text-white rounded-2xl p-8">
                        <h3 className="text-2xl font-bold mb-3">{rules.footer.contact}</h3>
                        <p className="text-white/80 mb-6">{rules.footer.effectiveDate}</p>
                        <Link
                            href={localizedContacts}
                            className="inline-flex items-center bg-white text-navy-900 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
                        >
                            {uiText.schoolContacts}
                            <Icon name="ArrowRight" className="w-4 h-4 ml-2" />
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
