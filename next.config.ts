import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for the Docker production image (see Dockerfile) — bundles
  // a minimal standalone server instead of shipping full node_modules.
  output: "standalone",
};

export default nextConfig;
