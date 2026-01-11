import { useState } from 'react';
import { Search, Github } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import projectsData from "../../content/data/projects.json";
import skillsDataRaw from "../../content/data/skills.json";
import { Project } from '../types';
import { Skill } from '../types/skills';
import ProjectModal from '../components/Projects/ProjectModal';
import SkillTag from '../components/ui/SkillTag';

const ProjectsPage = () => {
    const [query, setQuery] = useState('');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const skillsData = skillsDataRaw as Skill[];

    const filtered = (projectsData as Project[]).filter((p: Project) => {
        const titleMatch = p.title.toLowerCase().includes(query.toLowerCase());
        const skillMatch = p.skills.some(id => {
            const skill = skillsData.find(s => s.id === id);
            return skill?.label.toLowerCase().includes(query.toLowerCase());
        });
        return titleMatch || skillMatch;
    });

    return (
        <div className="pt-64 px-6 max-w-7xl mx-auto pb-48 bg-transparent">
            <div className="flex flex-col md:flex-row items-end justify-between mb-32 gap-12">
                <div className="space-y-6">
                    <span className="text-[#3b82f6] font-bold uppercase tracking-[0.6em] text-[10px]">Full Archive</span>
                    <h1 className="text-7xl md:text-[8rem] font-bold tracking-tighter leading-none text-white">PROJECTS</h1>
                </div>
                <div className="relative w-full md:w-[450px]">
                    <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-white/30 w-6 h-6" />
                    <input
                        type="text"
                        placeholder="Search index..."
                        className="w-full bg-white/5 border border-white/10 rounded-full py-6 pl-20 pr-10 focus:outline-none focus:border-[#2563eb]/50 transition-all text-white font-light text-lg placeholder:text-white/40 backdrop-blur-xl"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                {filtered.map((project: Project) => (
                    <div
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-4 flex flex-col group overflow-hidden hover:bg-white/[0.08] hover:border-[#2563eb]/30 transition-all duration-300 cursor-pointer"
                    >
                        <div className="aspect-[16/10] rounded-[2.2rem] overflow-hidden mb-8">
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000" 
                            />
                        </div>
                        <div className="px-6 pb-6">
                            <h3 className="text-2xl font-bold mb-4 tracking-tighter text-white group-hover:text-[#60a5fa] transition-colors">{project.title}</h3>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.skills.map(id => {
                                    const skill = skillsData.find(s => s.id === id);
                                    return (
                                        <SkillTag 
                                            key={id} 
                                            id={id} 
                                            label={skill?.label || id} 
                                            className="text-[10px] uppercase font-bold tracking-widest text-white/50 hover:text-[#3b82f6] transition-colors" 
                                        />
                                    );
                                })}
                            </div>
                            {project.github && (
                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#3b82f6] hover:text-white transition-colors">
                                    <Github className="w-4 h-4" /> Code Link
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectsPage;
