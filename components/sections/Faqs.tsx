'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useRef, useState, type KeyboardEvent } from 'react';
import { Container } from '@/components/ui/Container';
import { PlusIcon } from '@/components/ui/icons';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { faqs } from '@/lib/content';
import { cn } from '@/lib/cn';
import { EASE } from '@/lib/motion';

export function Faqs() {
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  function focusAt(index: number) {
    buttons.current[index]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = faqs.length - 1;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusAt(index === last ? 0 : index + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusAt(index === 0 ? last : index - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusAt(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusAt(last);
    }
  }

  return (
    <section id="faqs" className="bg-[#faf7fc] pt-8 pb-12 sm:pt-10 sm:pb-16">
      <Container>
        <SectionHeading
          eyebrow="FAQs"
          title="Questions, answered plainly."
          highlight="plainly"
          description="A direct look at how a personal-brand engagement actually works."
        />
        <div className="mx-auto mt-8 max-w-3xl space-y-3">
          {faqs.map((item, index) => {
            const open = openIndex === index;
            const buttonId = `faq-button-${index}`;
            const panelId = `faq-panel-${index}`;
            return (
              <div key={item.question} className="rounded-[1.4rem] border border-[#eadcf8] bg-white">
                <h3>
                  <button
                    ref={(node) => {
                      buttons.current[index] = node;
                    }}
                    id={buttonId}
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : index)}
                    onKeyDown={(event) => onKeyDown(event, index)}
                  >
                    <span className="font-display text-lg font-semibold text-ink">
                      {item.question}
                    </span>
                    <motion.span
                      aria-hidden="true"
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: reduce ? 0 : 0.25 }}
                      className="shrink-0 text-brand"
                    >
                      <PlusIcon className="h-5 w-5" />
                    </motion.span>
                  </button>
                </h3>
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!open}
                  initial={false}
                  animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                  className={cn('overflow-hidden', !open && 'pointer-events-none')}
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-ink/75 sm:text-base">
                    {item.answer}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
