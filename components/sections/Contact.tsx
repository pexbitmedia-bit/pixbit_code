'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Container } from '@/components/ui/Container';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteEmail } from '@/lib/site';
import { contactSchema, fieldErrors, isContactResponse } from '@/lib/validations/contact';
import type { ContactField, ContactResponse } from '@/types';
import { EASE } from '@/lib/motion';

type ContactProps = {
  initialStatus: 'success' | 'error' | null;
};

const fields: Array<{ id: ContactField; label: string; type: string; autoComplete: string }> = [
  { id: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
  { id: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { id: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
];

export function Contact({ initialStatus }: ContactProps) {
  const reduce = useReducedMotion();
  const successRef = useRef<HTMLHeadingElement>(null);
  const [values, setValues] = useState({ name: '', email: '', phone: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<NonNullable<ContactResponse['fieldErrors']>>({});
  const [formError, setFormError] = useState(
    initialStatus === 'error' ? 'Please check the form and try again.' : '',
  );
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    initialStatus === 'success' ? 'success' : 'idle',
  );

  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  function update(field: ContactField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError('');
    const parsed = contactSchema.safeParse({ ...values, hp_field: honeypot });
    if (!parsed.success) {
      const nextErrors = fieldErrors(parsed.error) ?? {};
      setErrors(nextErrors);
      const first =
        fields.find((field) => nextErrors[field.id])?.id ?? (nextErrors.message ? 'message' : null);
      if (first) document.getElementById(first)?.focus();
      return;
    }

    setErrors({});
    setStatus('submitting');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({ ...values, hp_field: honeypot }),
      });
      const payload: unknown = await response.json().catch(() => null);
      if (!isContactResponse(payload) || !payload.ok) {
        setStatus('error');
        setFormError(
          payload && isContactResponse(payload) && payload.message
            ? payload.message
            : 'We could not send that. Please try again.',
        );
        if (payload && isContactResponse(payload) && payload.fieldErrors) {
          setErrors(payload.fieldErrors);
        }
        return;
      }
      setValues({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        message: '',
      });
      setStatus('success');
    } catch {
      setStatus('error');
      setFormError('We could not send that. Check your connection and try again.');
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-white py-12 sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-brand/15 blur-3xl"
      />
      <Container className="relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionHeading
          eyebrow="Contact"
          title="Book a strategy call."
          highlight="strategy call"
          description="Tell us where your reputation stands and where you want your name to go. We reply by email."
        />
        <div className="rounded-[1.75rem] border border-ink/10 bg-paper p-6 shadow-card sm:p-8">
          {status === 'success' ? (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
              role="status"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white">
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M5 12.5l4.2 4.2L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3
                ref={successRef}
                tabIndex={-1}
                className="font-display text-3xl font-semibold text-ink outline-none"
              >
                Request received
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink/75">
                Thanks{values.name ? `, ${values.name}` : ''}. We will reply
                {values.email ? ` at ${values.email}` : ' by email'}.
              </p>
            </motion.div>
          ) : (
            <form
              method="post"
              action="/api/contact"
              onSubmit={onSubmit}
              noValidate
              className="relative"
            >
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="hp_field">Company website</label>
                <input
                  id="hp_field"
                  name="hp_field"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {fields.map((field) => (
                  <label
                    key={field.id}
                    className={field.id === 'phone' ? 'sm:col-span-2' : undefined}
                    htmlFor={field.id}
                  >
                    <span className="mb-2 block text-sm font-semibold text-ink">{field.label}</span>
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      required
                      aria-required="true"
                      aria-invalid={Boolean(errors[field.id])}
                      aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
                      value={values[field.id]}
                      onChange={(event) => update(field.id, event.target.value)}
                      className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-brand focus:shadow-[0_0_0_4px_rgba(139,31,224,0.15)]"
                    />
                    {errors[field.id] ? (
                      <span id={`${field.id}-error`} className="mt-2 block text-sm text-red-800">
                        {errors[field.id]}
                      </span>
                    ) : null}
                  </label>
                ))}
              </div>
              <label htmlFor="message" className="mt-4 block">
                <span className="mb-2 block text-sm font-semibold text-ink">
                  Tell us about your brand
                </span>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  aria-required="true"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  value={values.message}
                  onChange={(event) => update('message', event.target.value)}
                  className="w-full resize-y rounded-2xl border border-ink/10 bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-brand focus:shadow-[0_0_0_4px_rgba(139,31,224,0.15)]"
                />
                {errors.message ? (
                  <span id="message-error" className="mt-2 block text-sm text-red-800">
                    {errors.message}
                  </span>
                ) : null}
              </label>
              {formError ? (
                <p role="alert" className="mt-4 text-sm text-red-800">
                  {formError}
                </p>
              ) : null}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <MagneticButton
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto"
                >
                  {status === 'submitting' ? 'Sending…' : 'Request a strategy call'}
                </MagneticButton>
                <a href={`mailto:${siteEmail}`} className="text-sm font-semibold text-brand">
                  {siteEmail}
                </a>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-ink/50">
                We use these details only to respond to your strategy call request.
              </p>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
