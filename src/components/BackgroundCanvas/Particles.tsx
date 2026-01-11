import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useBackgroundContext } from './BackgroundContext';

const PARTICLE_COUNT = 350;
const CONNECTION_DISTANCE = 0.8;
const MOUSE_RADIUS = 2.5;
const MOUSE_STRENGTH = 0.3;

// Particle shader for glowing effect
const particleVertexShader = `
attribute float size;
attribute float opacity;
attribute vec3 customColor;

varying float vOpacity;
varying vec3 vColor;

uniform float uTime;
uniform float uScroll;

void main() {
    vOpacity = opacity;
    vColor = customColor;
    
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    
    // Size attenuation based on distance
    float sizeAttenuation = (300.0 / -mvPosition.z);
    gl_PointSize = size * sizeAttenuation;
    gl_Position = projectionMatrix * mvPosition;
}
`;

const particleFragmentShader = `
varying float vOpacity;
varying vec3 vColor;

void main() {
    // Create soft circular particle
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    
    // Soft glow falloff
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha *= vOpacity;
    
    // Add glow
    float glow = exp(-dist * 4.0) * 0.5;
    
    vec3 finalColor = vColor + vColor * glow;
    
    gl_FragColor = vec4(finalColor, alpha);
}
`;

// Line shader for constellation effect - renamed 'color' to 'lineColor' to avoid conflict
const lineVertexShader = `
attribute vec3 lineColor;
varying vec3 vLineColor;

void main() {
    vLineColor = lineColor;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const lineFragmentShader = `
varying vec3 vLineColor;

void main() {
    gl_FragColor = vec4(vLineColor, 0.15);
}
`;

interface ParticleData {
    positions: Float32Array;
    velocities: Float32Array;
    sizes: Float32Array;
    opacities: Float32Array;
    colors: Float32Array;
    depths: Float32Array;
}

const Particles: React.FC = () => {
    const pointsRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);
    const { viewport } = useThree();
    const { mouse, scroll } = useBackgroundContext();

    // Refs for smooth mouse interaction
    const prevMouseRef = useRef({ x: 0.5, y: 0.5 });

    // Initialize particle data
    const particleData = useMemo<ParticleData>(() => {
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const velocities = new Float32Array(PARTICLE_COUNT * 3);
        const sizes = new Float32Array(PARTICLE_COUNT);
        const opacities = new Float32Array(PARTICLE_COUNT);
        const colors = new Float32Array(PARTICLE_COUNT * 3);
        const depths = new Float32Array(PARTICLE_COUNT);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3;

            // Spread particles across a larger area
            positions[i3] = (Math.random() - 0.5) * 15;
            positions[i3 + 1] = (Math.random() - 0.5) * 15;
            positions[i3 + 2] = (Math.random() - 0.5) * 8 - 2; // Depth variation

            // Random velocities
            velocities[i3] = (Math.random() - 0.5) * 0.005;
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.005 + 0.002; // Slight upward drift
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;

            // Varying sizes
            sizes[i] = Math.random() * 15 + 5;

            // Varying opacities
            opacities[i] = Math.random() * 0.6 + 0.2;

            // Depth for parallax
            depths[i] = Math.random();

            // Gold/warm colors with variation
            const colorChoice = Math.random();
            if (colorChoice < 0.4) {
                // Gold
                colors[i3] = 0.769 + Math.random() * 0.1;
                colors[i3 + 1] = 0.643 + Math.random() * 0.1;
                colors[i3 + 2] = 0.306 + Math.random() * 0.1;
            } else if (colorChoice < 0.7) {
                // Teal
                colors[i3] = 0.176 + Math.random() * 0.1;
                colors[i3 + 1] = 0.731 + Math.random() * 0.1;
                colors[i3 + 2] = 0.649 + Math.random() * 0.1;
            } else {
                // White/silver
                const brightness = 0.7 + Math.random() * 0.3;
                colors[i3] = brightness;
                colors[i3 + 1] = brightness;
                colors[i3 + 2] = brightness;
            }
        }

        return { positions, velocities, sizes, opacities, colors, depths };
    }, []);

    // Line geometry for connections
    const lineGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry();
        // Pre-allocate for worst case (all particles connected)
        const maxConnections = PARTICLE_COUNT * 10;
        geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(new Float32Array(maxConnections * 6), 3)
        );
        geometry.setAttribute(
            'lineColor',
            new THREE.BufferAttribute(new Float32Array(maxConnections * 6), 3)
        );
        geometry.setDrawRange(0, 0);
        return geometry;
    }, []);

    // Particle uniforms
    const particleUniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uScroll: { value: 0 },
        }),
        []
    );

    // Animation frame
    useFrame((state) => {
        if (!pointsRef.current) return;

        const time = state.clock.getElapsedTime();
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
        const sizes = pointsRef.current.geometry.attributes.size.array as Float32Array;
        const opacities = pointsRef.current.geometry.attributes.opacity.array as Float32Array;

        // Convert normalized mouse to world coordinates
        const mouseWorldX = (mouse.x - 0.5) * viewport.width;
        const mouseWorldY = (mouse.y - 0.5) * viewport.height;

        // Smooth mouse velocity for force calculation
        const mouseVelX = mouseWorldX - (prevMouseRef.current.x - 0.5) * viewport.width;
        const mouseVelY = mouseWorldY - (prevMouseRef.current.y - 0.5) * viewport.height;
        prevMouseRef.current = { x: mouse.x, y: mouse.y };

        // Update particles
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3;
            const depth = particleData.depths[i];

            // Base velocity
            let vx = particleData.velocities[i3];
            let vy = particleData.velocities[i3 + 1];
            const vz = particleData.velocities[i3 + 2];

            // Add scroll-based parallax (deeper particles move slower)
            const scrollInfluence = scroll * depth * 0.5;
            vy += scrollInfluence * 0.01;

            // Mouse repulsion/attraction
            const dx = positions[i3] - mouseWorldX;
            const dy = positions[i3 + 1] - mouseWorldY;
            const distToMouse = Math.sqrt(dx * dx + dy * dy);

            if (distToMouse < MOUSE_RADIUS) {
                const force = (1 - distToMouse / MOUSE_RADIUS) * MOUSE_STRENGTH;
                const angle = Math.atan2(dy, dx);

                // Repel with easing
                vx += Math.cos(angle) * force * 0.1;
                vy += Math.sin(angle) * force * 0.1;

                // Add mouse velocity influence
                vx += mouseVelX * 0.02 * (1 - distToMouse / MOUSE_RADIUS);
                vy += mouseVelY * 0.02 * (1 - distToMouse / MOUSE_RADIUS);
            }

            // Apply velocities with damping
            positions[i3] += vx;
            positions[i3 + 1] += vy;
            positions[i3 + 2] += vz;

            // Add organic movement
            positions[i3] += Math.sin(time * 0.3 + i * 0.1) * 0.003;
            positions[i3 + 1] += Math.cos(time * 0.2 + i * 0.15) * 0.003;

            // Boundary wrapping
            const boundX = 8;
            const boundY = 8;
            const boundZ = 5;

            if (positions[i3] > boundX) positions[i3] = -boundX;
            if (positions[i3] < -boundX) positions[i3] = boundX;
            if (positions[i3 + 1] > boundY) positions[i3 + 1] = -boundY;
            if (positions[i3 + 1] < -boundY) positions[i3 + 1] = boundY;
            if (positions[i3 + 2] > boundZ) positions[i3 + 2] = -boundZ;
            if (positions[i3 + 2] < -boundZ) positions[i3 + 2] = boundZ;

            // Pulse size based on time
            sizes[i] = particleData.sizes[i] * (1 + Math.sin(time * 0.5 + i) * 0.2);

            // Twinkle opacity
            opacities[i] = particleData.opacities[i] * (0.7 + Math.sin(time * 2 + i * 0.5) * 0.3);
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        pointsRef.current.geometry.attributes.size.needsUpdate = true;
        pointsRef.current.geometry.attributes.opacity.needsUpdate = true;

        // Update constellation lines
        if (linesRef.current) {
            const linePositions = lineGeometry.attributes.position.array as Float32Array;
            const lineColors = lineGeometry.attributes.lineColor.array as Float32Array;
            let lineIndex = 0;

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                for (let j = i + 1; j < PARTICLE_COUNT; j++) {
                    const i3 = i * 3;
                    const j3 = j * 3;

                    const dx = positions[i3] - positions[j3];
                    const dy = positions[i3 + 1] - positions[j3 + 1];
                    const dz = positions[i3 + 2] - positions[j3 + 2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < CONNECTION_DISTANCE && lineIndex < linePositions.length / 6 - 1) {
                        const idx = lineIndex * 6;
                        const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.5;

                        // Start point
                        linePositions[idx] = positions[i3];
                        linePositions[idx + 1] = positions[i3 + 1];
                        linePositions[idx + 2] = positions[i3 + 2];

                        // End point
                        linePositions[idx + 3] = positions[j3];
                        linePositions[idx + 4] = positions[j3 + 1];
                        linePositions[idx + 5] = positions[j3 + 2];

                        // Gold color with opacity based on distance
                        const goldR = 0.769 * opacity;
                        const goldG = 0.643 * opacity;
                        const goldB = 0.306 * opacity;

                        lineColors[idx] = goldR;
                        lineColors[idx + 1] = goldG;
                        lineColors[idx + 2] = goldB;
                        lineColors[idx + 3] = goldR;
                        lineColors[idx + 4] = goldG;
                        lineColors[idx + 5] = goldB;

                        lineIndex++;
                    }
                }
            }

            lineGeometry.setDrawRange(0, lineIndex * 2);
            lineGeometry.attributes.position.needsUpdate = true;
            lineGeometry.attributes.lineColor.needsUpdate = true;
        }

        // Update uniforms
        particleUniforms.uTime.value = time;
        particleUniforms.uScroll.value = scroll;
    });

    return (
        <group>
            {/* Particles */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={PARTICLE_COUNT}
                        array={particleData.positions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-size"
                        count={PARTICLE_COUNT}
                        array={particleData.sizes}
                        itemSize={1}
                    />
                    <bufferAttribute
                        attach="attributes-opacity"
                        count={PARTICLE_COUNT}
                        array={particleData.opacities}
                        itemSize={1}
                    />
                    <bufferAttribute
                        attach="attributes-customColor"
                        count={PARTICLE_COUNT}
                        array={particleData.colors}
                        itemSize={3}
                    />
                </bufferGeometry>
                <shaderMaterial
                    vertexShader={particleVertexShader}
                    fragmentShader={particleFragmentShader}
                    uniforms={particleUniforms}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* Constellation lines */}
            <lineSegments ref={linesRef} geometry={lineGeometry}>
                <shaderMaterial
                    vertexShader={lineVertexShader}
                    fragmentShader={lineFragmentShader}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </lineSegments>
        </group>
    );
};

export default Particles;
