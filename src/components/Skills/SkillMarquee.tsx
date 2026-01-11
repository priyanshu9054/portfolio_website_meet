import React from 'react';
import { motion } from 'framer-motion';
import techStack from '../../../content/data/tech-stack.json';

const SkillMarquee: React.FC = () => {
  return (
    <div className="py-10 overflow-hidden border-y border-white/10 bg-transparent">

      {/* Marquee Container */}
      <div className="relative flex whitespace-nowrap group">
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
          className="flex items-center gap-8 md:gap-12 pr-8 md:pr-12"
        >
          {techStack.concat(techStack).concat(techStack).map((logo, idx) => (
            <div
              key={idx}
              className="relative flex-shrink-0 group/logo cursor-default"
              style={{ '--logo-color': logo.color } as React.CSSProperties}
            >
              {/* Card Container */}
              <div className="flex flex-col items-center gap-3 px-4 py-5 transition-all duration-500 ease-out min-w-[90px] md:min-w-[100px] hover:scale-105">

                {/* Icon */}
                <div className="w-12 h-12 md:w-14 md:h-14 grayscale brightness-200 group-hover/logo:grayscale-0 group-hover/logo:brightness-100 transition-all duration-500">
                  <img src={logo.image} alt={logo.name} className="w-full h-full object-contain" />
                </div>

                {/* Name Label appears only on hover */}
                <span className="text-xs md:text-sm font-medium text-white/30 tracking-wide opacity-0 group-hover/logo:opacity-100 
                               transition-all duration-300 pointer-events-none">
                  {logo.name}
                </span>
              </div>

            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SkillMarquee;
