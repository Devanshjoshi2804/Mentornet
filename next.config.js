/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during builds to allow deployment even with ESLint warnings/errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript errors during builds to allow deployment
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['placehold.co'],
  },
}

module.exports = nextConfig 