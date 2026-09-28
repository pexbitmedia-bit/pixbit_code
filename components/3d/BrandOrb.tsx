'use client';

import { Float } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState, type RefObject } from 'react';
import type { Group, MeshStandardMaterial } from 'three';
import { MathUtils } from 'three';

type Pointer = { x: number; y: number };

type ClusterProps = {
  pointer: RefObject<Pointer>;
};

function Cluster({ pointer }: ClusterProps) {
  const group = useRef<Group>(null);
  const satellites = useRef<Group>(null);
  const ring = useRef<MeshStandardMaterial>(null);

  useFrame((state, delta) => {
    const step = Math.min(delta, 0.05);
    const current = group.current;
    if (!current) return;
    const px = pointer.current?.x ?? 0;
    const py = pointer.current?.y ?? 0;
    current.rotation.y += step * 0.28;
    current.rotation.x = MathUtils.lerp(current.rotation.x, py * 0.22, 0.06);
    current.position.x = MathUtils.lerp(current.position.x, px * 0.12, 0.06);
    current.position.y = MathUtils.lerp(current.position.y, -py * 0.1, 0.06);
    if (satellites.current) satellites.current.rotation.y += step * 0.55;
    if (ring.current) {
      ring.current.emissiveIntensity = 0.35 + Math.sin(state.clock.elapsedTime * 1.4) * 0.15;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.45} floatingRange={[-0.08, 0.08]}>
      <group ref={group} scale={0.78}>
        <mesh>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshPhysicalMaterial
            color="#8B1FE0"
            metalness={1}
            roughness={0.18}
            clearcoat={0.65}
            clearcoatRoughness={0.2}
            flatShading
          />
        </mesh>
        <mesh scale={0.55}>
          <sphereGeometry args={[1, 20, 20]} />
          <meshStandardMaterial color="#d7b4ff" emissive="#8B1FE0" emissiveIntensity={0.85} />
        </mesh>
        <mesh rotation={[Math.PI / 2.5, 0.2, 0.35]}>
          <torusGeometry args={[1.9, 0.035, 12, 64]} />
          <meshStandardMaterial color="#161616" metalness={0.95} roughness={0.22} />
        </mesh>
        <mesh rotation={[0.5, 0.7, 0.15]}>
          <torusGeometry args={[2.15, 0.016, 8, 48]} />
          <meshStandardMaterial
            ref={ring}
            color="#8B1FE0"
            emissive="#8B1FE0"
            emissiveIntensity={0.45}
          />
        </mesh>
        <group ref={satellites}>
          <mesh position={[2.05, 0.35, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.12} />
          </mesh>
          <mesh position={[-1.55, -0.85, 0.45]}>
            <octahedronGeometry args={[0.16, 0]} />
            <meshStandardMaterial color="#c084fc" metalness={0.7} roughness={0.22} />
          </mesh>
          <mesh position={[0.35, 1.75, -0.3]}>
            <icosahedronGeometry args={[0.14, 0]} />
            <meshStandardMaterial color="#0A0A0A" metalness={0.85} roughness={0.25} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

type BrandOrbProps = {
  pointer: RefObject<Pointer>;
};

export default function BrandOrb({ pointer }: BrandOrbProps) {
  const [loop, setLoop] = useState<'always' | 'never'>('always');

  useEffect(() => {
    const onVisibility = () => setLoop(document.hidden ? 'never' : 'always');
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={loop}
      camera={{ position: [0, 0.05, 7.4], fov: 30 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 4, 5]} intensity={2.5} />
      <directionalLight position={[-4, -1, -3]} intensity={1.7} color="#8B1FE0" />
      <pointLight position={[0, 0, 4]} intensity={8} distance={12} />
      <Cluster pointer={pointer} />
    </Canvas>
  );
}
