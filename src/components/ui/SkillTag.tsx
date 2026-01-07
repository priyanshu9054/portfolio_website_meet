import React from 'react';
import { useSkill } from '../../context/SkillContext';


interface SkillTagProps {
    name: string;
    className?: string;
}

const SkillTag: React.FC<SkillTagProps> = ({ name, className = "" }) => {
    const { openSkill } = useSkill();

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent parent click handlers (like opening project modal)
        openSkill(name);
    };

    return (
        <span
            onClick={handleClick}
            className={`cursor-pointer hover:bg-white/20 transition-all ${className}`}
        >
            {name}
        </span>
    );
};

export default SkillTag;
