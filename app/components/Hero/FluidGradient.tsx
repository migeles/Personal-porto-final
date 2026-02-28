"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
// 1. Import useTexture from Drei
import { useTexture } from "@react-three/drei";
// 2. Adjust path if necessary to match your asset folder
import ppImage from "../../assets/image/pp.webp";

// --- EXISTING BACKGROUND SHADERS (Unchanged, so this background stays) ---
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
    float dist = distance(uv, uMouse);
    float decay = smoothstep(0.9, 0.0, dist);
    float angle = sin(uTime * 0.8) * decay * 2.0;
    float s = sin(angle);
    float c = cos(angle);
    mat2 rot = mat2(c, -s, s, c);
    uv = ((uv - uMouse) * rot) + uMouse;
    float wave1 = sin(uv.x * 6.0 + uTime * 0.8 + uv.y * 3.0);
    float wave2 = cos(uv.y * 5.0 + uTime * 0.5 + uv.x * 3.0);
    float wave3 = sin((uv.x + uv.y) * 4.0 + uTime * 1.2);
    float ripples = sin(dist * 20.0 - uTime * 2.0) * decay * 0.2;
    float mix1 = smoothstep(-1.0, 1.0, wave1 + wave2 + ripples);
    vec3 colorA = mix(uColor1, uColor2, mix1);
    float mix2 = smoothstep(-1.0, 1.0, wave3 + ripples);
    vec3 finalColor = mix(colorA, uColor3, mix2 * 0.7);
    finalColor += vec3(0.1) * decay;
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// --- EXISTING MESH COMPONENT (Modified only to set background render order) ---
const GradientBackgroundMesh = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uColor1: { value: new THREE.Color("#4f46e5") },
      uColor2: { value: new THREE.Color("#ec4899") },
      uColor3: { value: new THREE.Color("#fbbf24") },
    }),
    [],
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

      const speed = 0.2;
      materialRef.current.uniforms.uColor1.value.setHSL(
        (0.6 + Math.sin(time * speed) * 0.05) % 1.0,
        0.8,
        0.5,
      );
      materialRef.current.uniforms.uColor2.value.setHSL(
        (0.9 + Math.sin(time * speed * 1.2) * 0.05) % 1.0,
        0.9,
        0.6,
      );
      materialRef.current.uniforms.uColor3.value.setHSL(
        (0.1 + Math.sin(time * speed * 0.8) * 0.05) % 1.0,
        0.9,
        0.6,
      );
    }
  });

  return (
    <mesh
      scale={[viewport.width, viewport.height, 1]}
      // We set renderOrder negative so the picture always draws on top
      renderOrder={-1}
    >
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

// --- NEW COMPONENT: BOUNCING DVD-STYLE PROFILE PICTURE ---
// --- NEW COMPONENT: BOUNCING DVD-STYLE PROFILE PICTURE ---
const BouncingProfilePic = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  // Load the texture
  const texture = useTexture(ppImage.src);

  // Define the size of the picture relative to the screen (0.2 = 20% viewport height)
  const picSize = 0.7;

  // ---> ADD THIS NEW VARIABLE <---
  // This is the invisible buffer zone. Increase it to push the walls further in.
  const padding = 0.08;

  const pos = useRef(new THREE.Vector3(0, 0, 0.1));
  const vel = useRef(new THREE.Vector2(0.001, 0.0008));
  const hue = useRef(Math.random());

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // ---> UPDATE THESE 4 LINES TO INCLUDE THE PADDING <---
    const screenRight = viewport.width / 2 - picSize / 2 - padding;
    const screenLeft = -(viewport.width / 2) + picSize / 2 + padding;
    const screenTop = viewport.height / 2 - picSize / 2 - padding;
    const screenBottom = -(viewport.height / 2) + picSize / 2 + padding;

    // ... the rest of your collision code stays exactly the same!
    pos.current.x += vel.current.x;
    pos.current.y += vel.current.y;

    let hitEdge = false;

    // B. Detect collisions with screen edges
    // Hit Left or Right edge
    if (pos.current.x >= screenRight) {
      pos.current.x = screenRight; // Snap back inside to prevent getting stuck
      vel.current.x *= -1; // Reverse horizontal velocity
      hitEdge = true;
    }
    // Hit Left Edge
    else if (pos.current.x <= screenLeft) {
      pos.current.x = screenLeft;
      vel.current.x *= -1;
      hitEdge = true;
    }

    // Hit Top Edge
    if (pos.current.y >= screenTop) {
      pos.current.y = screenTop;
      vel.current.y *= -1; // Reverse vertical velocity
      hitEdge = true;
    }
    // Hit Bottom Edge
    else if (pos.current.y <= screenBottom) {
      pos.current.y = screenBottom;
      vel.current.y *= -1;
      hitEdge = true;
    }

    // ---> ADD THIS MISSING PIECE BACK IN <---
    // C. Change color instantly ONLY if it hit an edge
    if (hitEdge) {
      // Pick a brand new random hue between 0 and 1
      hue.current = Math.random();
    }
    // ----------------------------------------

    // Apply new position to the actual object
    meshRef.current.position.copy(pos.current);

    // Apply color to the material
    (meshRef.current.material as THREE.MeshBasicMaterial).color.setHSL(
      hue.current,
      0.5,
      0.5,
    );
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0.1]} // Initial center position
      scale={[picSize, picSize, 1]} // Square profile picture size
    >
      <planeGeometry args={[1, 1]} />
      {/* We use MeshBasicMaterial so it's brightly lit on its own */}
      <meshBasicMaterial map={texture} transparent={true} />
    </mesh>
  );
};

// --- EXPORT (Updated to overlay the bouncing image) ---
interface FluidGradientProps {
  className?: string;
}

export default function FluidGradient({ className = "" }: FluidGradientProps) {
  return (
    <div
      className={`relative w-full h-full aspect-square overflow-hidden ${className}`}
    >
      <Canvas camera={{ position: [0, 0, 1] }}>
        {/* Layer 1: The background gradient mesh */}
        <GradientBackgroundMesh />

        {/* Layer 2: The foreground bouncing profile picture */}1
      </Canvas>
    </div>
  );
}
