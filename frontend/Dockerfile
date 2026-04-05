FROM node:24.14.1-trixie AS builder

WORKDIR "/src"

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:1.29.7-alpine3.23 AS proxy

LABEL org.opencontainers.image.source = "https://github.com/morbalint/kemkas"

COPY --from=builder "/src/dist" "/usr/share/nginx/html"
COPY ./nginx.conf /etc/nginx/nginx.conf
