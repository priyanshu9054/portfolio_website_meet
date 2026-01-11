import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import GradientMesh from './GradientMesh';
import Particles from './Particles';
import PostProcessing from './PostProcessing';
import { useBackgroundContext } from './BackgroundContext';

// Camera that responds to mouse for subtle parallax
const AnimatedCamera: React.FC = () => {
    const { mouse } = useBackgroundContext();

    // Subtle camera movement based on mouse
    const cameraX = (mouse.x - 0.5) * 0.5;
    const cameraY = (mouse.y - 0.5) * 0.5;

    return (
        <PerspectiveCamera
            makeDefault
            position={[cameraX, cameraY, 5]}
            fov={75}
            near={0.1}
            far={100}
        />
    );
};

// Scene contents
const SceneContents: React.FC = () => {
    return (
        <>
            <AnimatedCamera />

            {/* Ambient lighting */}
            <ambientLight intensity={0.5} />

            {/* Main gradient background */}
            <GradientMesh />

            {/* Particle system */}
            <Particles />

            {/* Post-processing effects */}
            <PostProcessing />
        </>
    );
};

interface SceneProps {
    className?: string;
}

const Scene: React.FC<SceneProps> = ({ className }) => {
    return (
        <Canvas
            className={className}
            gl={{
                powerPreference: 'high-performance',
                alpha: true,
                antialias: true,
                stencil: false,
                depth: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.2,
            }}
            dpr={[1, 2]}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
            }}
        >
            <Suspense fallback={null}>
                <SceneContents />
            </Suspense>
        </Canvas>
    );
};

export default Scene;
