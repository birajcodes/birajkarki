# Deployment

How `birajkarki.com` gets from a commit on `main` to a running container in
production. The whole pipeline is deliberately simple: one app, one
container, one droplet — no orchestrator, no database, no extra services.

```
GitHub (push to main)
  → CI workflow (lint, typecheck, build)
  → Deploy workflow (build + push Docker image to GHCR)
  → SSH into the DigitalOcean droplet
  → deploy/deploy.sh: pull image, health-check on a staging port,
    promote to the live container only if healthy
  → Nginx (host) reverse-proxies :443 → 127.0.0.1:3000
  → birajkarki.com
```

## 0. Before touching the server — read this first

**This has not been run against the real droplet yet.** These scripts and
workflows were authored without SSH access to it. Before enabling
`deploy.yml` (or running anything below by hand), SSH in once and check
what's already there — don't assume the box is empty:

```bash
ssh <user>@<droplet-ip>

lsb_release -a                        # OS / version
docker --version || echo "no docker"
docker ps -a                          # existing containers
nginx -v || echo "no nginx"
ls -la /etc/nginx/sites-enabled/      # existing virtual hosts
sudo certbot certificates             # existing SSL certs
sudo ufw status                       # firewall rules
```

If the droplet already serves something else, do not remove it — this
app should be added alongside whatever's already running, on its own
Nginx server block and its own container name (`biraj-portfolio`).

## Server architecture

```
Internet
  → DigitalOcean Firewall (80, 443, SSH only)
  → Nginx (host, public-facing)
  → Docker (127.0.0.1:3000 only — never exposed publicly)
  → biraj-portfolio container
  → Next.js (standalone server)
```

Server: Ubuntu droplet, 1 vCPU / 1 GB RAM / 25 GB disk. This is why the
deploy strategy avoids running two full copies of the app for long (see
"Deployment process" below) — there isn't much RAM to spare.

## Docker

Production image is built by `Dockerfile` (multi-stage, Next.js
`output: "standalone"`, runs as the non-root `nextjs` user, final image
contains only the standalone server + static assets + public files).

Build and run it locally to test:

```bash
docker build -t biraj-portfolio:local .
docker run --rm -p 3000:3000 biraj-portfolio:local
curl http://localhost:3000/api/health
# {"status":"ok"}
```

The droplet never runs `docker build` — GitHub Actions builds the image
and pushes it to GHCR; the droplet only pulls and runs it.

## GitHub Actions

- **`.github/workflows/ci.yml`** — runs on every PR and every push to
  `main`: install, lint, typecheck, tests (if any), production build.
- **`.github/workflows/deploy.yml`** — triggered by `workflow_run` when
  the CI workflow *completes successfully on `main`*. It never runs off
  an unverified commit. It:
  1. Builds the Docker image and pushes it to GHCR as both
     `ghcr.io/<owner>/biraj-portfolio:<commit-sha>` and `:latest`.
     `latest` is a convenience tag only — deploys and rollbacks always
     reference the exact SHA tag, never `latest`.
  2. Copies `deploy/deploy.sh` to the droplet over SSH.
  3. Runs it with the new image tag, which does the actual safe
     promotion (see below).

### Required repository secrets

| Secret              | Purpose                                          |
| -------------------- | ------------------------------------------------- |
| `DROPLET_HOST`       | Droplet IP or hostname                            |
| `DROPLET_SSH_USER`   | SSH user with Docker permissions on the droplet    |
| `DROPLET_SSH_KEY`    | Private key for that user (deploy-only key, ideally scoped/limited) |

`GITHUB_TOKEN` is provided automatically by Actions and is used both to
push to GHCR and (via the SSH session) to let the droplet pull from
GHCR — no extra registry secret needed as long as the GHCR package stays
associated with this repo.

## Environment variables

No secrets are committed anywhere (not in Git, the Dockerfile, or
frontend source). The only values baked into the image are non-secret
build metadata (`GIT_COMMIT_SHA`, `BUILD_TIME`), passed as Docker build
args from the workflow. If the app ever needs real runtime secrets,
add them as GitHub Actions secrets and pass them to `docker run` in
`deploy/deploy.sh` via `-e`, or as a server-side `.env` file on the
droplet (outside Git) — never as `NEXT_PUBLIC_*`, since those are
bundled into client-side JS and are public by definition.

## Health check

`GET /api/health` → `{"status":"ok"}`. Deliberately does no I/O. Used by
`deploy/deploy.sh` to verify a container before (and after) it's
promoted to live.

`GET /api/version` returns non-sensitive build metadata (commit SHA,
build time, environment) for debugging a running deployment.

## Nginx

Reference config: `deploy/nginx.conf`. This is **not** applied by CI/CD
— it's host-level, one-time setup. Install it manually:

```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/birajkarki.com
sudo ln -s /etc/nginx/sites-available/birajkarki.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

It proxies `birajkarki.com` and `www.birajkarki.com` (443) to
`127.0.0.1:3000`, redirects HTTP → HTTPS, and redirects `www` → apex.
Port 3000 is never exposed publicly — `deploy/deploy.sh` binds the
container to `127.0.0.1:3000` explicitly.

## HTTPS

Issue certificates with Certbot's Nginx plugin (run once, then Certbot's
systemd timer handles renewal automatically):

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d birajkarki.com -d www.birajkarki.com
```

This fills in the `ssl_certificate` lines in `deploy/nginx.conf` and
sets up the HTTP→HTTPS redirect for you.

## Firewall

Only 80, 443, and SSH should be reachable:

```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

## Deployment process (what `deploy/deploy.sh` actually does)

There's no load balancer or orchestrator here, so "zero-downtime" means
something simple and honest: never replace a working container with an
unverified one.

1. Identify the currently running image (for rollback reference).
2. Pull the new image by exact commit SHA.
3. Start it as a **staging** container on `127.0.0.1:3001` (not public).
4. Health-check `http://127.0.0.1:3001/api/health` with retries.
5. If unhealthy: remove the staging container, leave production
   untouched, and fail the deploy loudly.
6. If healthy: remove the staging container, stop/remove the old live
   container, and start the new image as the live container on
   `127.0.0.1:3000`.
7. Health-check the live container too. If *that* fails, the previous
   image tag is printed in the logs for immediate rollback.

Only one copy of the app runs at a time except for the few seconds of
the staging health check — intentional, given the droplet's 1 GB RAM.

## Rollback

Every deploy is tagged with its commit SHA, and `latest` is never used
for deploys — only as a convenience tag. To roll back, redeploy the
previous SHA's image directly on the droplet:

```bash
./deploy.sh ghcr.io/<owner>/biraj-portfolio:<previous-commit-sha>
```

(The failing deploy's log output prints the exact command to run.)

## Troubleshooting

- **`docker ps`** — confirm `biraj-portfolio` is running and check
  `STATUS` for restart loops.
- **`docker logs biraj-portfolio --tail 100`** — application errors.
- **`curl http://127.0.0.1:3000/api/health`** — bypass Nginx to check
  if the container itself is healthy.
- **`curl https://birajkarki.com/api/version`** — confirm which commit
  is actually live.
- **`sudo nginx -t`** — validate Nginx config after any manual edit.
- **`sudo journalctl -u nginx -n 100`** — Nginx-level errors (502s
  usually mean the container isn't listening on 3000).
- **Deploy workflow failed at the SSH step** — check `DROPLET_HOST` /
  `DROPLET_SSH_USER` / `DROPLET_SSH_KEY` secrets, and that the deploy
  user is in the `docker` group (`sudo usermod -aG docker <user>`).
