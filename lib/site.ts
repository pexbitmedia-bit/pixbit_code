function resolveSiteUrl(): string {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!value) return 'https://pexbitmedia.com';
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return 'https://pexbitmedia.com';
    return url.origin;
  } catch {
    return 'https://pexbitmedia.com';
  }
}

export const siteUrl = resolveSiteUrl();
export const siteName = 'Pexbit Media';
export const siteDescription =
  'Pexbit Media is a personal branding agency for entrepreneurs, coaches, consultants, creators, and executives. We combine content creation, social media marketing, video editing, and Meta ads to turn you into the authority people ask for by name.';
export const siteEmail = 'hello@pexbitmedia.com';

export const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@ParasSharmai' },
  { label: 'X', href: 'https://x.com/' },
] as const;

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    email: siteEmail,
    areaServed: 'Worldwide',
    serviceType: [
      'Personal Branding',
      'LinkedIn Personal Branding',
      'Thought Leadership',
      'Personal Brand Identity',
    ],
  };
}
