/** @type {import('next').NextConfig} */

import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin';

const nextConfig = {
  experimental: {
    optimizePackageImports: ['@prisma/client', 'prisma'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'majestic-serenity-7a76c06678.strapiapp.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'majestic-serenity-7a76c06678.media.strapiapp.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  serverExternalPackages: [
    '@libsql/client',
    '@prisma/adapter-libsql',
    '@prisma/client',
    'prisma',
  ],
  /* config options here */
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },
};

export default nextConfig;
