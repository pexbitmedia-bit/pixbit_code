import { z } from 'zod';
import type { ContactResponse } from '@/types';

function stripDanger(value: string): string {
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
}

export function sanitizeText(value: string): string {
  return stripDanger(value).replace(/\s+/g, ' ').trim();
}

export function sanitizeMultiline(value: string): string {
  return stripDanger(value)
    .replace(/\r\n/g, '\n')
    .replace(/[^\S\n]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export const contactSchema = z.object({
  name: z
    .string({ required_error: 'Please enter your name.' })
    .trim()
    .min(2, 'Please enter your name.')
    .max(80, 'Name must be 80 characters or fewer.')
    .transform(sanitizeText)
    .refine((value) => value.length >= 2, 'Please enter your name.'),
  email: z
    .string({ required_error: 'Please enter a valid email.' })
    .trim()
    .max(120, 'Email must be 120 characters or fewer.')
    .transform((value) => sanitizeText(value).toLowerCase())
    .pipe(z.string().email('Please enter a valid email.')),
  phone: z
    .string({ required_error: 'Enter a valid phone number.' })
    .trim()
    .max(24, 'Enter a valid phone number.')
    .transform(sanitizeText)
    .refine((value) => /^[0-9+().\-\s]{7,24}$/.test(value), 'Enter a valid phone number.'),
  message: z
    .string({ required_error: 'Tell us a little about your brand.' })
    .trim()
    .min(10, 'Tell us a little about your brand.')
    .max(2000, 'Message must be 2000 characters or fewer.')
    .transform(sanitizeMultiline)
    .refine((value) => value.length >= 10, 'Tell us a little about your brand.'),
  hp_field: z.string().max(200).optional().default(''),
});

export type ContactPayload = z.output<typeof contactSchema>;

export function fieldErrors(error: z.ZodError): ContactResponse['fieldErrors'] {
  const errors: NonNullable<ContactResponse['fieldErrors']> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (key === 'name' || key === 'email' || key === 'phone' || key === 'message') {
      if (!errors[key]) errors[key] = issue.message;
    }
  }
  return errors;
}

export function isContactResponse(value: unknown): value is ContactResponse {
  if (!value || typeof value !== 'object') return false;
  return 'ok' in value && typeof value.ok === 'boolean';
}
