
import React, { createContext, useContext, useEffect, useState } from 'react';

interface MouseContextType {
    x: number;
    y: number;
}

const MouseContext = createContext<MouseContextType>({ x: 0, y: 0 });

export const MouseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize to -1 to 1 based on window center
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setPosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <MouseContext.Provider value={position}>
            {children}
        </MouseContext.Provider>
    );
};

export const useMousePosition = () => useContext(MouseContext);
