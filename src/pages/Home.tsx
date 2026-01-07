
import React, { useState } from 'react';
import Hero from '../components/Hero/Hero';
import SkillMarquee from '../components/Skills/SkillMarquee';
import ProjectsIntro from '../components/Projects/ProjectsIntro';
import ProjectDeck from '../components/Projects/ProjectDeck';
import ProjectModal from '../components/Projects/ProjectModal';
import Skills from '../components/Skills/Skills';
import Certifications from '../components/Timeline/Certifications';
import Education from '../components/Education/Education';
import Experience from '../components/Experience/Experience';
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

            <Education items={timelineData.education} />
            <Experience items={timelineData.experience} />

            <div className="pb-20" />

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
