import type { GlobalConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
  OrderedListFeature,
  UnorderedListFeature,
  BoldFeature,
  ItalicFeature,
  LinkFeature,
} from '@payloadcms/richtext-lexical'

export const PrizesPage: GlobalConfig = {
  slug: 'prizes-page',
  label: 'Prizes Page',
  access: {
    read: () => true,
  },
  fields: [
    // Call for Submissions Section
    {
      name: 'callForSubmissions',
      type: 'group',
      label: 'Call for Submissions',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enable Call for Submissions Section',
          defaultValue: true,
          admin: {
            description: 'Toggle to show or hide the entire Call for Submissions section',
          },
        },
        {
          name: 'introduction',
          type: 'richText',
          label: 'Introduction',
          admin: {
            description: 'Introduction text for the Call for Submissions section',
          },
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h4', 'h5', 'h6'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
                HorizontalRuleFeature(),
                UnorderedListFeature(),
                OrderedListFeature(),
                BoldFeature(),
                ItalicFeature(),
                LinkFeature({
                  enabledCollections: ['pages'],
                }),
              ]
            },
          }),
        },
        {
          name: 'deadline',
          type: 'text',
          label: 'Deadline',
          admin: {
            description: 'Deadline text (e.g., "15 January 2026 (midnight, Italy)")',
          },
        },
        {
          name: 'firstButton',
          type: 'group',
          label: 'First Button (Submit Paper)',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Button Text',
              defaultValue: 'Submit Paper',
            },
            {
              name: 'link',
              type: 'text',
              label: 'Button Link',
              admin: {
                description: 'URL for the submit paper button',
              },
            },
          ],
        },
        {
          name: 'eligibilityAndRules',
          type: 'richText',
          label: 'Eligibility and Rules',
          admin: {
            description: 'Eligibility criteria and rules for submissions',
          },
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h4', 'h5', 'h6'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
                HorizontalRuleFeature(),
                UnorderedListFeature(),
                OrderedListFeature(),
                BoldFeature(),
                ItalicFeature(),
                LinkFeature({
                  enabledCollections: ['pages'],
                }),
              ]
            },
          }),
        },
        {
          name: 'scientificCommittee',
          type: 'textarea',
          label: 'Scientific Committee',
          admin: {
            description:
              'Use Markdown format. For bullet points, use "- " or "* " at the start of each line. Example:\n- Fernando L. Aiube, UERJ (Rio de Janeiro)\n- Raphael B. Corbi, USP (Sao Paulo)',
          },
        },
        {
          name: 'secondButton',
          type: 'group',
          label: 'Second Button (Download Call for Submissions)',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Button Text',
              defaultValue: 'Download Call for Submissions',
            },
            {
              name: 'link',
              type: 'text',
              label: 'Button Link',
              admin: {
                description: 'URL for the download button',
              },
            },
          ],
        },
      ],
    },
    // Official Launch Section
    {
      name: 'officialLaunch',
      type: 'group',
      label: 'Official Launch of the Prize',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'Official Launch of the Prize',
        },
        {
          name: 'text',
          type: 'textarea',
          label: 'Description Text',
          admin: {
            description: 'Description of the official launch event',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
        },
      ],
    },
  ],
}

