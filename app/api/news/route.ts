import { NextResponse } from 'next/server';

const STRAPI_URL =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  'https://majestic-serenity-7a76c06678.strapiapp.com';

const STRAPI_TOKEN =
  process.env.STRAPI_TOKEN || process.env.NEXT_PUBLIC_STRAPI_TOKEN || '';

// Strapi V5 retorna dados diretamente, sem wrapper attributes
interface StrapiNews {
  id: string | number;
  documentId?: string;
  title: string;
  slug: string;
  description: string | null;
  publishedAt: string;
  cover?: {
    id?: number;
    url?: string;
    alternativeText?: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
  category?: {
    id?: number;
    documentId?: string;
    name: string;
    slug: string;
  };
  author?: {
    id?: number;
    name?: string;
  };
}

interface NewsItem {
  id: string | number;
  documentId?: string;
  title: string;
  slug: string;
  description: string | null;
  image: {
    url: string;
    alternativeText?: string;
  } | null;
  date: string;
  category?: {
    name: string;
    slug: string;
  };
  author?: {
    name: string;
  };
}

export async function GET() {
  try {
    const url = `${STRAPI_URL}/api/articles?populate=cover&populate=category&sort=publishedAt:desc`;
    console.log('🔄 Proxy API: Buscando notícias do Strapi...');
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
        { error: text || res.statusText, news: [] },
        { status: res.status },
      );
    }

    const json = await res.json();
    console.log(
      '✅ Resposta do Strapi recebida:',
      json.data?.length || 0,
      'notícias',
    );

    // Mapear dados do Strapi V5 para o formato esperado
    const news: NewsItem[] = (json?.data || []).map((n: StrapiNews) => {
      return {
        id: n.id,
        documentId: n.documentId,
        title: n.title,
        slug: n.slug,
        description: n.description,
        image: n.cover?.url
          ? {
              url: n.cover.url,
              alternativeText: n.cover.alternativeText || n.title,
            }
          : null,
        date: n.publishedAt,
        // Strapi V5 retorna category diretamente
        category: n.category
          ? {
              name: n.category.name,
              slug: n.category.slug,
            }
          : undefined,
        author: n.author?.name
          ? {
              name: n.author.name,
            }
          : undefined,
      };
    });

    console.log('✅ Notícias mapeadas:', news.length);

    // Filtrar notícias sem slug válido
    const validNews = news.filter((item) => item.slug && item.slug !== 'null');
    if (validNews.length !== news.length) {
      console.log(
        `⚠️  Filtradas ${news.length - validNews.length} notícias sem slug válido`,
      );
    }

    return NextResponse.json({ news: validNews, success: true });
  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error('Unknown error');
    console.error('❌ Erro no proxy:', error);
    return NextResponse.json(
      { error: error.message || 'Proxy error', news: [] },
      { status: 500 },
    );
  }
}
