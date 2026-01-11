varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;

void main() {
    vUv = uv;
    vPosition = position;
    
    // Subtle vertex displacement based on mouse and time
    vec3 pos = position;
    
    // Wave displacement
    float wave = sin(pos.x * 2.0 + uTime * 0.3) * 0.02;
    wave += sin(pos.y * 3.0 + uTime * 0.2) * 0.015;
    
    // Mouse influence on mesh
    vec2 mouseInfluence = (uMouse - 0.5) * 0.1;
    pos.x += mouseInfluence.x * (1.0 - abs(pos.x));
    pos.y += mouseInfluence.y * (1.0 - abs(pos.y));
    pos.z += wave;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
