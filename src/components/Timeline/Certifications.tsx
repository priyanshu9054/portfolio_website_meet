import React from 'react';
import { motion } from 'framer-motion';
import certifications from '../../../content/data/certifications.json';
import { Certification } from '../../types';
import { ExternalLink } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const CertificationCard: React.FC<{ cert: Certification; index: number }> = ({ cert, index }) => {
  return (
    <motion.a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group p-8 rounded-[2.5rem] flex flex-col h-full relative overflow-hidden bg-white/[0.06] backdrop-blur-xl border border-white/10 shadow-[0_20px_35px_rgba(0,0,0,0.3)] transition-all duration-500 hover:bg-white/[0.1] hover:border-[#2563eb]/30 hover:shadow-[0_25px_55px_rgba(0,0,0,0.4),_0_0_35px_rgba(37,99,235,0.15)]"
    >
      <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-4 group-hover:translate-x-0">
        <ExternalLink className="w-5 h-5 text-[#3b82f6]" />
      </div>

      <div className="flex items-start gap-6 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/10 p-3 flex items-center justify-center group-hover:bg-white/15 group-hover:border-[#2563eb]/20 transition-all duration-500">
          <img
            src={cert.logo}
            alt={cert.issuer}
            className="w-full h-full object-contain filter brightness-150 group-hover:brightness-100 transition-all duration-500 grayscale group-hover:grayscale-0"
          />
        </div>
        <div className="flex-1">
          <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.3em] mb-2 block">{cert.issuer}</span>
          <h3 className="text-xl font-bold tracking-tight text-white leading-tight group-hover:text-[#60a5fa] transition-colors duration-500">
            {cert.title}
          </h3>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-white/10 space-y-2">
        <div className="flex justify-between items-center text-[10px] font-medium tracking-wider">
          <span className="text-white/50 uppercase">Issued</span>
          <span className="text-white/70">{cert.date}</span>
        </div>
        {cert.credentialId && (
          <div className="flex justify-between items-center text-[10px] font-medium tracking-wider">
            <span className="text-white/50 uppercase">ID</span>
            <span className="text-white/70 truncate ml-4 max-w-[150px]">{cert.credentialId}</span>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-[#3b82f6] opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0">
        Show Credential <ExternalLink className="w-3 h-3 ml-2" />
      </div>
    </motion.a>
  );
};

const Certifications: React.FC = () => {
  return (
    <section className="py-48 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <SectionHeader titlePrimary="ACCREDITATIONS" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {certifications.map((cert: Certification, idx: number) => (
          <CertificationCard key={cert.id} cert={cert} index={idx} />
        ))}
      </div>
    </section>
  );
};

export default Certifications;
