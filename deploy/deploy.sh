#!/usr/bin/env bash
# Safe single-host deploy for biraj-portfolio.
#
# Runs on the DigitalOcean droplet (invoked over SSH by
# .github/workflows/deploy.yml). Never builds the image — it only pulls
# an image GitHub Actions already built and pushed to GHCR.
#
# Strategy (deliberately simple — no orchestrator, no load balancer):
#   1. Pull the new image by exact commit SHA.
#   2. Start it on a temporary local port (3001) under a staging name.
#   3. Health-check the staging container.
#   4. Only if healthy: stop/remove the current live container (3000)
#      and start the new image as the live container.
#   5. Health-check the live container. If that fails, the previous
#      image tag is printed so it can be redeployed immediately.
#
# The old container is never removed until the new one has already
# passed its health check, so a failed staging check leaves production
# completely untouched.

set -euo pipefail

IMAGE="$1" # e.g. ghcr.io/<owner>/biraj-portfolio:<sha>

CONTAINER_NAME="biraj-portfolio"
STAGING_NAME="biraj-portfolio-staging"
LIVE_PORT=3000
STAGING_PORT=3001
HEALTH_PATH="/api/health"
HEALTH_RETRIES=10
HEALTH_DELAY=2

log() { echo "[deploy] $*"; }

health_check() {
  local port="$1"
  for _ in $(seq 1 "$HEALTH_RETRIES"); do
    if curl -fsS "http://127.0.0.1:${port}${HEALTH_PATH}" | grep -q '"status":"ok"'; then
      return 0
    fi
    sleep "$HEALTH_DELAY"
  done
  return 1
}

PREVIOUS_IMAGE="$(docker inspect --format '{{.Config.Image}}' "$CONTAINER_NAME" 2>/dev/null || echo "none")"
log "Current live image: ${PREVIOUS_IMAGE}"
log "Deploying: ${IMAGE}"

log "Pulling new image..."
docker pull "$IMAGE"

log "Starting staging container on port ${STAGING_PORT}..."
docker rm -f "$STAGING_NAME" >/dev/null 2>&1 || true
docker run -d --name "$STAGING_NAME" -p "127.0.0.1:${STAGING_PORT}:3000" "$IMAGE"

log "Health-checking staging container..."
if ! health_check "$STAGING_PORT"; then
  log "FAILED — staging container did not become healthy."
  log "Production was not touched. Previous live image remains: ${PREVIOUS_IMAGE}"
  docker logs "$STAGING_NAME" --tail 50 || true
  docker rm -f "$STAGING_NAME" >/dev/null 2>&1 || true
  exit 1
fi
log "Staging container is healthy."

docker rm -f "$STAGING_NAME" >/dev/null 2>&1 || true

log "Promoting: stopping previous live container (if any)..."
docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true

log "Starting new live container on port ${LIVE_PORT}..."
docker run -d \
  --name "$CONTAINER_NAME" \
  --restart unless-stopped \
  -p "127.0.0.1:${LIVE_PORT}:3000" \
  "$IMAGE"

log "Health-checking live container..."
if ! health_check "$LIVE_PORT"; then
  log "FAILED — live container did not become healthy after promotion."
  log "To roll back immediately, redeploy the previous image:"
  log "  ./deploy.sh ${PREVIOUS_IMAGE}"
  docker logs "$CONTAINER_NAME" --tail 50 || true
  exit 1
fi

log "Deployment successful: ${IMAGE}"

log "Pruning old unused images..."
docker image prune -f >/dev/null 2>&1 || true
