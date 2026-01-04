
import React from 'react';
import { MouseProvider } from '../../hooks/useMousePosition';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <MouseProvider>
            <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
                <Navbar />
                {children}
                <Footer />
            </div>
        </MouseProvider>
    );
};

export default Layout;
