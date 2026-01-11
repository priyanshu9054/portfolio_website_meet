import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';
import BlogModal from '../components/Blog/BlogModal';
import { parseMarkdown } from '../utils/markdown';
import SkillTag from '../components/ui/SkillTag';
import skillsDataRaw from '../../content/data/skills.json';
import { Skill } from '../types/skills';

const BlogPage = () => {
    const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
    const skillsData = skillsDataRaw as Skill[];

    // Load all markdown files from content/posts
    const modules = import.meta.glob('../../content/posts/*.md', { query: '?raw', import: 'default', eager: true });

    const blogs: BlogPost[] = Object.entries(modules).map(([path, content]) => {
        const { frontmatter, content: body } = parseMarkdown(content as string);
        return {
            id: path.split('/').pop()?.replace('.md', '') || '',
            title: frontmatter.title,
            date: frontmatter.date,
            skills: frontmatter.skills || [],
            excerpt: frontmatter.excerpt,
            content: body,
        } as BlogPost;
    });

    return (
        <div className="pt-64 px-6 max-w-5xl mx-auto pb-48 bg-transparent">
            <div className="mb-32 text-center space-y-8">
                <span className="text-[#3b82f6] font-bold uppercase tracking-[0.6em] text-[10px]">Insights</span>
                <h1 className="text-7xl md:text-[8rem] font-bold tracking-tighter leading-none text-white">JOURNAL</h1>
            </div>

            <div className="space-y-8">
                {blogs.map(blog => (
                    <article
                        key={blog.id}
                        onClick={() => setSelectedBlog(blog)}
                        className="bg-white/5 backdrop-blur-xl p-12 rounded-[3.5rem] group cursor-pointer hover:bg-white/[0.08] hover:border-[#2563eb]/20 transition-all duration-300 shadow-xl shadow-black/20 border border-white/10"
                    >
                        <div className="flex items-center gap-6 mb-8 text-[10px] font-bold uppercase tracking-widest text-white/50">
                            <Calendar className="w-4 h-4" /> {blog.date}
                            <span className="w-1 h-1 bg-white/20 rounded-full" />
                            <div className="flex gap-4">
                                {blog.skills.map(id => {
                                    const skill = skillsData.find(s => s.id === id);
                                    return <SkillTag key={id} id={id} label={skill?.label || id} className="text-[#3b82f6] hover:text-white transition-colors" />;
                                })}
                            </div>
                        </div>
                        <h2 className="text-4xl font-bold mb-6 tracking-tighter group-hover:translate-x-4 group-hover:text-[#60a5fa] transition-all duration-500 text-white">{blog.title}</h2>
                        <p className="text-white/60 text-xl font-light leading-relaxed mb-10">{blog.excerpt}</p>
                        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-[#3b82f6]">
                            Read Entry <ArrowRight className="w-5 h-5" />
                        </div>
                    </article>
                ))}
            </div>

            <AnimatePresence>
                {selectedBlog && <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />}
            </AnimatePresence>
        </div>
    );
};

export default BlogPage;
