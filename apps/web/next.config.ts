import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@uandv/ui', '@uandv/database'],
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/business-consulting',
        destination: '/business-solutions',
        permanent: true,
      },
      {
        source: '/business',
        destination: '/business-solutions',
        permanent: true,
      },
      {
        source: '/solutions/digital-marketing',
        destination: '/digital-marketing',
        permanent: true,
      },
      {
        source: '/solutions/mlm-software',
        destination: '/mlm',
        permanent: true,
      },
      {
        source: '/services/startup-business-consulting',
        destination: '/startup',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/why-uandv#solutions',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
