import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "a0.muscache.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "hjsbwsdjwoipcwadbjvy.supabase.co",
        protocol: "https",
        port: "",
      },
      {
        hostname: "static.vecteezy.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "hatscripts.github.io",
        protocol: "https",
        port: "",
      },
      {
        hostname: "images.vexels.com",
        protocol: "https",
        port: "",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000, // 30 days - much longer cache for better performance
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
  },
  experimental: {
    // Optimize imports for better tree-shaking
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      'date-fns',
      'react-date-range',
    ],
    // Client router cache optimization
    staleTimes: {
      dynamic: 30,  // Cache dynamic pages for 30 seconds
      static: 300,  // Cache static pages for 5 minutes
    },
  },
  // Turbopack is now default in Next.js 16
  turbopack: {},
  // Enable compression
  compress: true,
  // Enable static optimization
  trailingSlash: false,
  // Enable output optimization
  output: 'standalone',
  // Reduce bundle size by excluding server-only packages from client
  serverExternalPackages: ['@prisma/client', 'sharp'],
  // Headers for better caching
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
