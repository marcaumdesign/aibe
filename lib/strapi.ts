const STRAPI_URL =
  process.env.STRAPI_URL ||
  'https://majestic-serenity-7a76c06678.strapiapp.com';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || '';

export interface StrapiImageFormat {
  url: string;
  width?: number;
  height?: number;
}

export interface StrapiImage {
  url: string;
  alternativeText?: string;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string | null;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover?: StrapiImage;
  author?: {
    id: number;
    name: string;
    email?: string;
  };
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  blocks?: Array<
    | { __component: 'shared.rich-text'; id: number; body: string }
    | { __component: 'shared.quote'; id: number; title?: string; body?: string }
    | { __component: 'shared.media'; id: number }
    | { __component: 'shared.slider'; id: number }
  >;
}

interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function fetchArticles(): Promise<Article[]> {
  const res = await fetch(
    `${STRAPI_URL}/api/articles?populate=*&sort=publishedAt:desc`,
    {
      headers: STRAPI_TOKEN
        ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
        : undefined,
      next: { revalidate: 60 },
    },
  );
  if (!res.ok) throw new Error(`Erro ao buscar artigos: ${res.status}`);
  const json = (await res.json()) as StrapiListResponse<Article>;
  return json.data;
}

export async function fetchArticleBySlug(
  slug: string,
): Promise<Article | null> {
  const url = `${STRAPI_URL}/api/articles?filters[slug][$eq]=${encodeURIComponent(
    slug,
  )}&populate=*`;
  const res = await fetch(url, {
    headers: STRAPI_TOKEN
      ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
      : undefined,
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Erro ao buscar artigo: ${res.status}`);
  const json = (await res.json()) as StrapiListResponse<Article>;
  return json.data[0] || null;
}

export async function fetchArticleSlugs(): Promise<string[]> {
  const res = await fetch(
    `${STRAPI_URL}/api/articles?fields=slug&pagination[limit]=100`,
    {
      headers: STRAPI_TOKEN
        ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
        : undefined,
      next: { revalidate: 60 },
    },
  );
  if (!res.ok) throw new Error(`Erro ao buscar slugs: ${res.status}`);
  const json = (await res.json()) as StrapiListResponse<
    { slug: string } & { id: number; documentId: string }
  >;
  return json.data.map((a) => a.slug);
}
