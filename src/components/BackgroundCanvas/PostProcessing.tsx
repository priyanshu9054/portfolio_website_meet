import React, { useRef, useMemo } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import * as THREE from 'three';

// Custom vignette + noise shader as a simple fullscreen pass
const VignetteNoiseShader = {
    uniforms: {
        tDiffuse: { value: null },
        uTime: { value: 0 },
        uVignetteOffset: { value: 0.3 },
        uVignetteDarkness: { value: 0.5 },
        uNoiseIntensity: { value: 0.08 },
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uTime;
        uniform float uVignetteOffset;
        uniform float uVignetteDarkness;
        uniform float uNoiseIntensity;
        
        varying vec2 vUv;
        
        float random(vec2 co) {
            return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
        }
        
        void main() {
            vec4 color = texture2D(tDiffuse, vUv);
            
            // Vignette
            vec2 center = vUv - 0.5;
            float dist = length(center);
            float vignette = smoothstep(uVignetteOffset, uVignetteOffset + 0.5, dist);
            color.rgb *= 1.0 - vignette * uVignetteDarkness;
            
            // Film grain
            float noise = (random(vUv + uTime * 0.01) - 0.5) * uNoiseIntensity;
            color.rgb += noise;
            
            gl_FragColor = color;
        }
    `,
};

// Simple glow/bloom approximation using a bright pass
const SimpleBloomShader = {
    uniforms: {
        tDiffuse: { value: null },
        uBloomStrength: { value: 0.3 },
        uBloomThreshold: { value: 0.5 },
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uBloomStrength;
        uniform float uBloomThreshold;
        
        varying vec2 vUv;
        
        void main() {
            vec4 color = texture2D(tDiffuse, vUv);
            
            // Extract bright areas
            float brightness = dot(color.rgb, vec3(0.299, 0.587, 0.114));
            vec3 bloom = max(vec3(0.0), color.rgb - uBloomThreshold) * uBloomStrength;
            
            // Simple blur approximation for glow
            vec2 texelSize = vec2(1.0 / 1920.0, 1.0 / 1080.0);
            vec3 blurredBloom = vec3(0.0);
            for(int x = -2; x <= 2; x++) {
                for(int y = -2; y <= 2; y++) {
                    vec2 offset = vec2(float(x), float(y)) * texelSize * 3.0;
                    vec4 sample = texture2D(tDiffuse, vUv + offset);
                    float sampleBrightness = dot(sample.rgb, vec3(0.299, 0.587, 0.114));
                    blurredBloom += max(vec3(0.0), sample.rgb - uBloomThreshold);
                }
            }
            blurredBloom /= 25.0;
            
            color.rgb += blurredBloom * uBloomStrength;
            
            gl_FragColor = color;
        }
    `,
};

// Since React Three Fiber's postprocessing has issues with React 19,
// we'll skip the EffectComposer and just add atmosphere through the shaders
// The effects are already built into the gradient shader (vignette, grain)
const PostProcessing: React.FC = () => {
    // PostProcessing effects are now handled directly in the gradient shader
    // This component is kept as a placeholder for future enhancements
    return null;
};

export default PostProcessing;
