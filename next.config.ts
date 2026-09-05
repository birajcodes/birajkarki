import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for the Docker production image (see Dockerfile) — bundles
  // a minimal standalone server instead of shipping full node_modules.
  // Skipped on Vercel: Vercel's own build/adapter pipeline produces its
  // serverless/edge output directly from `next build` and does not use
  // (and can conflict with) the standalone server.js bundle. Vercel sets
  // `VERCEL=1` in its build environment, so this only affects that target.
  output: process.env.VERCEL ? undefined : "standalone",
};

export default nextConfig;
