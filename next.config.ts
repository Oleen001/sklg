import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    disableStaticImages: true,
  },
  webpack(config) {
    config.module.rules.push({
      resourceQuery: /raw/,
      type: "asset/source",
    });
    config.module.rules.push({
      test: /\.svg$/i,
      resourceQuery: { not: [/raw/] },
      type: "asset/resource",
    });
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|avif)$/i,
      type: "asset/resource",
    });

    return config;
  },
};

export default nextConfig;
