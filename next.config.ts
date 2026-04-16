import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "**.holded.com" },
      { protocol: "https", hostname: "**.factorialhr.com" },
      { protocol: "https", hostname: "**.retool.com" },
      { protocol: "https", hostname: "**.kueski.com" },
    ],
  },
  experimental: {
    // Optimize package imports for performance
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default withNextIntl(nextConfig);
