FROM mcr.microsoft.com/playwright:v1.59.1-noble

LABEL org.opencontainers.image.source = "https://github.com/morbalint/kemkas" 

WORKDIR /work

RUN apt-get update \
	&& apt-get install -y --no-install-recommends libnss3-tools \
	&& rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN chmod +x /work/docker-entrypoint.sh

ENTRYPOINT ["/work/docker-entrypoint.sh"]
CMD ["yarn", "test"]
