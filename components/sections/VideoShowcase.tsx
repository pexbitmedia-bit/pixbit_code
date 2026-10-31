'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type WheelEvent } from 'react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { EASE } from '@/lib/motion';
import type { ChannelVideo } from '@/lib/youtube';

type VideoShowcaseProps = {
  videos: ChannelVideo[];
  channelUrl: string;
  channelName: string;
};

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

function cleanTitle(title: string): string {
  const stripped = title.replace(/(?:\s*[#@][\p{L}\p{N}_]+)+$/gu, '').trim();
  return stripped || title;
}

function signedOffset(index: number, active: number, total: number): number {
  let delta = index - active;
  if (delta > total / 2) delta -= total;
  if (delta < -total / 2) delta += total;
  return delta;
}

export function VideoShowcase({ videos, channelUrl, channelName }: VideoShowcaseProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [holding, setHolding] = useState(false);
  const [layout, setLayout] = useState({ phone: true, card: 200, step: 216, height: 356 });
  const point = useRef<{ x: number; y: number } | null>(null);
  const ignoreClick = useRef(false);
  const wheelAt = useRef(0);

  useLayoutEffect(() => {
    const apply = () => {
      const width = window.innerWidth;
      if (width < 768) {
        const stage = Math.min(width - 40, 560);
        const card = Math.round(Math.min(Math.max(stage * 0.68, 168), 250));
        setLayout({ phone: true, card, step: card + 16, height: Math.round((card * 16) / 9) });
        return;
      }
      if (width < 1024) {
        setLayout({ phone: false, card: 216, step: 168, height: 384 });
        return;
      }
      setLayout({ phone: false, card: 248, step: 200, height: 442 });
    };
    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, []);

  useEffect(() => {
    const finish = (event: PointerEvent) => {
      const start = point.current;
      point.current = null;
      setHolding(false);
      if (!start || videos.length < 2) return;
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (Math.abs(dx) < 28 || Math.abs(dx) < Math.abs(dy)) return;
      ignoreClick.current = true;
      const direction = dx < 0 ? 1 : -1;
      setPlaying(false);
      setIndex((current) => (current + direction + videos.length) % videos.length);
    };
    window.addEventListener('pointerup', finish);
    window.addEventListener('pointercancel', finish);
    return () => {
      window.removeEventListener('pointerup', finish);
      window.removeEventListener('pointercancel', finish);
    };
  }, [videos.length]);

  useEffect(() => {
    if (reduce || playing || holding || videos.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % videos.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [reduce, playing, holding, videos.length]);

  const active = videos[index] ?? videos[0];

  function select(next: number) {
    setPlaying(false);
    setIndex((next + videos.length) % videos.length);
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    point.current = { x: event.clientX, y: event.clientY };
    setHolding(true);
  }

  function onWheel(event: WheelEvent<HTMLDivElement>) {
    if (Math.abs(event.deltaX) < 16 || Math.abs(event.deltaX) < Math.abs(event.deltaY)) return;
    const now = Date.now();
    if (now - wheelAt.current < 420) return;
    wheelAt.current = now;
    select(event.deltaX > 0 ? index + 1 : index - 1);
  }

  return (
    <section id="showreel" className="overflow-x-clip bg-white pb-4 pt-8 sm:pb-6 sm:pt-10">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Showreel"
            title="See the standard we hold."
            highlight="standard"
            description={`The latest films from ${channelName}. A new upload on the channel shows up here on its own.`}
          />
        </Reveal>

        {videos.length === 0 || !active ? (
          <a
            href={channelUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
          >
            Watch on YouTube
          </a>
        ) : (
          <div className="mt-8 sm:mt-10">
            <div
              className={`relative mx-auto max-w-3xl touch-pan-y [perspective:1200px] ${layout.phone ? 'overflow-hidden' : ''}`}
              style={{ height: layout.height }}
              onPointerDown={onPointerDown}
              onWheel={onWheel}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-[58%] h-24 w-[70%] -translate-x-1/2 rounded-full bg-brand/25 blur-3xl"
              />
              {videos.map((video, videoIndex) => {
                const delta = signedOffset(videoIndex, index, videos.length);
                const distance = Math.abs(delta);
                const hidden = distance > 1;
                const isCenter = delta === 0;
                if (distance > 2) return null;
                return (
                  <motion.div
                    key={video.id}
                    aria-hidden={hidden || undefined}
                    animate={{
                      x: `calc(-50% + ${delta * layout.step}px)`,
                      y: '-50%',
                      rotateY: layout.phone || reduce ? 0 : delta * -26,
                      scale: layout.phone ? 1 : isCenter ? 1 : 0.84,
                      opacity: hidden ? 0 : 1,
                    }}
                    transition={reduce ? { duration: 0 } : { duration: 0.38, ease: EASE }}
                    style={{ zIndex: isCenter ? 20 : 10 - distance, width: layout.card }}
                    className={`absolute left-1/2 top-1/2 h-full ${hidden ? 'pointer-events-none' : ''}`}
                  >
                    <div className="relative h-full overflow-hidden rounded-[1.5rem] border border-white bg-ink shadow-[0_22px_40px_-24px_rgba(139,31,224,0.55)]">
                      {isCenter && playing ? (
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                          title={cleanTitle(video.title)}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="absolute inset-0 h-full w-full"
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            if (ignoreClick.current) {
                              ignoreClick.current = false;
                              return;
                            }
                            if (isCenter) setPlaying(true);
                            else select(videoIndex);
                          }}
                          className="absolute inset-0"
                          aria-label={isCenter ? `Play ${cleanTitle(video.title)}` : `Show ${cleanTitle(video.title)}`}
                        >
                          <Image
                            src={video.thumbnail}
                            alt=""
                            fill
                            unoptimized
                            priority={isCenter}
                            sizes="248px"
                            className="object-cover"
                          />
                          <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/10" />
                          {isCenter ? (
                            <>
                              <span className="absolute left-1/2 top-[42%] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-[0_10px_30px_rgba(10,10,10,0.25)]">
                                <span className="ml-0.5 block h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-ink" />
                              </span>
                              <span className="absolute inset-x-0 bottom-0 px-3 pb-3 text-left">
                                <span className="line-clamp-2 font-display text-sm font-semibold leading-snug text-white sm:text-base">
                                  {cleanTitle(video.title)}
                                </span>
                              </span>
                            </>
                          ) : null}
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mx-auto mt-3 flex max-w-xl items-center justify-between gap-4">
              <p className="text-sm text-ink/55">{formatDate(active.published)}</p>
              <a
                href={channelUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-14px_rgba(10,10,10,0.8)] transition hover:-translate-y-0.5"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#FF0033]" aria-hidden="true">
                  <span className="ml-0.5 block h-0 w-0 border-y-[4px] border-l-[7px] border-y-transparent border-l-white" />
                </span>
                YouTube
              </a>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
