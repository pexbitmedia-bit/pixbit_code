'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { HeroStage } from '@/components/sections/HeroStage';
import { Container } from '@/components/ui/Container';
import { Counter } from '@/components/ui/Counter';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { audiences, resultStats } from '@/lib/content';
import { EASE } from '@/lib/motion';

const line = {
  hidden: { opacity: 0, y: 42, rotateX: 32 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.85, ease: EASE } },
};

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const wordY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="hero-shade relative overflow-hidden pb-6 pt-8 sm:pb-8 sm:pt-12 lg:pt-16"
    >
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { y: gridY }}
        className="hero-grid pointer-events-none absolute inset-0"
      />
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { y: wordY }}
        className="pointer-events-none absolute -left-4 top-24 hidden select-none font-display text-[18vw] font-extrabold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(139,31,224,0.32)] sm:block"
      >
        pexbit
      </motion.div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-8 h-96 w-96 rounded-full bg-ink/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-paper"
      />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.12fr)] lg:gap-6" style={{ perspective: '1100px' }}>
          <motion.div
            className="min-w-0"
            style={{ transformStyle: 'preserve-3d' }}
            initial={reduce ? false : 'hidden'}
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: reduce ? 0 : 0.08,
                  delayChildren: reduce ? 0 : 0.05,
                },
              },
            }}
          >
            <motion.p
              variants={line}
              className="text-xs font-semibold uppercase tracking-[0.22em] text-brand"
            >
              Personal branding studio
            </motion.p>
            <motion.h1
              variants={line}
              className="mt-5 max-w-xl font-display text-[2rem] font-extrabold leading-[0.95] tracking-tight text-ink sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Your name is the brand.
              <span className="mt-2 block text-brand">We make it unmistakable.</span>
            </motion.h1>
            <motion.p
              variants={line}
              className="mt-6 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg"
            >
              Pexbit Media builds and elevates personal brands for founders, coaches, consultants,
              creators, and executives who want to become the authority people ask for by name.
            </motion.p>
            <motion.ul variants={line} className="mt-6 flex flex-wrap gap-2">
              {audiences.map((audience) => (
                <li
                  key={audience}
                  className="rounded-full border border-ink/10 bg-white px-3 py-1 text-xs font-medium text-ink/80"
                >
                  {audience}
                </li>
              ))}
            </motion.ul>
            <motion.div variants={line} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <MagneticButton href="#contact">Book a Strategy Call</MagneticButton>
              <MagneticButton href="#results" variant="ghost">
                See Our Work
              </MagneticButton>
            </motion.div>
          </motion.div>
          <motion.div
            className="relative min-w-0 w-full"
            style={{ transformStyle: 'preserve-3d', perspective: 1100 }}
            initial={reduce ? false : { opacity: 0, z: 180, rotateY: -16, scale: 0.9 }}
            animate={{ opacity: 1, z: 0, rotateY: 0, scale: 1 }}
            transition={{ duration: reduce ? 0 : 1.05, delay: reduce ? 0 : 0.12, ease: EASE }}
          >
            <motion.div style={reduce ? undefined : { y: orbY }}>
              <HeroStage />
            </motion.div>
          </motion.div>
        </div>
        <ul className="mt-8 grid grid-cols-1 gap-5 border-t border-ink/10 pt-8 min-[480px]:grid-cols-3 sm:mt-10">
          {resultStats.map((stat) => (
            <li key={stat.label}>
              <p className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 max-w-[12rem] text-xs leading-snug text-ink/65 sm:text-sm">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
