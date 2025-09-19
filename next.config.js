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