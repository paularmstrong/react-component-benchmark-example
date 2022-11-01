/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  distDir: 'dist',
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
