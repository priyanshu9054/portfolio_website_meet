
import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar } from 'lucide-react';
import { BlogPost } from '../../types';
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
            className={`fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#003057]/95 backdrop-blur-xl ${className}`}
            onClick={onClose}
        >
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#F9F6E5] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[4rem] p-16 md:p-24 relative shadow-2xl border border-[#D6DBD4]/20"
            >
                <button onClick={onClose} className="absolute top-10 right-10 p-4 bg-[#003057]/5 hover:bg-[#003057]/10 rounded-full border border-[#003057]/10 text-[#003057]">
                    <X className="w-6 h-6" />
                </button>
                <div className="mb-12">
                    <div className="flex items-center gap-6 mb-8 text-[10px] font-bold uppercase tracking-widest text-[#003057]/40">
                        <Calendar className="w-4 h-4" /> {blog.date}
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold mb-12 tracking-tighter leading-none text-[#003057]">{blog.title}</h2>
                    <div className="flex flex-wrap gap-3 mb-12">
                        {blog.tags.map(t => (
                            <SkillTag key={t} name={t} className="px-4 py-1.5 bg-[#003057]/5 border border-[#003057]/10 text-[#003057] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#003057]/10" />
                        ))}
                    </div>
                </div>
                <div className="prose prose-xl">
                    <p className="text-[#003057]/80 font-light leading-relaxed whitespace-pre-wrap">{blog.content}</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default BlogModal;
