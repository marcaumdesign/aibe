import { NextResponse } from 'next/server';

const STRAPI_URL =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  'https://majestic-serenity-7a76c06678.strapiapp.com';

const STRAPI_TOKEN =
  process.env.STRAPI_TOKEN || process.env.NEXT_PUBLIC_STRAPI_TOKEN || '';

interface StrapiNews {
  id: string | number;
  documentId?: string;
  attributes: {
    title: string;
    slug: string;
    description: string | null;
    publishedAt: string;
    cover?: {
      data?: {
        attributes?: {
          url: string;
          alternativeText?: string;
          formats?: {
            thumbnail?: { url: string };
            small?: { url: string };
            medium?: { url: string };
            large?: { url: string };
          };
        };
      };
      url?: string;
      alternativeText?: string;
    };
    category?: {
      data?: {
        attributes?: {
          name: string;
          slug: string;
        };
      };
    };
    author?: {
      data?: {
        attributes?: {
          name: string;
        };
      };
    };
    blocks?: Array<
      | { __component: 'shared.rich-text'; id: number; body: string }
      | {
          __component: 'shared.quote';
          id: number;
          title?: string;
          body?: string;
        }
      | { __component: 'shared.media'; id: number }
      | { __component: 'shared.slider'; id: number }
    >;
  };
}

interface NewsPost {
  id: string | number;
  documentId?: string;
  title: string;
  slug: string;
  description: string | null;
  image: {
    url: string;
    alternativeText?: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  } | null;
  publishedAt: string;
  category?: {
    name: string;
    slug: string;
  };
  author?: {
    name: string;
  };
  content: Array<
    | { __component: 'shared.rich-text'; id: number; body: string }
    | { __component: 'shared.quote'; id: number; title?: string; body?: string }
    | { __component: 'shared.media'; id: number }
    | { __component: 'shared.slider'; id: number }
  >;
  tags?: string[];
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    console.log('🔄 Proxy API: Buscando artigo do Strapi com slug:', slug);

    const url = `${STRAPI_URL}/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`;
    console.log('📍 URL:', url);

    const res = await fetch(url, {
      headers: STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {},
      cache: 'no-store',
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('❌ Erro ao buscar do Strapi:', res.status, text);
      return NextResponse.json(
        { error: text || res.statusText, post: null },
        { status: res.status },
      );
    }

    const json = await res.json();
    const data: StrapiNews[] = json?.data || [];

    if (data.length === 0) {
      console.log('❌ Artigo não encontrado para slug:', slug);
      return NextResponse.json(
        { error: 'Artigo não encontrado', post: null },
        { status: 404 },
      );
    }

    // Mapear dados do Strapi para o formato esperado
    const n = data[0];
    const attrs = n.attributes || n;

    const post: NewsPost = {
      id: n.id,
      documentId: n.documentId,
      title: attrs.title,
      slug: attrs.slug,
      description: attrs.description,
      image:
        attrs.cover?.data?.attributes?.url || attrs.cover?.url
          ? {
              url: attrs.cover?.data?.attributes?.url || attrs.cover?.url || '',
              alternativeText:
                attrs.cover?.data?.attributes?.alternativeText ||
                attrs.cover?.alternativeText ||
                attrs.title,
              formats: attrs.cover?.data?.attributes?.formats || undefined,
            }
          : null,
      publishedAt: attrs.publishedAt,
      category: attrs.category?.data?.attributes
        ? {
            name: attrs.category.data.attributes.name,
            slug: attrs.category.data.attributes.slug,
          }
        : undefined,
      author: attrs.author?.data?.attributes
        ? {
            name: attrs.author.data.attributes.name,
          }
        : undefined,
      content: attrs.blocks || [],
      tags: [], // Pode ser expandido se houver tags no Strapi
    };

    console.log('✅ Artigo mapeado:', post.title);
    return NextResponse.json({ post, success: true });
  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error('Unknown error');
    console.error('❌ Erro no proxy:', error);
    return NextResponse.json(
      { error: error.message || 'Proxy error', post: null },
      { status: 500 },
    );
  }
}

