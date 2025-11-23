import { getPayload } from 'payload';
import config from '@payload-config';
import type { Staff, Media } from '@/payload-types';
import type { Director } from '@/lib/strapi';
import { getMediaUrl } from './getMediaUrl';

/**
 * Fetches all directors from the Staff collection (Payload CMS)
 * and maps them to the Director interface (Strapi format) for compatibility
 */
export async function getDirectors(): Promise<Director[]> {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: 'staff',
      where: {
        type: {
          equals: 'director',
        },
      },
      limit: 100,
      sort: 'name',
      depth: 2,
    });

    // Map Payload Staff to Strapi Director format
    const directors: Director[] = result.docs.map((staff: Staff) => {
      const avatar = staff.avatar as Media | undefined;

      return {
        id: typeof staff.id === 'string' ? parseInt(staff.id) : staff.id,
        documentId: String(staff.id),
        Name: staff.name || '',
        Role: staff.role || '',
        Description: staff.description || undefined,
        Biography: staff.biography || undefined,
        Link: staff.link || null,
        createdAt: staff.createdAt || new Date().toISOString(),
        updatedAt: staff.updatedAt || new Date().toISOString(),
        publishedAt: staff.createdAt || new Date().toISOString(),
        Avatar: avatar
          ? {
              url: getMediaUrl(avatar.url || '', avatar.updatedAt),
              alternativeText: avatar.alt || undefined,
            }
          : undefined,
      };
    });

    return directors;
  } catch (error) {
    console.error('Error fetching directors:', error);
    return [];
  }
}
