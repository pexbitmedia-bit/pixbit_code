'use client';

import { animate, motion, useMotionValue, useReducedMotion } from 'framer-motion';
import { useRef, type MouseEvent, type ReactNode } from 'react';
import { ArrowIcon } from '@/components/ui/icons';
import { useFinePointer } from '@/lib/hooks';
import { cn } from '@/lib/cn';
import { EASE } from '@/lib/motion';

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'ghost' | 'light';
  href?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
};

const variants = {
  primary: 'bg-brand text-white shadow-glow hover:bg-brand-deep focus-visible:outline-white',
  ghost: 'border border-ink/15 bg-white text-ink hover:border-brand/40 hover:text-brand',
  light: 'bg-white text-ink shadow-[0_12px_28px_-16px_rgba(255,255,255,0.55)] hover:bg-brand-soft hover:text-ink',
};

export function MagneticButton({
  children,
  className,
  variant = 'primary',
  href,
  type = 'button',
  disabled = false,
  onClick,
}: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const playing = useRef<Array<{ stop: () => void }>>([]);

  function onMouseMove(event: MouseEvent<HTMLElement>) {
    if (!fine || reduce || disabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.22);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.28);
  }

  function onMouseLeave() {
    playing.current.forEach((control) => control.stop());
    playing.current = [
      animate(x, 0, { duration: reduce ? 0 : 0.4, ease: EASE }),
      animate(y, 0, { duration: reduce ? 0 : 0.4, ease: EASE }),
    ];
  }

  const classes = cn(
    'group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant],
    className,
  );

  const content = (
    <>
      {children}
      {variant === 'primary' || variant === 'light' ? (
        <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      ) : null}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        data-cursor="button"
        className={classes}
        style={{ x, y }}
        whileTap={reduce ? undefined : { scale: 0.98 }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      data-cursor="button"
      className={classes}
      style={{ x, y }}
      whileTap={reduce || disabled ? undefined : { scale: 0.98 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {content}
    </motion.button>
  );
}
