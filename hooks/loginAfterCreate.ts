import { User } from '@/payload-types';
import type { CollectionAfterChangeHook } from 'payload';

type TCreateUser = { email: string; password: string };

export const loginAfterCreate: CollectionAfterChangeHook<User> = async ({
  doc,
  operation,
  req,
}) => {
  if (operation === 'create') {
    const { email, password } = req.body as unknown as TCreateUser;

    if (email && password) {
      const { token, user } = await req.payload.login({
        collection: 'users',
        data: { email, password },
        req,
        // res,
      });

      return {
        ...doc,
        token,
        user,
      };
    }
  }

  return doc;
};
