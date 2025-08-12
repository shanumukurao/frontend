/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost', // for local development
      'backend-cq6j.onrender.com' // ✅ just the domain, no https://
    ],
  },
};

export default nextConfig;

