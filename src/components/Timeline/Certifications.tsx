
import React from 'react';
import { motion } from 'framer-motion';
import certifications from '../../../content/data/certifications.json';
import { Certification } from '../../types';
import { ExternalLink } from 'lucide-react';

const CertificationCard: React.FC<{ cert: Certification; index: number }> = ({ cert, index }) => {
  return (
    <motion.a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="glass group p-8 rounded-[2.5rem] flex flex-col h-full hover:bg-[#003057]/[0.02] hover:border-[#003057]/20 transition-all duration-500 relative overflow-hidden bg-white/40"
    >
      <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-4 group-hover:translate-x-0">
        <ExternalLink className="w-5 h-5 text-blue-500" />
      </div>

      <div className="flex items-start gap-6 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-[#003057]/5 border border-[#003057]/5 p-3 flex items-center justify-center group-hover:bg-[#003057]/10 transition-all duration-500">
          <img
            src={cert.logo}
            alt={cert.issuer}
            className="w-full h-full object-contain filter group-hover:invert-0 transition-all duration-500 grayscale group-hover:grayscale-0"
          />
        </div>
        <div className="flex-1">
          <span className="text-[9px] font-bold text-[#003057]/30 uppercase tracking-[0.3em] mb-2 block">{cert.issuer}</span>
          <h3 className="text-xl font-bold tracking-tight text-[#003057] leading-tight group-hover:text-[#A4925A] transition-colors duration-500">
            {cert.title}
          </h3>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-[#003057]/5 space-y-2">
        <div className="flex justify-between items-center text-[10px] font-medium tracking-wider">
          <span className="text-[#003057]/40 uppercase">Issued</span>
          <span className="text-[#003057]/60">{cert.date}</span>
        </div>
        {cert.credentialId && (
          <div className="flex justify-between items-center text-[10px] font-medium tracking-wider">
            <span className="text-[#003057]/40 uppercase">ID</span>
            <span className="text-[#003057]/60 truncate ml-4 max-w-[150px]">{cert.credentialId}</span>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0">
        Show Credential <ExternalLink className="w-3 h-3 ml-2" />
      </div>
    </motion.a>
  );
};

const Certifications: React.FC = () => {
  return (
    <section className="py-48 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32 space-y-6">
          <span className="text-[#003057]/40 font-bold uppercase tracking-[0.6em] text-[10px]">Accreditations</span>
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none text-[#003057]">
            QUALIFIED <br /> <span className="text-[#003057]/10 italic">FOUNDATIONS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert: Certification, idx: number) => (
            <CertificationCard key={cert.id} cert={cert} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
