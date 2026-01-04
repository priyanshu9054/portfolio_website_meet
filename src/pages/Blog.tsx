
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';
import BlogModal from '../components/Blog/BlogModal';
import { parseMarkdown } from '../utils/markdown';

const BlogPage = () => {
    const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

    // Load all markdown files from content/posts
    const modules = import.meta.glob('../../../content/posts/*.md', { query: '?raw', import: 'default', eager: true });

    const blogs: BlogPost[] = Object.entries(modules).map(([path, content]) => {
        const { frontmatter, content: body } = parseMarkdown(content as string);
        return {
            id: path.split('/').pop()?.replace('.md', '') || '',
            title: frontmatter.title,
            date: frontmatter.date,
            tags: frontmatter.tags || [],
            excerpt: frontmatter.excerpt,
            content: body,
        } as BlogPost;
    });

    return (
        <div className="pt-64 px-6 max-w-5xl mx-auto pb-48">
            <div className="mb-32 text-center space-y-8">
                <span className="text-white/40 font-bold uppercase tracking-[0.6em] text-[10px]">Insights</span>
                <h1 className="text-7xl md:text-[8rem] font-bold tracking-tighter leading-none">JOURNAL</h1>
            </div>

            <div className="space-y-8">
                {blogs.map(blog => (
                    <article
                        key={blog.id}
                        onClick={() => setSelectedBlog(blog)}
                        className="glass p-12 rounded-[3.5rem] group cursor-pointer hover:bg-white/[0.04] transition-all"
                    >
                        <div className="flex items-center gap-6 mb-8 text-[10px] font-bold uppercase tracking-widest text-white/40">
                            <Calendar className="w-4 h-4" /> {blog.date}
                            <span className="w-1 h-1 bg-white/10 rounded-full" />
                            <div className="flex gap-4">
                                {blog.tags.map(t => <span key={t} className="text-blue-500">{t}</span>)}
                            </div>
                        </div>
                        <h2 className="text-4xl font-bold mb-6 tracking-tighter group-hover:translate-x-4 transition-transform duration-500">{blog.title}</h2>
                        <p className="text-gray-400 text-xl font-light leading-relaxed mb-10">{blog.excerpt}</p>
                        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em]">
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
