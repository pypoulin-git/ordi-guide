import type { NextConfig } from "next";
// Single source of truth shared with src/proxy.ts. next.config's headers()
// cover the routes the proxy matcher excludes (_next, /api, static files);
// the proxy covers page routes. Both now emit the exact same header set.
import { securityHeadersList as securityHeaders } from "./src/lib/security-headers";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.dell.com',
      },
      {
        protocol: 'https',
        hostname: '**.static.pub',
      },
      {
        protocol: 'https',
        hostname: 'c1.neweggimages.com',
      },
      {
        protocol: 'https',
        hostname: 'www.bureauengros.com',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'multimedia.bbycastatic.ca',
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
