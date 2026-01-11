import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SkillContextType {
    selectedSkillId: string | null;
    openSkill: (id: string) => void;
    closeSkill: () => void;
}

const SkillContext = createContext<SkillContextType | undefined>(undefined);

export const SkillProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

    const openSkill = (id: string) => {
        setSelectedSkillId(id);
    };

    const closeSkill = () => {
        setSelectedSkillId(null);
    };

    return (
        <SkillContext.Provider value={{ selectedSkillId, openSkill, closeSkill }}>
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
