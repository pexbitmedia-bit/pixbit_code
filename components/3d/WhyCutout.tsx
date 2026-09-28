'use client';

import { useTexture } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState, type RefObject } from 'react';
import { MathUtils, SRGBColorSpace, type Group } from 'three';

type Pointer = { x: number; y: number; mode: 'rest' | 'hover'; snap: boolean };

const REST_X = 0.16;
const REST_Y = -0.58;
const REST_Z = 0.05;

function Cutout({ pointer }: { pointer: RefObject<Pointer> }) {
  const texture = useTexture('/images/why-presence.png');
  texture.colorSpace = SRGBColorSpace;
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    const current = group.current;
    if (!current) return;
    const hovering = pointer.current?.mode === 'hover';
    if (!hovering && pointer.current?.snap) {
      current.rotation.set(REST_X, REST_Y, REST_Z);
      pointer.current.snap = false;
    } else {
      const step = 1 - Math.exp(-delta * (hovering ? 4.5 : 8));
      const px = hovering ? (pointer.current?.x ?? 0) : 0;
      const py = hovering ? (pointer.current?.y ?? 0) : 0;
      current.rotation.y = MathUtils.lerp(current.rotation.y, hovering ? px * 0.45 : REST_Y, step);
      current.rotation.x = MathUtils.lerp(current.rotation.x, hovering ? -py * 0.28 : REST_X, step);
      current.rotation.z = MathUtils.lerp(current.rotation.z, hovering ? 0 : REST_Z, step);
    }
    current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.06;
  });

  return (
    <group ref={group} rotation={[REST_X, REST_Y, REST_Z]}>
      <mesh>
        <planeGeometry args={[3.55, 2.22]} />
        <meshStandardMaterial map={texture} transparent alphaTest={0.12} roughness={0.45} metalness={0.02} />
      </mesh>
    </group>
  );
}

export default function WhyCutout({ pointer }: { pointer: RefObject<Pointer> }) {
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
      camera={{ position: [0, 0, 4.15], fov: 38 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <ambientLight intensity={1.05} />
      <directionalLight position={[3, 3, 4]} intensity={1.5} />
      <directionalLight position={[-3, -1, 2]} intensity={0.45} color="#8B1FE0" />
      <Suspense fallback={null}>
        <Cutout pointer={pointer} />
      </Suspense>
    </Canvas>
  );
}
