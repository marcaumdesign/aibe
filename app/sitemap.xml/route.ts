import { NextResponse } from 'next/server';

import { getServerSideURL } from '@/utilities/getURL';

export function GET() {
  const base = getServerSideURL().replace(/\/$/, '');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${base}/static-sitemap.xml</loc>
    <lastmod>2026-04-16</lastmod>
  </sitemap>
  <sitemap>
    <loc>${base}/pages-sitemap.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${base}/posts-sitemap.xml</loc>
  </sitemap>
</sitemapindex>
`;

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
