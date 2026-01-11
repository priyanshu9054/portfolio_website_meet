import React from 'react';
import { useSkill } from '../../context/SkillContext';


interface SkillTagProps {
    id: string;
    label: string;
    className?: string;
    interactive?: boolean;
}

const SkillTag: React.FC<SkillTagProps> = ({ id, label, className = "", interactive = true }) => {
    const { openSkill } = useSkill();

    const handleClick = (e: React.MouseEvent) => {
        if (!interactive) return;
        e.stopPropagation();
        openSkill(id);
    };

    return (
        <span
            onClick={handleClick}
            className={`${interactive ? 'cursor-pointer hover:bg-[#003057]/5' : 'cursor-default'} transition-all ${className}`}
        >
            {label}
        </span>
    );
};

export default SkillTag;
