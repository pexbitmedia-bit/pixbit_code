'use client';

import { AnimatePresence, motion, useMotionValue, useReducedMotion } from 'framer-motion';
import { useEffect, useState, type MouseEvent, type FocusEvent } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useFinePointer } from '@/lib/hooks';
import { testimonialNote, testimonials } from '@/lib/content';
import { EASE } from '@/lib/motion';

function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0] ?? '')
    .join('');
}

export function Testimonials() {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const current = testimonials[index] ?? testimonials[0];

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % testimonials.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, [paused, reduce]);

  function go(next: number) {
    const total = testimonials.length;
    setIndex(((next % total) + total) % total);
  }

  function onMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (!fine || reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 10);
    rotateX.set((0.5 - py) * 10);
  }

  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  if (!current) return null;

  const card = (
    <figure className="relative overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white p-7 shadow-card sm:p-10">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-2 -top-6 font-display text-8xl font-extrabold text-brand/15"
      >
        “
      </span>
      <blockquote className="relative font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
        {current.quote}
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 font-display text-sm font-bold text-brand">
          {initials(current.name)}
        </span>
        <span>
          <span className="block font-semibold text-ink">{current.name}</span>
          <span className="block text-sm text-ink/60">{current.role}</span>
        </span>
      </figcaption>
    </figure>
  );

  return (
    <section
      className="relative overflow-hidden bg-brand-soft/60 py-12 sm:py-16"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="Leaders who stopped being the best-kept secret."
          highlight="best-kept secret"
          description={testimonialNote}
        />
        <div
          className="relative mx-auto mt-14 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            setPaused(false);
            onMouseLeave();
          }}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event: FocusEvent<HTMLDivElement>) => {
            const next = event.relatedTarget;
            if (!(next instanceof Node) || !event.currentTarget.contains(next)) setPaused(false);
          }}
        >
          <div style={{ perspective: 1200 }} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
            {reduce ? (
              card
            ) : (
              <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    {card}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink"
            >
              Previous
            </button>
            <div className="flex items-center gap-2" role="group" aria-label="Choose a testimonial">
              {testimonials.map((item, itemIndex) => (
                <button
                  key={item.name}
                  type="button"
                  aria-label={`Show testimonial from ${item.name}`}
                  aria-current={itemIndex === index ? 'true' : undefined}
                  onClick={() => go(itemIndex)}
                  className={`h-2.5 rounded-full transition-all ${itemIndex === index ? 'w-6 bg-brand' : 'w-2.5 bg-ink/20'}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink"
            >
              Next
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
