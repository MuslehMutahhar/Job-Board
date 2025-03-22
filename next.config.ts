import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  reactStrictMode: false,
  images: {
    domains: ['localhost'],
  },
  // Enable page transitions and reduce hydration errors
  staticPageGenerationTimeout: 180,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NEXTAUTH_URL: 'http://localhost:3000',
    NEXTAUTH_SECRET: 'your-super-secure-secret-key-min-32-chars',
  },
};

export default nextConfig;
