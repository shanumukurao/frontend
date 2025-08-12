/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost', // for local development
      'https://backend-cq6j.onrender.com' // replace with your actual backend render domain
    ],
  },
};

export default nextConfig;
