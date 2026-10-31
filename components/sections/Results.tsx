'use client';

import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { Marquee } from '@/components/ui/Marquee';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { resultStats } from '@/lib/content';
import type { Stat } from '@/types';

const looks = [
  {
    shell:
      'border-[#ddc2f7] bg-[linear-gradient(155deg,#ffffff_0%,#f4e4ff_46%,#e4c6ff_100%)] shadow-[0_24px_50px_-28px_rgba(139,31,224,0.55)]',
    glow: 'bg-[#c084fc]',
  },
  {
    shell:
      'border-[#cbb6f6] bg-[linear-gradient(165deg,#fbf8ff_0%,#e5d4ff_62%,#f0e4ff_100%)] shadow-[0_28px_56px_-30px_rgba(110,18,192,0.5)]',
    glow: 'bg-[#8B1FE0]',
  },
  {
    shell:
      'border-[#f0c6e6] bg-[linear-gradient(150deg,#fff7fc_0%,#f6d4ff_42%,#e7d2ff_100%)] shadow-[0_24px_50px_-28px_rgba(192,70,180,0.42)]',
    glow: 'bg-[#e879f9]',
  },
] as const;

const pops = [
  {
    x: ['112%', '64%', '0%'],
    y: [0, -14, 0],
    z: [30, 190, 0],
    rotateX: [14, -8, 0],
    rotateY: [22, -12, 0],
    scale: [0.7, 1.08, 1],
  },
  {
    x: ['0%', '0%', '0%'],
    y: [0, -18, 0],
    z: [10, 240, 0],
    rotateX: [32, -12, 0],
    rotateY: [0, 8, 0],
    scale: [0.62, 1.12, 1],
  },
  {
    x: ['-112%', '-64%', '0%'],
    y: [0, 10, 0],
    z: [50, 170, 0],
    rotateX: [-10, 6, 0],
    rotateY: [-24, 12, 0],
    scale: [0.74, 1.06, 1],
  },
];

function sample(value: number, input: number[], output: readonly number[]): number;
function sample(value: number, input: number[], output: readonly string[]): string;
function sample(value: number, input: number[], output: readonly (number | string)[]) {
  const last = input.length - 1;
  if (value <= input[0]!) return output[0];
  if (value >= input[last]!) return output[last];
  for (let index = 0; index < last; index += 1) {
    const from = input[index]!;
    const to = input[index + 1]!;
    if (value > to) continue;
    const mix = (value - from) / (to - from);
    const start = output[index]!;
    const end = output[index + 1]!;
    if (typeof start === 'string' || typeof end === 'string') {
      return `${parseFloat(String(start)) + (parseFloat(String(end)) - parseFloat(String(start))) * mix}%`;
    }
    return start + (end - start) * mix;
  }
  return output[last];
}

const hovers = [
  { rotateX: 7, rotateY: -12, z: 22 },
  { rotateX: -9, z: 28 },
  { rotateX: 5, rotateY: 12, z: 22 },
] as const;

function LevelCard({
  stat,
  index,
  progress,
}: {
  stat: Stat;
  index: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const look = looks[index] ?? looks[0];
  const pop = pops[index] ?? pops[0]!;
  const start = 0.22 + index * 0.18;
  const range = [start, start + 0.08, start + 0.16];
  const narrow = useRef(false);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 1023px)');
    const update = () => {
      narrow.current = media.matches;
    };
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  const x = useTransform(progress, (value) => (narrow.current ? '0%' : sample(value, range, pop.x)));
  const y = useTransform(progress, range, pop.y);
  const rotateX = useTransform(progress, range, pop.rotateX);
  const rotateY = useTransform(progress, (value) =>
    narrow.current ? sample(value, range, pop.rotateY) * 0.45 : sample(value, range, pop.rotateY),
  );
  const z = useTransform(progress, (value) => {
    const next = sample(value, range, pop.z);
    return narrow.current ? next * 0.28 : next;
  });
  const scale = useTransform(progress, range, pop.scale);
  const opacity = useTransform(progress, [start, start + 0.05], [0, 1]);
  const open = useTransform(progress, [start, start + 0.16], [0, 1]);
  const layer = useTransform(open, [0, 0.15, 1], [1, 6, 1]);
  const figure = useTransform(open, (value) => {
    const eased = 1 - (1 - Math.min(1, Math.max(0, value))) ** 3;
    return `${Math.round(stat.value * eased)}${stat.suffix ?? ''}`;
  });
  const ring = useTransform(open, [0, 1], [94.2, 0]);

  const card = (
    <article className={`relative min-h-52 overflow-hidden rounded-[1.7rem] border px-5 pb-6 pt-5 sm:px-6 ${look.shell}`}>
      <span aria-hidden="true" className={`absolute -right-8 -top-12 h-32 w-32 rounded-full blur-2xl ${look.glow} opacity-70`} />
      <span aria-hidden="true" className={`absolute -bottom-10 -left-8 h-24 w-24 rounded-full blur-2xl ${look.glow} opacity-30`} />
      <div className="relative flex items-center gap-3">
        <span className="relative flex h-9 w-9 items-center justify-center">
          <svg viewBox="0 0 36 36" className="absolute inset-0 h-9 w-9 -rotate-90" aria-hidden="true">
            <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(139,31,224,0.2)" strokeWidth="2" />
            <motion.circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="#8B1FE0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="94.2"
              style={{ strokeDashoffset: ring }}
            />
          </svg>
          <span className="font-display text-[11px] font-bold text-brand">{String(index + 1).padStart(2, '0')}</span>
        </span>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand/80">
          Level {String(index + 1).padStart(2, '0')}
        </p>
      </div>
      <div className="relative mt-6">
        <p className="sr-only">
          {stat.value}
          {stat.suffix} {stat.label}
        </p>
        <motion.p aria-hidden="true" className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
          {figure}
        </motion.p>
        <p className="mt-3 max-w-[14rem] text-sm leading-relaxed text-ink/70">{stat.label}</p>
        <span aria-hidden="true" className="mt-5 block h-px w-14 bg-brand/60" />
      </div>
    </article>
  );

  if (reduce) return <li>{card}</li>;

  return (
    <motion.li
      style={{ x, y, rotateX, rotateY, z, scale, opacity, zIndex: layer, transformStyle: 'preserve-3d' }}
      className="relative"
    >
      <motion.div
        whileHover={hovers[index] ?? hovers[0]}
        transition={{ duration: 0.45 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {card}
      </motion.div>
    </motion.li>
  );
}

export function Results() {
  const stage = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const forced = useMotionValue(1);
  const { scrollYProgress } = useScroll({
    target: stage,
    offset: ['start 85%', 'end 40%'],
  });
  const progress = reduce ? forced : scrollYProgress;
  const rail = useTransform(progress, [0.22, 0.78], [0, 1]);

  return (
    <section id="results">
      <div ref={stage} className="bg-[linear-gradient(180deg,#ffffff_0%,#f6edff_22%,#f3e8ff_78%,#ffffff_100%)] py-12 sm:py-16">
        <Container>
                <SectionHeading
                  eyebrow="Our Results"
                  title="Proof that a clear personal brand compounds."
                  highlight="compounds"
                  description="Recognition is not a spike. It is what happens when narrative, content, and distribution stay in one voice."
                />
                <div className="relative mt-12">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-x-4 -top-6 bottom-0 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(139,31,224,0.16),transparent_70%)]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[8%] right-[8%] top-5 hidden h-px bg-[#e4ccf8] lg:block"
                  >
                    <motion.span className="block h-full origin-left bg-brand" style={{ scaleX: rail }} />
                  </div>
                  <ul className="relative grid gap-5 lg:grid-cols-3" style={{ perspective: '900px' }}>
                    {resultStats.map((stat, index) => (
                      <LevelCard key={stat.label} stat={stat} index={index} progress={progress} />
                    ))}
                  </ul>
              </div>
            </Container>
      </div>
      <div className="pb-3 pt-2">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.22em] text-ink/45">
          Press rooms we pitch
        </p>
        <Marquee />
      </div>
    </section>
  );
}
