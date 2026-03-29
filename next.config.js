/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vyiqqjwaervuwdooalmt.supabase.co',
        port: '',
        pathname: '/storage/v1/object/**',
      },
    ],
  },
};

module.exports = nextConfig;
