'use client';

import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { services } from '@/lib/content';

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 88%', 'end 18%'],
  });

  return (
    <section id="services" ref={sectionRef} className="relative overflow-hidden py-12 sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 h-72 w-[70%] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl"
      />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Our Services"
            title="Three ways we put your name to work."
            highlight="your name"
            description="Start with a direction session, stay with an organic cadence, or take the full Pexbit 1.0 system."
          />
        </Reveal>
        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="service-line pointer-events-none absolute left-[8%] right-[8%] top-[46%] hidden opacity-80 lg:block"
          />
        <ul
          className="relative z-10 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3"
          style={{ perspective: '1400px' }}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              progress={scrollYProgress}
            />
          ))}
        </ul>
        </div>
      </Container>
    </section>
  );
}
