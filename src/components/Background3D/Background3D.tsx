
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Background3D: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });

        const container = mountRef.current;
        const { clientWidth: width, clientHeight: height } = container;

        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Geometery & Material
        const geometry = new THREE.PlaneGeometry(2, 2);

        // Shader logic
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2(0.5, 0.5) },
                uResolution: { value: new THREE.Vector2(width, height) },
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uTime;
                uniform vec2 uMouse;
                uniform vec2 uResolution;
                varying vec2 vUv;

                // Simplex noise function (simplified/optimized)
                vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

                float snoise(vec2 v) {
                    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                                        -0.577350269189626,  // -1.0 + 2.0 * C.x
                                        0.024390243902439); // 1.0 / 41.0
                    vec2 i  = floor(v + dot(v, C.yy) );
                    vec2 x0 = v - i + dot(i, C.xx);
                    vec2 i1;
                    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                    vec4 x12 = x0.xyxy + C.xxzz;
                    x12.xy -= i1;
                    i = mod289(i); // Avoid truncation effects in permutation
                    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                        + i.x + vec3(0.0, i1.x, 1.0 ));
                    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                    m = m*m ;
                    return 42.0 * dot( m*m, vec3( dot(p.x,x0), dot(p.y,x12.xy), dot(p.z,x12.zw) ) );
                }

                void main() {
                    vec2 st = gl_FragCoord.xy / uResolution.xy;
                    
                    // Aspect ratio correction
                    float aspect = uResolution.x / uResolution.y;
                    vec2 correctedSt = vec2(st.x * aspect, st.y);
                    vec2 correctedMouse = vec2(uMouse.x * aspect, uMouse.y);

                    // Distance from mouse
                    float dist = distance(correctedSt, correctedMouse);

                    // Gentle wave effect
                    float wave = sin(dist * 10.0 - uTime * 0.5);
                    
                    // Noise for organic texture
                    float n = snoise(correctedSt * 2.0 + uTime * 0.1);

                    // Combined distortion
                    float distortion = wave * 0.05 + n * 0.05;

                    // Colors per requirement: Charcoal base, deep purple, indigo, teal highlights
                    vec3 colorBg = vec3(0.05, 0.05, 0.08); // Charcoal / very dark blue
                    vec3 colorPurple = vec3(0.2, 0.05, 0.3); // Deep Purple
                    vec3 colorTeal = vec3(0.0, 0.2, 0.25); // Subtle Teal
                    
                    // Mix colors based on noise and wave
                    vec3 finalColor = mix(colorBg, colorPurple, n * 0.5 + 0.2);
                    
                    // Add interactive highlight around mouse
                    float highlight = 1.0 - smoothstep(0.0, 0.5, dist);
                    finalColor = mix(finalColor, colorTeal, highlight * 0.2 + wave * 0.1);

                    // Vignette to darken edges
                    float vignette = 1.0 - smoothstep(0.5, 1.5, length(st - 0.5) * 2.0);
                    finalColor *= vignette;

                    gl_FragColor = vec4(finalColor, 1.0);
                }
            `
        });

        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        // Mouse interaction
        const handleMouseMove = (event: MouseEvent) => {
            const x = event.clientX / window.innerWidth;
            const y = 1.0 - (event.clientY / window.innerHeight); // Invert Y for shader

            // Smooth interpolation could be done in animation loop if needed, 
            // but setting uniform directly is usually fine for this specific shader logic
            // unless we want "trailing" effect, which we can add later.
            material.uniforms.uMouse.value.set(x, y);
        };

        // Resize handling
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            material.uniforms.uResolution.value.set(width, height);
            material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        // Animation Loop
        let animationFrameId: number;
        const animate = () => {
            material.uniforms.uTime.value += 0.01;
            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        // Accessibility: Reduce motion
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) {
            // Slow down or stop time
            // For now we just don't animate as fast or at all? 
            // Let's just make it very slow
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                background: '#0a0a0a' // Fallback
            }}
        />
    );
};

export default Background3D;
