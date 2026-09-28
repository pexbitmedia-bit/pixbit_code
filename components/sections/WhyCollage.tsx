'use client';

import { motion, useReducedMotion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const people = [
  { src: '/images/why-instagram.png?v=2', alt: 'Instagram', z: 2, duration: 3.8, delay: 0.12, fade: 22 },
  { src: '/images/why-youtube.png?v=2', alt: 'YouTube', z: 5, duration: 3.2, delay: 0, fade: 14 },
  { src: '/images/why-facebook.png?v=2', alt: 'Facebook', z: 2, duration: 4, delay: 0.28, fade: 22 },
];

export function WhyCollage() {
  const reduce = useReducedMotion();

  return (
    <div className="relative h-64 w-full min-w-0 sm:h-80 lg:h-full lg:min-h-[22rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[18%] h-[70%] w-[70%] -translate-x-1/2 rounded-full border border-brand/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[28%] h-[52%] w-[46%] -translate-x-1/2 rounded-full border border-brand/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-8 w-[86%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(139,31,224,0.28),transparent_72%)] blur-xl"
      />
      <div className="absolute inset-0 grid grid-cols-[0.86fr_1.28fr_0.86fr] items-end">
        {people.map((person) => (
          <div key={person.alt} className="flex h-full min-w-0 items-end justify-center" style={{ zIndex: person.z }}>
            <motion.div
              className="flex h-full w-full cursor-pointer items-end justify-center"
              whileHover={reduce ? undefined : { y: -16, scale: 1.045 }}
              transition={{ duration: 0.55, ease }}
            >
              <motion.img
                src={person.src}
                alt={person.alt}
                draggable={false}
                className="max-h-full w-full select-none object-contain object-bottom drop-shadow-[0_18px_22px_rgba(88,24,150,0.22)]"
                style={{
                  maskImage: `linear-gradient(to bottom, black calc(100% - ${person.fade}px), transparent 100%)`,
                  WebkitMaskImage: `linear-gradient(to bottom, black calc(100% - ${person.fade}px), transparent 100%)`,
                }}
                animate={reduce ? undefined : { y: [0, -6, 0] }}
                transition={{
                  duration: person.duration,
                  delay: person.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
