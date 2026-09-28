import { pressNames } from '@/lib/content';

export function Marquee() {
  const names = pressNames.join(', ');

  return (
    <div className="marquee relative overflow-hidden">
      <p className="sr-only">Illustrative press rooms: {names}.</p>
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex items-center">
            {pressNames.map((name) => (
              <li
                key={`${copy}-${name}`}
                className="px-6 font-display text-xl font-semibold tracking-tight text-ink/35 sm:px-8 sm:text-3xl"
              >
                {name}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
