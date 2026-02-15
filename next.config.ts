import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "books.google.com",
        protocol: "https",
      },
      {
        hostname: "books.google.com",
        protocol: "http",
      },
      {
        hostname: "books.googleusercontent.com",
        protocol: "https",
      },
      {
        hostname: "books.googleusercontent.com",
        protocol: "http",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
