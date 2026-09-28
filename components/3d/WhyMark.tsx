'use client';

import { useTexture } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState, type RefObject } from 'react';
import { MathUtils, SRGBColorSpace, type Group } from 'three';

type Pointer = { x: number; y: number; mode: 'rest' | 'hover'; snap: boolean };

const REST_X = 0.14;
const REST_Y = 0.38;
const REST_Z = -0.02;
const DEPTH = 0.16;
const WIDTH = 3.28;
const HEIGHT = WIDTH * (361 / 929);

function Wordmark({ pointer, layers }: { pointer: RefObject<Pointer>; layers: number }) {
  const texture = useTexture('/images/logo-wordmark.png');
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 8;
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    const current = group.current;
    if (!current) return;
    const hovering = pointer.current?.mode === 'hover';
    if (!hovering && pointer.current?.snap) {
      current.rotation.set(REST_X, REST_Y, REST_Z);
      pointer.current.snap = false;
      return;
    }
    const step = 1 - Math.exp(-delta * (hovering ? 4.5 : 8));
    const px = hovering ? (pointer.current?.x ?? 0) : 0;
    const py = hovering ? (pointer.current?.y ?? 0) : 0;
    current.rotation.y = MathUtils.lerp(current.rotation.y, hovering ? px * 0.36 : REST_Y, step);
    current.rotation.x = MathUtils.lerp(current.rotation.x, hovering ? -py * 0.18 : REST_X, step);
    current.rotation.z = MathUtils.lerp(current.rotation.z, hovering ? px * -0.03 : REST_Z, step);
  });

  return (
    <group ref={group} rotation={[REST_X, REST_Y, REST_Z]}>
      {Array.from({ length: layers }, (_, index) => {
        const face = index === 0;
        const depth = layers < 24 ? 0.1 : DEPTH;
        return (
          <mesh key={index} position={[0, 0, -(index / (layers - 1)) * depth]}>
            <planeGeometry args={[WIDTH, HEIGHT]} />
            <meshStandardMaterial
              map={texture}
              color={face ? '#ffffff' : '#1a0d22'}
              alphaTest={0.5}
              roughness={face ? 0.4 : 0.5}
              metalness={face ? 0.05 : 0.42}
              polygonOffset
              polygonOffsetFactor={index}
              polygonOffsetUnits={index}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function WhyMark({ pointer }: { pointer: RefObject<Pointer> }) {
  const [loop, setLoop] = useState<'always' | 'never'>('always');
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const onVisibility = () => setLoop(document.hidden ? 'never' : 'always');
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return (
    <Canvas
      dpr={compact ? [1, 1.15] : [1, 1.75]}
      frameloop={loop}
      camera={{ position: [0, 0.02, 3.85], fov: 32 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <ambientLight intensity={0.78} />
      <directionalLight position={[1.6, 2.4, 4]} intensity={1.7} />
      <directionalLight position={[-2.8, 0.2, 2]} intensity={0.35} color="#e4ccff" />
      <Suspense fallback={null}>
        <Wordmark pointer={pointer} layers={compact ? 14 : 48} />
      </Suspense>
    </Canvas>
  );
}
