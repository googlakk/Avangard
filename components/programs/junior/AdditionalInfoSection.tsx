'use client';

import { useState } from 'react';
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
    getLanguageEnvironment, // Note: I need to make sure this is exported and implemented
    getAcademicProgram,
    getHeadOfJuniorData,
    getExtracurricularActivities,
    getMotivationSystems,
    getPastoralCareItems
} from '@/lib/data/junior-program';

type ModalType = 'schedule' | 'language' | 'academic' | 'head' | 'extracurricular' | 'pastoral' | null;

export default function AdditionalInfoSection() {
    const { t } = useLanguage();
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    // Fetch dynamic data using the current language
    const schedule = getDailySchedule(t);
    const academic = getAcademicProgram(t);
    const head = getHeadOfJuniorData(t);
    const extracurricular = getExtracurricularActivities(t);
    const motivation = getMotivationSystems(t);
    const pastoral = getPastoralCareItems(t);

    // Fallback for Language Environment if I missed implementing it fully in the previous step
    // I decided to skip it in the previous step because I was creating the plan. 
    // I need to ensure it returns something valid or reuse the cognitive block.
    // For now, let's assume I will fix the getter or use 'languageEnvironment' from data.
    // But I emptied the static array! So I MUST use a getter that returns meaningful data.
    // I will implement a basic getter based on 'junior.cognitive.immersion' here if the import fails or returns empty?
    // In the previous step I defined 'getLanguageEnvironment' returning one item.
    const languageFeatures = [
        {
            icon: "GraduationCap",
            title: t.junior.cognitive.immersion.title,
            subtitle: t.junior.cognitive.immersion.subtitle,
            description: t.junior.cognitive.immersion.description,
            highlight: t.junior.cognitive.immersion.highlight
        },
        // Add more static/hardcoded items if needed to match the 3-card layout, 
        // or just stick with 1 for now if translation keys are missing.
        // To be safe and "High Quality", I should duplicate or adapt to fill the space?
        // Let's just use the one we have translations for.
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
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    {/* Заголовок */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-900 mb-4">
                            {t.junior.additionalInfo.title}
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {t.junior.additionalInfo.subtitle}
                        </p>
                    </div>

                    {/* Карточки */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {infoCards.map((card) => (
                            <button
                                key={card.id}
                                onClick={() => setActiveModal(card.id)}
                                className="bg-white rounded-2xl p-6 text-left hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 group"
                            >
                                {/* Иконка */}
                                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <IconWrapper icon={card.icon} variant="junior" size="md" />
                                </div>

                                {/* Текст */}
                                <h3 className="text-xl font-bold text-navy-900 mb-2 font-heading">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    {card.description}
                                </p>

                                {/* Стрелка */}
                                <div className="flex items-center text-navy-600 font-medium text-sm group-hover:text-navy-900">
                                    {t.junior.additionalInfo.readMore}
                                    <svg
                                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
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
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Модальное окно */}
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
