'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ProgramsSection() {
    const { t, language } = useLanguage();
    const [cmsProgramCards, setCmsProgramCards] = useState<Record<string, {
        title: string;
        subtitle: string;
        description: string;
        image: string;
    }>>({});

    const programs = useMemo(() => [
        {
            id: 1,
            title: t.programs.items.junior.title,
            badge: t.programs.items.junior.badge,
            description: t.programs.items.junior.description,
            subtitle: t.programs.items.junior.subtitle,
            image: '/images/junior-morning-exercise.png',
            url: '/programs/primary',
        },
        {
            id: 2,
            title: t.programs.items.middle.title,
            badge: t.programs.items.middle.badge,
            description: t.programs.items.middle.description,
            subtitle: t.programs.items.middle.subtitle,
            image: '/images/middle-entrance-group.png',
            url: '/programs/middle',
        },
        {
            id: 3,
            title: t.programs.items.senior.title,
            badge: t.programs.items.senior.badge,
            description: t.programs.items.senior.description,
            subtitle: t.programs.items.senior.subtitle,
            image: '/images/senior-medalists.png',
            url: '/programs/senior',
        },
        {
            id: 4,
            title: t.programs.items.global.title,
            badge: t.programs.items.global.badge,
            description: t.programs.items.global.description,
            subtitle: t.programs.items.global.subtitle,
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000',
            url: '/programs',
        },
        {
            id: 5,
            title: t.programs.items.life.title,
            badge: t.programs.items.life.badge,
            description: t.programs.items.life.description,
            subtitle: t.programs.items.life.subtitle,
            image: '/images/10а квиз.png',
            url: '/parents/values',
        },
        {
            id: 6,
            title: t.programs.items.admissions.title,
            badge: t.programs.items.admissions.badge,
            description: t.programs.items.admissions.description,
            subtitle: t.programs.items.admissions.subtitle,
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000',
            url: '/parents/admission',
        },
    ], [t]);

    useEffect(() => {
        let mounted = true;
        const supabase = createClient();

        (async () => {
            const { data: pages } = await supabase
                .from('cms_pages')
                .select('id, slug, title_ru, title_en')
                .in('slug', ['program-primary', 'program-middle', 'program-senior'])
                .eq('status', 'published');

            if (!mounted || !pages?.length) return;

            const pageIds = pages.map(page => page.id);
            const { data: sections } = await supabase
                .from('cms_sections')
                .select('page_id, type, payload, order_index')
                .in('page_id', pageIds)
                .eq('is_enabled', true)
                .order('order_index', { ascending: true });

            if (!mounted) return;

            const sectionByPage = new Map<string, Array<{ type: string; payload: Record<string, unknown> }>>();
            (sections || []).forEach(section => {
                const list = sectionByPage.get(section.page_id) || [];
                list.push({
                    type: section.type,
                    payload: (section.payload || {}) as Record<string, unknown>,
                });
                sectionByPage.set(section.page_id, list);
            });

            const localized = (value: unknown) => {
                if (typeof value === 'string') return value;
                if (value && typeof value === 'object') {
                    const maybeLocalized = value as { ru?: string; en?: string };
                    return maybeLocalized[language] || maybeLocalized.ru || maybeLocalized.en || '';
                }
                return '';
            };

            const nextMap: Record<string, { title: string; subtitle: string; description: string; image: string }> = {};
            pages.forEach(page => {
                const records = sectionByPage.get(page.id) || [];
                const hero = records.find(record => record.type === 'hero');
                const content = records.find(record => record.type === 'content');

                const title = language === 'en' ? page.title_en : page.title_ru;
                const subtitle = localized(hero?.payload?.subtitle);
                const description = localized(content?.payload?.text) || localized(hero?.payload?.description);
                const image = typeof hero?.payload?.imageUrl === 'string' ? hero.payload.imageUrl : '';

                nextMap[page.slug] = {
                    title,
                    subtitle,
                    description,
                    image,
                };
            });

            setCmsProgramCards(nextMap);
        })();

        return () => {
            mounted = false;
        };
    }, [language]);

    const dynamicPrograms = useMemo(() => {
        const overrides: Record<string, string> = {
            '/programs/primary': 'program-primary',
            '/programs/middle': 'program-middle',
            '/programs/senior': 'program-senior',
        };

        return programs.map(program => {
            const slug = overrides[program.url];
            const cms = slug ? cmsProgramCards[slug] : null;
            if (!cms) return program;
            return {
                ...program,
                title: cms.title || program.title,
                subtitle: cms.subtitle || program.subtitle,
                description: cms.description || program.description,
                image: cms.image || program.image,
            };
        });
    }, [programs, cmsProgramCards]);

    return (
        <section className="min-h-screen py-8 md:py-12 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden flex items-center">
            {/* Декоративный фоновый элемент */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-navy-900 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-navy-900 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 w-full">
                {/* Заголовок в академическом стиле - компактный */}
                <div className="text-center mb-8 md:mb-12">
                    {/* Декоративная верхняя линия */}
                    <div className="flex items-center justify-center mb-4 opacity-0 animate-[fadeInDown_1s_ease-out_0.2s_forwards]">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent via-navy-900 to-transparent"></div>
                        <div className="mx-3 w-1.5 h-1.5 rotate-45 border border-navy-900"></div>
                        <div className="h-px w-12 bg-gradient-to-r from-transparent via-navy-900 to-transparent"></div>
                    </div>

                    {/* Заголовок с serif шрифтом - меньше */}
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3 tracking-tight opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards]">
                        {t.programs.title}
                    </h2>

                    {/* Подзаголовок */}
                    <p className="text-xs uppercase tracking-[0.3em] text-navy-900/60 mb-4 font-medium opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]">
                        {t.programs.subtitle}
                    </p>

                    {/* Описание - построчно, компактнее */}
                    <div className="text-sm md:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed space-y-1">
                        <p className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
                            {t.programs.description.p1}
                        </p>
                        <p className="opacity-0 animate-[fadeInUp_0.8s_ease-out_1s_forwards]">
                            {t.programs.description.p2}
                        </p>
                        <p className="opacity-0 animate-[fadeInUp_0.8s_ease-out_1.2s_forwards]">
                            {t.programs.description.p3}
                        </p>
                    </div>

                    {/* Декоративная нижняя линия */}
                    <div className="flex items-center justify-center mt-6 opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards]">
                        <div className="h-px w-20 bg-gradient-to-r from-transparent via-navy-900/30 to-transparent"></div>
                    </div>
                </div>

                {/* Сетка программ - компактнее */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-6xl mx-auto">
                    {dynamicPrograms.map((program) => (
                        <Link
                            href={program.url}
                            key={program.id}
                            className="group relative mb-4 block"
                        >
                            {/* Карточка с светло-серым фоном - компактная */}
                            <div className="bg-gray-100 rounded-2xl p-3 pb-6 shadow-sm transition-shadow hover:shadow-md">
                                {/* Контейнер изображения с overflow */}
                                <div className="relative mb-4 overflow-hidden rounded-xl aspect-[5/3]">
                                    {/* Badge в левом верхнем углу */}
                                    {program.badge && (
                                        <div className="absolute top-2 left-2 z-10">
                                            <span className="bg-gray-600/80 backdrop-blur-sm text-white px-2 py-1 rounded-md text-[10px] font-medium">
                                                {program.badge}
                                            </span>
                                        </div>
                                    )}

                                    {/* Изображение */}
                                    <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:-translate-y-[40%]">
                                        <Image
                                            src={program.image}
                                            alt={program.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover rounded-xl"
                                        />
                                        <div className="absolute inset-0 bg-navy-900/30 z-10 rounded-xl"></div>
                                    </div>

                                    {/* Описание (появляется снизу при hover) */}
                                    <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center min-h-[50px]">
                                        <p className="text-[10px] text-gray-700 leading-tight text-center">
                                            {program.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Текстовый контент - компактный */}
                                <div className="text-center px-1 mb-2">
                                    <h3 className="text-base font-bold text-gray-900 mb-0.5">
                                        {program.title}
                                    </h3>
                                    {program.subtitle && (
                                        <p className="text-xs text-gray-500">{program.subtitle}</p>
                                    )}
                                </div>
                            </div>

                            {/* Кнопка \"О проекте\" на границе карточки - меньше */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10">
                                <span
                                    className="inline-block bg-[#0f1419] text-white px-6 py-1.5 rounded-full text-xs font-medium group-hover:bg-[#1a1f26] transition-colors shadow-lg whitespace-nowrap"
                                >
                                    {t.programs.moreDetails}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
