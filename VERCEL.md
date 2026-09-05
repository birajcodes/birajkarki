# Deploying to Vercel

This is a **second, independent deployment target** for this app — it does
not replace or modify the existing Docker/DigitalOcean pipeline documented in
`DEPLOYMENT.md`. That pipeline (Dockerfile, `deploy/`, `.github/workflows/`)
is untouched and continues to work exactly as before.

## Why this needed any changes at all

The app itself has no architecture that conflicts with a serverless
platform: no custom server, no in-memory or on-disk state, no background
jobs, no WebSocket server, and no code that binds to a specific port. The
two API routes (`/api/health`, `/api/version`) are both stateless, doing no
I/O.

The one real conflict was `next.config.ts`'s `output: "standalone"`. That
setting makes `next build` emit a self-contained `.next/standalone/server.js`
for the Docker image to run with `node server.js` — a Docker/self-host-only
optimization. Vercel's own build pipeline produces its serverless/edge
output directly from a standard `next build` and doesn't use (and can
conflict with) that standalone bundle. `next.config.ts` now sets
`output: process.env.VERCEL ? undefined : "standalone"` — Vercel sets
`VERCEL=1` in its build environment automatically, so the Docker build path
is completely unaffected and still gets standalone output.

`GET /api/version` also now falls back to Vercel's auto-injected
`VERCEL_GIT_COMMIT_SHA` when the Docker-only `GIT_COMMIT_SHA` build arg
isn't set, so the endpoint stays useful for confirming what's live on
Vercel too.

## What to set in the Vercel dashboard

**Framework preset:** Next.js (auto-detected; also pinned explicitly in
`vercel.json`).

**Build command:** `next build` (default — set explicitly in `vercel.json`).

**Output directory:** leave unset / default. Next.js projects on Vercel
don't use a static "output directory" the way a plain static site does —
Vercel's Next.js integration reads the build output produced by
`next build` directly.

**Install command:** `npm ci` (set explicitly in `vercel.json`, matches
what CI and the Dockerfile both use, for lockfile-exact installs).

**Environment variables:** none are required. See `vercel.env.example`
for the (currently empty) place to add any in the future. Do not set
`GIT_COMMIT_SHA` / `BUILD_TIME` — those are Docker-build-only and Vercel's
own system env vars cover the same purpose there.

**Node.js version:** the repo doesn't pin one for Vercel specifically; the
Docker image and CI both use Node 22, so pick 22.x in Project Settings →
General → Node.js Version if you want parity.

## Verifying after deploy

- `GET https://<your-vercel-domain>/api/health` → `{"status":"ok"}`
- `GET https://<your-vercel-domain>/api/version` → commit/build info (via
  `VERCEL_GIT_COMMIT_SHA`)
