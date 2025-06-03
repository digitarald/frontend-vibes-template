import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Turbopack-specific config here
  },
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;