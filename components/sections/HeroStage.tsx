'use client';

import { motion, useReducedMotion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const still = [
  { src: '/images/stage-platform-v3.png', alt: 'Lit stage', left: -1, top: 65.4, width: 102, z: 1, screen: false },
  { src: '/images/stage-case-v2.png', alt: 'Pexbit case', left: 1, top: 53.5, width: 24, z: 3, screen: false },
  { src: '/images/stage-light.png', alt: 'Light panel', left: 23, top: 62.2, width: 13, z: 8, screen: false },
  { src: '/images/stage-tablet-v2.png', alt: 'Strategy slate', left: 62, top: 59.8, width: 18, z: 4, screen: true },
  { src: '/images/stage-camera-v3.png', alt: 'Camera on a stabilizer', left: 26, top: 13.4, width: 46, z: 6, screen: false },
  { src: '/images/stage-clapper-v5.png', alt: 'Clapperboard', left: 81.5, top: 60.6, width: 16.5, z: 9, screen: false },
];

const icons = [
  { src: '/images/stage-instagram.png', alt: 'Instagram', left: 4, top: 1, width: 15, rotate: -8, duration: 2.8, delay: 0, drift: 8 },
  { src: '/images/hero-youtube.png', alt: 'YouTube', left: 74, top: 0, width: 13, rotate: 8, duration: 2.5, delay: 0.35, drift: -8 },
  { src: '/images/hero-facebook.png', alt: 'Facebook', left: 82, top: 18, width: 11.5, rotate: 6, duration: 3, delay: 0.7, drift: 6 },
];

const slateWords = ['STRATEGY', 'CONTENT', 'VISIBILITY', 'AUTHORITY', 'GROWTH'];

export function HeroStage() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none" style={{ aspectRatio: '1000 / 800' }}>
      <div className="absolute inset-0">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[16%] top-[8%] h-[46%] w-[62%] rounded-[50%] border border-brand/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[1%] left-[8%] z-[2] h-[7%] w-[84%] rounded-[100%] bg-[#8B2FE0]/40 blur-xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[1%] top-[24%] h-4 w-4 rounded-full border border-brand/50"
      >
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/70" />
      </div>
      {still.map((piece) => (
        <div
          key={piece.alt}
          className="pointer-events-none absolute"
          style={{
            left: `${piece.left}%`,
            top: `${piece.top}%`,
            width: `${piece.width}%`,
            zIndex: piece.z,
            containerType: piece.screen ? 'inline-size' : undefined,
          }}
        >
          <img
            src={piece.src}
            alt={piece.alt}
            draggable={false}
            className="h-auto w-full select-none drop-shadow-[0_16px_18px_rgba(20,0,40,0.28)]"
          />
          {piece.screen ? (
            <div
              className="absolute left-[12%] top-[18%] flex w-[76%] items-end justify-center gap-[0.55em] text-white"
              style={{ fontSize: '7cqw' }}
            >
              <div className="flex flex-col items-center text-center font-display font-extrabold uppercase leading-[1.32] tracking-wide">
                {slateWords.map((word) => (
                  <span key={word} className="whitespace-nowrap">
                    {word}
                  </span>
                ))}
              </div>
              <svg viewBox="0 0 24 28" className="mb-[0.08em] h-[1.55em] w-[1.25em] shrink-0 text-[#C084FC]" fill="currentColor" aria-hidden="true">
                <path d="M12 1 22.5 12.2H16.2V27H7.8V12.2H1.5L12 1Z" />
              </svg>
            </div>
          ) : null}
        </div>
      ))}
      {icons.map((icon) => (
        <motion.div
          key={icon.alt}
          className="absolute"
          style={{
            left: `${icon.left}%`,
            top: `${icon.top}%`,
            width: `${icon.width}%`,
            zIndex: 8,
            rotate: icon.rotate,
          }}
          whileHover={reduce ? undefined : { y: -14, scale: 1.08 }}
          transition={{ duration: 0.45, ease }}
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -18, 0], x: [0, icon.drift, 0] }}
            transition={{
              duration: icon.duration,
              delay: icon.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <img
              src={icon.src}
              alt={icon.alt}
              draggable={false}
              className="h-auto w-full select-none drop-shadow-[0_14px_16px_rgba(40,10,70,0.32)]"
            />
          </motion.div>
        </motion.div>
      ))}
      </div>
    </div>
  );
}
