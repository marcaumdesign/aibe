import path from 'node:path';
import { defineConfig } from 'prisma/config';
import { PrismaLibSQL } from '@prisma/adapter-libsql';

// import your .env file
import 'dotenv/config';

export default defineConfig({
  experimental: {
    adapter: true,
  },
  schema: path.join('prisma', 'schema.prisma'),
  async adapter() {
    const isReplicaEnv = process.env.NODE_ENV !== 'production' && !process.env.VERCEL;
    const localReplicaUrl = process.env.DATABASE_URL ?? 'file:./prisma/sqlite.db';
    const remoteUrl = process.env.TURSO_DATABASE_URL ?? '';

    if (!isReplicaEnv && !remoteUrl) {
      throw new Error('TURSO_DATABASE_URL must be set when running without the local replica.');
    }

    return new PrismaLibSQL(
      isReplicaEnv
        ? {
            url: localReplicaUrl,
            syncUrl: remoteUrl,
            authToken: process.env.TURSO_AUTH_TOKEN,
            syncInterval: 60000,
          }
        : {
            url: remoteUrl,
            authToken: process.env.TURSO_AUTH_TOKEN,
          },
    );
  },
});
