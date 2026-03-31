'use client';

import { IconWrapper } from '@/lib/icon-wrapper';
import { useState } from 'react';
import Link from 'next/link';
import AdditionalInfoModal from './AdditionalInfoModal';
import TransitionSupport from './TransitionSupport';
import SkillsDevelopment from './SkillsDevelopment';
import BeyondClassroom from './BeyondClassroom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProgramSection, ProgramSectionHeader, programInteractiveCardClassName } from '@/components/programs/shared/ProgramSection';
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
            <ProgramSection tone="muted" spacing="md">
                <ProgramSectionHeader
                    title={t.middle.additionalInfo.title}
                    subtitle={t.middle.additionalInfo.subtitle}
                    align="center"
                />

                <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {infoCards.map((card) => {
                        const CardContent = (
                            <>
                                <div className="mb-4">
                                    <IconWrapper icon={card.icon} variant="navy" size="sm" hoverable={false} />
                                </div>

                                <h3 className="mb-2 font-heading text-lg font-semibold text-navy-900">
                                    {card.title}
                                </h3>
                                <p className="mb-4 text-sm leading-relaxed text-slate-600">
                                    {card.description}
                                </p>

                                <div className="flex items-center text-sm font-medium text-navy-900">
                                    {card.type === 'link' ? (t.middle.additionalInfo.readMore || 'Перейти') : (t.middle.additionalInfo.readMore || 'Подробнее')}
                                    <svg
                                        className="ml-2 h-4 w-4"
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
                                    className={programInteractiveCardClassName}
                                >
                                    {CardContent}
                                </Link>
                            );
                        }

                        return (
                            <button
                                key={card.id}
                                onClick={() => setActiveModal(card.id as ModalType)}
                                className={programInteractiveCardClassName}
                            >
                                {CardContent}
                            </button>
                        );
                    })}
                </div>
            </ProgramSection>

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
