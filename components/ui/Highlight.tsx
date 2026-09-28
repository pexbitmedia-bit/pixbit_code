'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE } from '@/lib/motion';

type HighlightProps = {
  children: ReactNode;
};

export function Highlight({ children }: HighlightProps) {
  const reduce = useReducedMotion();

  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <motion.span
        aria-hidden="true"
        className="absolute bottom-1 left-0 -z-0 h-[0.38em] w-full origin-left rounded-sm bg-brand/20"
        initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: reduce ? 0 : 0.7, ease: EASE, delay: reduce ? 0 : 0.15 }}
      />
    </span>
  );
}
