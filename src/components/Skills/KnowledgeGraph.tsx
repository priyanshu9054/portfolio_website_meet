
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import knowledgeCards from '../../../content/data/knowledge.json';
import projects from '../../../content/data/projects.json';
import { Project } from '../../types';
import { Plus, Minus, Cpu, ChevronRight } from 'lucide-react';
import SkillTag from '../ui/SkillTag';

interface KnowledgeGraphProps {
  onProjectSelect: (project: Project) => void;
}

const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ onProjectSelect }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleProjectClick = (e: React.MouseEvent, projectTitle: string) => {
    e.stopPropagation();
    const project = projects.find((p: Project) => p.title === projectTitle);
    if (project) {
      onProjectSelect(project);
    }
  };

  return (
    <section className="py-48 px-6 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-32 space-y-6">
          <span className="text-white/40 font-bold uppercase tracking-[0.6em] text-[10px]">Specialized Intelligence</span>
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">THE KNOWLEDGE <br /> <span className="text-white/30 italic">GRAPH</span></h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {knowledgeCards.map((card) => {
            const isExpanded = expandedId === card.id;

            return (
              <motion.div
                key={card.id}
                layout
                className={`
                  glass rounded-[4rem] p-12 cursor-pointer transition-all duration-700
                  ${isExpanded ? 'bg-white/[0.04] border-white/20' : 'hover:bg-white/[0.04]'}
                `}
                onClick={() => setExpandedId(isExpanded ? null : card.id)}
              >
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-bold tracking-tighter">{card.title}</h3>
                  </div>
                  <div className="p-2 rounded-full border border-white/10">
                    {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </div>

                <motion.p layout="position" className="text-gray-400 text-lg font-light leading-relaxed mb-6">
                  {card.summary}
                </motion.p>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-12 mt-12 pt-12 border-t border-white/5"
                    >
                      <div className="grid md:grid-cols-1 gap-12">
                        <div>
                          <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.4em] mb-4">What was done</h4>
                          <p className="text-xl text-white/80 font-light leading-relaxed">{card.details}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                          <div>
                            <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mb-6">Applied Projects</h4>
                            <div className="space-y-4">
                              {card.projects.map(proj => (
                                <button
                                  key={proj}
                                  onClick={(e) => handleProjectClick(e, proj)}
                                  className="flex items-center text-white/60 hover:text-white transition-colors group/link text-left w-full"
                                >
                                  <ChevronRight className="w-4 h-4 mr-3 text-blue-500 group-hover/link:translate-x-1 transition-transform" />
                                  <span className="text-base border-b border-white/0 group-hover/link:border-white/20">
                                    {proj}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mb-6">Tools & Stack</h4>
                            <div className="flex flex-wrap gap-2">
                              {card.tools.map(tool => (
                                <SkillTag key={tool} name={tool} className="px-4 py-2 bg-white/5 border border-white/5 rounded-full text-[11px] text-gray-400 font-medium hover:bg-white/10 hover:text-white" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KnowledgeGraph;
