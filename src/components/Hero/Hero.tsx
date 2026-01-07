
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D6DBD4]/5 blur-[180px] rounded-full pointer-events-none"
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
          <div className="aspect-square rounded-[4rem] overflow-hidden border border-[#D6DBD4]/20 glass shadow-2xl shadow-[#003057]/20">
            <img
              src={heroImage}
              alt="Meet Kumar Doshi"
              className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#F9F6E5]/5 backdrop-blur-3xl rounded-3xl border border-[#F9F6E5]/10 -z-10 animate-pulse" />
        </motion.div>

        {/* Text on right */}
        <div className="space-y-10 text-left">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60">{role}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-7xl md:text-[8rem] font-bold leading-[0.85] tracking-tighter"
          >
            {title} <br /> <span className="text-white/20 italic">{subtitle}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-[#D6DBD4] font-light max-w-2xl leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description.replace('Neural Foundations', '<span class="text-[#F9F6E5]">Neural Foundations</span>') }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap gap-6"
          >
            <a href={links.primary.url} className="px-10 py-5 bg-[#003057] text-white border border-[#D6DBD4]/20 rounded-full font-bold hover:bg-[#A4925A] transition-all text-xs uppercase tracking-[0.2em]">
              {links.primary.text}
            </a>
            <a href={links.secondary.url} target="_blank" className="px-10 py-5 border border-white/10 text-white rounded-full font-bold hover:bg-[#F9F6E5]/10 transition-all text-xs uppercase tracking-[0.2em]">
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
