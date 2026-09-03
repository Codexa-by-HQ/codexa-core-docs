import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = source.getPages('en').map((page) => ({
    url: `${siteUrl}${page.url}`,
    changeFrequency: 'weekly' as const,
    priority: page.url === '/docs' ? 1 : 0.7,
  }));

  return [
    {
      url: siteUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...docs,
  ];
}
