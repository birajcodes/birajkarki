import { NextResponse } from "next/server";

// Non-sensitive build metadata for debugging a running deployment.
// GIT_COMMIT_SHA / BUILD_TIME are baked in at Docker build time (see
// Dockerfile + .github/workflows/deploy.yml) — never secrets.
export function GET() {
  return NextResponse.json({
    commit: process.env.GIT_COMMIT_SHA ?? "unknown",
    builtAt: process.env.BUILD_TIME ?? "unknown",
    environment: process.env.NODE_ENV ?? "unknown",
  });
}
