/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains: ['cdn.sanity.io'], // Allow images from Unsplash
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
