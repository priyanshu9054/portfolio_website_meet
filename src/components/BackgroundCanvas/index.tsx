import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundProvider, useBackgroundContext } from './BackgroundContext';
import Scene from './Scene';

// Static fallback for reduced motion preference - warm gold atmospheric background
const StaticFallback: React.FC = () => {
    return (
        <div
            className="fixed inset-0 z-0"
            style={{
                background: `
                    radial-gradient(ellipse at 30% 20%, rgba(196, 164, 78, 0.12) 0%, transparent 50%),
                    radial-gradient(ellipse at 70% 60%, rgba(45, 212, 191, 0.08) 0%, transparent 40%),
                    radial-gradient(ellipse at 50% 100%, rgba(196, 164, 78, 0.08) 0%, transparent 50%),
                    linear-gradient(180deg, #0d1117 0%, #0a0d12 50%, #0d1117 100%)
                `,
            }}
        />
    );
};

// Loading placeholder
const LoadingPlaceholder: React.FC = () => {
    return (
        <div
            className="fixed inset-0 z-0"
            style={{
                background: 'linear-gradient(180deg, #0d1117 0%, #0a0d12 100%)',
            }}
        />
    );
};

// Main canvas wrapper with fade-in
const CanvasWrapper: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const { prefersReducedMotion } = useBackgroundContext();

    useEffect(() => {
        // Delay to ensure smooth initial load
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    if (prefersReducedMotion) {
        return <StaticFallback />;
    }

    return (
        <>
            {!isLoaded && <LoadingPlaceholder />}
            <AnimatePresence>
                {isLoaded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        className="fixed inset-0 z-0"
                        style={{ 
                            pointerEvents: 'none',
                            width: '100vw',
                            height: '100vh',
                        }}
                    >
                        <Scene />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

// Main export component
const BackgroundCanvas: React.FC = () => {
    // Check for WebGL support
    const hasWebGL = useMemo(() => {
        if (typeof window === 'undefined') return false;
        try {
            const canvas = document.createElement('canvas');
            return !!(
                window.WebGLRenderingContext &&
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
            );
        } catch {
            return false;
        }
    }, []);

    if (!hasWebGL) {
        return <StaticFallback />;
    }

    return (
        <BackgroundProvider>
            <CanvasWrapper />
        </BackgroundProvider>
    );
};

export default BackgroundCanvas;
