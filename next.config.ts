import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
  basePath: process.env.NODE_ENV === "production" ? "/yehi-or-tech" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/yehi-or-tech/" : "",
};

export default nextConfig;
