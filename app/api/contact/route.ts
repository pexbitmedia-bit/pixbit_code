import { NextResponse } from 'next/server';
import { allowRequest } from '@/lib/rate-limit';
import { getClientIp, getWebhookUrl, isSameOrigin } from '@/lib/request';
import { contactSchema, fieldErrors } from '@/lib/validations/contact';
import type { ContactResponse } from '@/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY = 20_000;

function json(body: ContactResponse, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { 'cache-control': 'no-store' },
  });
}

function wantsJson(request: Request, contentType: string): boolean {
  const accept = request.headers.get('accept') ?? '';
  return contentType.includes('application/json') || accept.includes('application/json');
}

function respond(request: Request, contentType: string, body: ContactResponse, status: number) {
  if (wantsJson(request, contentType)) return json(body, status);
  const flag = body.ok ? '1' : '0';
  const url = new URL(`/?sent=${flag}#contact`, request.url);
  return NextResponse.redirect(url, 303);
}

function honeypotTripped(body: unknown): boolean {
  if (!body || typeof body !== 'object' || !('hp_field' in body)) return false;
  const value = (body as { hp_field?: unknown }).hp_field;
  if (typeof value === 'string') return value.trim().length > 0;
  return value !== undefined && value !== null && value !== '';
}

async function readBody(request: Request, contentType: string): Promise<unknown | Response> {
  if (contentType.includes('application/json')) {
    const raw = await request.text();
    if (raw.length > MAX_BODY) {
      return json({ ok: false, message: 'That message is too large.' }, 413);
    }
    try {
      return JSON.parse(raw) as unknown;
    } catch {
      return json({ ok: false, message: 'Invalid request.' }, 400);
    }
  }

  if (
    contentType.includes('application/x-www-form-urlencoded') ||
    contentType.includes('multipart/form-data')
  ) {
    const form = await request.formData();
    const read = (key: string) => {
      const value = form.get(key);
      return typeof value === 'string' ? value : '';
    };
    const fields = ['name', 'email', 'phone', 'message', 'hp_field'] as const;
    for (const key of fields) {
      if (read(key).length > 4000) {
        return json({ ok: false, message: 'That message is too large.' }, 413);
      }
    }
    return {
      name: read('name'),
      email: read('email'),
      phone: read('phone'),
      message: read('message'),
      hp_field: read('hp_field'),
    };
  }

  return json({ ok: false, message: 'Invalid request.' }, 415);
}

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';
  const lengthHeader = request.headers.get('content-length');
  const length = lengthHeader ? Number(lengthHeader) : 0;
  if (Number.isFinite(length) && length > MAX_BODY) {
    return respond(request, contentType, { ok: false, message: 'That message is too large.' }, 413);
  }

  if (!isSameOrigin(request)) {
    return respond(request, contentType, { ok: false, message: 'Invalid request.' }, 403);
  }

  if (!allowRequest(getClientIp(request))) {
    return respond(
      request,
      contentType,
      { ok: false, message: 'Please wait a moment and try again.' },
      429,
    );
  }

  const body = await readBody(request, contentType);
  if (body instanceof Response) return body;

  if (honeypotTripped(body)) {
    return respond(request, contentType, { ok: true }, 200);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return respond(
      request,
      contentType,
      {
        ok: false,
        message: 'Please check the form and try again.',
        fieldErrors: fieldErrors(parsed.error),
      },
      422,
    );
  }

  const configured = process.env.CONTACT_WEBHOOK_URL?.trim();
  const webhook = getWebhookUrl();
  if (configured && !webhook) {
    return respond(
      request,
      contentType,
      { ok: false, message: 'We could not send your request right now.' },
      500,
    );
  }

  if (webhook) {
    try {
      const forwarded = await fetch(webhook, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone,
          message: parsed.data.message,
          source: 'pexbit-media-website',
        }),
        redirect: 'error',
        signal: AbortSignal.timeout(8000),
      });
      if (!forwarded.ok) {
        return respond(
          request,
          contentType,
          { ok: false, message: 'We could not send your request right now.' },
          502,
        );
      }
    } catch {
      return respond(
        request,
        contentType,
        { ok: false, message: 'We could not send your request right now.' },
        502,
      );
    }
  }

  return respond(request, contentType, { ok: true, message: 'Request received.' }, 200);
}
