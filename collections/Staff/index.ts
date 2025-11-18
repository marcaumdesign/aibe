import type { CollectionConfig } from 'payload';

import { anyone } from '../../access/anyone';
import { authenticated } from '../../access/authenticated';

export const Staff: CollectionConfig = {
  slug: 'staff',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'updatedAt'],
  },
  fields: [
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Director',
          value: 'director',
        },
        {
          label: 'Speaker',
          value: 'speaker',
        },
      ],
    },
    {
      name: 'role',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'biography',
      type: 'textarea',
    },
    {
      name: 'link',
      type: 'text',
    },
  ],
  timestamps: true,
};
