
import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar } from 'lucide-react';
import { BlogPost } from '../../types';

interface BlogModalProps {
    blog: BlogPost;
    onClose: () => void;
}

const BlogModal: React.FC<BlogModalProps> = ({ blog, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[4rem] p-16 md:p-24 relative shadow-2xl"
            >
                <button onClick={onClose} className="absolute top-10 right-10 p-4 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-white">
                    <X className="w-6 h-6" />
                </button>
                <div className="mb-12">
                    <div className="flex items-center gap-6 mb-8 text-[10px] font-bold uppercase tracking-widest text-white/40">
                        <Calendar className="w-4 h-4" /> {blog.date}
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold mb-12 tracking-tighter leading-none">{blog.title}</h2>
                    <div className="flex flex-wrap gap-3 mb-12">
                        {blog.tags.map(t => (
                            <span key={t} className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-widest">{t}</span>
                        ))}
                    </div>
                </div>
                <div className="prose prose-invert prose-xl">
                    <p className="text-gray-400 font-light leading-relaxed whitespace-pre-wrap">{blog.content}</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default BlogModal;
