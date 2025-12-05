import type { CollectionConfig } from 'payload';

import { authenticated } from '../../access/authenticated';
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished';

export const Workshops: CollectionConfig<'workshops'> = {
  slug: 'workshops',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'subject', 'type', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
      label: 'Subject',
    },
    {
      name: 'period',
      type: 'group',
      label: 'Period',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          required: true,
          label: 'Start Date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: 'endDate',
          type: 'date',
          required: true,
          label: 'End Date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
      ],
    },
    {
      name: 'place',
      type: 'text',
      required: true,
      label: 'Place',
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Cover Image',
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      label: 'Type',
      options: [
        {
          label: 'Current',
          value: 'current',
        },
        {
          label: 'Past',
          value: 'past',
        },
      ],
    },
    {
      name: 'speaker',
      type: 'relationship',
      relationTo: 'staff',
      required: false,
      label: 'Speaker',
      filterOptions: () => {
        return {
          type: {
            equals: 'speaker',
          },
        };
      },
      admin: {
        description: 'Select a speaker from Staff collection (only shows items with type "Speaker")',
      },
    },
    {
      name: 'firstButtonText',
      type: 'text',
      label: '1st Button Text',
    },
    {
      name: 'firstButtonLink',
      type: 'text',
      label: '1st Button Link',
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'Content',
      admin: {
        description: 'Use Markdown format. For bullet points, use "- " or "* " at the start of each line.',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Gallery',
      minRows: 0,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'secondButtonText',
      type: 'text',
      label: '2nd Button Text',
    },
    {
      name: 'secondButtonLink',
      type: 'text',
      label: '2nd Button Link',
    },
    {
      name: 'scientificCommittee',
      type: 'textarea',
      label: 'Scientific Committee',
      admin: {
        description: 'Use Markdown format. For bullet points, use "- " or "* " at the start of each line.',
      },
    },
    {
      name: 'topics',
      type: 'textarea',
      label: 'Topics',
      admin: {
        description: 'Use Markdown format. For bullet points, use "- " or "* " at the start of each line.',
      },
    },
    {
      name: 'faq',
      type: 'array',
      label: 'FAQ',
      minRows: 0,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Question',
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
          label: 'Answer',
        },
      ],
      admin: {
        description: 'Add frequently asked questions and answers',
      },
    },
    {
      name: 'sponsors',
      type: 'array',
      label: 'Sponsors',
      minRows: 0,
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Sponsor Logo',
        },
      ],
      admin: {
        description: 'Upload sponsor logos',
      },
    },
  ],
  timestamps: true,
};

