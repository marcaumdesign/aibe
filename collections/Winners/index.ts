import type { CollectionConfig } from 'payload';

import { authenticated } from '../../access/authenticated';
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished';

export const Winners: CollectionConfig = {
  slug: 'winners',
  labels: {
    singular: 'Winner',
    plural: 'Winners',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['year', 'title', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'year',
      type: 'number',
      required: true,
      label: 'Year',
      admin: {
        description: 'Year the prize was awarded (e.g., 2024)',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Paper Title',
      admin: {
        description: 'Title of the winning paper',
      },
    },
    {
      name: 'authors',
      type: 'array',
      required: true,
      label: 'Authors',
      minRows: 1,
      admin: {
        description: 'List of authors of the winning paper',
      },
      fields: [
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
          required: true,
          label: 'Author',
          admin: {
            description: 'Select an author from the users list',
          },
        },
      ],
    },
    {
      name: 'link',
      type: 'text',
      required: true,
      label: 'Paper Link',
      admin: {
        description: 'URL to access the winning paper',
      },
    },
  ],
  timestamps: true,
};

