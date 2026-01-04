
import React from 'react';
import { motion } from 'framer-motion';
import techStack from '../../../content/data/tech-stack.json';

const SkillMarquee: React.FC = () => {
  return (
    <div className="py-10 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden border-y border-white/5">

      {/* Marquee Container */}
      <div className="relative flex whitespace-nowrap group">
        {/* Fade edges for smooth visual effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

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
              <div className="flex flex-col items-center gap-3 px-4 py-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm
                            hover:bg-white/[0.06] hover:border-white/10 hover:scale-105 
                            transition-all duration-500 ease-out min-w-[90px] md:min-w-[100px]">

                {/* Icon */}
                <div className="w-12 h-12 md:w-14 md:h-14 grayscale group-hover/logo:grayscale-0 transition-all duration-500">
                  <img src={logo.image} alt={logo.name} className="w-full h-full object-contain" />
                </div>

                {/* Name Label */}
                <span className="text-xs md:text-sm font-medium text-white/30 group-hover/logo:text-white/80 
                               transition-colors duration-500 tracking-wide">
                  {logo.name}
                </span>
              </div>

              {/* Glow Effect */}
              <div
                className="absolute -inset-4 bg-[var(--logo-color)] opacity-0 group-hover/logo:opacity-15 
                          blur-[50px] rounded-3xl transition-opacity duration-700 -z-10"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SkillMarquee;
