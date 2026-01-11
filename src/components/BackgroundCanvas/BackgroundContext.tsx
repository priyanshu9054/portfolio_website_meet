import React, { createContext, useContext, useRef, useEffect, useState, useCallback, useMemo } from 'react';

interface BackgroundContextType {
    mouse: { x: number; y: number };
    scroll: number;
    prefersReducedMotion: boolean;
}

const BackgroundContext = createContext<BackgroundContextType>({
    mouse: { x: 0.5, y: 0.5 },
    scroll: 0,
    prefersReducedMotion: false,
});

export const useBackgroundContext = () => useContext(BackgroundContext);

interface BackgroundProviderProps {
    children: React.ReactNode;
}

export const BackgroundProvider: React.FC<BackgroundProviderProps> = ({ children }) => {
    // Target values (what we want to reach)
    const targetMouse = useRef({ x: 0.5, y: 0.5 });
    const targetScroll = useRef(0);

    // Smoothed values (what we display)
    const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
    const [scroll, setScroll] = useState(0);

    // Check for reduced motion preference
    const prefersReducedMotion = useMemo(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        }
        return false;
    }, []);

    // Smooth interpolation using RAF
    useEffect(() => {
        let animationId: number;
        const smoothMouse = { x: 0.5, y: 0.5 };
        let smoothScroll = 0;

        const lerp = (start: number, end: number, factor: number) => {
            return start + (end - start) * factor;
        };

        const animate = () => {
            // Smooth lerping for buttery animations
            const lerpFactor = 0.08;

            smoothMouse.x = lerp(smoothMouse.x, targetMouse.current.x, lerpFactor);
            smoothMouse.y = lerp(smoothMouse.y, targetMouse.current.y, lerpFactor);
            smoothScroll = lerp(smoothScroll, targetScroll.current, lerpFactor);

            // Only update state if values changed significantly
            if (
                Math.abs(smoothMouse.x - mouse.x) > 0.001 ||
                Math.abs(smoothMouse.y - mouse.y) > 0.001
            ) {
                setMouse({ x: smoothMouse.x, y: smoothMouse.y });
            }

            if (Math.abs(smoothScroll - scroll) > 0.001) {
                setScroll(smoothScroll);
            }

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, []);

    // Mouse move handler
    const handleMouseMove = useCallback((e: MouseEvent) => {
        targetMouse.current = {
            x: e.clientX / window.innerWidth,
            y: 1.0 - e.clientY / window.innerHeight,
        };
    }, []);

    // Scroll handler
    const handleScroll = useCallback(() => {
        const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
        targetScroll.current = Math.max(0, Math.min(1, window.scrollY / (scrollMax || 1)));
    }, []);

    // Event listeners
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Initialize scroll position
        handleScroll();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleMouseMove, handleScroll]);

    const value = useMemo(
        () => ({
            mouse,
            scroll,
            prefersReducedMotion,
        }),
        [mouse, scroll, prefersReducedMotion]
    );

    return (
        <BackgroundContext.Provider value={value}>
            {children}
        </BackgroundContext.Provider>
    );
};
