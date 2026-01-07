
import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../../types';
import { X, Github } from 'lucide-react';
import SkillTag from '../ui/SkillTag';

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
    className?: string;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 bg-[#003057]/40 backdrop-blur-xl ${className}`}
            onClick={onClose}
        >
            <motion.div
                initial={{ y: 50, scale: 0.95, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: 50, scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#F9F6E5] w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[3rem] md:rounded-[4rem] relative shadow-2xl flex flex-col md:flex-row border border-[#D6DBD4]/20"
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 md:top-10 md:right-10 z-[1001] p-4 bg-[#003057]/5 hover:bg-[#003057]/10 rounded-full border border-[#003057]/10 text-[#003057] transition-all backdrop-blur-xl"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="md:w-1/2 bg-[#003057]/5 flex items-center justify-center p-6 md:p-12">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full aspect-video md:aspect-square object-cover rounded-[2rem] md:rounded-[3rem] shadow-2xl"
                    />
                </div>

                <div className="md:w-1/2 p-8 md:p-20 flex flex-col justify-center">
                    <div className="mb-8 text-left">
                        <span className="text-[#A4925A] font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Project Brief</span>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter leading-none text-[#003057]">{project.title}</h2>
                        <div className="flex flex-wrap gap-3 mb-8">
                            {project.tags.map(tag => (
                                <SkillTag key={tag} name={tag} className="px-3 py-1 bg-[#003057]/5 border border-[#003057]/10 rounded-full text-[9px] font-bold uppercase tracking-widest text-[#003057]/40 hover:text-[#003057]" />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6 mb-12 text-left">
                        <h4 className="text-[10px] font-bold text-[#003057] uppercase tracking-[0.3em] opacity-30">The Architecture</h4>
                        <p className="text-[#003057]/80 text-lg md:text-xl leading-relaxed font-light">
                            {project.longDescription || project.description}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-[#003057]/5">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 py-5 bg-[#003057] text-[#F9F6E5] rounded-full font-bold uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-[#A4925A] transition-all group"
                            >
                                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                GitHub Code Link
                            </a>
                        )}
                        <button
                            onClick={onClose}
                            className="px-8 py-5 border border-[#003057]/10 text-[#003057] rounded-full font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-[#003057]/5 transition-all"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectModal;
