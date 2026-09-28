'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function VideoShowcase() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start end', 'end start'],
  });
  const frameScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.9, 1, 0.96]);
  const frameRotate = useTransform(scrollYProgress, [0, 1], [3, -2]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setActive(true);
      },
      { rootMargin: '200px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !active) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    if (reduce !== true) {
      video.muted = true;
      void video.play().catch(() => setPlaying(false));
    }
    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, [active, reduce]);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  return (
    <section id="showreel" className="bg-white py-12 sm:py-16">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Showreel"
            title="See the standard we hold."
            highlight="standard"
            description="A short look at the pace, clarity, and presence we build into a personal brand."
          />
        </Reveal>
        <div ref={wrapRef} className="relative mx-auto mt-12 max-w-4xl">
          <div
            aria-hidden="true"
            className="absolute -inset-6 -z-10 rounded-[2rem] bg-brand/20 blur-3xl"
          />
          <motion.div
            style={reduce ? undefined : { scale: frameScale, rotate: frameRotate }}
            className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-ink shadow-glow"
          >
            <video
              ref={videoRef}
              className="aspect-video w-full bg-ink object-cover"
              poster="/images/video-poster.png"
              muted={muted}
              loop
              playsInline
              preload={active ? 'metadata' : 'none'}
              aria-label="Pexbit Media personal branding showreel"
            >
              {active ? <source src="/videos/brand-reel.mp4" type="video/mp4" /> : null}
            </video>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3 sm:px-5">
              <p className="text-xs text-white/60">
                Placeholder showreel — replace with the brand film.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-pressed={playing}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink"
                >
                  {playing ? 'Pause' : 'Play'}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-pressed={!muted}
                  className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white"
                >
                  {muted ? 'Sound off' : 'Sound on'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
