'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Icon } from '@/lib/icons';

export type StarsTeamCard = {
    team: string;
    subtitle: string;
    members: string[];
    wins: string[];
};

type StarsStackProps = {
    cards: StarsTeamCard[];
    autoplayMs?: number;
};

const DROP_EASE = [0.22, 1, 0.36, 1] as const;
const DROP_DURATION = 0.55;

export default function StarsStack({ cards, autoplayMs = 5000 }: StarsStackProps) {
    const [active, setActive] = useState(0);
    const prefersReducedMotion = useReducedMotion();
    const touchStartY = useRef<number | null>(null);

    const safeCards = useMemo(() => cards.filter((card) => card.team && card.members.length > 0), [cards]);

    useEffect(() => {
        if (safeCards.length <= 1 || prefersReducedMotion) return;
        const timer = window.setInterval(() => {
            setActive((prev) => (prev + 1) % safeCards.length);
        }, autoplayMs);

        return () => window.clearInterval(timer);
    }, [autoplayMs, prefersReducedMotion, safeCards.length]);

    if (safeCards.length === 0) {
        return null;
    }

    const topCard = safeCards[active];
    const secondCard = safeCards[(active - 1 + safeCards.length) % safeCards.length];
    const thirdCard = safeCards[(active - 2 + safeCards.length) % safeCards.length];
    const fourthCard = safeCards[(active - 3 + safeCards.length) % safeCards.length];

    const showSecond = safeCards.length > 1;
    const showThird = safeCards.length > 2;
    const showFourth = safeCards.length > 3;

    const goNext = () => {
        if (safeCards.length < 2) return;
        setActive((prev) => (prev + 1) % safeCards.length);
    };

    return (
        <div className="relative">
            <button
                type="button"
                className="group relative block h-[390px] w-full rounded-2xl text-left [perspective:1200px] focus:outline-none"
                onClick={goNext}
                onTouchStart={(event) => {
                    touchStartY.current = event.touches[0]?.clientY ?? null;
                }}
                onTouchEnd={(event) => {
                    if (touchStartY.current == null) return;
                    const endY = event.changedTouches[0]?.clientY ?? touchStartY.current;
                    const deltaY = endY - touchStartY.current;
                    touchStartY.current = null;
                    if (Math.abs(deltaY) > 28) goNext();
                }}
                aria-label="Переключить карточку звезд"
            >
                <div className="pointer-events-none absolute inset-x-[10%] -bottom-5 h-8 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.24)_0%,rgba(15,23,42,0.06)_55%,transparent_100%)]" />

                {showFourth && (
                    <StackCard card={fourthCard} layer={3} />
                )}
                {showThird && (
                    <StackCard card={thirdCard} layer={2} />
                )}
                {showSecond && (
                    <StackCard card={secondCard} layer={1} />
                )}

                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.article
                        key={topCard.team}
                        className="absolute inset-0 z-30 rounded-[26px] border border-slate-200/85 bg-white p-6 shadow-[0_12px_24px_rgba(15,23,42,0.08)]"
                        initial={
                            prefersReducedMotion
                                ? { y: 0, scale: 1, opacity: 1, boxShadow: '0 12px 24px rgba(15,23,42,0.08)' }
                                : { y: -40, scale: 1.02, opacity: 0, boxShadow: '0 30px 60px rgba(0,0,0,0.12)' }
                        }
                        animate={
                            prefersReducedMotion
                                ? { y: 0, scale: 1, opacity: 1, boxShadow: '0 12px 24px rgba(15,23,42,0.08)' }
                                : {
                                      y: [-40, 6, -2, 0],
                                      scale: [1.02, 0.995, 1.004, 1],
                                      opacity: [0, 1, 1, 1],
                                      boxShadow: ['0 30px 60px rgba(0,0,0,0.12)', '0 12px 24px rgba(0,0,0,0.08)'],
                                  }
                        }
                        transition={
                            prefersReducedMotion
                                ? { duration: 0.01 }
                                : {
                                      duration: DROP_DURATION,
                                      ease: DROP_EASE,
                                      times: [0, 0.7, 0.85, 1],
                                  }
                        }
                        whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                    >
                        <CardContent card={topCard} />
                    </motion.article>
                </AnimatePresence>
            </button>

            <div className="mt-4 flex justify-center gap-1.5">
                {safeCards.map((card, idx) => (
                    <span
                        key={`${card.team}-dot`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            idx === active ? 'w-6 bg-blue-700/85' : 'w-1.5 bg-blue-300/70'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

function StackCard({ card, layer }: { card: StarsTeamCard; layer: 1 | 2 | 3 }) {
    const layerMap = {
        1: {
            zIndex: 20,
            y: 8,
            scale: 0.97,
            opacity: 0.9,
            filter: 'blur(0.4px)',
            shadow: '0 9px 20px rgba(15,23,42,0.07)',
        },
        2: {
            zIndex: 10,
            y: 16,
            scale: 0.94,
            opacity: 0.75,
            filter: 'blur(1px)',
            shadow: '0 7px 16px rgba(15,23,42,0.06)',
        },
        3: {
            zIndex: 5,
            y: 24,
            scale: 0.92,
            opacity: 0.6,
            filter: 'blur(1.8px)',
            shadow: '0 6px 14px rgba(15,23,42,0.05)',
        },
    } as const;

    const style = layerMap[layer];

    return (
        <motion.article
            aria-hidden="true"
            className="absolute inset-0 rounded-[26px] border border-slate-200/75 bg-white p-6"
            initial={false}
            animate={{
                y: style.y,
                scale: style.scale,
                opacity: style.opacity,
                filter: style.filter,
                boxShadow: style.shadow,
            }}
            transition={{ duration: 0.5, ease: DROP_EASE }}
            style={{ zIndex: style.zIndex }}
        >
            <CardContent card={card} compact />
        </motion.article>
    );
}

function CardContent({ card, compact = false }: { card: StarsTeamCard; compact?: boolean }) {
    return (
        <>
            <h4 className="mb-1 text-lg font-bold text-navy-900">{card.team}</h4>
            <p className="mb-5 text-sm font-medium text-gray-500">{card.subtitle}</p>

            <div className={`mb-6 flex flex-wrap gap-2 ${compact ? 'opacity-85' : ''}`}>
                {card.members.map((name) => (
                    <span key={name} className="rounded-full bg-blue-100 px-3 py-1.5 text-xs font-bold text-blue-700">
                        {name}
                    </span>
                ))}
            </div>

            <div>
                <h5 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">Победы на аренах:</h5>
                <div className="grid grid-cols-2 gap-3">
                    {card.wins.map((win, winIdx) => (
                        <div key={win} className="flex items-center gap-2">
                            <Icon name={winIdx % 2 === 0 ? 'Medal' : 'Trophy'} className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-bold text-navy-900">{win}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
