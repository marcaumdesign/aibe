import type { FieldHook } from 'payload';

import type { User } from '@/payload-types';

// ensure there is always a `user` role
// do not let non-admins change roles
export const protectRoles: FieldHook<{ id: string } & User> = async ({
  data,
  req,
}) => {
  const isAdmin =
    req.user?.roles?.includes('admin') || data?.email === 'demo@payloadcms.com'; // for the seed script

  // If there is no logged-in user (e.g. create-first-user) allow admin assignment
  // only when no admins exist yet.
  if (!req.user) {
    const { totalDocs: adminCount } = await req.payload.find({
      collection: 'users',
      depth: 0,
      limit: 0,
      where: {
        roles: {
          contains: 'admin',
        },
      },
    });

    if (adminCount === 0) {
      const requested = new Set(data?.roles || []);
      requested.add('user');
      return [...requested];
    }
  }

  if (!isAdmin) {
    return ['user'];
  }

  const userRoles = new Set(data?.roles || []);
  userRoles.add('user');
  return [...userRoles];
};
