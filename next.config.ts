import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "outstanding-perch-546.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
