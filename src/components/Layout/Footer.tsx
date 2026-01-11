import { Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="py-24 px-6 border-t border-white/10 bg-[#0d1117]/50 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
                <div className="space-y-6">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
                        LET'S CONNECT<span className="text-[#2563eb]">.</span>
                    </h2>
                    <p className="text-white/50 font-light text-xl">linkedin.com/in/meetkumar-doshi</p>
                </div>
                <div className="flex space-x-12 uppercase tracking-[0.4em] font-bold text-[10px] text-white/50">
                    <a 
                        href="https://www.linkedin.com/in/meetkumar-doshi" 
                        target="_blank" 
                        className="hover:text-[#2563eb] flex items-center transition-colors"
                    >
                        <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
                    </a>
                    <a 
                        href="https://github.com/meetkumar-doshi" 
                        target="_blank" 
                        className="hover:text-[#2563eb] transition-colors"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
