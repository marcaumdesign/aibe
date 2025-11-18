import { NextResponse } from 'next/server';
import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { getMediaUrl } from '@/utilities/getMediaUrl';

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

// Interface para o Staff do Payload
// interface PayloadStaff {
//   id: number;
//   name: string;
//   type: 'director' | 'speaker';
//   role?: string | null;
//   description?: string | null;
//   biography?: string | null;
//   link?: string | null;
//   avatar?: {
//     id: number;
//     url?: string | null;
//     alt?: string | null;
//     sizes?: {
//       thumbnail?: { url?: string | null };
//       small?: { url?: string | null };
//       medium?: { url?: string | null };
//       large?: { url?: string | null };
//     };
//     updatedAt?: string | null;
//   } | null;
//   createdAt: string;
//   updatedAt: string;
// }

export async function GET() {
  try {
    console.log('🔄 API: Buscando diretores do Payload...');

    const payload = await getPayload({ config: configPromise });

    const result = await payload.find({
      collection: 'staff',
      depth: 2,
      limit: 100,
      overrideAccess: false,
      sort: 'createdAt',
      where: {
        type: {
          equals: 'director',
        },
      },
    });

    console.log(
      '✅ Resposta do Payload recebida:',
      result.docs?.length || 0,
      'diretores',
    );

    // Mapear dados do Payload para o formato esperado
    const directors: Director[] = (result.docs || []).map((staff) => {
      // Resolver URL do avatar
      let avatarUrl = '';
      let avatarAlt = '';

      if (staff.avatar && typeof staff.avatar === 'object') {
        const url =
          staff.avatar.sizes?.medium?.url ||
          staff.avatar.sizes?.small?.url ||
          staff.avatar.url ||
          '';
        avatarUrl = getMediaUrl(url, staff.avatar.updatedAt);
        avatarAlt = staff.avatar.alt || staff.name || '';
      }

      return {
        id: staff.id,
        Name: staff.name || '',
        Role: staff.role || '',
        Description: staff.description || '',
        Biography: staff.biography || '',
        Link: staff.link || '',
        Avatar: {
          url: avatarUrl,
          alternativeText: avatarAlt,
        },
      };
    });

    console.log('✅ Diretores mapeados:', directors.length);
    return NextResponse.json(
      { directors, success: true },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      },
    );
  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error('Unknown error');
    console.error('❌ Erro ao buscar diretores do Payload:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao buscar diretores', directors: [] },
      { status: 500 },
    );
  }
}
