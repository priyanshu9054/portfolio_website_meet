import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';

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

const EducationEntry: React.FC<{ item: EducationItem; index: number }> = ({ item, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col items-center text-center"
        >
            {/* Logo */}
            <motion.div 
                className="relative h-32 w-32 flex items-center justify-center mb-8"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
            >
                {item.logo ? (
                    <img
                        src={item.logo}
                        alt={item.institution}
                        className="h-28 w-auto object-contain opacity-60 grayscale group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-500"
                    />
                ) : (
                    <div className="h-24 w-24 bg-white/10 rounded-full animate-pulse" />
                )}
            </motion.div>

            {/* Text Content */}
            <div className="flex flex-col gap-2">
                {/* Degree Title */}
                <h3 className="text-xl font-bold text-white/90 leading-tight group-hover:text-white transition-colors duration-300">
                    {item.role}
                </h3>
                
                {/* Institution */}
                <p className="text-sm font-medium text-white/50 group-hover:text-white/70 transition-colors duration-300">
                    {item.institution}
                </p>
            </div>
        </motion.div>
    );
};

// Concentric circles background component
const ConcentricCircles: React.FC = () => {
    const circleCount = 12;
    const baseRadius = 80;
    const radiusStep = 70;

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <svg
                className="w-full h-full absolute"
                style={{ minWidth: '1600px', minHeight: '1000px' }}
                viewBox="-800 -500 1600 1000"
                preserveAspectRatio="xMidYMid slice"
            >
                {Array.from({ length: circleCount }).map((_, i) => {
                    const radius = baseRadius + i * radiusStep;
                    const opacity = 0.15 - (i * 0.01);
                    return (
                        <circle
                            key={i}
                            cx="0"
                            cy="0"
                            r={radius}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-white"
                            style={{ opacity: Math.max(opacity, 0.03) }}
                        />
                    );
                })}
            </svg>
        </div>
    );
};

const Education: React.FC<EducationProps> = ({ items }) => {
    return (
        <section className="relative py-24 overflow-hidden bg-transparent">
            {/* Header */}
            <div className="relative z-20 px-6 mb-16">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader titlePrimary="EDUCATION" />
                </div>
            </div>

            {/* Content Area with Concentric Background */}
            <div className="relative w-full min-h-[450px] flex items-center justify-center">
                {/* Concentric Circles Background */}
                <ConcentricCircles />

                {/* Content Container */}
                <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 items-start">
                        {items.map((item, idx) => (
                            <EducationEntry key={item.id} item={item} index={idx} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
