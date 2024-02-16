/** @type {import('next').NextConfig} */

const endpointUrl = process.env.ENDPOINT_URL || 'http://localhost:3000'

const nextConfig = {
  // reactStrictMode: true,
  images:{
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  env: {
    ENDPOINT_URL: endpointUrl,
  }
}

module.exports = nextConfig
