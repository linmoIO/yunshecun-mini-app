FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm AS build

WORKDIR /app

COPY code/backend/package.json code/backend/package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY code/backend/prisma ./prisma
RUN npx prisma generate

FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm

WORKDIR /app
ENV NODE_ENV=development

COPY --from=build /app/node_modules ./node_modules
COPY code/backend/server.js ./
COPY code/backend/src ./src
COPY code/backend/public ./public
COPY code/backend/prisma ./prisma

RUN mkdir -p uploads/images uploads/videos \
  && chown -R node:node /app

USER node
EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=5s --retries=5 CMD ["node", "-e", "require('http').get('http://127.0.0.1:3000/api/health', (res) => process.exit(res.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"]

CMD ["node", "server.js"]
