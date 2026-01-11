import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar } from 'lucide-react';
import { BlogPost } from '../../types';
import { getSkillLabel } from '../../utils/contentUtils';
import SkillTag from '../ui/SkillTag';

interface BlogModalProps {
    blog: BlogPost;
    onClose: () => void;
    className?: string;
}

const BlogModal: React.FC<BlogModalProps> = ({ blog, onClose, className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl ${className}`}
            onClick={onClose}
        >
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0d1117] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[4rem] p-16 md:p-24 relative shadow-2xl shadow-black/50 border border-white/10"
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-10 right-10 p-4 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>
                <div className="mb-12">
                    <div className="flex items-center gap-6 mb-8 text-[10px] font-bold uppercase tracking-widest text-white/50">
                        <Calendar className="w-4 h-4" /> {blog.date}
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold mb-12 tracking-tighter leading-none text-white">{blog.title}</h2>
                    <div className="flex flex-wrap gap-3 mb-12">
                        {blog.skills.map(id => (
                            <SkillTag 
                                key={id} 
                                id={id} 
                                label={getSkillLabel(id)} 
                                className="px-4 py-1.5 bg-white/5 border border-white/10 text-[#3b82f6] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors" 
                            />
                        ))}
                    </div>
                </div>
                <div className="prose prose-xl prose-invert">
                    <p className="text-white/70 font-light leading-relaxed whitespace-pre-wrap">{blog.content}</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default BlogModal;
