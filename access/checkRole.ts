import type { User } from '@/payload-types';

export const checkRole = (
  allRoles: User['roles'] = [],
  user: User | null = null,
): boolean => {
  // console.log('[DEBUG] checkRole: ', allRoles, user);
  if (user) {
    if (
      allRoles?.some((role) => {
        return user?.roles?.some((individualRole) => {
          return individualRole === role;
        });
      })
    ) {
      return true;
    }
  }

  return false;
};
