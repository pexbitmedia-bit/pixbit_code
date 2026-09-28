'use client';

import dynamic from 'next/dynamic';
import { type RefObject } from 'react';
import { useWebGLScene } from '@/lib/hooks';

const Scene = dynamic(() => import('@/components/3d/OfferMark'), { ssr: false });

type OfferMarkCanvasProps = {
  shape: 0 | 1 | 2;
  pointer: RefObject<{ x: number; y: number }>;
};

export function OfferMarkCanvas({ shape, pointer }: OfferMarkCanvasProps) {
  const enabled = useWebGLScene();

  if (!enabled) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-28 w-28 rounded-full border border-brand/50 bg-brand/20 shadow-glow" />
      </div>
    );
  }

  return <Scene shape={shape} pointer={pointer} />;
}
