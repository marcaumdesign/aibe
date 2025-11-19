import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload';

import { revalidatePath, revalidateTag } from 'next/cache';

import type { Staff } from '../../../payload-types';

export const revalidateStaff: CollectionAfterChangeHook<Staff> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating staff: ${doc.name}`);

    // Revalidate people page (directors listing)
    revalidatePath('/people');
    revalidatePath('/');
    revalidateTag('staff-api');
    revalidateTag('directors-api');

    // If it's a speaker, also revalidate workshops that might reference this staff
    if (doc.type === 'speaker') {
      revalidatePath('/workshops');
      revalidateTag('workshops-sitemap');
    }
  }
  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Staff> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    // Revalidate people page (directors listing)
    revalidatePath('/people');
    revalidatePath('/');
    revalidateTag('staff-api');
    revalidateTag('directors-api');

    // If it's a speaker, also revalidate workshops
    if (doc.type === 'speaker') {
      revalidatePath('/workshops');
      revalidateTag('workshops-sitemap');
    }
  }

  return doc;
};
