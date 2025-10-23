import { PrismaClient } from '@/lib/generated/prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient, type Client } from '@libsql/client';

const isReplicaEnv = process.env.NODE_ENV !== 'production' && !process.env.VERCEL;
const localReplicaUrl = process.env.DATABASE_URL ?? 'file:./prisma/sqlite.db';

const adapter = new PrismaLibSQL(
  isReplicaEnv
    ? {
        url: localReplicaUrl,
        syncUrl: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
        syncInterval: 60000,
      }
    : {
        url: process.env.TURSO_DATABASE_URL ?? '',
        authToken: process.env.TURSO_AUTH_TOKEN,
      },
);

const libsql: Client | null = isReplicaEnv
  ? createClient({
      url: localReplicaUrl,
      syncUrl: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
      syncInterval: 60000,
    })
  : null;

const globalForPrisma = global as unknown as {
  prisma?: PrismaClient;
};

const prismaBase =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

const prisma = isReplicaEnv && libsql
  ? prismaBase.$extends({
      query: {
        $allModels: {
          async $allOperations({ operation, args, query }) {
            const result = await query(args);

            if (['create', 'createMany', 'update', 'updateMany', 'upsert', 'delete', 'deleteMany'].includes(operation)) {
              await libsql.sync();
            }

            return result;
          },
        },
      },
    })
  : prismaBase;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma as PrismaClient;

export default prisma as PrismaClient;
