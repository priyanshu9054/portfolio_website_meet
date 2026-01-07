import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SkillContextType {
    selectedSkill: string | null;
    openSkill: (skill: string) => void;
    closeSkill: () => void;
}

const SkillContext = createContext<SkillContextType | undefined>(undefined);

export const SkillProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

    const openSkill = (skill: string) => {
        setSelectedSkill(skill);
    };

    const closeSkill = () => {
        setSelectedSkill(null);
    };

    return (
        <SkillContext.Provider value={{ selectedSkill, openSkill, closeSkill }}>
            {children}
        </SkillContext.Provider>
    );
};

export const useSkill = () => {
    const context = useContext(SkillContext);
    if (context === undefined) {
        throw new Error('useSkill must be used within a SkillProvider');
    }
    return context;
};
