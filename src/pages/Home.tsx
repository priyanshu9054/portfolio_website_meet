
import React, { useState } from 'react';
import Hero from '../components/Hero/Hero';
import SkillMarquee from '../components/Skills/SkillMarquee';
import ProjectsIntro from '../components/Projects/ProjectsIntro';
import ProjectDeck from '../components/Projects/ProjectDeck';
import ProjectModal from '../components/Projects/ProjectModal';
import Skills from '../components/Skills/Skills';
import Certifications from '../components/Timeline/Certifications';
import Timeline from '../components/Timeline/Timeline';
import timelineData from "../../content/data/timeline.json";
import { Project } from '../types';
import { AnimatePresence } from 'framer-motion';

const Home: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <main className="bg-[#050505]">
            <Hero />
            <SkillMarquee />

            {/* Projects Flow */}
            <ProjectsIntro />
            <ProjectDeck onProjectSelect={setSelectedProject} />

            {/* Continue Document Flow */}
            <div className="relative z-20 bg-[#050505]">
                <Skills />
                <Certifications />
            </div>

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
