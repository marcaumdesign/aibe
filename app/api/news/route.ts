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

    // Mapear dados do Strapi para o formato esperado
    const news: NewsItem[] = (json?.data || []).map((n: StrapiNews) => {
      const attrs = n.attributes || n;
      return {
        id: n.id,
        documentId: n.documentId,
        title: attrs.title,
        slug: attrs.slug,
        description: attrs.description,
        image:
          attrs.cover?.data?.attributes?.url || attrs.cover?.url
            ? {
                url:
                  attrs.cover?.data?.attributes?.url || attrs.cover?.url || '',
                alternativeText:
                  attrs.cover?.data?.attributes?.alternativeText ||
                  attrs.cover?.alternativeText ||
                  attrs.title,
              }
            : null,
        date: attrs.publishedAt,
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
      };
    });

    console.log('✅ Notícias mapeadas:', news.length);

    // DEBUG: Ver categorias
    news.forEach((item) => {
      console.log(
        `  📰 "${item.title}" - Categoria:`,
        item.category?.name || '❌ SEM CATEGORIA',
      );
    });

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
