import { withPayload } from '@payloadcms/next/withPayload';
/** @type {import('next').NextConfig} */
const nextConfig = {
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
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/media/**',
      },
      {
        protocol: 'https',
        hostname: 'aibe-seven.vercel.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'aibe.website',
        port: '',
        pathname: '/**',
      },
    ],
    qualities: [75, 90, 95, 100],
  },
};

export default withPayload(nextConfig);
