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
    <section className="relative min-h-screen flex items-center justify-center pt-48 pb-12 px-6 overflow-hidden bg-transparent">
      {/* Subtle glow effect - keeping warm gold for background atmosphere */}
      <motion.div
        style={{ x, y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C4A44E]/5 blur-[180px] rounded-full pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-[0.8fr_1.2fr] gap-16 items-center">
        {/* Photo/Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative group"
          style={{ x: xFg * 0.5, y: yFg * 0.5 }}
        >
          <div className="aspect-square rounded-[4rem] overflow-hidden border border-white/10 backdrop-blur-xl bg-white/5 shadow-2xl shadow-black/20">
            <img
              src={heroImage}
              alt="Meet Kumar Doshi"
              className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 group-hover:scale-105"
            />
          </div>
          {/* Accent decoration - blue glow */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#2563eb]/15 backdrop-blur-3xl rounded-3xl border border-[#2563eb]/25 -z-10 animate-pulse" />
        </motion.div>

        {/* Text content */}
        <div className="space-y-10 text-left">
          {/* Role badge - bright blue accent */}
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#3b82f6]">{role}</span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-7xl md:text-[8rem] font-bold leading-[0.85] tracking-tighter text-white"
          >
            {title} <br /> <span className="text-white/20 italic">{subtitle}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-white/70 font-light max-w-2xl leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description.replace('Neural Foundations', '<span class="text-[#2563eb] font-semibold">Neural Foundations</span>') }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap gap-6"
          >
            {/* Primary CTA - Navy blue solid button */}
            <a 
              href={links.primary.url} 
              className="px-10 py-5 bg-[#0a192f] text-white border border-[#0a192f] rounded-full font-bold hover:bg-[#1e3a5f] hover:border-[#1e3a5f] transition-all text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#0a192f]/30"
            >
              {links.primary.text}
            </a>
            {/* Secondary CTA - Outlined with navy text */}
            <a 
              href={links.secondary.url} 
              target="_blank" 
              className="px-10 py-5 border border-[#0a192f]/40 text-white rounded-full font-bold hover:bg-[#0a192f]/10 hover:border-[#0a192f]/60 transition-all text-xs uppercase tracking-[0.2em] backdrop-blur-sm"
            >
              {links.secondary.text}
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 text-white/40"
      >
        <ArrowDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
};

export default Hero;
