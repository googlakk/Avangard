import { useEffect, useState } from 'react';

interface UseCountUpProps {
    end: number;
    duration?: number;
    startOnMount?: boolean;
}

export function useCountUp({ end, duration = 2000, startOnMount = true }: UseCountUpProps) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!startOnMount) return;
        const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (motionPreference.matches || duration <= 0) {
            setCount(end);
            return;
        }
        let frame = 0;
        let startTime: number | null = null;
        const startValue = 0;
        const finish = () => {
            if (!motionPreference.matches) return;
            cancelAnimationFrame(frame);
            setCount(end);
        };

        const animate = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            // Ease-out cubic settles gently at the final value.
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            setCount(Math.floor(startValue + (end - startValue) * easeProgress));

            if (progress < 1) {
                frame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        motionPreference.addEventListener('change', finish);
        frame = requestAnimationFrame(animate);
        return () => {
            cancelAnimationFrame(frame);
            motionPreference.removeEventListener('change', finish);
        };
    }, [end, duration, startOnMount]);

    return count;
}
