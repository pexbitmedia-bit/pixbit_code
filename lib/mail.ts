import { siteEmail, siteName, siteUrl } from '@/lib/site';

export type ContactMailInput = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function notifyHtml(input: ContactMailInput): string {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0a0a0a">
      <h2 style="margin:0 0 12px">New strategy call request</h2>
      <p style="margin:0 0 16px">A visitor submitted the contact form on ${escapeHtml(siteName)}.</p>
      <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(input.phone || 'Not provided')}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap;background:#f6f0fa;padding:12px;border-radius:8px">${escapeHtml(input.message)}</p>
    </div>
  `;
}

function thankYouHtml(input: ContactMailInput): string {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.7;color:#0a0a0a;max-width:560px">
      <p style="margin:0 0 16px">Hi ${escapeHtml(input.name)},</p>
      <p style="margin:0 0 16px">
        Thank you for reaching out to <strong>${escapeHtml(siteName)}</strong> and for your interest in joining us
        for a strategy conversation. We have received your request and our team will review it shortly.
      </p>
      <p style="margin:0 0 16px">
        A personal brand works best when the next step is clear. We will reply by email with timing options
        and any questions that help us prepare for your call.
      </p>
      <p style="margin:0 0 16px">
        If you need to add details in the meantime, simply reply to this email. We are glad you took this step
        and look forward to speaking with you.
      </p>
      <p style="margin:0 0 4px">Warm regards,</p>
      <p style="margin:0"><strong>${escapeHtml(siteName)}</strong></p>
      <p style="margin:8px 0 0"><a href="${escapeHtml(siteUrl)}" style="color:#8b1fe0">${escapeHtml(siteUrl)}</a></p>
      <p style="margin:4px 0 0"><a href="mailto:${escapeHtml(siteEmail)}" style="color:#8b1fe0">${escapeHtml(siteEmail)}</a></p>
    </div>
  `;
}

export async function sendContactEmails(input: ContactMailInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return false;

  const from =
    process.env.RESEND_FROM?.trim() || `${siteName} <onboarding@resend.dev>`;
  const notifyTo = process.env.CONTACT_NOTIFY_EMAIL?.trim() || siteEmail;

  const notify = fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [notifyTo],
      reply_to: input.email,
      subject: `New strategy call request from ${input.name}`,
      html: notifyHtml(input),
    }),
    signal: AbortSignal.timeout(10000),
  });

  const thankYou = fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [input.email],
      reply_to: notifyTo,
      subject: `Thank you for contacting ${siteName}`,
      html: thankYouHtml(input),
    }),
    signal: AbortSignal.timeout(10000),
  });

  // Notify is required. Thank-you is best-effort until a custom domain is verified
  // (Resend's onboarding@resend.dev can only deliver to the account email).
  const [notifyResult] = await Promise.allSettled([notify, thankYou]);
  if (notifyResult.status !== 'fulfilled' || !notifyResult.value.ok) return false;
  return true;
}
