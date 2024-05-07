/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
  sassOptions: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'megtv2.blob.core.windows.net',
        port: '',
        pathname: ''
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '**'
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig