'use client';

import { useEffect, type ReactNode } from 'react';
import { useAnimate } from 'framer-motion';

/** Visible server markup; motion is enabled only after hydration and below the fold. */
export default function HomeReveal({ children, className, delay = 0, enabled = true }: {
    children: ReactNode;
    className?: string;
    delay?: number;
    enabled?: boolean;
}) {
    const [scope, animate] = useAnimate<HTMLDivElement>();

    useEffect(() => {
        const element = scope.current;
        if (!enabled || !element) return;
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (preference.matches || element.getBoundingClientRect().top < window.innerHeight - 32) return;

        element.dataset.reveal = 'pending';
        let animation: ReturnType<typeof animate> | undefined;
        const show = () => {
            observer.disconnect();
            delete element.dataset.reveal;
            animation = animate(element, { opacity: [0, 1], transform: ['translateY(16px)', 'translateY(0px)'] }, {
                duration: 0.44, delay, ease: [0.22, 1, 0.36, 1],
            });
        };
        const revealImmediately = () => {
            observer.disconnect();
            animation?.stop();
            delete element.dataset.reveal;
            element.style.removeProperty('opacity');
            element.style.removeProperty('transform');
        };
        const observer = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) show();
        }, { threshold: 0, rootMargin: '0px 0px -32px 0px' });
        observer.observe(element);
        element.addEventListener('focusin', revealImmediately);
        preference.addEventListener('change', revealImmediately);
        return () => {
            observer.disconnect();
            animation?.stop();
            delete element.dataset.reveal;
            element.removeEventListener('focusin', revealImmediately);
            preference.removeEventListener('change', revealImmediately);
            element.style.removeProperty('opacity');
            element.style.removeProperty('transform');
        };
    }, [animate, delay, enabled, scope]);

    if (!enabled && className === 'home-reveal-slot') return <>{children}</>;
    return <div ref={scope} className={className}>{children}</div>;
}
