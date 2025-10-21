import { NextResponse } from 'next/server';

const STRAPI_URL =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  'https://majestic-serenity-7a76c06678.strapiapp.com';

const STRAPI_TOKEN =
  process.env.STRAPI_TOKEN || process.env.NEXT_PUBLIC_STRAPI_TOKEN || '';

interface StrapiDirector {
  id: string | number;
  documentId?: string;
  attributes: {
    Name: string;
    Role: string;
    Description: string;
    Biography: string;
    Link: string;
    Avatar?: {
      data?: {
        attributes?: {
          url: string;
          alternativeText: string;
        };
      };
      url?: string;
      alternativeText?: string;
    };
  };
}

interface Director {
  id: string | number;
  documentId?: string;
  Name: string;
  Role: string;
  Description: string;
  Biography: string;
  Link: string;
  Avatar: {
    url: string;
    alternativeText: string;
  };
}

export async function GET() {
  try {
    console.log('🔄 Proxy API: Buscando diretores do Strapi...');
    console.log('📍 URL:', `${STRAPI_URL}/api/directors?populate=*`);

    const res = await fetch(
      `${STRAPI_URL}/api/directors?populate=*&sort=createdAt:asc`,
      {
        headers: STRAPI_TOKEN
          ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
          : {},
        cache: 'no-store',
        next: { revalidate: 0 },
      },
    );

    if (!res.ok) {
      const text = await res.text();
      console.error('❌ Erro ao buscar do Strapi:', res.status, text);
      return NextResponse.json(
        { error: text || res.statusText, directors: [] },
        { status: res.status },
      );
    }

    const json = await res.json();
    console.log(
      '✅ Resposta do Strapi recebida:',
      json.data?.length || 0,
      'diretores',
    );

    // Mapear dados do Strapi para o formato esperado
    const directors: Director[] = (json?.data || []).map(
      (d: StrapiDirector) => {
        const attrs = d.attributes || d;
        return {
          id: d.id,
          documentId: d.documentId,
          Name: attrs.Name,
          Role: attrs.Role,
          Description: attrs.Description,
          Biography: attrs.Biography,
          Link: attrs.Link,
          Avatar: {
            url: attrs.Avatar?.data?.attributes?.url || attrs.Avatar?.url || '',
            alternativeText:
              attrs.Avatar?.data?.attributes?.alternativeText ||
              attrs.Avatar?.alternativeText ||
              '',
          },
        };
      },
    );

    console.log('✅ Diretores mapeados:', directors.length);
    return NextResponse.json({ directors, success: true });
  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error('Unknown error');
    console.error('❌ Erro no proxy:', error);
    return NextResponse.json(
      { error: error.message || 'Proxy error', directors: [] },
      { status: 500 },
    );
  }
}
