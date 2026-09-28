import type { MetadataRoute } from 'next';
import { offeringSlugs } from '@/lib/offerings';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date();
  return [
    {
      url: siteUrl,
      lastModified: updated,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...offeringSlugs().map((slug) => ({
      url: `${siteUrl}/services/${slug}`,
      lastModified: updated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
