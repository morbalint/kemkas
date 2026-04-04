# KéMkas

Kard és Mágia karakter alkotó segédlet (https://app.kemkas.hu)

\[EN] Please excuse the Hungish, the domain language of KéM is hungarian, but the domain language of programming is english, which resulted in this monster.

\[HU] Kérlek nézd el a kevert angol kifejezeséket, ugyan a szerepáték nyelve magyar, de a programozás szakmai nyelve angol.

## Deployment

See deployment repo at: [https://github.com/morbalint/kemkas-deployment](https://github.com/morbalint/kemkas-deployment)

![CI workflow](https://github.com/morbalint/kemkas/actions/workflows/ci.yml/badge.svg)

## Coding readmes

For frontend only see: [Frontend README](./frontend/README.md)

To start development, spin up the docker-compose.yaml file and use yarn to start frontend dev server.

For the first time setup:
```shell
dotnet dev-certs https --clean && \
dotnet dev-certs https --format PEM --no-password -ep ~/.aspnet/https/kemkas.pem --trust
```

Later start the docker compose first and the project launch settings after the DB is up and running.

## E2E with Docker Compose

For a fully containerized end-to-end run (tagged backend image + freshly built frontend/e2e images):

```shell
docker compose -f docker-compose.e2e.yaml up --build --abort-on-container-exit --exit-code-from e2e e2e
```

Use `BACKEND_IMAGE` to select a specific backend tag, and note this compose stack auto-generates TLS certificates for the nginx proxy.
