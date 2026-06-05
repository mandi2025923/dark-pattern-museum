import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/dark-pattern-museum",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
