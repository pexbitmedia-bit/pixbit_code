import { WhyMarkCanvas } from '@/components/3d/WhyMarkCanvas';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { principles } from '@/lib/content';

export function About() {
  return (
    <section id="about" className="bg-white py-12 sm:py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="About"
                title="A studio built only for personal brands."
                highlight="personal brands"
                description="The work is the person: the narrative, the proof, and the presence that make a name travel."
              />
            </Reveal>
            <div className="mt-4 lg:mt-6">
              <WhyMarkCanvas />
            </div>
          </div>
          <div>
            <Reveal delay={0.05}>
              <p className="text-base leading-relaxed text-ink/75 sm:text-lg">
                Pexbit Media partners with founders, coaches, consultants, creators, and executives
                who are done being the best-kept secret in their field. We shape how you are
                introduced, what you publish, and where that work shows up — so the right people
                already know your name.
              </p>
            </Reveal>
            <ol className="mt-8 grid list-none gap-4">
              {principles.map((principle, index) => (
                <Reveal key={principle.title} as="li" delay={0.05 * index}>
                  <PrincipleCard
                    index={index}
                    title={principle.title}
                    description={principle.description}
                  />
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}

function PrincipleCard({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  return (
    <article className="grid grid-cols-[auto_1fr] gap-4 rounded-3xl border border-ink/5 bg-paper p-6">
      <span className="font-display text-sm font-bold text-brand">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div>
        <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">{description}</p>
      </div>
    </article>
  );
}
