import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // hostname: "**", // Wildcard for any hostname
        hostname: 'res.cloudinary.com',
      },
    ],
    unoptimized: true, // Disable all image optimization
  },
};

export default nextConfig;
