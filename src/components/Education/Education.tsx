import React from 'react';
import { motion } from 'framer-motion';

interface EducationItem {
    id: string;
    institution: string;
    role: string;
    duration: string;
    description: string;
    logo?: string;
}

interface EducationProps {
    items: EducationItem[];
}

const OpticalOffsets: Record<string, string> = {
    'gt': 'translateY(18px)',
    'upenn': 'translateY(18px)',
    'msu': 'translateY(18px)',
};

const EducationCard: React.FC<{ item: EducationItem; index: number }> = ({ item, index }) => {
    const offset = OpticalOffsets[item.id] || 'translateY(0px)';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group flex flex-col items-center text-center gap-4 min-w-[200px] snap-center px-4"
            style={{ transform: offset }}
        >
            {/* Logo Container */}
            <div className="relative h-24 w-full flex items-center justify-center mb-4">
                {item.logo ? (
                    <img
                        src={item.logo}
                        alt={item.institution}
                        className="h-full w-auto object-contain opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
                    />
                ) : (
                    <div className="h-full w-32 bg-white/10 rounded-md animate-pulse" />
                )}
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-1">
                <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {item.role}
                </h3>
                <p className="text-sm font-medium text-white/50">
                    {item.institution}
                </p>

                {/* Hover Reveal Date */}
                <div className="h-6 overflow-hidden relative">
                    <p className="text-xs font-medium text-white/30 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        {item.duration}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const Education: React.FC<EducationProps> = ({ items }) => {
    return (
        <section className="relative py-20 bg-gradient-to-b from-black to-black/95 overflow-hidden">
            {/* Header: Placed above haloContainer */}
            <div className="relative z-20 px-6 mb-8">
                <div className="max-w-7xl mx-auto flex items-center gap-4">
                    <h2 className="text-sm font-bold tracking-[0.2em] text-white/40 uppercase">Affiliations</h2>
                    <div className="h-[1px] flex-1 bg-white/10" />
                </div>
            </div>

            {/* Halo Container: Controls positioning for both circles and content */}
            <div className="relative w-full min-h-[600px] flex items-center justify-center">
                {/* Ambient Background - Concentric Circles */}
                <div
                    className="absolute inset-0 overflow-hidden pointer-events-none select-none"
                    style={{
                        maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 100%)'
                    }}
                >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                        <div
                            className="w-[150vmax] h-[150vmax] opacity-[0.06]"
                            style={{
                                background: `repeating-radial-gradient(
                                    circle at center,
                                    transparent 0,
                                    transparent 120px,
                                    white 120px,
                                    white 121px
                                )`
                            }}
                        />
                    </div>
                </div>

                {/* Content Container */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex items-center justify-center">
                    <div className="
                        flex overflow-x-auto snap-x snap-mandatory gap-12 pb-8 -mx-6 px-6 
                        md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 md:px-0 md:items-start
                        scrollbar-hide w-full
                    ">
                        {items.map((item, idx) => (
                            <EducationCard key={item.id} item={item} index={idx} />
                        ))}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
        </section>
    );
};

export default Education;
