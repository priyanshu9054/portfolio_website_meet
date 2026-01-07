
import React from 'react';

import SkillTag from '../ui/SkillTag';

const technicalSkills = [
    "Python", "C++", "Embedded C", "RL", "MARL", "Dynamics & Control",
    "Robotics", "ROS", "CUDA", "FPGA", "MATLAB", "Linear Algebra"
];

const frameworksTools = [
    "PyTorch", "TensorFlow", "OpenAI", "HuggingFace", "Docker",
    "AWS", "SQL", "OpenCV", "Git", "Linux", "Simulink"
];

const Skills: React.FC = () => {
    return (
        <section id="skills" className="py-24 px-6 relative">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4 text-[#003057]">Skills</h2>
                    <div className="w-12 h-1 bg-[#A4925A] rounded-full" />
                </div>

                <div className="space-y-16">
                    {/* Technical Skills Group */}
                    <div className="flex flex-wrap gap-3">
                        {technicalSkills.map((skill) => (
                            <SkillTag
                                key={skill}
                                name={skill}
                                className="px-6 py-3 bg-[#003057]/[0.03] border border-[#003057]/5 rounded-full text-sm text-[#003057]/70 font-medium hover:bg-[#003057]/[0.08] hover:text-[#003057]"
                            />
                        ))}
                    </div>

                    <div className="h-px w-full bg-[#003057]/10" />

                    {/* Frameworks / Tools Group */}
                    <div className="flex flex-wrap gap-3">
                        {frameworksTools.map((skill) => (
                            <SkillTag
                                key={skill}
                                name={skill}
                                className="px-6 py-3 bg-[#003057]/[0.03] border border-[#003057]/5 rounded-full text-sm text-[#003057]/70 font-medium hover:bg-[#003057]/[0.08] hover:text-[#003057]"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
