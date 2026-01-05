
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import projectsData from '../../../content/data/projects.json';
import { Project } from '../../types';
import { ArrowUpRight, Github } from 'lucide-react';
import ProjectModal from './ProjectModal';

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
        className="relative w-full max-w-6xl h-[75vh] min-h-[500px] bg-[#141414] rounded-[32px] border border-[#cccccc1a] overflow-hidden shadow-2xl origin-top flex flex-col md:flex-row cursor-pointer transition-colors group"
      >
        {/* Left Content */}
        <div className="flex-1 p-8 md:p-14 flex flex-col justify-between">
          <div className="space-y-8 text-left">
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/30">{tag}</span>
              ))}
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-none">
                {project.title}
              </h3>
              <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-md font-light line-clamp-3">
                {project.description}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <div className="flex items-center justify-center px-10 py-5 bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500">
              View case study
            </div>

            {project.github && (
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
                <Github className="w-5 h-5 opacity-50" />
                Code Link
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Image + Metrics) */}
        <div className="md:w-[55%] h-full p-4 md:p-6 bg-black/20 flex flex-col gap-4">
          <div className="flex-1 rounded-[24px] overflow-hidden relative">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            <div className="absolute top-8 right-8 p-4 bg-white/10 backdrop-blur-xl rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
              <ArrowUpRight className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="h-32 flex gap-4">
            <div className="flex-1 glass rounded-[24px] p-6 flex flex-col justify-center text-left">
              <span className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">Reach</span>
              <span className="text-white text-2xl md:text-3xl font-bold tracking-tighter">{(project as any).engagement || '0'}</span>
            </div>
            <div className="flex-1 glass rounded-[24px] p-6 flex flex-col justify-center text-left">
              <span className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">Rating</span>
              <span className="text-white text-2xl md:text-3xl font-bold tracking-tighter">{(project as any).satisfaction || '0'}</span>
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
      className="relative bg-[#050505]"
      style={{ height: `${homeProjects.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center pointer-events-none z-0">
        <h2 className="text-[15vw] font-black tracking-tighter text-white/5 select-none leading-none uppercase">PROJECTS</h2>
      </div>

      <div className="relative z-10 w-full">
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
