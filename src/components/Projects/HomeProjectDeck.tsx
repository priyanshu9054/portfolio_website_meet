
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import projectsData from '../../../content/data/projects.json';
import { Project } from '../../types';

// Filter projects for the home deck
const homeProjects = (projectsData as Project[]).filter((p) => (p as any).showOnHome);

interface HomeProjectDeckProps {
    onProjectSelect: (project: Project) => void;
}

const HomeProjectDeck: React.FC<HomeProjectDeckProps> = ({ onProjectSelect }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    const lastScrollTime = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            const rect = container.getBoundingClientRect();
            const isCentered = Math.abs(rect.top) < 50;

            if (!isCentered) return;

            const now = Date.now();
            if (now - lastScrollTime.current < 800) {
                if (isAnimating ||
                    (e.deltaY > 0 && activeIndex < homeProjects.length - 1) ||
                    (e.deltaY < 0 && activeIndex > 0)) {
                    e.preventDefault();
                }
                return;
            }

            const isScrollingDown = e.deltaY > 0;
            const isScrollingUp = e.deltaY < 0;

            if (isScrollingDown && activeIndex < homeProjects.length - 1) {
                e.preventDefault();
                setActiveIndex(prev => prev + 1);
                setIsAnimating(true);
                lastScrollTime.current = now;
            } else if (isScrollingUp && activeIndex > 0) {
                e.preventDefault();
                setActiveIndex(prev => prev - 1);
                setIsAnimating(true);
                lastScrollTime.current = now;
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [activeIndex, isAnimating]);

    return (
        <section
            ref={containerRef}
            id="home-projects"
            className="relative bg-[#050505] min-h-screen py-32 flex flex-col justify-center overflow-hidden font-['Hanken_Grotesk']"
        >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col">
                <div className="mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center space-y-4"
                    >
                        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none uppercase text-white/90">
                            PROJECTS
                        </h2>
                    </motion.div>
                </div>

                <div className="relative h-[650px] md:h-[600px] w-full mt-12">
                    {homeProjects.map((project: any, index) => {
                        const isActive = index === activeIndex;
                        const offset = index - activeIndex;

                        return (
                            <motion.div
                                key={project.id}
                                initial={false}
                                animate={{
                                    y: isActive ? 0 : offset < 0 ? offset * 40 : 1000,
                                    scale: isActive ? 1 : offset < 0 ? 1 + (offset * 0.05) : 1,
                                    opacity: isActive ? 1 : offset < 0 ? 1 + (offset * 0.3) : 0,
                                    zIndex: 10 + index,
                                }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                onAnimationComplete={() => {
                                    if (isActive) setIsAnimating(false);
                                }}
                                className="absolute inset-0 w-full h-full"
                                style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                            >
                                <div
                                    className="w-full h-full bg-[#141414] rounded-[24px] border border-[#cccccc1a] flex flex-col md:flex-row overflow-hidden shadow-2xl"
                                >
                                    {/* Left Content */}
                                    <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
                                        <div className="space-y-6 text-left">
                                            <div className="flex flex-wrap gap-2">
                                                {project.tags?.map((tag: string) => (
                                                    <span key={tag} className="text-[10px] uppercase font-bold tracking-widest text-white/30">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                                                {project.title}
                                            </h3>
                                            <p className="text-white/50 text-lg leading-relaxed max-w-md font-light">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div className="mt-8 flex flex-wrap items-center gap-6">
                                            <button
                                                onClick={() => onProjectSelect(project)}
                                                className="relative group transition-all duration-300"
                                            >
                                                <div className="flex items-center justify-center px-8 py-4 bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-500">
                                                    View case study
                                                </div>
                                            </button>

                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-blue-500 transition-colors py-4"
                                                >
                                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                    </svg>
                                                    Code Link
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right Column (Image + Metrics) */}
                                    <div className="md:w-[55%] h-full p-4 md:p-6 flex flex-col gap-4">
                                        <div className="flex-1 rounded-[8px] overflow-hidden relative">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="h-24 flex gap-4">
                                            <div className="flex-1 bg-transparent border border-[#cccccc1a] rounded-[24px] p-4 flex flex-col justify-center text-left">
                                                <span className="text-white/75 text-xs font-semibold uppercase tracking-wider mb-1">Engagement</span>
                                                <span className="text-white/75 text-xl font-bold tracking-tight">{project.engagement || '12 min'}</span>
                                            </div>
                                            <div className="flex-1 bg-transparent border border-[#cccccc1a] rounded-[24px] p-4 flex flex-col justify-center text-left">
                                                <span className="text-white/75 text-xs font-semibold uppercase tracking-wider mb-1">User Satisfaction</span>
                                                <span className="text-white/75 text-xl font-bold tracking-tight">{project.satisfaction || '4.5*'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-20 flex justify-center gap-2">
                    {homeProjects.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className={`h-1.5 transition-all duration-500 rounded-full ${i === activeIndex ? 'w-10 bg-white' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeProjectDeck;
