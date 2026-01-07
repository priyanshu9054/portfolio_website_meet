
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import About from './components/About/About'; // Using component as page
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import { SkillProvider } from './context/SkillContext';
import SkillDetailModal from './components/Skills/SkillDetailModal';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const PageWrapper = ({ children }: { children?: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
    >
        {children}
    </motion.div>
);

const App = () => {
    return (
        <SkillProvider>
            <Router>
                <ScrollToTop />
                <Layout>
                    <AnimatePresence mode="wait">
                        <Routes>
                            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                            <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
                            <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
                            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                        </Routes>
                    </AnimatePresence>
                    <SkillDetailModal />
                </Layout>
            </Router>
        </SkillProvider>
    );
};

export default App;
