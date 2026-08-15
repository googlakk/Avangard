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
    const { t, language } = useLanguage();
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    const transitionData = getTransitionSupportData(t);
    const skillsData = getSkillsDevelopmentData(t);
    const beyondData = getBeyondClassroomData(t);

    const infoCards = [
        // Ссылки на подстраницы (Links)
        {
            id: 'international-curriculum',
            type: 'link' as const,
            icon: 'GraduationCap',
            title: t.middle.additionalInfo.cards.internationalCurriculum.title,
            description: t.middle.additionalInfo.cards.internationalCurriculum.description,
            link: '/programs/middle/international-curriculum'
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
            <ProgramSection id="middle-pathways" tone="muted" spacing="md" className="relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(49,86,163,0.08),transparent_40%)]" />
                <ProgramSectionHeader
                    title={t.middle.additionalInfo.title}
                    subtitle={t.middle.additionalInfo.subtitle}
                    align="center"
                />

                <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-6">
                    {infoCards.map((card) => {
                        const spanClass = card.id === 'international-curriculum'
                            ? 'lg:col-span-3'
                            : card.id === 'it-steam' || card.id === 'life'
                                ? 'lg:col-span-3'
                                : 'lg:col-span-2';

                        const CardContent = (
                            <>
                                <div className="mb-4">
                                    <IconWrapper icon={card.icon} variant="navy" size="sm" hoverable={false} />
                                </div>

                                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                    {card.type === 'link'
                                        ? (language === 'en' ? 'Explore track' : 'Изучить трек')
                                        : (language === 'en' ? 'Open insight' : 'Открыть обзор')}
                                </div>
                                <h3 className="mb-2 font-heading text-xl font-semibold text-navy-900">
                                    {card.title}
                                </h3>
                                <p className="mb-5 text-sm leading-7 text-slate-600">
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
                                    className={`${programInteractiveCardClassName} ${spanClass} rounded-[24px] border-slate-200/80 shadow-[0_22px_60px_-48px_rgba(15,23,42,0.45)]`}
                                >
                                    {CardContent}
                                </Link>
                            );
                        }

                        return (
                            <button
                                key={card.id}
                                onClick={() => setActiveModal(card.id as ModalType)}
                                className={`${programInteractiveCardClassName} ${spanClass} rounded-[24px] border-slate-200/80 text-left shadow-[0_22px_60px_-48px_rgba(15,23,42,0.45)]`}
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
