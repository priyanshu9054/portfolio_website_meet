
import React from 'react';
import { motion } from 'framer-motion';
import { TimelineItem as ITimelineItem } from '../../types';

const TimelineItem: React.FC<{ item: ITimelineItem; index: number }> = ({ item, index }) => {
  return (
    <div className="relative pl-12 pb-16 last:pb-0 group">
      {/* Sketch-accurate Vertical Line */}
      <div className="absolute left-[6px] top-[14px] bottom-0 w-[1px] bg-[#003057]/10 group-last:bg-transparent" />

      {/* Node Circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="absolute left-0 top-[6px] w-[13px] h-[13px] rounded-full bg-[#F9F6E5] border-2 border-[#003057] z-10 group-hover:scale-125 transition-transform"
      />

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
      >
        <span className="text-[9px] font-bold text-[#003057]/40 tracking-[0.3em] uppercase mb-2 block">
          {item.duration}
        </span>
        <h3 className="text-2xl font-bold mb-1 tracking-tighter text-[#003057]">{item.role}</h3>
        <p className="text-lg font-medium text-blue-600 mb-4">{item.institution}</p>
        <p className="text-[#003057]/50 leading-relaxed text-base font-light">{item.description}</p>
      </motion.div>
    </div>
  );
};

const Timeline: React.FC<{ title: string; items: ITimelineItem[] }> = ({ title, items }) => {
  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4 mb-16">
        <h3 className="text-[10px] font-bold tracking-[0.6em] text-[#003057]/30 uppercase">{title}</h3>
        <div className="h-[1px] flex-1 bg-[#003057]/5" />
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
