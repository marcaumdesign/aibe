import type { CollectionConfig } from 'payload';

import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
  OrderedListFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical';
import { slugField } from 'payload';

import { authenticated } from '../../access/authenticated';
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished';
import { revalidateDelete, revalidateWorkshop } from './hooks/revalidateWorkshop';

export const Workshops: CollectionConfig = {
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
        description:
          'Select a speaker from Staff collection (only shows items with type "Speaker")',
      },
    },
    {
      name: 'firstButtonText',
      type: 'text',
      label: '1st Button Text',
      admin: {
        condition: (data) => data.type === 'current',
      },
    },
    {
      name: 'firstButtonLink',
      type: 'text',
      label: '1st Button Link',
      admin: {
        condition: (data) => data.type === 'current',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
            UnorderedListFeature(),
            OrderedListFeature(),
          ];
        },
      }),
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
      admin: {
        condition: (data) => data.type === 'past',
        description: 'Photo gallery from the past workshop event',
      },
    },
    {
      name: 'secondButtonText',
      type: 'text',
      label: '2nd Button Text',
      admin: {
        condition: (data) => data.type === 'current',
      },
    },
    {
      name: 'secondButtonLink',
      type: 'text',
      label: '2nd Button Link',
      admin: {
        condition: (data) => data.type === 'current',
      },
    },
    {
      name: 'scientificCommittee',
      type: 'textarea',
      label: 'Scientific Committee',
      admin: {
        description:
          'Use Markdown format. For bullet points, use "- " or "* " at the start of each line.',
      },
    },
    {
      name: 'topics',
      type: 'textarea',
      label: 'Topics',
      admin: {
        description:
          'Use Markdown format. For bullet points, use "- " or "* " at the start of each line.',
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
        condition: (data) => data.type === 'current',
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
    slugField(),
    {
      name: 'studyingSection',
      type: 'group',
      label: 'Studying Section',
      admin: {
        description: 'This section only appears for Past workshops',
        condition: (data) => data.type === 'past',
      },
      fields: [
        {
          name: 'studyingTitle',
          type: 'text',
          label: 'Studying Title',
        },
        {
          name: 'studyingDescription',
          type: 'textarea',
          label: 'Studying Description',
        },
        {
          name: 'studyingImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Studying Image',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateWorkshop],
    afterDelete: [revalidateDelete],
  },
  timestamps: true,
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
