'use client';

import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type CounterProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
};

function format(value: number, decimals: number): string {
  return decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
}

export function Counter({ value, decimals = 0, prefix = '', suffix = '', delay = 0 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const [display, setDisplay] = useState(delay > 0 ? 0 : value);
  const finalText = `${prefix}${format(value, decimals)}${suffix}`;

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(value);
      return;
    }

    const duration = 1300;
    let frame = 0;
    const timeout = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - progress) ** 3;
        setDisplay(value * eased);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      setDisplay(0);
      frame = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [delay, inView, value]);

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {prefix}
        {format(display, decimals)}
        {suffix}
      </span>
      <span className="sr-only">{finalText}</span>
    </>
  );
}
