'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { EASE } from '@/lib/motion';

const revealItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'li';
};

export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useLayoutEffect(() => {
    if (reduce) return;
    const node = ref.current;
    if (!node) return;

    const check = () => {
      const rect = node.getBoundingClientRect();
      const visible = rect.top < window.innerHeight * 0.92 && rect.bottom > 48;
      if (!visible) return;
      setShown(true);
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };

    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [reduce]);

  if (reduce) {
    if (as === 'li') return <li className={className}>{children}</li>;
    return <div className={className}>{children}</div>;
  }

  const motionProps = {
    className,
    initial: false as const,
    animate: shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { duration: 0.7, delay, ease: EASE },
  };

  if (as === 'li') {
    return (
      <motion.li ref={(node) => { ref.current = node; }} {...motionProps}>
        {children}
      </motion.li>
    );
  }

  return (
    <motion.div ref={(node) => { ref.current = node; }} {...motionProps}>
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'ul' | 'ol';
};

export function Stagger({ children, className, as = 'div' }: StaggerProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    if (as === 'ul') return <ul className={className}>{children}</ul>;
    if (as === 'ol') return <ol className={className}>{children}</ol>;
    return <div className={className}>{children}</div>;
  }

  const MotionTag = as === 'ul' ? motion.ul : as === 'ol' ? motion.ol : motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export { revealItem };
