FROM node:21.4-bookworm as builder

WORKDIR "/src"

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install --frozen-lockfile

COPY . .

RUN ./compile-less.sh
RUN yarn build

FROM nginx:latest as proxy

COPY --from=builder "/src/build" "/usr/share/nginx/html"
COPY ./nginx.conf /etc/nginx/nginx.conf
