/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // allow Cloudinary
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
