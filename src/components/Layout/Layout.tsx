import React, { Suspense } from 'react';
import { MouseProvider } from '../../hooks/useMousePosition';
import Navbar from './Navbar';
import Footer from './Footer';

// Lazy load the 3D background to avoid blocking initial render
const Background3D = React.lazy(() => import('../Background3D/Background3D'));

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <MouseProvider>
            <div className="relative min-h-screen text-[#003057] selection:bg-[#A4925A] selection:text-white">
                <Suspense fallback={<div className="fixed inset-0 bg-[#D6DBD4] -z-10" />}>
                    <Background3D />
                </Suspense>
                <div className="relative z-10">
                    <Navbar />
                    {children}
                    <Footer />
                </div>
            </div>
        </MouseProvider>
    );
};

export default Layout;
