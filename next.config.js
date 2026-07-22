/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com"], // allow raw images from GitHub
  },
};

module.exports = nextConfig;