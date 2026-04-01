import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // basePath: "/AADream_DEMO_LANDER", // uncomment for GitHub Pages deploy
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
