
import React, { useState } from 'react';
import Hero from '../components/Hero/Hero';
import SkillMarquee from '../components/Skills/SkillMarquee';
import HomeProjectDeck from '../components/Projects/HomeProjectDeck';
import { ProjectModal } from '../components/Projects/ProjectModal';
import KnowledgeGraph from '../components/Skills/KnowledgeGraph';
import Certifications from '../components/Timeline/Certifications';
import Timeline from '../components/Timeline/Timeline';
import timelineData from "../../content/data/timeline.json";
import { Project } from '../types';
import { AnimatePresence } from 'framer-motion';

const Home: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <main>
            <Hero />
            <SkillMarquee />
            <HomeProjectDeck onProjectSelect={setSelectedProject} />
            <KnowledgeGraph onProjectSelect={setSelectedProject} />
            <Certifications />

            <section className="py-48 px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-32">
                    <Timeline title="Education" items={timelineData.education} />
                    <Timeline title="Experience" items={timelineData.experience} />
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
        </main>
    );
};

export default Home;
