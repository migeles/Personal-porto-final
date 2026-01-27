"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

// --- SHADERS (Unchanged) ---
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // --- MOUSE & TIME DISTORTION ---
    float dist = distance(uv, uMouse);
    float decay = smoothstep(0.9, 0.0, dist);
    
    float angle = sin(uTime * 0.8) * decay * 2.0;
    float s = sin(angle);
    float c = cos(angle);
    mat2 rot = mat2(c, -s, s, c);
    uv = ((uv - uMouse) * rot) + uMouse;

    // --- WAVES ---
    float wave1 = sin(uv.x * 6.0 + uTime * 0.8 + uv.y * 3.0);
    float wave2 = cos(uv.y * 5.0 + uTime * 0.5 + uv.x * 3.0);
    float wave3 = sin((uv.x + uv.y) * 4.0 + uTime * 1.2);
    
    float ripples = sin(dist * 20.0 - uTime * 2.0) * decay * 0.2;

    // --- COLOR MIX ---
    float mix1 = smoothstep(-1.0, 1.0, wave1 + wave2 + ripples);
    vec3 colorA = mix(uColor1, uColor2, mix1);

    float mix2 = smoothstep(-1.0, 1.0, wave3 + ripples);
    vec3 finalColor = mix(colorA, uColor3, mix2 * 0.7);

    // Glow
    finalColor += vec3(0.1) * decay;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// --- MESH COMPONENT ---
const GradientMesh = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      // Initial colors set to match the vibrant "Instagram-like" gradients in the image
      uColor1: { value: new THREE.Color("#4f46e5") }, // Vivid Blue/Indigo
      uColor2: { value: new THREE.Color("#ec4899") }, // Hot Pink
      uColor3: { value: new THREE.Color("#fbbf24") }, // Bright Amber/Orange
    }),
    []
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = 1 - e.clientY / window.innerHeight;
      targetMouse.current.set(x, y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      const time = state.clock.getElapsedTime();
      
      materialRef.current.uniforms.uTime.value = time;
      mouse.current.lerp(targetMouse.current, 0.05);
      materialRef.current.uniforms.uMouse.value.copy(mouse.current);

      // --- COLOR ADJUSTMENTS ---
      // We reduced the speed slightly to make it more elegant.
      const speed = 0.2; 
      
      // COLOR 1: Deep Blue/Purple (Based on top-left and bottom-right of your image)
      // Hue: ~0.6 (Blue range), Saturation: 0.8 (High), Lightness: 0.5 (Bright, not dark)
      materialRef.current.uniforms.uColor1.value.setHSL(
        (0.6 + Math.sin(time * speed) * 0.05) % 1.0, 
        0.8, 
        0.5 
      );

      // COLOR 2: Vibrant Pink/Magenta (Based on the red/pink pills)
      // Hue: ~0.9 (Pink/Red range), Saturation: 0.9, Lightness: 0.6
      materialRef.current.uniforms.uColor2.value.setHSL(
        (0.9 + Math.sin(time * speed * 1.2) * 0.05) % 1.0, 
        0.9, 
        0.6
      );

      // COLOR 3: Bright Orange/Yellow (Based on the yellow/orange pills)
      // Hue: ~0.1 (Orange range), Saturation: 0.9, Lightness: 0.6
      materialRef.current.uniforms.uColor3.value.setHSL(
        (0.1 + Math.sin(time * speed * 0.8) * 0.05) % 1.0, 
        0.9, 
        0.6
      );
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
};

// --- EXPORT ---
interface FluidGradientProps {
  className?: string;
}

export default function FluidGradient({ className = "" }: FluidGradientProps) {
  return (
    <div className={`relative w-full h-full aspect-square overflow-hidden ${className}`}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <GradientMesh />
      </Canvas>
    </div>
  );
}