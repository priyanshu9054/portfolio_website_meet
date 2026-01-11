import React from 'react';
import { motion } from 'framer-motion';
import { TimelineItem as ITimelineItem } from '../../types';

const TimelineItem: React.FC<{ item: ITimelineItem; index: number }> = ({ item, index }) => {
  return (
    <div className="relative pl-12 pb-16 last:pb-0 group">
      {/* Vertical Line */}
      <div className="absolute left-[6px] top-[14px] bottom-0 w-[1px] bg-white/10 group-last:bg-transparent" />

      {/* Node Circle - Blue accent */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="absolute left-0 top-[6px] w-[13px] h-[13px] rounded-full bg-[#0d1117] border-2 border-[#2563eb] z-10 group-hover:scale-125 group-hover:border-[#3b82f6] transition-all"
      />

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
      >
        <span className="text-[9px] font-bold text-[#3b82f6] tracking-[0.3em] uppercase mb-2 block">
          {item.duration}
        </span>
        <h3 className="text-2xl font-bold mb-1 tracking-tighter text-white group-hover:text-[#60a5fa] transition-colors">{item.role}</h3>
        <p className="text-lg font-medium text-white/80 mb-4">{item.institution}</p>
        <p className="text-white/60 leading-relaxed text-base font-light">{item.description}</p>
      </motion.div>
    </div>
  );
};

const Timeline: React.FC<{ title: string; items: ITimelineItem[] }> = ({ title, items }) => {
  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4 mb-16">
        <h3 className="text-[10px] font-bold tracking-[0.6em] text-white/40 uppercase">{title}</h3>
        <div className="h-[1px] flex-1 bg-white/10" />
      </div>
      <div className="relative pt-4">
        {items.map((item, idx) => (
          <TimelineItem key={item.id} item={item} index={idx} />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
