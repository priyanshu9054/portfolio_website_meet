uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;
uniform vec2 uResolution;

varying vec2 vUv;
varying vec3 vPosition;

// Simplex noise functions
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

// Fractional Brownian Motion
float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for(int i = 0; i < 5; i++) {
        value += amplitude * snoise(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
    }
    return value;
}

// Color palette function
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
}

void main() {
    vec2 uv = vUv;
    float time = uTime * 0.15;
    
    // Mouse influence with smooth falloff
    vec2 mousePos = uMouse;
    float mouseDist = length(uv - mousePos);
    float mouseInfluence = smoothstep(0.5, 0.0, mouseDist) * 0.15;
    
    // Scroll-based section detection (0-1 normalized)
    float scroll = uScroll;
    
    // Define section color palettes
    // Hero: gold #C4A44E + deep navy #0d1117
    vec3 heroGold = vec3(0.769, 0.643, 0.306);
    vec3 heroNavy = vec3(0.051, 0.067, 0.090);
    
    // Projects: teal #2dd4bf + navy
    vec3 projectsTeal = vec3(0.176, 0.831, 0.749);
    vec3 projectsNavy = vec3(0.039, 0.055, 0.078);
    
    // Experience: warm amber tones
    vec3 expWarm = vec3(0.851, 0.545, 0.259);
    vec3 expDeep = vec3(0.102, 0.067, 0.051);
    
    // Contact: cool minimal
    vec3 contactCool = vec3(0.439, 0.502, 0.565);
    vec3 contactDark = vec3(0.031, 0.039, 0.055);
    
    // Interpolate colors based on scroll position
    vec3 primaryColor, secondaryColor;
    
    if(scroll < 0.25) {
        // Hero section
        float t = scroll / 0.25;
        primaryColor = mix(heroGold, projectsTeal, t * 0.3);
        secondaryColor = mix(heroNavy, projectsNavy, t * 0.3);
    } else if(scroll < 0.5) {
        // Projects section
        float t = (scroll - 0.25) / 0.25;
        primaryColor = mix(projectsTeal, mix(projectsTeal, expWarm, 0.5), t);
        secondaryColor = mix(projectsNavy, expDeep, t * 0.5);
    } else if(scroll < 0.75) {
        // Experience section
        float t = (scroll - 0.5) / 0.25;
        primaryColor = mix(expWarm, contactCool, t);
        secondaryColor = mix(expDeep, contactDark, t);
    } else {
        // Contact section
        float t = (scroll - 0.75) / 0.25;
        primaryColor = mix(contactCool, heroGold, t * 0.4);
        secondaryColor = mix(contactDark, heroNavy, t * 0.4);
    }
    
    // Aurora-like flowing gradient using FBM noise
    vec3 noiseCoord = vec3(uv * 2.0, time * 0.5);
    noiseCoord.xy += mousePos * mouseInfluence * 2.0;
    
    float noise1 = fbm(noiseCoord);
    float noise2 = fbm(noiseCoord + vec3(5.2, 1.3, 2.8));
    float noise3 = fbm(noiseCoord + vec3(1.7, 9.2, 3.4));
    
    // Create flowing patterns
    float pattern = noise1 + 0.5 * noise2 + 0.25 * noise3;
    pattern = pattern * 0.5 + 0.5; // Normalize to 0-1
    
    // Warped UV for aurora effect
    vec2 warpedUv = uv;
    warpedUv.x += sin(uv.y * 3.0 + time) * 0.1 * noise1;
    warpedUv.y += cos(uv.x * 3.0 + time * 0.8) * 0.1 * noise2;
    
    // Distance-based gradient from center
    vec2 center = vec2(0.5 + mousePos.x * 0.1 - 0.05, 0.5 + mousePos.y * 0.1 - 0.05);
    float dist = length(warpedUv - center);
    
    // Radial gradient with noise
    float radialGrad = smoothstep(0.0, 1.2, dist + pattern * 0.3);
    
    // Color mixing
    vec3 color = mix(primaryColor, secondaryColor, radialGrad);
    
    // Add subtle color variation based on noise
    vec3 colorVariation = palette(
        pattern + time * 0.1,
        vec3(0.5),
        vec3(0.5),
        vec3(1.0, 1.0, 0.5),
        vec3(0.8, 0.90, 0.30)
    );
    color = mix(color, colorVariation * 0.3, 0.15);
    
    // Aurora bands
    float aurora = sin(warpedUv.y * 10.0 + noise1 * 5.0 + time) * 0.5 + 0.5;
    aurora *= smoothstep(0.0, 0.3, 1.0 - radialGrad);
    color += primaryColor * aurora * 0.1;
    
    // Mouse glow effect
    float mouseGlow = smoothstep(0.3, 0.0, mouseDist);
    color += primaryColor * mouseGlow * 0.15;
    
    // Vignette
    float vignette = 1.0 - smoothstep(0.3, 1.0, dist);
    color *= 0.85 + vignette * 0.15;
    
    // Subtle grain
    float grain = (fract(sin(dot(uv, vec2(12.9898, 78.233) + time)) * 43758.5453) - 0.5) * 0.02;
    color += grain;
    
    // Output with slight transparency for depth
    gl_FragColor = vec4(color, 0.98);
}
