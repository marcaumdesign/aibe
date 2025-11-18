import type { GlobalConfig } from 'payload'

export const HighlightBanner: GlobalConfig = {
  slug: 'highlight-banner',
  label: 'Highlight Banner',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Mostrar Banner',
      defaultValue: true,
      admin: {
        description: 'Ative ou desative o banner na página inicial',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
      defaultValue: 'AIBE Workshop 2026 to be announced soon',
      admin: {
        description: 'Texto principal do banner',
      },
    },
    {
      name: 'button',
      type: 'group',
      label: 'Botão',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Texto do Botão',
          required: true,
          defaultValue: 'See Details',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link do Botão',
          required: true,
          defaultValue: '/events/workshop',
          admin: {
            description: 'URL para onde o botão irá redirecionar (ex: /events/workshop)',
          },
        },
      ],
    },
  ],
}

