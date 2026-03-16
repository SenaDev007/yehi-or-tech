import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 768, 1024, 1280, 1920],
    imageSizes: [32, 64, 128, 200, 300, 400, 800],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 jours
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yehiortech.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
