import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { About } from '@/components/sections/About';
import { Showreel } from '@/components/sections/Showreel';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { WhyBranding } from '@/components/sections/WhyBranding';
import { HalfRound } from '@/components/ui/HalfRound';

const Services = dynamic(() =>
  import('@/components/sections/Services').then((mod) => mod.Services),
);
const Process = dynamic(() => import('@/components/sections/Process').then((mod) => mod.Process));
const Results = dynamic(() => import('@/components/sections/Results').then((mod) => mod.Results));
const Testimonials = dynamic(() =>
  import('@/components/sections/Testimonials').then((mod) => mod.Testimonials),
);
const Faqs = dynamic(() => import('@/components/sections/Faqs').then((mod) => mod.Faqs));
const Contact = dynamic(() => import('@/components/sections/Contact').then((mod) => mod.Contact));

type HomePageProps = {
  searchParams?: { sent?: string | string[] };
};

function sentStatus(value: string | string[] | undefined): 'success' | 'error' | null {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === '1') return 'success';
  if (raw === '0') return 'error';
  return null;
}

export default function HomePage({ searchParams }: HomePageProps) {
  return (
    <main id="content" tabIndex={-1}>
      <HalfRound>
        <Hero />
      </HalfRound>
      <HalfRound>
        <WhyBranding />
      </HalfRound>
      <HalfRound>
        <Services />
      </HalfRound>
      <HalfRound>
        <Process />
      </HalfRound>
      <HalfRound>
        <Results />
      </HalfRound>
      <HalfRound>
        <Suspense>
          <Showreel />
        </Suspense>
      </HalfRound>
      <HalfRound>
        <Testimonials />
      </HalfRound>
      <HalfRound>
        <About />
      </HalfRound>
      <HalfRound>
        <Faqs />
      </HalfRound>
      <HalfRound>
        <Contact initialStatus={sentStatus(searchParams?.sent)} />
      </HalfRound>
      <HalfRound>
        <Footer />
      </HalfRound>
    </main>
  );
}
