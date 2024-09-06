

FROM node:20-bookworm-slim

COPY ./packages/backend/server /app
COPY ./packages/frontend/web/dist /app/static
COPY ./packages/frontend/admin/dist /app/static/admin
COPY ./packages/frontend/mobile/dist /app/static/mobile
COPY ./.github/deployment/node/nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
COPY ./.github/deployment/node/affine.nginx.conf /etc/nginx/conf.d/affine.nginx.conf

WORKDIR /app

RUN apt-get update && \
  apt-get install -y --no-install-recommends openssl && \
  rm -rf /var/lib/apt/lists/*

RUN mkdir -p /var/log/nginx && \
  rm /etc/nginx/conf.d/default.conf

EXPOSE 3010


CMD ["node", "--import", "./scripts/register.js", "./dist/index.js"]
