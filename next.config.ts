import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_USE_REMOTE_ASSETS: process.env.NEXT_PUBLIC_USE_REMOTE_ASSETS ?? "" },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "litter.catbox.moe", pathname: "/**" },
    ],
  },
};

export default nextConfig;
