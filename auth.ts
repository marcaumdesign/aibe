import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from './lib/prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'sqlite', // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    async sendResetPassword(data, request) {
      console.log('Reset password requested for (DATA):', data);
      console.log('Reset password requested for (REQUEST):', request);

      // Send an email to the user with a link to reset their password
    },
    autoSignIn: true,
    requireEmailVerification: false,
  },
});
