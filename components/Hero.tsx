
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-48 pb-12 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[180px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-[0.8fr_1.2fr] gap-16 items-center">
        {/* Sketch: Circle/Photo on left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative group"
        >
          <div className="aspect-square rounded-[4rem] overflow-hidden border border-white/10 glass shadow-2xl shadow-blue-500/10">
            <img 
              src="https://media.licdn.com/dms/image/v2/D4D03AQGs6O9G3R8NGA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1723708892795?e=1746057600&v=beta&t=57X8A67B7fK0778X-HhW3X-G6o-x0-m677W-X_4-h8" 
              alt="Meet Kumar Doshi" 
              className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 -z-10 animate-pulse" />
        </motion.div>

        {/* Text on right */}
        <div className="space-y-10 text-left">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60">Applied AI Engineer & Robotics Architect</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-7xl md:text-[8rem] font-bold leading-[0.85] tracking-tighter"
          >
            MEET <br /> <span className="text-white/20 italic">DOSHI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl leading-relaxed"
          >
            Engineering the intersection of <span className="text-white">Neural Foundations</span> and autonomous robotics systems. MSCS AI from Georgia Tech.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap gap-6"
          >
            <a href="#projects" className="px-10 py-5 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all text-xs uppercase tracking-[0.2em]">
              Projects
            </a>
            <a href="https://www.linkedin.com/in/meetkumar-doshi" target="_blank" className="px-10 py-5 border border-white/10 text-white rounded-full font-bold hover:bg-white/5 transition-all text-xs uppercase tracking-[0.2em]">
              LinkedIn
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
