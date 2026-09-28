'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

type ParallaxProps = {
  children?: ReactNode;
  className?: string;
  offset?: number;
  decorative?: boolean;
};

export function Parallax({ children, className, offset = 80, decorative = false }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  if (reduce) {
    return (
      <div className={className} aria-hidden={decorative || undefined}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className} aria-hidden={decorative || undefined}>
      {children}
    </motion.div>
  );
}
