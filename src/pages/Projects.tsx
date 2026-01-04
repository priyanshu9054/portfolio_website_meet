import { useState } from 'react';
import { Search, Github } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import projectsData from '../../content/data/projects.json';
import { Project } from '../types';
import { ProjectModal } from '../components/Projects/ProjectModal';

const ProjectsPage = () => {
    const [query, setQuery] = useState('');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filtered = projectsData.filter((p: Project) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
    );

    return (
        <div className="pt-64 px-6 max-w-7xl mx-auto pb-48">
            <div className="flex flex-col items-center text-center mb-32">
                <div className="space-y-6">
                    <span className="text-white/40 font-bold uppercase tracking-[0.8em] text-[10px]">Work Archives</span>
                    <h1 className="text-7xl md:text-[9rem] font-bold tracking-tighter leading-none">PROJECTS</h1>
                </div>
                <div className="relative w-full md:w-[450px] mt-16">
                    <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-white/20 w-6 h-6" />
                    <input
                        type="text"
                        placeholder="Search index..."
                        className="w-full bg-white/5 border border-white/10 rounded-full py-6 pl-20 pr-10 focus:outline-none focus:border-white/40 transition-all text-white font-light text-lg"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                {filtered.map((project: Project) => (
                    <div
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className="glass rounded-[3rem] p-4 flex flex-col group overflow-hidden hover:border-white/20 transition-all cursor-pointer"
                    >
                        <div className="aspect-[16/10] rounded-[2.2rem] overflow-hidden mb-8">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000" />
                        </div>
                        <div className="px-6 pb-6">
                            <h3 className="text-2xl font-bold mb-4 tracking-tighter">{project.title}</h3>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tags.map(t => <span key={t} className="text-[10px] uppercase font-bold tracking-widest text-white/20">{t}</span>)}
                            </div>
                            {project.github && (
                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-500 hover:text-white transition-colors">
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
