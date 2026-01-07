
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import heroContent from '../../../content/sections/hero.json';
import { useParallax } from '../../hooks/useParallax';

const Hero: React.FC = () => {
  const { x, y } = useParallax(15);
  const { x: xFg, y: yFg } = useParallax(-15);
  const { title, subtitle, role, description, links, heroImage } = heroContent;

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-48 pb-12 px-6 overflow-hidden">
      {/* Background Effect */}
      <motion.div
        style={{ x, y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#A4925A]/10 blur-[180px] rounded-full pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-[0.8fr_1.2fr] gap-16 items-center">
        {/* Sketch: Circle/Photo on left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative group"
          style={{ x: xFg * 0.5, y: yFg * 0.5 }} // Subtle parallax on image
        >
          <div className="aspect-square rounded-[4rem] overflow-hidden border border-[#003057]/10 glass shadow-2xl shadow-[#003057]/10">
            <img
              src={heroImage}
              alt="Meet Kumar Doshi"
              className="w-full h-full object-cover grayscale brightness-100 group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#F9F6E5]/20 backdrop-blur-3xl rounded-3xl border border-[#F9F6E5]/30 -z-10 animate-pulse" />
        </motion.div>

        {/* Text on right */}
        <div className="space-y-10 text-left">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#003057]/40">{role}</span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-7xl md:text-[8rem] font-bold leading-[0.85] tracking-tighter text-[#003057]"
          >
            {title} <br /> <span className="text-[#003057]/20 italic">{subtitle}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-[#003057]/70 font-light max-w-2xl leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description.replace('Neural Foundations', '<span class="text-[#A4925A] font-medium">Neural Foundations</span>') }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap gap-6"
          >
            <a href={links.primary.url} className="px-10 py-5 bg-[#003057] text-[#F9F6E5] border border-[#003057]/10 rounded-full font-bold hover:bg-[#A4925A] transition-all text-xs uppercase tracking-[0.2em]">
              {links.primary.text}
            </a>
            <a href={links.secondary.url} target="_blank" className="px-10 py-5 border border-[#003057]/10 text-[#003057] rounded-full font-bold hover:bg-[#003057]/5 transition-all text-xs uppercase tracking-[0.2em]">
              {links.secondary.text}
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 opacity-30"
      >
        <ArrowDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
};

export default Hero;
