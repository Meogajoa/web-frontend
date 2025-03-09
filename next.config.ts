import { CONFIGS } from '@/utils/config';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // rewrites,
  env: {
    API_URL: CONFIGS.API_URL,
    DEV_API_URL: CONFIGS.DEV_API_URL,
    WS_URL: CONFIGS.WS_URL,
  },
};

// async function rewrites() {
//   const SERVER_URL = CONFIGS.DEV_API_URL;

//   return [
//     {
//       source: '/api/:path*',
//       destination: `${SERVER_URL}/:path*`,
//     },
//   ];
// }

export default withNextIntl(nextConfig);
