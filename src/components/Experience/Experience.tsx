import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';

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
            className="group py-8 border-b border-[#D6DBD4]/10 last:border-0 hover:bg-[#F9F6E5]/5 transition-colors rounded-lg px-4 -mx-4"
        >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 md:items-center">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-[#003057] group-hover:text-[#A4925A] transition-colors">
                        {item.role}
                    </h3>
                    <p className="text-sm text-[#003057]/70 font-light max-w-2xl leading-relaxed">
                        {item.description}
                    </p>
                </div>

                <div className="flex flex-col md:items-end">
                    <span className="text-lg font-medium text-[#003057]">
                        {item.institution}
                    </span>
                    <span className="text-sm font-medium text-[#003057]/40">
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
