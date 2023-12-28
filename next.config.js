/** @type {import('next').NextConfig} */

// const endpointUrl = process.env.ENDPOINT_URL || 'http://localhost:3000'

const nextConfig = {
  // reactStrictMode: true,
  images:{
    domains:["res.cloudinary.com"]
  },
  // env: {
  //   ENDPOINT_URL: endpointUrl,
  // }
}

module.exports = nextConfig
