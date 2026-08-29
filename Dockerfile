# syntax=docker/dockerfile:1

# ---- deps: install dependencies only, cached separately from source ----
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder: production build using Next.js standalone output ----
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# The repo currently ships no static assets (favicon/icon/OG image are all
# generated dynamically via app/ file conventions), so public/ may not exist
# in the build context. Guarantee it exists so the runner stage's COPY below
# never fails, while still picking up real assets whenever they're added.
RUN mkdir -p public

# ---- runner: minimal runtime image, non-root ----
FROM node:22-alpine AS runner
WORKDIR /app

ARG GIT_COMMIT_SHA=unknown
ARG BUILD_TIME=unknown

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV GIT_COMMIT_SHA=${GIT_COMMIT_SHA}
ENV BUILD_TIME=${BUILD_TIME}

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Standalone output already contains a minimal node_modules — no need to
# copy the full deps stage, keeping the final image small.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
