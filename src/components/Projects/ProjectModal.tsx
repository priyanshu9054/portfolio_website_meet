
import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../../types';
import { X, Github } from 'lucide-react';

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-xl"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: 50, scale: 0.95, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: 50, scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[3rem] md:rounded-[4rem] relative shadow-2xl flex flex-col md:flex-row"
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 md:top-10 md:right-10 z-[1001] p-4 bg-white/10 hover:bg-white/20 rounded-full border border-white/10 text-white transition-all backdrop-blur-xl"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="md:w-1/2 bg-black flex items-center justify-center p-6 md:p-12">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full aspect-video md:aspect-square object-cover rounded-[2rem] md:rounded-[3rem] shadow-2xl"
                    />
                </div>

                <div className="md:w-1/2 p-8 md:p-20 flex flex-col justify-center bg-white/[0.02]">
                    <div className="mb-8 text-left">
                        <span className="text-blue-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Project Brief</span>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter leading-none">{project.title}</h2>
                        <div className="flex flex-wrap gap-3 mb-8">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold uppercase tracking-widest text-white/40">{tag}</span>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6 mb-12 text-left">
                        <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.3em] opacity-30">The Architecture</h4>
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
                            {project.longDescription || project.description}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/5">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 py-5 bg-white text-black rounded-full font-bold uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-gray-200 transition-all group"
                            >
                                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                GitHub Code Link
                            </a>
                        )}
                        <button
                            onClick={onClose}
                            className="px-8 py-5 border border-white/10 text-white rounded-full font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-white/5 transition-all"
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
