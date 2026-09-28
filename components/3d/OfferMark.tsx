'use client';

import { Float } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, type RefObject } from 'react';
import { MathUtils, type Group } from 'three';

type Pointer = { x: number; y: number };

type OfferMarkProps = {
  shape: 0 | 1 | 2;
  pointer: RefObject<Pointer>;
};

function Mark({ shape, pointer }: OfferMarkProps) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    const current = group.current;
    if (!current) return;
    const step = Math.min(delta, 0.05);
    const px = pointer.current?.x ?? 0;
    const py = pointer.current?.y ?? 0;
    current.rotation.y += step * 0.32;
    current.rotation.x = MathUtils.lerp(current.rotation.x, py * 0.4, 0.08);
    current.position.x = MathUtils.lerp(current.position.x, px * 0.28, 0.08);
  });

  return (
    <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={group}>
        {shape === 0 ? (
          <mesh>
            <icosahedronGeometry args={[1.15, 0]} />
            <meshStandardMaterial color="#161018" metalness={0.88} roughness={0.18} />
          </mesh>
        ) : null}
        {shape === 1 ? (
          <mesh>
            <torusKnotGeometry args={[0.72, 0.22, 140, 16]} />
            <meshStandardMaterial color="#6e12c0" metalness={0.72} roughness={0.22} />
          </mesh>
        ) : null}
        {shape === 2 ? (
          <group>
            {[0, 1, 2].map((index) => (
              <mesh key={index} position={[0, (index - 1) * 0.52, 0]}>
                <boxGeometry args={[1.45 - index * 0.22, 0.26, 1.45 - index * 0.22]} />
                <meshStandardMaterial
                  color={index === 1 ? '#8b1fe0' : '#141414'}
                  metalness={0.64}
                  roughness={0.28}
                />
              </mesh>
            ))}
          </group>
        ) : null}
        <mesh rotation={[Math.PI / 2.2, 0.2, 0]}>
          <torusGeometry args={[1.75, 0.012, 12, 90]} />
          <meshStandardMaterial color="#c084fc" emissive="#8b1fe0" emissiveIntensity={0.55} />
        </mesh>
      </group>
    </Float>
  );
}

export default function OfferScene({ shape, pointer }: OfferMarkProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.4], fov: 36 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3.2, 3.4, 2.4]} intensity={1.5} />
      <pointLight position={[-2.2, -0.6, 2]} color="#8b1fe0" intensity={12} distance={8} />
      <Mark shape={shape} pointer={pointer} />
    </Canvas>
  );
}
