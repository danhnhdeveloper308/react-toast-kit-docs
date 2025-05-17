/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/react-toast-kit-docs' : '',
  images: {
    unoptimized: true,
  },
  distDir: 'out',
  trailingSlash: true,
};

module.exports = nextConfig;