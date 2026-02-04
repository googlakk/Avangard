'use client';

import { IconWrapper } from '@/lib/icon-wrapper';
import { useState } from 'react';
import Link from 'next/link';
import AdditionalInfoModal from './AdditionalInfoModal';
import TransitionSupport from './TransitionSupport';
import SkillsDevelopment from './SkillsDevelopment';
import BeyondClassroom from './BeyondClassroom';
import { useLanguage } from '@/contexts/LanguageContext';
import {
    getTransitionSupportData,
    getSkillsDevelopmentData,
    getBeyondClassroomData
} from '@/lib/data/middle-program';

type ModalType = 'transition' | 'skills' | 'beyond' | null;

export default function MiddleAdditionalInfoSection() {
    const { t } = useLanguage();
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    const transitionData = getTransitionSupportData(t);
    const skillsData = getSkillsDevelopmentData(t);
    const beyondData = getBeyondClassroomData(t);

    const infoCards = [
        // Ссылки на подстраницы (Links)
        {
            id: 'cambridge',
            type: 'link' as const,
            icon: 'GraduationCap',
            title: t.middle.additionalInfo.cards.cambridge.title,
            description: t.middle.additionalInfo.cards.cambridge.description,
            link: '/programs/middle/cambridge-pathway'
        },
        {
            id: 'it-steam',
            type: 'link' as const,
            icon: 'Cpu',
            title: t.middle.additionalInfo.cards.steam.title,
            description: t.middle.additionalInfo.cards.steam.description,
            link: '/programs/middle/it-steam'
        },
        {
            id: 'life',
            type: 'link' as const,
            icon: 'Sparkles',
            title: t.middle.additionalInfo.cards.life.title,
            description: t.middle.additionalInfo.cards.life.description,
            link: '/programs/middle/life-in-middle'
        },
        // Модальные окна (Modals)
        {
            id: 'transition' as ModalType,
            type: 'modal' as const,
            icon: 'TrendingUp',
            title: t.middle.additionalInfo.cards.transition.title,
            description: t.middle.additionalInfo.cards.transition.description
        },
        {
            id: 'skills' as ModalType,
            type: 'modal' as const,
            icon: 'Brain',
            title: t.middle.additionalInfo.cards.skills.title,
            description: t.middle.additionalInfo.cards.skills.description
        },
    ];

    const renderModalContent = () => {
        switch (activeModal) {
            case 'transition':
                return <TransitionSupport {...transitionData} />;
            case 'skills':
                return <SkillsDevelopment {...skillsData} />;
            case 'beyond':
                return <BeyondClassroom {...beyondData} />;
            default:
                return null;
        }
    };

    const getModalTitle = () => {
        const card = infoCards.find(c => c.id === activeModal);
        return card?.title || '';
    };

    return (
        <>
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    {/* Заголовок */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-900 mb-4">
                            {t.middle.additionalInfo.title}
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {t.middle.additionalInfo.subtitle}
                        </p>
                    </div>

                    {/* Карточки */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {infoCards.map((card) => {
                            const CardContent = (
                                <>
                                    {/* Иконка */}
                                    <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <IconWrapper icon={card.icon} variant="middle" size="md" />
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
                                        {card.type === 'link' ? (t.middle.additionalInfo.readMore || 'Перейти') : (t.middle.additionalInfo.readMore || 'Подробнее')}
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
                                </>
                            );

                            if (card.type === 'link') {
                                return (
                                    <Link
                                        key={card.id}
                                        href={card.link}
                                        className="bg-white rounded-2xl p-6 text-left hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 group block"
                                    >
                                        {CardContent}
                                    </Link>
                                );
                            }

                            return (
                                <button
                                    key={card.id}
                                    onClick={() => setActiveModal(card.id as ModalType)}
                                    className="bg-white rounded-2xl p-6 text-left hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 group"
                                >
                                    {CardContent}
                                </button>
                            );
                        })}
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
