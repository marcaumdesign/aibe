import { PrismaClient } from '@/lib/generated/prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const adapter = new PrismaLibSQL({
  url: `file:./prisma/sqlite.db`,
  syncUrl: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
  syncInterval: 60000,
});

const libsql = createClient({
  url: `file:./prisma/sqlite.db`,
  syncUrl: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
  syncInterval: 60000,
});

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  }).$extends({
    query: {
      $allModels: {
        async $allOperations({ operation, model, args, query }) {
          const result = await query(args);

          // Synchronize the embedded replica after any write operation
          if (['create', 'update', 'delete'].includes(operation)) {
            await libsql.sync();
          }

          return result;
        },
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
