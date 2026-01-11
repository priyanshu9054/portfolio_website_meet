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
        <section id="skills" className="pt-32 pb-24 px-6 relative">
            <div className="max-w-7xl mx-auto">
                <SectionHeader titlePrimary="SKILLS" />

                <div className="space-y-16">
                    {categories.map((category, idx) => (
                        <div key={category}>
                            {idx > 0 && <div className="h-px w-full bg-[#003057]/10 mb-16" />}
                            <div className="flex flex-wrap gap-3">
                                {groupedSkills[category].map((skill) => (
                                    <SkillTag
                                        key={skill.id}
                                        id={skill.id}
                                        label={skill.label}
                                        className="px-6 py-3 bg-[#003057]/[0.03] border border-[#003057]/5 rounded-full text-sm text-[#003057]/70 font-medium hover:bg-[#003057]/[0.08] hover:text-[#003057]"
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
