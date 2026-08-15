'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconWrapper } from '@/lib/icon-wrapper';
import AdditionalInfoModal from './AdditionalInfoModal';
import DayInLifeSchedule from './DayInLifeSchedule';
import LanguageEnvironmentSection from './LanguageEnvironmentSection';
import AcademicProgramSection from './AcademicProgramSection';
import HeadOfJuniorMessage from './HeadOfJuniorMessage';
import ExtracurricularSection from './ExtracurricularSection';
import PastoralCareSection from './PastoralCareSection';
import { useLanguage } from '@/contexts/LanguageContext';
import {
    getDailySchedule,
    getAcademicProgram,
    getHeadOfJuniorData,
    getExtracurricularActivities,
    getMotivationSystems,
    getPastoralCareItems
} from '@/lib/data/junior-program';

type ModalType = 'schedule' | 'language' | 'academic' | 'head' | 'extracurricular' | 'pastoral' | null;

export default function AdditionalInfoSection() {
    const { t, language } = useLanguage();
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    const schedule = getDailySchedule(t);
    const academic = getAcademicProgram(t);
    const head = getHeadOfJuniorData(t);
    const extracurricular = getExtracurricularActivities(t);
    const motivation = getMotivationSystems(t);
    const pastoral = getPastoralCareItems(t);

    const languageFeatures = [
        {
            icon: "GraduationCap",
            title: t.junior.cognitive.immersion.title,
            subtitle: t.junior.cognitive.immersion.subtitle,
            description: t.junior.cognitive.immersion.description,
            highlight: t.junior.cognitive.immersion.highlight
        },
        {
            icon: "Users",
            title: language === 'en' ? 'Co-Teaching' : 'Co-Teaching',
            subtitle: language === 'en' ? 'Two educators in one lesson' : 'Два педагога в одном уроке',
            description: language === 'en'
                ? [
                    'The lead teacher keeps the academic structure.',
                    'The Native Speaker supports pronunciation and live communication.',
                    'Children hear English inside authentic classroom interaction.',
                ]
                : [
                    'Основной учитель удерживает академическую структуру урока.',
                    'Native Speaker помогает с произношением и живым общением.',
                    'Ребёнок слышит английский в естественной учебной среде.',
                ],
        },
        {
            icon: "MessageCircle",
            title: language === 'en' ? 'Daily Practice' : 'Ежедневная практика',
            subtitle: language === 'en' ? 'English beyond the lesson' : 'Английский вне рамок урока',
            description: language === 'en'
                ? [
                    'Breaks, projects, lunch, and routines reinforce language naturally.',
                    'Children build confidence through repeated live interaction.',
                    'Communication becomes spontaneous rather than forced.',
                ]
                : [
                    'Перемены, проекты, обед и совместные активности закрепляют язык естественно.',
                    'Ребёнок набирает уверенность через регулярное живое общение.',
                    'Английский становится спонтанным, а не "выученным для ответа".',
                ],
        },
    ];

    const infoCards = [
        {
            id: 'schedule' as ModalType,
            icon: 'Clock',
            title: t.junior.additionalInfo.cards.schedule.title,
            description: t.junior.additionalInfo.cards.schedule.description
        },
        {
            id: 'language' as ModalType,
            icon: 'Languages',
            title: t.junior.additionalInfo.cards.language.title,
            description: t.junior.additionalInfo.cards.language.description
        },
        {
            id: 'academic' as ModalType,
            icon: 'BookOpen',
            title: t.junior.additionalInfo.cards.academic.title,
            description: t.junior.additionalInfo.cards.academic.description
        },
        {
            id: 'head' as ModalType,
            icon: 'User',
            title: t.junior.additionalInfo.cards.head.title,
            description: t.junior.additionalInfo.cards.head.description
        },
        {
            id: 'extracurricular' as ModalType,
            icon: 'Target',
            title: t.junior.additionalInfo.cards.extracurricular.title,
            description: t.junior.additionalInfo.cards.extracurricular.description
        },
        {
            id: 'pastoral' as ModalType,
            icon: 'Heart',
            title: t.junior.additionalInfo.cards.pastoral.title,
            description: t.junior.additionalInfo.cards.pastoral.description
        }
    ];

    const renderModalContent = () => {
        switch (activeModal) {
            case 'schedule':
                return <DayInLifeSchedule schedule={schedule} />;
            case 'language':
                return <LanguageEnvironmentSection features={languageFeatures} />;
            case 'academic':
                return <AcademicProgramSection blocks={academic} />;
            case 'head':
                return <HeadOfJuniorMessage {...head} />;
            case 'extracurricular':
                return <ExtracurricularSection activities={extracurricular} motivationSystems={motivation} />;
            case 'pastoral':
                return <PastoralCareSection items={pastoral} />;
            default:
                return null;
        }
    };

    const getModalTitle = () => {
        const card = infoCards.find(c => c.id === activeModal);
        return card ? card.title : '';
    };

    return (
        <>
            <section className="py-20 md:py-28 bg-[#f5f5f7]">
                <div className="container mx-auto px-4 md:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-14"
                    >
                        <span className="inline-block font-manrope font-semibold text-xs tracking-[0.15em] uppercase text-oxford-blue/40 mb-4">
                            {language === 'ru' ? 'Подробнее' : 'Learn More'}
                        </span>
                        <h2
                            className="font-heading font-bold text-oxford-blue leading-tight max-w-3xl"
                            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
                        >
                            {t.junior.additionalInfo.title}
                        </h2>
                        <p className="text-base md:text-lg font-manrope text-slate-500 max-w-2xl mt-4">
                            {t.junior.additionalInfo.subtitle}
                        </p>
                    </motion.div>

                    {/* Bento Grid Cards */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                        {infoCards.map((card, index) => (
                            <motion.button
                                key={card.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                onClick={() => setActiveModal(card.id)}
                                className="bg-white rounded-[4px] p-6 text-left hover:shadow-lg transition-all duration-500 hover:-translate-y-[3px] border border-slate-100 group cursor-pointer"
                            >
                                {/* Icon */}
                                <div className="mb-5 group-hover:scale-105 transition-transform duration-300">
                                    <div className="w-12 h-12 rounded-[4px] bg-oxford-blue/5 flex items-center justify-center">
                                        <IconWrapper icon={card.icon} variant="junior" size="md" />
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-heading font-bold text-oxford-blue mb-2 group-hover:text-electric-blue transition-colors duration-300">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-slate-500 font-manrope mb-5 leading-relaxed">
                                    {card.description}
                                </p>

                                {/* Arrow Link */}
                                <div className="flex items-center text-[#00c6ff] font-manrope font-semibold text-xs uppercase tracking-wider group-hover:text-electric-blue transition-colors">
                                    {t.junior.additionalInfo.readMore}
                                    <svg
                                        className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal */}
            <AdditionalInfoModal
                isOpen={activeModal !== null}
                onClose={() => setActiveModal(null)}
                title={getModalTitle()}
            >
                {renderModalContent()}
            </AdditionalInfoModal>
        </>
    );
}
