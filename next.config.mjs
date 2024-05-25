/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/login': { page: '/login' },
    };
  },
  reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mov|mp4)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
