import React from 'react';
import { motion } from 'framer-motion';

interface ExperienceItem {
    id: string;
    institution: string; // Company name
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
            className="group py-8 border-b border-white/10 last:border-0 hover:bg-white/[0.02] transition-colors rounded-lg px-4 -mx-4"
        >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 md:items-center">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {item.role}
                    </h3>
                    <p className="text-sm text-gray-400 font-light max-w-2xl leading-relaxed">
                        {item.description}
                    </p>
                </div>

                <div className="flex flex-col md:items-end">
                    <span className="text-lg font-medium text-white/80">
                        {item.institution}
                    </span>
                    <span className="text-sm font-medium text-white/40">
                        {item.duration}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

const Experience: React.FC<ExperienceProps> = ({ items }) => {
    return (
        <section className="pb-24 max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-sm font-bold tracking-[0.2em] text-white/40 uppercase">Experience</h2>
                <div className="h-[1px] flex-1 bg-white/10" />
            </div>

            <div className="flex flex-col">
                {items.map((item, idx) => (
                    <ExperienceRow key={item.id} item={item} index={idx} />
                ))}
            </div>
        </section>
    );
};

export default Experience;
