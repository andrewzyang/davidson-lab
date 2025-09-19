/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/davidson-lab',
  assetPrefix: '/davidson-lab',
  webpack: (config, { isServer }) => {
    // CRITICAL FIX: Disable innerGraph optimization to prevent constructor errors
    config.optimization.innerGraph = false
    
    // Handle Spline's WebGL dependencies
    if (!isServer) {
      config.externals = {
        ...config.externals,
        fs: 'empty',
        path: 'empty',
      }
    }
    return config
  },
}

module.exports = nextConfig