/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  images: {
        domains: ["images.unsplash.com"],
        formats: ["image/webp"],
    },
  assetPrefix: isProd ? '/https://github.com/cseleven/Catfider/' : '',
}

module.exports = nextConfig
