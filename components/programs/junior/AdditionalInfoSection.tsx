'use client';

import { useState } from 'react';
import AdditionalInfoModal from './AdditionalInfoModal';
import DayInLifeSchedule from './DayInLifeSchedule';
import LanguageEnvironmentSection from './LanguageEnvironmentSection';
import AcademicProgramSection from './AcademicProgramSection';
import HeadOfJuniorMessage from './HeadOfJuniorMessage';
import ExtracurricularSection from './ExtracurricularSection';
import PastoralCareSection from './PastoralCareSection';
import {
    dailySchedule,
    languageEnvironment,
    academicProgram,
    headOfJuniorData,
    extracurricularActivities,
    motivationSystems,
    pastoralCareItems
} from '@/lib/data/junior-program';

type ModalType = 'schedule' | 'language' | 'academic' | 'head' | 'extracurricular' | 'pastoral' | null;

const infoCards = [
    {
        id: 'schedule' as ModalType,
        icon: '📅',
        title: 'Один день из жизни',
        description: 'Типичный день ученика с 08:30 до 16:00'
    },
    {
        id: 'language' as ModalType,
        icon: '🌍',
        title: 'Языковая среда',
        description: '8-10 часов английского с носителями'
    },
    {
        id: 'academic' as ModalType,
        icon: '📚',
        title: 'Академическая программа',
        description: 'Гос. стандарт + Когнитивный блок + IT'
    },
    {
        id: 'head' as ModalType,
        icon: '👩‍🏫',
        title: 'Познакомьтесь с главой',
        description: 'Анна Иванова, Head of Junior School'
    },
    {
        id: 'extracurricular' as ModalType,
        icon: '🎯',
        title: 'Внеклассная жизнь',
        description: 'Кружки, секции, система мотивации'
    },
    {
        id: 'pastoral' as ModalType,
        icon: '💙',
        title: 'Забота о детях',
        description: 'Тьюторы, психологи, безопасность'
    }
];

export default function AdditionalInfoSection() {
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    const renderModalContent = () => {
        switch (activeModal) {
            case 'schedule':
                return <DayInLifeSchedule schedule={dailySchedule} />;
            case 'language':
                return <LanguageEnvironmentSection features={languageEnvironment} />;
            case 'academic':
                return <AcademicProgramSection blocks={academicProgram} />;
            case 'head':
                return <HeadOfJuniorMessage {...headOfJuniorData} />;
            case 'extracurricular':
                return <ExtracurricularSection activities={extracurricularActivities} motivationSystems={motivationSystems} />;
            case 'pastoral':
                return <PastoralCareSection items={pastoralCareItems} />;
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
                            Узнайте больше о школе
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Кликните на интересующую тему, чтобы узнать детали
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
                                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {card.icon}
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
                                    Подробнее
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
