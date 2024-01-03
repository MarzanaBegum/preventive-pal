/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: ['en', 'spa'],
    defaultLocale: 'en',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prevention-seven.vercel.app',
        port: '',
      },
    ],
    domains: ['localhost', 'prevention-server.up.railway.app'],
  },
};

module.exports = nextConfig;
