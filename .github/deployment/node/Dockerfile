FROM node:20-bookworm-slim

COPY ./packages/backend/server /app
COPY ./packages/frontend/web/dist ./dist
COPY ./packages/frontend/admin/dist ./admin
COPY ./packages/frontend/mobile/dist ./mobile

WORKDIR /app

RUN apt-get update && \
  apt-get install -y --no-install-recommends openssl && \
  rm -rf /var/lib/apt/lists/*

CMD ["node", "--import", "./scripts/register.js", "./dist/index.js"]
