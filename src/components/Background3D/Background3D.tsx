import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// -----------------------------------------------------------------------------
// Shaders
// -----------------------------------------------------------------------------

const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
    }
`;

const fragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uScroll;
    uniform vec2 uResolution;
    
    varying vec2 vUv;

    // -------------------------------------------------------------------------
    // Utilities
    // -------------------------------------------------------------------------
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        return 42.0 * dot(m*m, vec3(dot(p.x,x0), dot(p.y,x12.xy), dot(p.z,x12.zw)));
    }

    // -------------------------------------------------------------------------
    // Main
    // -------------------------------------------------------------------------
    void main() {
        vec2 st = gl_FragCoord.xy / uResolution.xy;
        float aspect = uResolution.x / uResolution.y;
        vec2 correctedSt = vec2(st.x * aspect, st.y);
        
        // Parallax and Mouse Interaction
        vec2 mousePos = uMouse;
        vec2 parallax = (mousePos - 0.5) * 0.05;
        vec2 center = vec2(0.5 * aspect, 0.5) + parallax;
        
        // Distance for radial depth
        float dist = distance(correctedSt, center);
        
        // Palette Colors
        vec3 colorBase = vec3(0.839, 0.859, 0.831);  // #D6DBD4 Dust Grey
        vec3 colorEdge = vec3(0.739, 0.759, 0.731);    // Subtle Darker Grey for Depth (derived from #D6DBD4)
        vec3 colorHigh = vec3(0.976, 0.965, 0.898);  // #F9F6E5 Ivory Mist (Highlight)
        vec3 colorAcc  = vec3(0.643, 0.573, 0.353);  // #A4925A Camel (Gold/Specular)
        
        // Noise (Very subtle)
        float noise = snoise(correctedSt * 3.0 + uTime * 0.05) * 0.02;
        
        // Base Gradient Blend (Grey Theme: Dust Grey center, Subtle darker grey outer edges)
        float distFactor = smoothstep(0.0, 0.9, dist + noise);
        vec3 baseColor = mix(colorHigh, colorBase, distFactor);
        
        float edgeLayer = smoothstep(0.4, 1.2, dist + noise);
        baseColor = mix(baseColor, colorEdge, edgeLayer * 0.4);

        // Material Effect - Soft Matte Surface
        vec2 normal = normalize(correctedSt - center);
        vec3 surfaceNormal = normalize(vec3(normal * 0.05, 1.0));
        
        // Light source (follows cursor)
        vec3 lightPos = vec3(mousePos.x * aspect, mousePos.y, 0.3);
        vec3 lightDir = normalize(lightPos - vec3(correctedSt, 0.0));
        
        // Diffuse Lighting for Depth
        float diff = max(dot(surfaceNormal, lightDir), 0.0);
        baseColor *= (0.95 + 0.05 * diff);

        // Specular Highlight (Camel accent)
        vec3 viewDir = vec3(0.0, 0.0, 1.0);
        vec3 halfDir = normalize(lightDir + viewDir);
        float spec = pow(max(dot(surfaceNormal, halfDir), 0.0), 16.0);
        
        float goldIntensity = spec * 0.08; 
        vec3 highlightColor = mix(baseColor, colorAcc, goldIntensity);
        
        // Reflected light tint based on cursor
        float reflectedTint = smoothstep(0.3, 0.0, distance(correctedSt, vec2(mousePos.x * aspect, mousePos.y)));
        highlightColor = mix(highlightColor, colorAcc, reflectedTint * 0.02);

        // Soft parallax depth lines
        float depthLines = sin(dist * 20.0 - uTime * 0.05) * 0.003;
        highlightColor += depthLines;

        gl_FragColor = vec4(highlightColor, 1.0);
    }
`;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const GradientBackground = () => {
    const mesh = useRef<THREE.Mesh>(null);
    const { size, viewport } = useThree();

    // Shader Uniforms
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uScroll: { value: 0 },
            uResolution: { value: new THREE.Vector2(size.width, size.height) },
        }),
        []
    );

    // Refs for smooth interpolation
    const mouseRef = useRef({ x: 0.5, y: 0.5 });
    const scrollRef = useRef(0);
    const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
    const targetScrollRef = useRef(0);

    // Event Listeners
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            targetMouseRef.current.x = e.clientX / window.innerWidth;
            targetMouseRef.current.y = 1.0 - (e.clientY / window.innerHeight);
        };

        const handleScroll = () => {
            const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
            // Normalized scroll 0 to 1
            targetScrollRef.current = window.scrollY / (scrollMax || 1);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Resize handling
    useEffect(() => {
        uniforms.uResolution.value.set(size.width, size.height);
    }, [size, uniforms]);

    // Animation Loop
    useFrame((state) => {
        if (!mesh.current) return;

        const { clock } = state;

        // Lerp values for smoothness
        // Low factor = high "weight" / smoothness
        const lerpFactor = 0.05;

        mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * lerpFactor;
        mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * lerpFactor;

        scrollRef.current += (targetScrollRef.current - scrollRef.current) * lerpFactor;

        // Update Uniforms

        const material = mesh.current.material as THREE.ShaderMaterial;
        material.uniforms.uTime.value = clock.getElapsedTime();
        material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
        material.uniforms.uScroll.value = scrollRef.current;
    });

    return (
        <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                depthWrite={false}
                depthTest={false}
            />
        </mesh>
    );
};

const Background3D: React.FC = () => {
    // Check for reduced motion preference
    const prefersReducedMotion = useMemo(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        }
        return false;
    }, []);

    // If reduced motion, render a static CSS background or simplified static canvas for now
    // The user requested a "Static gradient background" fallback.
    // For simplicity, we can just use the same shader but pause time? 
    // Or just return a div.
    if (prefersReducedMotion) {
        return (
            <div
                className="fixed inset-0 -z-10"
                style={{
                    background: 'radial-gradient(circle at center, #F9F6E5 0%, #D6DBD4 70%, #C6CBC4 100%)'
                }}
            />
        );
    }

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none">
            <Canvas
                orthographic
                camera={{ zoom: 1, position: [0, 0, 1] }}
                gl={{
                    powerPreference: "high-performance",
                    alpha: true,
                    antialias: true,
                    stencil: false,
                    depth: false
                }}
                dpr={[1, 2]} // Clamp pixel ratio for performance
            >
                <GradientBackground />
            </Canvas>
        </div>
    );
};

export default Background3D;
