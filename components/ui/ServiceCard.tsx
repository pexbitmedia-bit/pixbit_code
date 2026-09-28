'use client';

import { motion, useReducedMotion, useTransform, type MotionValue } from 'framer-motion';
import Link from 'next/link';
import { ServiceIcon } from '@/components/ui/icons';
import { cn } from '@/lib/cn';
import type { Service } from '@/types';

type ServiceCardProps = {
  service: Service;
  index: number;
  progress: MotionValue<number>;
};

const looks = [
  {
    card: 'border-[#e7d6f8] bg-[linear-gradient(165deg,#ffffff_0%,#f4e9ff_100%)]',
    a: 'bg-[#c084fc]/45 -right-10 -top-12',
    b: 'bg-[#8b1fe0]/20 -bottom-10 -left-8',
    tilt: -2.4,
    lift: 'lg:mt-1',
  },
  {
    card: 'border-[#d7e0fb] bg-[linear-gradient(165deg,#ffffff_0%,#eef3ff_100%)]',
    a: 'bg-[#5b7cff]/40 -left-10 -top-10',
    b: 'bg-[#ff7eb3]/35 -bottom-12 -right-8',
    tilt: 2.1,
    lift: 'lg:mt-8',
  },
  {
    card: 'border-[#f0c6ea] bg-[linear-gradient(165deg,#fff7fc_0%,#f6e4ff_100%)]',
    a: 'bg-[#ff4fa3]/40 -right-8 -top-8',
    b: 'bg-[#7c3aed]/30 -bottom-10 -left-10',
    tilt: -1.6,
    lift: 'lg:mt-3',
  },
] as const;

const hovers = [
  { y: -16, rotateX: -7, rotateY: 8, scale: 1.03, z: 18 },
  { y: -18, rotateX: -10, scale: 1.04, z: 24 },
  { y: -16, rotateX: -6, rotateY: -8, scale: 1.03, z: 18 },
];

const scenes = [
  {
    y: [110, 0, -18, 10],
    rotateY: [-42, 0, 10, -6],
    rotateX: [14, 0, -6, 4],
    z: [-90, 0, 28, -12],
  },
  {
    y: [140, 0, 16, -8],
    rotateY: [22, 0, -12, 8],
    rotateX: [36, 0, 8, -4],
    z: [-50, 18, 40, 0],
  },
  {
    y: [80, 0, -10, 6],
    rotateY: [34, 0, -14, 6],
    rotateX: [6, 0, 5, -3],
    z: [-160, 30, 8, -20],
  },
] as const;

export function ServiceCard({ service, index, progress }: ServiceCardProps) {
  const reduce = useReducedMotion();
  const number = String(index + 1).padStart(2, '0');
  const scene = scenes[index] ?? scenes[0];
  const look = looks[index] ?? looks[0];
  const hover = hovers[index] ?? hovers[0];
  const shift = index * 0.05;
  const range = [0.04 + shift, 0.26 + shift, 0.62, 0.94];

  const y = useTransform(progress, range, scene.y);
  const rotateY = useTransform(progress, range, scene.rotateY);
  const rotateX = useTransform(progress, range, scene.rotateX);
  const rotate = useTransform(progress, range, [look.tilt - 3, look.tilt, look.tilt + 0.6, look.tilt]);
  const z = useTransform(progress, range, scene.z);
  const opacity = useTransform(progress, [0.02 + shift, 0.16 + shift], [0, 1]);

  const body = (
    <>
      <span aria-hidden="true" className={cn('pointer-events-none absolute h-28 w-28 rounded-full blur-2xl', look.a)} />
      <span aria-hidden="true" className={cn('pointer-events-none absolute h-24 w-24 rounded-full blur-2xl', look.b)} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -top-8 font-display text-8xl font-extrabold leading-none text-brand/[0.07]"
      >
        {number}
      </div>
      <div className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-brand/0 blur-2xl transition-colors duration-500 group-hover:bg-brand/20" />
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
          <ServiceIcon name={service.icon} />
        </span>
        <span className="font-display text-sm font-semibold tracking-widest text-ink/30">{number}</span>
      </div>
      <h3 className="mt-6 font-display text-2xl font-semibold leading-snug text-ink">
        <Link href={`/services/${service.id}`} className="hover:text-brand">
          {service.title}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink/70">{service.description}</p>
      <div className="mt-6 space-y-4">
        {service.groups.map((group) => (
          <div key={group.label}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">{group.label}</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/services/${item.slug}`}
                    className="inline-block rounded-full border border-ink/10 bg-white/80 px-3 py-1 text-xs font-medium text-ink/75 transition-colors hover:border-brand/40 hover:text-ink"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );

  const className = cn(
    'group relative h-full overflow-hidden rounded-[1.75rem] border p-6 shadow-card backdrop-blur-md sm:p-7',
    look.card,
    look.lift,
  );

  if (reduce) {
    return (
      <li id={service.id} className={className} style={{ transform: `rotate(${look.tilt}deg)` }}>
        {body}
      </li>
    );
  }

  return (
    <motion.li
      id={service.id}
      style={{ y, rotateY, rotateX, rotate, z, opacity, transformStyle: 'preserve-3d' }}
      className="relative h-full hover:z-30"
    >
      <motion.div
        whileHover={hover}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className={cn(className, 'hover:shadow-glow')}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {body}
      </motion.div>
    </motion.li>
  );
}
