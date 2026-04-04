# E2E tests (Playwright)

This folder contains browser-level end-to-end tests for public, backend-independent user flows.

## Current scope

- Guest redirect from `/` to `/2e/karakter`
- Guest header links (`Register`, `Login`)
- Public legal pages (`/privacy.html`, `/ogl.html`, `/aelf.html`)

## Run locally

From `frontend/`:

- Install Playwright browser binaries:
  - `yarn test:e2e:install`
- Run tests:
  - `yarn test:e2e`
- Run headed mode:
  - `yarn test:e2e:headed`
- Run interactive UI mode:
  - `yarn test:e2e:ui`

## Notes

- Tests use the config in `../e2e/playwright.config.ts`.
- The Playwright web server starts Vite on `http://127.0.0.1:4173`.
- Tests mock `GET /api/User/me` so they stay deterministic without the backend.

## Run with Docker Compose

This mode runs against a full containerized stack:

- tagged backend image (`BACKEND_IMAGE`)
- supporting services (`postgres`, `nginx` proxy)
- freshly built `frontend` image
- freshly built `e2e` image

Prerequisites:

- Docker with Compose

Run:

```shell
docker compose -f docker-compose.e2e.yaml up --build --abort-on-container-exit --exit-code-from e2e e2e
```

Run with a different backend tag:

```shell
BACKEND_IMAGE=ghcr.io/morbalint/kemkas-backend:<tag> \
docker compose -f docker-compose.e2e.yaml up --build --abort-on-container-exit --exit-code-from e2e e2e
```

The `certs` service generates a local CA and nginx server certificate in a shared volume.
The `e2e` image imports that CA (`/certs/rootCA.pem`) into both the system trust store and Chromium's NSS store before running tests.
