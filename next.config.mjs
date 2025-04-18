/** @type {import('next').NextConfig} */
const nextConfig = {
  // ESLint and TypeScript config for development
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Image optimization configuration
  images: {
    unoptimized: true,
    domains: ['lh3.googleusercontent.com', 'media.licdn.com'],
  },

  // Experimental features
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },

  // Server-only packages (moved from experimental.serverComponentsExternalPackages)
  serverExternalPackages: ['bcrypt', 'mongodb'],
  
  // Webpack configuration for handling Node.js-specific modules
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Prevent client-side bundling of server-only modules
      config.externals = [
        ...(config.externals || []),
        'bcrypt',
        'mongodb',
        'net',
        'tls',
        'fs',
        'dns',
      ]
    }
    return config
  },
}

export default nextConfig
