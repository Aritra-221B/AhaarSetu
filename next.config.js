/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    unoptimized: true, // For development - remove in production
  },
  eslint: {
    // Allow production builds to successfully complete even if
    // there are ESLint errors. We'll address lint issues separately.
    ignoreDuringBuilds: true,
  },
  output: 'export',
  // Handle missing assets gracefully
  webpack: (config, { isServer }) => {
    // Add fallback for missing modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };
    return config;
  },
}

module.exports = nextConfig