import { WhyCollage } from '@/components/sections/WhyCollage';
import { Container } from '@/components/ui/Container';
import { Counter } from '@/components/ui/Counter';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { proofNote, whyStats } from '@/lib/content';

export function WhyBranding() {
  return (
    <section id="why" className="why-stage relative overflow-x-clip py-12 sm:py-16">
      <div aria-hidden="true" className="why-grid pointer-events-none absolute inset-0" />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Why personal branding"
            title="Trust follows a person, not a logo."
            highlight="person"
            description="A company can look established and still be forgettable. A clear personal brand makes you recognizable, credible, and easy to refer — the person clients ask for by name."
          />
        </Reveal>
        <div className="mt-8 grid items-stretch gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-4">
          <Reveal delay={0.08} className="flex h-full items-end">
            <blockquote className="max-w-xl rounded-3xl border border-brand/15 bg-brand-soft/70 px-6 py-6 font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
              A company page can introduce the business. A personal brand is what makes someone
              choose you.
            </blockquote>
          </Reveal>
          <div className="min-w-0 self-stretch">
            <WhyCollage />
          </div>
        </div>
        <ul className="mt-8 grid gap-8 border-t border-ink/10 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {whyStats.map((stat, index) => (
            <Reveal key={stat.label} as="li" delay={0.06 * index}>
              <p className="font-display text-5xl font-extrabold tracking-tight text-brand">
                <Counter
                  value={stat.value}
                  decimals={stat.decimals}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/70">{stat.label}</p>
            </Reveal>
          ))}
        </ul>
        <p className="mt-8 text-xs text-ink/45">{proofNote}</p>
      </Container>
    </section>
  );
}
