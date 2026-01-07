import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { useSkill } from '../../context/SkillContext';
import { getProjectsBySkill, getBlogsBySkill } from '../../utils/contentUtils';
import { Project, BlogPost } from '../../types';
import SkillTag from '../ui/SkillTag';
import ProjectModal from '../Projects/ProjectModal';
import BlogModal from '../Blog/BlogModal';

const SkillDetailModal: React.FC = () => {
    const { selectedSkill, closeSkill } = useSkill();

    // Nested Modal State
    const [viewProject, setViewProject] = React.useState<Project | null>(null);
    const [viewBlog, setViewBlog] = React.useState<BlogPost | null>(null);

    // Reset nested views when main skill changes or closes
    React.useEffect(() => {
        setViewProject(null);
        setViewBlog(null);
    }, [selectedSkill]);

    if (!selectedSkill) return null;

    const projects = getProjectsBySkill(selectedSkill);
    const blogs = getBlogsBySkill(selectedSkill);

    return (
        <AnimatePresence>
            {selectedSkill && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-xl"
                    onClick={closeSkill}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#111] w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[32px] md:rounded-[48px] border border-white/10 shadow-2xl relative flex flex-col"
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 bg-[#111]/90 backdrop-blur-lg border-b border-white/5 p-8 flex items-center justify-between">
                            <div>
                                <span className="text-white/40 font-bold uppercase tracking-[0.2em] text-xs mb-2 block">Skill</span>
                                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">{selectedSkill}</h2>
                            </div>
                            <button
                                onClick={closeSkill}
                                className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-8 md:p-12 space-y-16">

                            {/* Projects Section */}
                            <section>
                                <div className="flex items-center gap-4 mb-8">
                                    <h3 className="text-2xl font-bold text-white tracking-tight">Projects</h3>
                                    <div className="h-px flex-1 bg-white/10" />
                                    <span className="text-white/40 text-sm font-mono">{projects.length}</span>
                                </div>

                                {projects.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {projects.map((project: Project) => (
                                            <div
                                                key={project.id}
                                                onClick={() => setViewProject(project)}
                                                className="group relative bg-white/[0.03] hover:bg-white/[0.05] border border-white/5 rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer"
                                            >
                                                <div className="aspect-[16/9] overflow-hidden">
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                                    />
                                                </div>
                                                <div className="p-6">
                                                    <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>
                                                    <p className="text-white/50 text-sm line-clamp-2 mb-4">{project.description}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.tags.slice(0, 3).map(tag => (
                                                            <SkillTag key={tag} name={tag} className="text-[10px] uppercase tracking-wider text-white/30 border border-white/10 px-2 py-1 rounded-full hover:bg-white/10 hover:text-white" />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-white/30 italic">No projects directly tagged with {selectedSkill}.</p>
                                )}
                            </section>

                            {/* Blogs Section */}
                            <section>
                                <div className="flex items-center gap-4 mb-8">
                                    <h3 className="text-2xl font-bold text-white tracking-tight">Journal Entries</h3>
                                    <div className="h-px flex-1 bg-white/10" />
                                    <span className="text-white/40 text-sm font-mono">{blogs.length}</span>
                                </div>

                                {blogs.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {blogs.map((blog: BlogPost) => (
                                            <div
                                                key={blog.id}
                                                onClick={() => setViewBlog(blog)}
                                                className="group p-8 bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 rounded-3xl transition-all duration-300 cursor-pointer"
                                            >
                                                <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4">{blog.date}</div>
                                                <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{blog.title}</h4>
                                                <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-3">{blog.excerpt}</p>
                                                <div className="flex items-center text-xs font-bold uppercase tracking-widest text-white/60 group-hover:translate-x-2 transition-transform">
                                                    Read Entry <ArrowRight className="w-4 h-4 ml-2" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-white/30 italic">No journal entries found for {selectedSkill}.</p>
                                )}
                            </section>

                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Nested Modals - Rendered outside to stack on top */}
            {viewProject && (
                <ProjectModal
                    project={viewProject}
                    onClose={() => setViewProject(null)}
                    className="z-[2100]" // Higher than Skill Detail Modal
                />
            )}

            {viewBlog && (
                <BlogModal
                    blog={viewBlog}
                    onClose={() => setViewBlog(null)}
                    className="z-[2100]" // Higher than Skill Detail Modal
                />
            )}
        </AnimatePresence>
    );
};

export default SkillDetailModal;
