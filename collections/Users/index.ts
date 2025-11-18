import { authenticated } from '../../access/authenticated';

import type { CollectionConfig } from 'payload';

import { admins } from '@/access/admins';
import { adminsAndUser } from '@/access/adminsAndUser';
import { anyone } from '@/access/anyone';
import { checkRole } from '@/access/checkRole';
import { loginAfterCreate } from '@/hooks/loginAfterCreate';
import { protectRoles } from '@/hooks/protectRoles';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    verify: true,
    tokenExpiration: 28800, // 8 hours
    cookies: {
      sameSite: 'None',
      secure: true,
      domain: process.env.COOKIE_DOMAIN,
    },
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    unlock: admins,
    admin: ({ req: { user } }) => checkRole(['admin'], user),
  },
  hooks: {
    afterChange: [loginAfterCreate],
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      access: {
        read: ({ req: { user } }) => {
          if (user) {
            // if (checkRole(['admin'], user)) {
            return true;
            // }

            // return {
            // id: { equals: user.id },
            // };
          }

          return false;
        },
        update: ({ req: { user } }) => {
          if (user) {
            // if (checkRole(['admin'], user)) {
            return true;
            // }

            // return {
            // id: { equals: user.id },
            // };
          }

          return false;
        },
      },
    },
    {
      name: 'password',
      type: 'text',
      required: true,
      admin: {
        description: 'Leave blank to keep the current password.',
      },
    },
    {
      name: 'resetPasswordToken',
      type: 'text',
      hidden: true,
    },
    {
      name: 'resetPasswordExpiration',
      type: 'date',
      hidden: true,
    },
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      saveToJWT: true,
      access: {
        read: ({ req: { user } }) => checkRole(['admin'], user),
        update: ({ req: { user } }) => checkRole(['admin'], user),
        create: ({ req: { user } }) => checkRole(['admin'], user),
      },
      hooks: {
        beforeChange: [protectRoles],
      },
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
    },
  ],
  timestamps: true,
};
