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
            className={`${interactive ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#003057]/40' : 'cursor-default'} transform transition-all duration-200 ${className}`}
        >
            {label}
        </span>
    );
};

export default SkillTag;
