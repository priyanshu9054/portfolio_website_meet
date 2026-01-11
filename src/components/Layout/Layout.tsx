import React, { Suspense, useEffect } from 'react';
import { MouseProvider } from '../../hooks/useMousePosition';
import Navbar from './Navbar';
import Footer from './Footer';
import Lenis from 'lenis';

// Lazy load the premium background canvas
const BackgroundCanvas = React.lazy(() => import('../BackgroundCanvas'));

interface LayoutProps {
    children: React.ReactNode;
}

// Loading fallback with matching dark theme
const BackgroundFallback = () => (
    <div
        className="fixed inset-0 z-0"
        style={{
            background: 'linear-gradient(180deg, #0d1117 0%, #0a0d12 100%)',
        }}
    />
);

const Layout: React.FC<LayoutProps> = ({ children }) => {
    // Initialize Lenis smooth scroll
    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            touchMultiplier: 2,
        });

        // Animation frame loop
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Add class to html for Lenis
        document.documentElement.classList.add('lenis');

        return () => {
            lenis.destroy();
            document.documentElement.classList.remove('lenis');
        };
    }, []);

    return (
        <MouseProvider>
            <div className="relative min-h-screen text-white selection:bg-[#2563eb] selection:text-white">
                {/* Premium interactive background - fixed fullscreen at z-index 0 */}
                <Suspense fallback={<BackgroundFallback />}>
                    <BackgroundCanvas />
                </Suspense>

                {/* Content layer - transparent to show background, positioned above canvas */}
                <div className="relative z-10 bg-transparent">
                    <Navbar />
                    <main className="bg-transparent">
                        {children}
                    </main>
                    <Footer />
                </div>
            </div>
        </MouseProvider>
    );
};

export default Layout;
