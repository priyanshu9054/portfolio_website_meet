
import React from 'react';
import { Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="py-24 px-6 border-t border-white/5 bg-[#050505]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
                <div className="space-y-6">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">LET'S CONNECT<span className="text-white/20">.</span></h2>
                    <p className="text-white/40 font-light text-xl">linkedin.com/in/meetkumar-doshi</p>
                </div>
                <div className="flex space-x-12 uppercase tracking-[0.4em] font-bold text-[10px] text-white/40">
                    <a href="https://www.linkedin.com/in/meetkumar-doshi" target="_blank" className="hover:text-white flex items-center"><Linkedin className="w-4 h-4 mr-2" /> LinkedIn</a>
                    <a href="https://github.com/meetkumar-doshi" target="_blank" className="hover:text-white">GitHub</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
