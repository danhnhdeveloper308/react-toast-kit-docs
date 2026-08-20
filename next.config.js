const fs = require('node:fs');
const path = require('node:path');

const readLocalVersion = () => {
  const candidates = [
    path.join(__dirname, '..', 'react-toast-kit', 'package.json'),
    path.join(__dirname, 'node_modules', 'react-toast-kit', 'package.json'),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return JSON.parse(fs.readFileSync(candidate, 'utf8')).version;
  }
  return 'latest';
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['127.0.0.1'],
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/react-toast-kit-docs' : '',
  images: {
    unoptimized: true,
  },
  distDir: 'out',
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/react-toast-kit-docs/' : '',
  env: {
    NEXT_PUBLIC_RTK_VERSION: process.env.NEXT_PUBLIC_RTK_VERSION || readLocalVersion(),
  },
};

module.exports = nextConfig;
