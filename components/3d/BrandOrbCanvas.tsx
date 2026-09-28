'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { type RefObject } from 'react';
import { cn } from '@/lib/cn';
import { useWebGLScene } from '@/lib/hooks';

const Scene = dynamic(() => import('@/components/3d/BrandOrb'), {
  ssr: false,
  loading: () => <OrbFallback />,
});

function OrbFallback() {
  return (
    <Image
      src="/images/orb-fallback.png"
      alt=""
      width={800}
      height={800}
      sizes="(max-width: 1024px) 80vw, 520px"
      className="h-full w-full object-contain"
    />
  );
}

type BrandOrbCanvasProps = {
  pointer: RefObject<{ x: number; y: number }>;
  className?: string;
};

export function BrandOrbCanvas({ pointer, className }: BrandOrbCanvasProps) {
  const enabled = useWebGLScene();

  return (
    <div className={cn('relative h-72 w-full sm:h-96 lg:h-[620px]', className)} aria-hidden="true">
      <div className="absolute bottom-8 left-1/2 h-8 w-40 -translate-x-1/2 rounded-full bg-brand/25 blur-xl" />
      {enabled ? <Scene pointer={pointer} /> : <OrbFallback />}
    </div>
  );
}
