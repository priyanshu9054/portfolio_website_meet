
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillMarquee from './components/SkillMarquee';
import ProjectDeck, { ProjectModal } from './components/ProjectDeck';
import KnowledgeGraph from './components/KnowledgeGraph';
import Certifications from './components/Certifications';
import Timeline from './components/Timeline';
import { EDUCATION, EXPERIENCE, BLOGS, PROJECTS } from './constants';
import { Search, Calendar, ArrowRight, Linkedin, X, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogPost, Project } from './types';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageWrapper = ({ children }: { children?: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
  >
    {children}
  </motion.div>
);

const HomePage = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main>
      <Hero />
      <SkillMarquee />
      <ProjectDeck onProjectSelect={setSelectedProject} />
      <KnowledgeGraph onProjectSelect={setSelectedProject} />
      <Certifications />

      <section className="py-48 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-32">
          <Timeline title="Education" items={EDUCATION} />
          <Timeline title="Experience" items={EXPERIENCE} />
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

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
    </main>
  );
};

const BlogModal: React.FC<{ blog: BlogPost; onClose: () => void }> = ({ blog, onClose }) => {
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

const BlogPage = () => {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  return (
    <div className="pt-64 px-6 max-w-5xl mx-auto pb-48">
      <div className="mb-32 text-center space-y-8">
        <span className="text-white/40 font-bold uppercase tracking-[0.6em] text-[10px]">Insights</span>
        <h1 className="text-7xl md:text-[8rem] font-bold tracking-tighter leading-none">JOURNAL</h1>
      </div>

      <div className="space-y-8">
        {BLOGS.map(blog => (
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

const ProjectsPage = () => {
  const [query, setQuery] = React.useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = PROJECTS.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="pt-64 px-6 max-w-7xl mx-auto pb-48">
      <div className="flex flex-col md:flex-row items-end justify-between mb-32 gap-12">
        <div className="space-y-6">
          <span className="text-white/40 font-bold uppercase tracking-[0.6em] text-[10px]">Full Archive</span>
          <h1 className="text-7xl md:text-[8rem] font-bold tracking-tighter leading-none">PROJECTS</h1>
        </div>
        <div className="relative w-full md:w-[450px]">
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
        {filtered.map(project => (
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

const AboutPage = () => (
  <div className="pt-64 px-6 max-w-6xl mx-auto pb-48">
    <div className="grid md:grid-cols-2 gap-32">
      <div className="space-y-16">
        <div className="space-y-8">
          <span className="text-white/40 font-bold uppercase tracking-[0.6em] text-[10px]">The Engineer</span>
          <h1 className="text-7xl md:text-[8rem] font-bold tracking-tighter leading-none italic">ABOUT</h1>
        </div>
        <div className="space-y-8 text-xl text-white/60 font-light leading-relaxed">
          <p>
            I am an <span className="text-white">Applied AI Engineer</span> with a strong focus on Artificial Intelligence for Robotics and Autonomous Systems, combining academic training from <span className="text-white font-medium">Georgia Tech</span> and <span className="text-white font-medium">UPenn</span>.
          </p>
          <p>
            My foundation bridges AI algorithms with hardware-aware, production-grade systems—a critical capability for edge AI and safety-critical applications.
          </p>
          <div className="pt-8">
            <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mb-6">Experience Highlights</h4>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="w-1 h-1 bg-blue-500 rounded-full mt-2" />
                <p className="text-sm">FPGA Acceleration: Re-architected software-defined radio pipelines using custom floating-point formats.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-1 h-1 bg-blue-500 rounded-full mt-2" />
                <p className="text-sm">Safety-Critical Control: Designed industrial laser systems with &lt;2 μs emergency response.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="aspect-[4/5] glass rounded-[4rem] overflow-hidden group border-white/10">
          <img
            src="/src/assets/images/hero.png"
            alt="Meet Doshi"
            className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-1000"
          />
        </div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-600/20 blur-[80px] rounded-full pointer-events-none" />
      </div>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
            <Route path="/blog" element={<PageWrapper><BlogPage /></PageWrapper>} />
            <Route path="/projects" element={<PageWrapper><ProjectsPage /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;
