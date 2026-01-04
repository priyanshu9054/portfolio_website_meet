
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import projects from '../../../content/data/projects.json';
import { Project } from '../../types';
import { X, Github, ArrowUpRight } from 'lucide-react';

export const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
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
          <div className="mb-8">
            <span className="text-blue-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Project Brief</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter leading-none">{project.title}</h2>
            <div className="flex flex-wrap gap-3 mb-8">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold uppercase tracking-widest text-white/40">{tag}</span>
              ))}
            </div>
          </div>

          <div className="space-y-6 mb-12">
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

const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => {
  return (
    <motion.div
      id={`project-${project.id}`}
      whileHover={{ y: -12 }}
      className="glass rounded-[3rem] p-4 flex flex-col h-full cursor-pointer group transition-all duration-700 hover:border-white/20 border border-transparent"
      onClick={onClick}
    >
      <div className="relative aspect-[16/10] rounded-[2.2rem] overflow-hidden mb-8">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 brightness-75 grayscale group-hover:grayscale-0 group-hover:brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
        <div className="absolute top-6 right-6 p-4 bg-white/10 backdrop-blur-xl rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <ArrowUpRight className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="px-6 pb-8 space-y-4 flex-1">
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="text-[9px] uppercase font-bold tracking-widest text-white/20 group-hover:text-white/40 transition-colors">{tag}</span>
          ))}
        </div>
        <h3 className="text-3xl font-bold tracking-tighter group-hover:text-blue-400 transition-colors duration-500">{project.title}</h3>
        <p className="text-gray-400 leading-relaxed line-clamp-2 text-base font-light group-hover:text-gray-300 transition-colors">{project.description}</p>
      </div>
    </motion.div>
  );
};

interface ProjectDeckProps {
  onProjectSelect: (project: Project) => void;
}

const ProjectDeck: React.FC<ProjectDeckProps> = ({ onProjectSelect }) => {
  return (
    <section id="projects" className="py-48 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-24 space-y-6">
        <span className="text-white/40 font-bold uppercase tracking-[0.6em] text-[10px]">Work Archives</span>
        <h2 className="text-6xl md:text-9xl font-bold tracking-tighter leading-none">PROJECTS</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {projects.map((project: Project) => (
          <ProjectCard key={project.id} project={project} onClick={() => onProjectSelect(project)} />
        ))}
      </div>
    </section>
  );
};

export default ProjectDeck;
