import skillsDataRaw from '../../../content/data/skills.json';
import { Skill } from '../../types/skills';
import SkillTag from '../ui/SkillTag';
import SectionHeader from '../ui/SectionHeader';

const Skills: React.FC = () => {
    const skills = (skillsDataRaw as Skill[])
        .filter(s => s.enabled)
        .sort((a, b) => (a.order || 0) - (b.order || 0));

    // Grouping by category
    const groupedSkills = skills.reduce((acc, skill) => {
        const category = skill.category;
        if (!acc[category]) acc[category] = [];
        acc[category].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    // Ensure 'technical' comes before 'framework'
    const categories = ['technical', 'framework'].filter(cat => groupedSkills[cat]);

    return (
        <section id="skills" className="pt-32 pb-24 px-6 relative bg-transparent">
            <div className="max-w-7xl mx-auto">
                <SectionHeader titlePrimary="SKILLS" />

                <div className="space-y-16">
                    {categories.map((category, idx) => (
                        <div key={category}>
                            {idx > 0 && <div className="h-px w-full bg-white/10 mb-16" />}
                            <div className="flex flex-wrap gap-3">
                                {groupedSkills[category].map((skill) => (
                                    <SkillTag
                                        key={skill.id}
                                        id={skill.id}
                                        label={skill.label}
                                        className="px-6 py-3 bg-white/[0.06] border border-white/10 rounded-full text-sm text-white/80 font-medium hover:bg-[#0a192f]/60 hover:text-white hover:border-[#2563eb]/50 hover:ring-1 hover:ring-[#2563eb]/30 hover:scale-[1.03] backdrop-blur-sm transition-all duration-300"
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
