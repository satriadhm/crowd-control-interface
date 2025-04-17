import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Adding options to fix prerendering errors
  output: "standalone",

  // Config for experimental features
  experimental: {
    // Add valid experimental options here if needed
  },

  // Configure page generation
  reactStrictMode: true,
};

export default nextConfig;
