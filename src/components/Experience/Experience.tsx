import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';

interface ExperienceItem {
    id: string;
    institution: string;
    role: string;
    duration: string;
    description: string;
}

interface ExperienceProps {
    items: ExperienceItem[];
}

const ExperienceRow: React.FC<{ item: ExperienceItem; index: number }> = ({ item, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group py-8 border-b border-white/10 last:border-0 hover:bg-white/[0.05] transition-all duration-300 rounded-xl px-6 -mx-4 backdrop-blur-sm hover:border-[#2563eb]/20"
        >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 md:items-center">
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#60a5fa] transition-colors duration-300">
                        {item.role}
                    </h3>
                    <p className="text-sm text-white/60 font-light max-w-2xl leading-relaxed">
                        {item.description}
                    </p>
                </div>

                <div className="flex flex-col md:items-end">
                    <span className="text-lg font-medium text-white/90">
                        {item.institution}
                    </span>
                    <span className="text-sm font-semibold text-[#3b82f6]">
                        {item.duration}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

const Experience: React.FC<ExperienceProps> = ({ items }) => {
    return (
        <section className="pb-24 max-w-7xl mx-auto px-6 bg-transparent">
            <SectionHeader titlePrimary="EXPERIENCE" />
            <div className="flex flex-col">
                {items.map((item, idx) => (
                    <ExperienceRow key={item.id} item={item} index={idx} />
                ))}
            </div>
        </section>
    );
};

export default Experience;
