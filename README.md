# KéMkas

Kard és Mágia karakter alkotó segédlet (https://app.kemkas.hu)

\[EN] Please excuse the Hungish, the domain language of KéM is hungarian, but the domain language of programming is english, which resulted in this monster.

\[HU] Kérlek nézd el a kevert angol kifejezeséket, ugyan a szerepáték nyelve magyar, de a programozás szakmai nyelve angol.

## Deployment

See deployment repo at: [https://github.com/morbalint/kemkas-deployment](https://github.com/morbalint/kemkas-deployment)

![CI workflow](https://github.com/morbalint/kemkas/actions/workflows/ci.yml/badge.svg)

## Coding readmes

For frontend only see: [Frontend README](./Kemkas.Web/frontend/README.md)

To start development, spin up the docker-compose.yaml file and use the launchSettings.json to start the backend and frontend dev servers.

For the first time setup:
1. start the DB from the docker compose (required for the backend)
2. launch the project with the launchSettings file (will generate SSL certs)
3. spin up the proxy from docker compose (needs the SSL certs)

Later start the docker compose first and the project launch settings after the DB is up and running. 
