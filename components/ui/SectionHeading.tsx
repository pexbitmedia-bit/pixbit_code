import type { ReactNode } from 'react';
import { Highlight } from '@/components/ui/Highlight';
import { cn } from '@/lib/cn';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
};

function renderTitle(title: string, highlight?: string): ReactNode {
  if (!highlight) return title;
  const index = title.indexOf(highlight);
  if (index < 0) return title;
  return (
    <>
      {title.slice(0, index)}
      <Highlight>{highlight}</Highlight>
      {title.slice(index + highlight.length)}
    </>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = 'left',
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      <p
        className={cn(
          'mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand',
          align === 'center' && 'justify-center',
        )}
      >
        <span className="h-px w-8 bg-brand" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        className={cn(
          'font-display text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl',
          light ? 'text-white' : 'text-ink',
        )}
      >
        {renderTitle(title, highlight)}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-5 text-base leading-relaxed sm:text-lg',
            light ? 'text-white/70' : 'text-ink/75',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
