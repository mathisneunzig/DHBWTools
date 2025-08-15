import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  outputFileTracingIncludes: {
    'app/api/**': ['./public/data/**/*'],
  },
};

export default nextConfig;
