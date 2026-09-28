'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useFinePointer } from '@/lib/hooks';

export function CustomCursor() {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const enabled = fine && reduce === false;

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add('has-custom-cursor');
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let scale = 1;
    let targetScale = 1;
    let frame = 0;
    let visible = false;

    const render = () => {
      scale += (targetScale - scale) * 0.28;
      const next = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      dot.style.transform = next;
      ring.style.transform = `${next} scale(${scale.toFixed(3)})`;
      frame = requestAnimationFrame(render);
    };

    const onMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
      const target = event.target instanceof Element ? event.target : null;
      const field = target?.closest('input, textarea, select');
      const button = target?.closest('button, [data-cursor="button"]');
      if (field) {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
        targetScale = 1;
        return;
      }
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      targetScale = button ? 1.12 : 1;
    };

    const onLeave = (event: MouseEvent) => {
      if (event.relatedTarget) return;
      visible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 rounded-full bg-ink opacity-0"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] h-7 w-7 rounded-full border border-brand/80 opacity-0"
      />
    </>
  );
}
