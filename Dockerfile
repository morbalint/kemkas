FROM node as builder

WORKDIR "/src"

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM nginx as proxy

# COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder "/src/build" "/usr/share/nginx/html"