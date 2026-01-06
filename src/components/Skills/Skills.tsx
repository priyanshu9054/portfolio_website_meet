
import React from 'react';

const technicalSkills = [
    "Python", "C++", "Embedded C", "RL", "MARL", "Dynamics & Control",
    "Robotics", "ROS", "CUDA", "FPGA", "MATLAB", "Linear Algebra"
];

const frameworksTools = [
    "PyTorch", "TensorFlow", "OpenAI", "HuggingFace", "Docker",
    "AWS", "SQL", "OpenCV", "Git", "Linux", "Simulink"
];

const SkillChip = ({ name }: { name: string }) => (
    <span className="px-6 py-3 bg-white/[0.03] border border-white/5 rounded-full text-sm text-white/70 font-medium hover:bg-white/[0.08] hover:text-white transition-all cursor-default select-none">
        {name}
    </span>
);

const Skills: React.FC = () => {
    return (
        <section id="skills" className="py-24 px-6 bg-[#050505]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">Skills</h2>
                    <div className="w-12 h-1 bg-blue-500 rounded-full" />
                </div>

                <div className="space-y-16">
                    {/* Technical Skills Group */}
                    <div className="flex flex-wrap gap-3">
                        {technicalSkills.map((skill) => (
                            <SkillChip key={skill} name={skill} />
                        ))}
                    </div>

                    <div className="h-px w-full bg-white/10" />

                    {/* Frameworks / Tools Group */}
                    <div className="flex flex-wrap gap-3">
                        {frameworksTools.map((skill) => (
                            <SkillChip key={skill} name={skill} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
