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
    verify: false, // Disabled until email service is configured
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
      required: true,
      label: 'Name',
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      label: 'Surname',
    },
    {
      name: 'department',
      type: 'text',
      required: true,
      label: 'Department',
    },
    {
      name: 'universityCompany',
      type: 'text',
      required: true,
      label: 'University/Company',
    },
    {
      name: 'personalWebsite',
      type: 'text',
      label: 'Personal Website',
      admin: {
        description: 'URL of your personal website or academic profile (optional)',
      },
    },
    {
      name: 'title',
      type: 'select',
      required: true,
      label: 'Title',
      options: [
        {
          label: 'Student',
          value: 'student',
        },
        {
          label: 'PhD Student',
          value: 'phd_student',
        },
        {
          label: 'Post-Doc',
          value: 'post_doc',
        },
        {
          label: 'Assistant Professor',
          value: 'assistant_professor',
        },
        {
          label: 'Associate Professor',
          value: 'associate_professor',
        },
        {
          label: 'Full Professor',
          value: 'full_professor',
        },
      ],
    },
    {
      name: 'donationAmount',
      type: 'number',
      required: true,
      defaultValue: 2,
      label: 'Membership Donation Amount (€)',
      min: 2,
      admin: {
        description: 'Membership donation amount in euros (minimum €2.00)',
      },
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
    // Stripe Subscription Fields
    {
      name: 'subscriptionPlan',
      type: 'select',
      defaultValue: 'free',
      saveToJWT: true,
      admin: {
        position: 'sidebar',
        description: 'Membership status of the user',
      },
      access: {
        read: ({ req: { user }, id }) => {
          // Admins podem ler todos, usuários só podem ler o próprio
          if (checkRole(['admin'], user)) return true;
          return user?.id === id;
        },
        update: ({ req: { user } }) => checkRole(['admin'], user),
        create: () => false,
      },
      options: [
        {
          label: 'Non-member',
          value: 'free',
        },
        {
          label: 'Member',
          value: 'premium',
        },
      ],
    },
    {
      name: 'stripeCustomerId',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'ID do cliente no Stripe',
        readOnly: true,
      },
      access: {
        read: ({ req: { user } }) => checkRole(['admin'], user),
        update: ({ req: { user } }) => checkRole(['admin'], user),
        create: () => false,
      },
    },
    {
      name: 'stripeSubscriptionId',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'ID da assinatura ativa no Stripe',
        readOnly: true,
      },
      access: {
        read: ({ req: { user } }) => checkRole(['admin'], user),
        update: ({ req: { user } }) => checkRole(['admin'], user),
        create: () => false,
      },
    },
    {
      name: 'subscriptionStatus',
      type: 'select',
      admin: {
        position: 'sidebar',
        description: 'Status da assinatura no Stripe',
        readOnly: true,
      },
      access: {
        read: ({ req: { user }, id }) => {
          // Admins podem ler todos, usuários só podem ler o próprio
          if (checkRole(['admin'], user)) return true;
          return user?.id === id;
        },
        update: ({ req: { user } }) => checkRole(['admin'], user),
        create: () => false,
      },
      options: [
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Canceled',
          value: 'canceled',
        },
        {
          label: 'Past Due',
          value: 'past_due',
        },
        {
          label: 'Trialing',
          value: 'trialing',
        },
        {
          label: 'Incomplete',
          value: 'incomplete',
        },
        {
          label: 'Incomplete Expired',
          value: 'incomplete_expired',
        },
        {
          label: 'Unpaid',
          value: 'unpaid',
        },
      ],
    },
    {
      name: 'subscriptionCurrentPeriodEnd',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Data de renovação ou expiração da assinatura',
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      access: {
        read: ({ req: { user }, id }) => {
          // Admins podem ler todos, usuários só podem ler o próprio
          if (checkRole(['admin'], user)) return true;
          return user?.id === id;
        },
        update: ({ req: { user } }) => checkRole(['admin'], user),
        create: () => false,
      },
    },
    {
      name: 'stripeInvoiceId',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'ID of the most recent invoice from Stripe',
        readOnly: true,
      },
      access: {
        read: ({ req: { user }, id }) => {
          // Admins can read all, users can only read their own
          if (checkRole(['admin'], user)) return true;
          return user?.id === id;
        },
        update: ({ req: { user } }) => checkRole(['admin'], user),
        create: () => false,
      },
    },
    {
      name: 'stripeInvoiceUrl',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'URL to view the invoice on Stripe',
        readOnly: true,
      },
      access: {
        read: ({ req: { user }, id }) => {
          // Admins can read all, users can only read their own
          if (checkRole(['admin'], user)) return true;
          return user?.id === id;
        },
        update: ({ req: { user } }) => checkRole(['admin'], user),
        create: () => false,
      },
    },
  ],
  timestamps: true,
};
