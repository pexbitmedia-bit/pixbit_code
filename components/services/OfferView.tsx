'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, type MouseEvent } from 'react';
import { OfferMarkCanvas } from '@/components/3d/OfferMarkCanvas';
import { Container } from '@/components/ui/Container';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Reveal } from '@/components/ui/Reveal';
import type { Offering } from '@/lib/offerings';
import { EASE } from '@/lib/motion';

type OfferViewProps = {
  offering: Offering;
};

export function OfferView({ offering }: OfferViewProps) {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [7, -6]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 36]);

  function onMouseMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointer.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    pointer.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  }

  return (
    <article>
      <section
        ref={heroRef}
        onMouseMove={onMouseMove}
        className="relative overflow-hidden pb-16 pt-10 sm:pt-16"
      >
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <Container className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
            {offering.parent ? (
              <Link href={`/services/${offering.parent.slug}`} className="hover:text-brand-deep">
                {offering.kicker}
              </Link>
            ) : (
              offering.kicker
            )}
          </p>
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <motion.div style={reduce ? undefined : { y: copyY }}>
              <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
                {offering.title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg">
                {offering.lede}
              </p>
              <div className="mt-8">
                <MagneticButton href="/#contact">Book a Strategy Call</MagneticButton>
              </div>
            </motion.div>
            <div className="grid gap-4">
              <motion.div
                style={reduce ? undefined : { y: imageY, rotate: imageRotate }}
                className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-ink/10 bg-ink shadow-card"
              >
                <Image
                  src={offering.image}
                  alt={offering.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="object-cover"
                />
              </motion.div>
              <div className="h-56 overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink shadow-glow sm:h-64">
                <OfferMarkCanvas shape={offering.shape} pointer={pointer} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {offering.chapters.map((chapter, index) => (
              <Reveal key={chapter.title} delay={index * 0.06}>
                <article className="h-full overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white shadow-card">
                  <div className="relative h-52">
                    <Image
                      src={offering.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 520px"
                      className={
                        index % 2 === 0 ? 'object-cover object-left' : 'object-cover object-right'
                      }
                    />
                  </div>
                  <div className="p-6 sm:p-8">
                    <p className="font-display text-sm font-semibold text-brand">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h2 className="mt-3 font-display text-2xl font-semibold text-ink">
                      {chapter.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-base">
                      {chapter.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {offering.points.map((point, index) => (
              <Reveal key={point} as="li" delay={index * 0.04}>
                <div className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-white px-4 py-4">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand" />
                  <p className="text-sm font-medium text-ink">{point}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {offering.siblings.length > 0 ? (
        <section className="bg-white py-20 sm:py-28">
          <Container>
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Continue through {offering.parent?.title ?? 'the studio'}
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {offering.siblings.map((sibling, index) => (
                <motion.div
                  key={sibling.slug}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                  transition={{
                    duration: reduce ? 0 : 0.55,
                    delay: reduce ? 0 : index * 0.05,
                    ease: EASE,
                  }}
                >
                  <Link
                    href={`/services/${sibling.slug}`}
                    className="group block rounded-2xl border border-ink/10 bg-paper p-5 transition-colors hover:border-brand/40 hover:bg-white"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <p className="mt-3 font-display text-xl font-semibold text-ink group-hover:text-brand">
                      {sibling.title}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </article>
  );
}
