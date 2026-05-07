import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/Calculator",
        destination: "/calculator",
        permanent: false,
      },
      {
        source: "/Calendar",
        destination: "/calender",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
