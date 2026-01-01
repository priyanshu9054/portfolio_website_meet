
import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  {
    name: 'Python',
    color: '#3776AB',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.922 0C5.341 0 5.633 2.854 5.633 2.854l.006 2.953h6.39v.9h-8.91S0 6.136 0 12.63c0 6.495 2.652 6.173 2.652 6.173h1.587v-2.232c0-2.486 2.053-2.455 2.053-2.455h5.546c2.51 0 2.455-2.221 2.455-2.221V6.368c0-2.455-2.243-2.311-2.243-2.311H6.471S6.615.144 11.922 0zm5.607 5.196v2.233c0 2.486-2.053 2.455-2.053 2.455h-5.545c-2.51 0-2.455 2.221-2.455 2.221v5.527c0 2.455 2.243 2.311 2.243 2.311h5.607s-.144 3.856-5.451 4.001c5.307 0 5.015-2.854 5.015-2.854l-.007-2.953h-6.39v-.9h8.91s3.123.573 3.123-5.92c0-6.494-2.652-6.174-2.652-6.174h-1.587zM8.88 2.378a.715.715 0 1 1 0 1.429.715.715 0 0 1 0-1.429zm6.241 17.865a.715.715 0 1 1 0 1.43.715.715 0 0 1 0-1.43z"/>
      </svg>
    )
  },
  {
    name: 'PyTorch',
    color: '#EE4C2C',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 0L2.343 12L12 24L21.657 12L12 0ZM12 4.475L18.425 12L12 19.525L5.575 12L12 4.475Z"/>
      </svg>
    )
  },
  {
    name: 'TensorFlow',
    color: '#FF6F00',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.328 17.261L12 23.33l10.672-6.069v-11.23L12 .002 1.328 5.971v11.29zM12 2.324l8.604 4.808v9.616L12 21.556l-8.604-4.808V7.132L12 2.324zM12 5.5l-6 3.428v6.857L12 19.214l6-3.429V8.928L12 5.5z"/>
      </svg>
    )
  },
  {
    name: 'OpenAI',
    color: '#ffffff',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5153-4.9066 6.0462 6.0462 0 0 0-3.9998-2.8271 6.0277 6.0277 0 0 0-5.1868.9514 6.059 6.059 0 0 0-4.3811-1.9277 6.002 6.002 0 0 0-5.482 3.6368 6.031 6.031 0 0 0 .3985 5.2999 5.9847 5.9847 0 0 0 .5153 4.9066 6.0462 6.0462 0 0 0 3.9998 2.8271 6.0277 6.0277 0 0 0 5.1868-.9514 6.059 6.059 0 0 0 4.3811 1.9277 6.002 6.002 0 0 0 5.482-3.6368 6.031 6.031 0 0 0-.3985-5.2999zM12.0002 14.633a2.384 2.384 0 1 1 2.384-2.384 2.384 2.384 0 0 1-2.384 2.384z"/>
      </svg>
    )
  },
  {
    name: 'HuggingFace',
    color: '#FFD21E',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 7a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 12a2 2 0 1 0-4 0 2 2 0 0 0 4 0z" fill="white" />
      </svg>
    )
  },
  {
    name: 'Docker',
    color: '#2496ED',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M13.983 11.078h2.119c.102 0 .186-.083.186-.185V8.774a.186.186 0 00-.186-.186h-2.119a.186.186 0 00-.186.186v2.119c0 .102.084.185.186.185m-2.954-5.43h2.118c.102 0 .185-.083.185-.186V3.343a.186.186 0 00-.185-.185h-2.118a.186.186 0 00-.186.185v2.119c0 .102.084.185.186.185m0 2.715h2.118c.102 0 .185-.083.185-.186V6.059a.186.186 0 00-.185-.186h-2.118a.186.186 0 00-.186.186v2.119c0 .102.084.185.186.185m0 2.715h2.118c.102 0 .185-.083.185-.185V8.774a.186.186 0 00-.185-.186h-2.118a.186.186 0 00-.186.186v2.119c0 .102.084.185.186.185m-2.954 0h2.119c.102 0 .185-.083.185-.185V8.774a.186.186 0 00-.185-.186H8.075a.186.186 0 00-.186.186v2.119c0 .102.084.185.186.185m0-2.715h2.119c.102 0 .185-.083.185-.186V6.059a.186.186 0 00-.185-.186H8.075a.186.186 0 00-.186.186v2.119c0 .102.084.185.186.185m-2.954 0h2.119c.102 0 .186-.083.186-.186V6.059a.186.186 0 00-.186-.186H5.121a.186.186 0 00-.186.186v2.119c0 .102.084.185.186.185m0 2.715h2.119c.102 0 .186-.083.186-.185V8.774a.186.186 0 00-.186-.186H5.121a.186.186 0 00-.186.186v2.119c0 .102.084.185.186.185m-2.954 0h2.119c.102 0 .186-.083.186-.185V8.774a.186.186 0 00-.186-.186H2.167a.186.186 0 00-.186.186v2.119c0 .102.084.185.186.185M.181 12.426c.135 3.92 3.558 7.361 7.478 7.361 5.983 0 10.833-4.85 10.833-10.833a10.83 10.83 0 00-1.823-5.97h.002a.186.186 0 00-.287-.225 3.33 3.33 0 01-2.023.684H12.91a.186.186 0 00-.186.185v1.261c0 .102.084.185.186.185h1.23c1.096 0 1.984.888 1.984 1.984v1.274a1.984 1.984 0 01-1.984 1.984H.202a.186.186 0 00-.183.218"/>
      </svg>
    )
  },
  {
    name: 'AWS',
    color: '#FF9900',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 0L0 6v12l12 6 12-6V6L12 0zm0 3.7l7.5 3.75v3.4l-7.5-3.75-7.5 3.75v-3.4L12 3.7zm-7.5 8.9L12 8.85l7.5 3.75v3.4l-7.5-3.75-7.5 3.75v-3.4z"/>
      </svg>
    )
  },
  {
    name: 'SQL',
    color: '#336791',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2C6.48 2 2 4.02 2 6.5s4.48 4.5 10 4.5 10-2.02 10-4.5S17.52 2 12 2zm0 13c-4.14 0-7.79-1.25-9.33-3.04.14 1.83 3.68 3.54 9.33 3.54s9.19-1.71 9.33-3.54C19.79 13.75 16.14 15 12 15zm0 5c-4.14 0-7.79-1.25-9.33-3.04.14 1.83 3.68 3.54 9.33 3.54s9.19-1.71 9.33-3.54C19.79 18.75 16.14 20 12 20z"/>
      </svg>
    )
  }
];

const SkillMarquee: React.FC = () => {
  return (
    <div className="py-24 bg-black overflow-hidden border-y border-white/5">
      <div className="relative flex whitespace-nowrap group">
        <motion.div
          animate={{ x: [0, -1400] }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
          className="flex space-x-24 items-center pr-24"
        >
          {logos.concat(logos).concat(logos).map((logo, idx) => (
            <div
              key={idx}
              className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 group/logo cursor-default"
              title={logo.name}
            >
              <div 
                className="w-full h-full text-white/10 grayscale group-hover/logo:grayscale-0 transition-all duration-500 transform group-hover/logo:scale-110"
                style={{ '--logo-color': logo.color } as React.CSSProperties}
              >
                <div className="group-hover/logo:text-[var(--logo-color)] transition-colors duration-500">
                  {logo.svg}
                </div>
              </div>
              <div 
                className="absolute -inset-8 bg-[var(--logo-color)] opacity-0 group-hover/logo:opacity-10 blur-[40px] rounded-full transition-opacity duration-500"
                style={{ '--logo-color': logo.color } as React.CSSProperties}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SkillMarquee;
