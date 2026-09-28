export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const first = forwarded?.split(',')[0]?.trim();
  const raw = first || request.headers.get('x-real-ip') || 'unknown';
  return raw.replace(/[^a-zA-Z0-9:.]/g, '').slice(0, 64) || 'unknown';
}

export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function getWebhookUrl(): string | null {
  const value = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return null;
    return url.toString();
  } catch {
    return null;
  }
}
