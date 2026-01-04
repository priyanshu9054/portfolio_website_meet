
import React from 'react';
import { motion } from 'framer-motion';
import projects from '../../../content/data/projects.json';
import { Project } from '../../types';
import { ArrowUpRight } from 'lucide-react';

const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => {
  return (
    <motion.div
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
            <span key={tag} className="text-[9px] uppercase font-bold tracking-widest text-white/20 group-hover:text-white/40 transition-colors uppercase">{tag}</span>
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
    <section id="projects-grid" className="py-48 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-24 space-y-6">
        <span className="text-white/40 font-bold uppercase tracking-[0.6em] text-[10px]">Work Archives</span>
        <h2 className="text-6xl md:text-9xl font-bold tracking-tighter leading-none uppercase">PROJECTS</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {projects.map((project: any) => (
          <ProjectCard key={project.id} project={project as Project} onClick={() => onProjectSelect(project as Project)} />
        ))}
      </div>
    </section>
  );
};

export default ProjectDeck;
