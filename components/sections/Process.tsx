'use client';

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { processSteps } from '@/lib/content';
import { EASE } from '@/lib/motion';
import type { ProcessStep } from '@/types';

const tones = [
  'bg-[#f7f2fb]',
  'bg-[#f3e9fb]',
  'bg-[#faf7fd]',
  'bg-[#efe4f8]',
  'bg-[#f6f0fa]',
];

const scenes = [
  { y: [64, 0, -8], rotateY: [-26, 0, 7], rotateX: [10, 0, -3], z: [-50, 0, 14] },
  { y: [78, 0, 8], rotateY: [14, 0, -8], rotateX: [22, 0, 4], z: [-24, 16, 0] },
  { y: [52, 0, -6], rotateY: [18, 0, -10], rotateX: [4, 0, 3], z: [-90, 22, 0] },
  { y: [78, 0, 6], rotateY: [-18, 0, 8], rotateX: [16, 0, -4], z: [-30, 12, 6] },
  { y: [46, 0, -8], rotateY: [22, 0, -6], rotateX: [6, 0, 2], z: [-70, 10, -6] },
];

function StepCard({
  step,
  index,
  progress,
}: {
  step: ProcessStep;
  index: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const scene = scenes[index] ?? scenes[0]!;
  const shift = index * 0.035;
  const range = [0.06 + shift, 0.28 + shift, 0.78];
  const y = useTransform(progress, range, scene.y);
  const rotateY = useTransform(progress, range, scene.rotateY);
  const rotateX = useTransform(progress, range, scene.rotateX);
  const z = useTransform(progress, range, scene.z);
  const opacity = useTransform(progress, [0.02 + shift, 0.16 + shift], [0, 1]);

  const card = (
    <motion.div
      whileHover={reduce ? undefined : { y: -10, rotateX: -4 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={`relative h-full overflow-hidden rounded-[1.8rem] border border-white/80 px-5 py-6 shadow-[0_12px_28px_rgba(80,30,120,0.06)] hover:shadow-[0_18px_36px_rgba(139,31,224,0.14)] ${tones[index] ?? tones[0]}`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute h-24 w-24 rounded-full bg-brand/10 ${index % 2 === 0 ? '-right-8 -top-10' : '-left-8 -top-8'}`}
      />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-10 right-4 h-16 w-16 rounded-full bg-white/80" />
      <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-brand font-display text-sm font-bold text-white shadow-[0_8px_18px_rgba(139,31,224,0.28)]">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="relative mt-5 font-display text-xl font-semibold text-ink">{step.title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-ink/70">{step.description}</p>
    </motion.div>
  );

  if (reduce) {
    return <li className={index % 2 === 1 ? 'lg:mt-10' : undefined}>{card}</li>;
  }

  return (
    <motion.li
      style={{ y, rotateY, rotateX, z, opacity, transformStyle: 'preserve-3d' }}
      className={index % 2 === 1 ? 'lg:mt-10' : undefined}
    >
      {card}
    </motion.li>
  );
}

export function Process() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 86%', 'end 20%'],
  });

  return (
    <section id="process" ref={sectionRef} className="overflow-hidden bg-white py-12 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow="Process"
          title="How we build your brand."
          highlight="build"
          description="Five stages, from the story only you can tell to a presence that keeps earning attention."
        />
        <div className="relative mt-14 lg:mt-16 lg:pb-6">
          <div
            aria-hidden="true"
            className="process-flow absolute bottom-4 left-5 top-4 w-px origin-top md:hidden"
          />
          <svg
            viewBox="0 0 1000 280"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          >
            <defs>
              <linearGradient id="process-flow-stroke" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="260" y2="0">
                <stop offset="0%" stopColor="#8B1FE0" />
                <stop offset="28%" stopColor="#FF4FA3" />
                <stop offset="56%" stopColor="#5B7CFF" />
                <stop offset="82%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#8B1FE0" />
                {reduce ? null : (
                  <>
                    <animate attributeName="x1" from="-260" to="1000" dur="4.8s" repeatCount="indefinite" />
                    <animate attributeName="x2" from="0" to="1260" dur="4.8s" repeatCount="indefinite" />
                  </>
                )}
              </linearGradient>
            </defs>
            <motion.path
              d="M 96 78 L 292 168 L 500 78 L 708 168 L 904 78"
              fill="none"
              stroke="url(#process-flow-stroke)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.28"
              vectorEffect="non-scaling-stroke"
              initial={reduce ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: reduce ? 0 : 1.2, ease: EASE }}
            />
            <motion.path
              d="M 96 78 L 292 168 L 500 78 L 708 168 L 904 78"
              fill="none"
              stroke="url(#process-flow-stroke)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              initial={reduce ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: reduce ? 0 : 1.2, ease: EASE }}
            />
          </svg>
          <ol className="relative z-10 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-5 lg:gap-5" style={{ perspective: '1200px' }}>
            {processSteps.map((step, index) => (
              <StepCard key={step.title} step={step} index={index} progress={scrollYProgress} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
