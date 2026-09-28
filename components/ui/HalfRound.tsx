'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, type ReactNode } from 'react';

type HalfRoundProps = {
  children: ReactNode;
};

type Tier = 'mobile' | 'tablet' | 'desktop';

function arc(value: number, amount: number) {
  if (value <= 0.5) return amount * (1 - value / 0.5);
  return -amount * ((value - 0.5) / 0.5);
}

function fade(value: number, edge: number, floor: number) {
  if (value < edge) return floor + (1 - floor) * (value / edge);
  if (value > 1 - edge) return floor + (1 - floor) * ((1 - value) / edge);
  return 1;
}

export function HalfRound({ children }: HalfRoundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const tier = useRef<Tier>('desktop');
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)');
    const tablet = window.matchMedia('(max-width: 1279px)');
    const update = () => {
      tier.current = mobile.matches ? 'mobile' : tablet.matches ? 'tablet' : 'desktop';
    };
    update();
    mobile.addEventListener('change', update);
    tablet.addEventListener('change', update);
    return () => {
      mobile.removeEventListener('change', update);
      tablet.removeEventListener('change', update);
    };
  }, []);

  const rotateX = useTransform(scrollYProgress, (value) => {
    const amount = tier.current === 'mobile' ? 8 : tier.current === 'tablet' ? 16 : 28;
    return arc(value, amount);
  });
  const y = useTransform(scrollYProgress, (value) => {
    const amount = tier.current === 'mobile' ? 10 : tier.current === 'tablet' ? 22 : 48;
    return arc(value, amount);
  });
  const z = useTransform(scrollYProgress, (value) => {
    const amount = tier.current === 'mobile' ? 12 : tier.current === 'tablet' ? 24 : 40;
    return -Math.abs(arc(value, amount));
  });
  const scale = useTransform(scrollYProgress, (value) => {
    const amount = tier.current === 'mobile' ? 0.015 : tier.current === 'tablet' ? 0.03 : 0.06;
    const dip = Math.abs(value - 0.5) / 0.5;
    return 1 - amount * dip;
  });
  const opacity = useTransform(scrollYProgress, (value) => {
    if (tier.current === 'mobile') return 1;
    if (tier.current === 'tablet') return fade(value, 0.1, 0.55);
    return fade(value, 0.16, 0);
  });

  if (reduce) return <div>{children}</div>;

  return (
    <div ref={ref} className="touch-pan-y [overflow:clip] [perspective:1200px] sm:[perspective:1400px]">
      <motion.div
        style={{
          rotateX,
          y,
          z,
          scale,
          opacity,
          transformOrigin: 'center center',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
