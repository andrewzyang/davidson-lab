/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If deploying to github.io/davidson-lab, uncomment the line below
  // basePath: '/davidson-lab',
}

module.exports = nextConfig