/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'dist',
    images: {
      unoptimized: true,
    },
    experimental: {
      appDir: true,
    },
  };
  
  module.exports = nextConfig;