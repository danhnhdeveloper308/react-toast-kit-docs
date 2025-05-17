/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Important: Use the actual repository name, not -docs at the end
  basePath: process.env.NODE_ENV === 'production' ? '/react-toast-kit-docs' : '',
  images: {
    unoptimized: true,
  },
  distDir: 'out',
  trailingSlash: true,
  // Add this to ensure links work correctly with GitHub Pages
  assetPrefix: process.env.NODE_ENV === 'production' ? '/react-toast-kit-docs/' : '',
};

module.exports = nextConfig;