'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useRef, type MouseEvent, type TouchEvent } from 'react';
import { useWebGLScene } from '@/lib/hooks';

const Scene = dynamic(() => import('@/components/3d/WhyCutout'), {
  ssr: false,
  loading: () => <CutoutFallback />,
});

function CutoutFallback() {
  return (
    <Image
      src="/images/why-presence.png"
      alt=""
      fill
      sizes="(max-width: 1024px) 90vw, 520px"
      className="object-contain"
    />
  );
}

export function WhyCutoutCanvas() {
  const root = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0, mode: 'rest' as 'rest' | 'hover', snap: true });
  const enabled = useWebGLScene();

  useEffect(() => {
    const node = root.current?.closest('section') ?? root.current;
    if (!node) return;
    let outside = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.2;
        if (visible && outside) {
          pointer.current.mode = 'rest';
          pointer.current.x = 0;
          pointer.current.y = 0;
          pointer.current.snap = true;
        }
        if (!entry.isIntersecting || entry.intersectionRatio < 0.12) outside = true;
        else if (visible) outside = false;
      },
      { threshold: [0, 0.12, 0.2, 0.45] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function aim(clientX: number, clientY: number, rect: DOMRect) {
    pointer.current.x = ((clientX - rect.left) / rect.width - 0.5) * 2;
    pointer.current.y = ((clientY - rect.top) / rect.height - 0.5) * 2;
    pointer.current.mode = 'hover';
  }

  function onMouseMove(event: MouseEvent<HTMLDivElement>) {
    aim(event.clientX, event.clientY, event.currentTarget.getBoundingClientRect());
  }

  function onTouchMove(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];
    if (!touch) return;
    aim(touch.clientX, touch.clientY, event.currentTarget.getBoundingClientRect());
  }

  return (
    <div
      ref={root}
      className="relative mx-auto h-[22rem] w-full touch-pan-y sm:h-[28rem] lg:h-[34rem]"
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onTouchEnd={() => {
        pointer.current.mode = 'rest';
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/25 motion-safe:animate-[spin_28s_linear_infinite]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 left-1/2 h-10 w-48 -translate-x-1/2 rounded-full bg-brand/30 blur-2xl"
      />
      <div className="absolute inset-0">
        {enabled ? <Scene pointer={pointer} /> : <CutoutFallback />}
      </div>
    </div>
  );
}
