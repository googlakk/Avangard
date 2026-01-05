import { useEffect, useState } from 'react';

interface UseCountUpProps {
    end: number;
    duration?: number;
    startOnMount?: boolean;
}

export function useCountUp({ end, duration = 2000, startOnMount = true }: UseCountUpProps) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        if (!startOnMount || hasStarted) return;

        setHasStarted(true);
        let startTime: number | null = null;
        const startValue = 0;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            // Easing function для плавности (easeOutQuad)
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            setCount(Math.floor(startValue + (end - startValue) * easeProgress));

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        requestAnimationFrame(animate);
    }, [end, duration, startOnMount, hasStarted]);

    return count;
}
