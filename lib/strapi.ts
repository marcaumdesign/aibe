const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  process.env.STRAPI_URL ||
  'https://majestic-serenity-7a76c06678.strapiapp.com';
const STRAPI_TOKEN =
  process.env.NEXT_PUBLIC_STRAPI_TOKEN || process.env.STRAPI_TOKEN || '';

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

export interface Director {
  id: number;
  documentId: string;
  Name: string;
  Role: string;
  Description?: string;
  Biography?: string;
  Link?: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Avatar?: StrapiImage;
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

export async function fetchDirectors(): Promise<Director[]> {
  try {
    // Primeiro tenta com autenticação
    let res = await fetch(
      `${STRAPI_URL}/api/directors?populate=*&sort=createdAt:asc`,
      {
        headers: STRAPI_TOKEN
          ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
          : undefined,
        next: { revalidate: 60 },
      },
    );

    // Se der 401, tenta sem autenticação (permissões públicas)
    if (res.status === 401) {
      console.warn(
        '⚠️ Erro 401 com token. Tentando sem autenticação (permissões públicas)...',
      );
      res = await fetch(
        `${STRAPI_URL}/api/directors?populate=*&sort=createdAt:asc`,
        {
          next: { revalidate: 60 },
        },
      );
    }

    if (!res.ok) {
      console.error(
        `❌ Erro ao buscar diretores: ${res.status} ${res.statusText}`,
      );
      console.error(`📍 URL: ${STRAPI_URL}/api/directors`);
      console.error(
        `🔑 Token configurado: ${STRAPI_TOKEN ? 'Sim (primeiros 10 chars: ' + STRAPI_TOKEN.substring(0, 10) + '...)' : 'Não'}`,
      );

      // Se 404, o content-type não existe ou está com nome errado
      if (res.status === 404) {
        console.error(
          '❌ Erro 404: O content-type "directors" não existe no Strapi.',
        );
        console.error(
          '💡 Verifique se o nome está correto no painel do Strapi (singular/plural).',
        );
      }

      // Se ainda 401, é problema de permissões
      if (res.status === 401) {
        console.error('❌ Erro 401: Problema de autenticação/permissões.');
        console.error('💡 Soluções:');
        console.error(
          '   1. Verifique se o token está correto (Settings > API Tokens)',
        );
        console.error(
          '   2. Verifique as permissões do token (deve ter acesso ao Directors)',
        );
        console.error(
          '   3. OU configure permissões públicas em Settings > Users & Permissions > Public > Directors > find',
        );
      }

      return [];
    }

    const json = (await res.json()) as StrapiListResponse<Director>;
    console.log(
      `✅ Diretores carregados com sucesso: ${json.data.length} encontrados`,
    );
    return json.data;
  } catch (error) {
    console.error('❌ Erro ao buscar diretores:', error);
    return [];
  }
}

export async function fetchDirectorById(id: number): Promise<Director | null> {
  try {
    // Primeiro tenta com autenticação
    let res = await fetch(`${STRAPI_URL}/api/directors/${id}?populate=*`, {
      headers: STRAPI_TOKEN
        ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
        : undefined,
      next: { revalidate: 60 },
    });

    // Se der 401, tenta sem autenticação (permissões públicas)
    if (res.status === 401) {
      console.warn(
        '⚠️ Erro 401 com token. Tentando sem autenticação (permissões públicas)...',
      );
      res = await fetch(`${STRAPI_URL}/api/directors/${id}?populate=*`, {
        next: { revalidate: 60 },
      });
    }

    if (!res.ok) {
      console.error(
        `❌ Erro ao buscar diretor ${id}: ${res.status} ${res.statusText}`,
      );
      return null;
    }

    const json = (await res.json()) as { data: Director };
    console.log(`✅ Diretor ${id} carregado com sucesso`);
    return json.data;
  } catch (error) {
    console.error(`❌ Erro ao buscar diretor ${id}:`, error);
    return null;
  }
}
