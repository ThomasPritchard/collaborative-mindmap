import path from "path";
import type { NextConfig } from "next";

/**
 * Next.js configuration.
 *
 * - Enables React Strict Mode for highlighting potential problems.
 * - Exposes the `@app` path alias to the underlying webpack config so it can be
 *   used in both TypeScript and JavaScript files.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@app": path.resolve(__dirname, "src"),
    };
    return config;
  },
};

export default nextConfig;
