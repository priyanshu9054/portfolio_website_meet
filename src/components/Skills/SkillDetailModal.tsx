import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { useSkill } from '../../context/SkillContext';
import { getProjectsBySkill, getBlogsBySkill } from '../../utils/contentUtils';
import { Project, BlogPost } from '../../types';
import SkillTag from '../ui/SkillTag';
import ProjectModal from '../Projects/ProjectModal';
import BlogModal from '../Blog/BlogModal';

import skillsDataRaw from '../../../content/data/skills.json';
import { Skill } from '../../types/skills';

const SkillDetailModal: React.FC = () => {
    const { selectedSkillId, closeSkill } = useSkill();
    const skillsData = skillsDataRaw as Skill[];

    // Find the skill metadata
    const skill = skillsData.find(s => s.id === selectedSkillId);

    // Nested Modal State
    const [viewProject, setViewProject] = React.useState<Project | null>(null);
    const [viewBlog, setViewBlog] = React.useState<BlogPost | null>(null);

    // Reset nested views when main skill changes or closes
    React.useEffect(() => {
        setViewProject(null);
        setViewBlog(null);
    }, [selectedSkillId]);

    if (!selectedSkillId || !skill) return null;

    // Resolve projects and blogs based on the ID
    const projects = getProjectsBySkill(selectedSkillId);
    const blogs = getBlogsBySkill(selectedSkillId);

    return (
        <AnimatePresence>
            {selectedSkillId && skill && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-xl"
                    onClick={closeSkill}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#0d1117] w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[32px] md:rounded-[48px] border border-white/10 shadow-2xl shadow-black/50 relative flex flex-col"
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 bg-[#0d1117]/90 backdrop-blur-lg border-b border-white/10 p-8 flex items-center justify-between">
                            <div>
                                <span className="text-[#3b82f6] font-bold uppercase tracking-[0.2em] text-xs mb-2 block">Skill</span>
                                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">{skill.label}</h2>
                            </div>
                            <button
                                onClick={closeSkill}
                                className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-8 md:p-12 space-y-16">
                            {/* Associated Projects Section */}
                            <section>
                                <div className="flex items-center gap-4 mb-10">
                                    <h3 className="text-[10px] font-bold text-white/50 uppercase tracking-[0.4em]">Projects</h3>
                                    <div className="h-px flex-1 bg-white/10" />
                                </div>

                                {projects.length > 0 ? (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {projects.map((project) => (
                                            <div
                                                key={project.id}
                                                onClick={() => setViewProject(project)}
                                                className="group cursor-pointer bg-white/5 border border-white/10 rounded-[2rem] p-6 hover:bg-white/[0.08] hover:shadow-xl hover:border-[#2563eb]/30 transition-all duration-500"
                                            >
                                                <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-white/5">
                                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
                                                </div>
                                                <div className="space-y-3">
                                                    <h4 className="text-xl font-bold text-white tracking-tight group-hover:text-[#60a5fa] transition-colors">{project.title}</h4>
                                                    <p className="text-white/60 text-sm line-clamp-2 mb-4">{project.description}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.skills.slice(0, 3).map(skillId => {
                                                            const sMeta = (skillsDataRaw as Skill[]).find(s => s.id === skillId);
                                                            return (
                                                                <SkillTag
                                                                    key={skillId}
                                                                    id={skillId}
                                                                    label={sMeta?.label || skillId}
                                                                    interactive={false}
                                                                    className="text-[10px] uppercase tracking-wider text-white/50 border border-white/10 px-2 py-1 rounded-full"
                                                                />
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-white/40 italic">No projects explicitly linked to {skill.label}.</p>
                                )}
                            </section>

                            {/* Journal Entries Section */}
                            <section className="pb-8">
                                <div className="flex items-center gap-4 mb-10">
                                    <h3 className="text-[10px] font-bold text-white/50 uppercase tracking-[0.4em]">Blogs</h3>
                                    <div className="h-px flex-1 bg-white/10" />
                                </div>

                                {blogs.length > 0 ? (
                                    <div className="grid md:grid-cols-2 gap-8">
                                        {blogs.map((blog) => (
                                            <div
                                                key={blog.id}
                                                onClick={() => setViewBlog(blog)}
                                                className="group cursor-pointer p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/[0.08] hover:shadow-lg hover:border-[#2563eb]/30 transition-all"
                                            >
                                                <span className="text-[10px] font-bold text-[#3b82f6] uppercase tracking-widest mb-4 block">{blog.date}</span>
                                                <h4 className="text-2xl font-bold text-white tracking-tight mb-4 group-hover:translate-x-2 group-hover:text-[#60a5fa] transition-all">{blog.title}</h4>
                                                <p className="text-white/60 text-base font-light mb-6 line-clamp-2">{blog.excerpt}</p>
                                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#3b82f6]">
                                                    Open Entry <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-white/40 italic">No journal entries found for {skill.label}.</p>
                                )}
                            </section>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Nested Modal Layer */}
            <AnimatePresence mode="wait">
                {viewProject && (
                    <ProjectModal
                        project={viewProject}
                        onClose={() => setViewProject(null)}
                        className="z-[2100]"
                    />
                )}
                {viewBlog && (
                    <BlogModal
                        blog={viewBlog}
                        onClose={() => setViewBlog(null)}
                        className="z-[2100]"
                    />
                )}
            </AnimatePresence>
        </AnimatePresence>
    );
};

export default SkillDetailModal;
