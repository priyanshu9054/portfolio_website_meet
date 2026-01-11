import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import projectsData from '../../../content/data/projects.json';
import { Project } from '../../types';
import { ArrowUpRight, Github } from 'lucide-react';
import ProjectModal from './ProjectModal';
import { getSkillLabel } from '../../utils/contentUtils';
import SkillTag from '../ui/SkillTag';

export { ProjectModal };

const StickyProjectCard: React.FC<{
  project: Project;
  i: number;
  progress: any;
  total: number;
  onProjectSelect: (p: Project) => void;
}> = ({ project, i, progress, total, onProjectSelect }) => {
  // Scale down as more cards cover it
  const targetScale = 1 - ((total - i) * 0.04);
  const start = i / total;
  const scale = useTransform(progress, [start, 1], [1, targetScale]);

  return (
    <div className="sticky top-0 h-screen flex items-center justify-center px-6">
      <motion.div
        style={{
          scale,
          top: `calc(10% + ${i * 25}px)`,
          zIndex: i + 1,
        }}
        onClick={() => onProjectSelect(project)}
        className="relative w-full max-w-6xl h-[75vh] min-h-[500px] bg-[#0d1117]/90 backdrop-blur-xl rounded-[32px] border border-white/10 overflow-hidden shadow-2xl shadow-black/40 origin-top flex flex-col md:flex-row cursor-pointer transition-all duration-500 group hover:border-[#2563eb]/20"
      >
        {/* Left Content */}
        <div className="flex-1 p-8 md:p-14 flex flex-col justify-between">
          <div className="space-y-8 text-left">
            <div className="flex flex-wrap gap-2">
              {project.skills.map(id => (
                <SkillTag 
                  key={id} 
                  id={id} 
                  label={getSkillLabel(id)} 
                  className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/50 hover:text-[#3b82f6] transition-colors" 
                />
              ))}
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-none">
                {project.title}
              </h3>
              <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-md font-light line-clamp-3">
                {project.description}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            {/* Navy blue primary CTA */}
            <div className="flex items-center justify-center px-10 py-5 bg-[#0a192f] hover:bg-[#1e3a5f] text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 shadow-lg shadow-[#0a192f]/30">
              View Project
            </div>

            {project.github && (
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 group-hover:text-[#3b82f6] transition-colors">
                <Github className="w-5 h-5 opacity-60" />
                Code Link
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Image only) */}
        <div className="md:w-[55%] h-full p-4 md:p-6 bg-white/5 flex flex-col">
          <div className="flex-1 rounded-[24px] overflow-hidden relative">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            <div className="absolute top-8 right-8 p-4 bg-[#0a192f]/80 backdrop-blur-xl rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
              <ArrowUpRight className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ProjectDeckProps {
  onProjectSelect: (project: Project) => void;
}

const ProjectDeck: React.FC<ProjectDeckProps> = ({ onProjectSelect }) => {
  const container = useRef(null);
  const homeProjects = (projectsData as any[]).filter(p => p.showOnHome);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  return (
    <section
      ref={container}
      id="projects"
      className="relative z-[5] bg-transparent"
      style={{ height: `${homeProjects.length * 100}vh` }}
    >
      <div className="relative w-full">
        {homeProjects.map((project, i) => (
          <StickyProjectCard
            key={project.id}
            project={project}
            i={i}
            progress={scrollYProgress}
            total={homeProjects.length}
            onProjectSelect={onProjectSelect}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectDeck;
