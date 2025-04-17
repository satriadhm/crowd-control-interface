// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",

  // Disable automatic static optimization for certain paths
  experimental: {
    // Add other experimental options here if needed
  },

  // Important: Set up route configuration to use dynamic rendering for protected routes
  reactStrictMode: true,

  // Add this configuration to mark routes that use localStorage as dynamic
  unstable_runtimeJS: true,
};

export default nextConfig;
