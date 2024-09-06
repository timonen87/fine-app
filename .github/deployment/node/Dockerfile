FROM node:20-bookworm-slim

COPY ./packages/backend/server /app

WORKDIR /app

RUN apt-get update && \
  apt-get install -y --no-install-recommends openssl && \
  rm -rf /var/lib/apt/lists/*





FROM openresty/openresty:1.25.3.2-0-buster

WORKDIR /app
COPY ./packages/frontend/web/dist ./dist
COPY ./packages/frontend/admin/dist ./admin
# COPY ./packages/frontend/mobile/dist ./mobile
COPY ./.github/deployment/node/nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
COPY ./.github/deployment/node/affine.nginx.conf /etc/nginx/conf.d/affine.nginx.conf

RUN mkdir -p /var/log/nginx && \
  rm /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["node", "--import", "./scripts/register.js", "./dist/index.js"]
# CMD ["/usr/local/openresty/bin/openresty", "-g", "daemon off;"]
