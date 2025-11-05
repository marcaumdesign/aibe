import { withPayload } from "@payloadcms/next/withPayload";
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
    ],
  },
};

export default withPayload(nextConfig);
