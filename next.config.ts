import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental : {
    swcPlugins : [
      ["next-superjson-plugin", {}]
    ]
  }
};

export default nextConfig;
