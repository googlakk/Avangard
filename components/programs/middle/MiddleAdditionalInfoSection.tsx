'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdditionalInfoModal from './AdditionalInfoModal';
import TransitionSupport from './TransitionSupport';
import SkillsDevelopment from './SkillsDevelopment';
import BeyondClassroom from './BeyondClassroom';
import { transitionSupportData, skillsDevelopmentData, beyondClassroomData } from '@/lib/data/middle-program';

type ModalType = 'transition' | 'skills' | 'beyond' | null;

const infoCards = [
    // Ссылки на подстраницы
    {
        id: 'cambridge',
        type: 'link' as const,
        icon: '🎓',
        title: 'Cambridge Pathway',
        description: 'Международная программа и точные науки на английском',
        link: '/programs/middle/cambridge-pathway'
    },
    {
        id: 'it-steam',
        type: 'link' as const,
        icon: '🔬',
        title: 'IT & STEAM',
        description: 'Программирование, робототехника, 3D-печать',
        link: '/programs/middle/it-steam'
    },
    {
        id: 'life',
        type: 'link' as const,
        icon: '🌟',
        title: 'Жизнь в Middle',
        description: 'Клубы, спорт, традиции и внеклассная деятельность',
        link: '/programs/middle/life-in-middle'
    },
    // Модальные окна
    {
        id: 'transition' as ModalType,
        type: 'modal' as const,
        icon: '🚀',
        title: 'Поддержка при переходе',
        description: 'Адаптация из начальной школы в среднюю'
    },
    {
        id: 'skills' as ModalType,
        type: 'modal' as const,
        icon: '📈',
        title: 'Развитие навыков',
        description: 'Soft skills, критическое мышление, коммуникация'
    },
];

export default function MiddleAdditionalInfoSection() {
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    const renderModalContent = () => {
        switch (activeModal) {
            case 'transition':
                return <TransitionSupport {...transitionSupportData} />;
            case 'skills':
                return <SkillsDevelopment {...skillsDevelopmentData} />;
            case 'beyond':
                return <BeyondClassroom {...beyondClassroomData} />;
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
                            Узнайте больше о Middle School
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Детально изучите программу и особенности средней школы
                        </p>
                    </div>

                    {/* Карточки */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {infoCards.map((card) => {
                            const CardContent = (
                                <>
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
                                        {card.type === 'link' ? 'Перейти' : 'Подробнее'}
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
