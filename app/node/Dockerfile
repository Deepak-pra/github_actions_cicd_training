# syntax=docker/dockerfile:1

FROM node:20-alpine AS dependencies

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev \
    && npm cache clean --force


FROM node:20-alpine AS runtime

ARG APP_VERSION=local

WORKDIR /app

COPY --from=dependencies --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node src ./src

ENV NODE_ENV=production
ENV PORT=3000
ENV APP_VERSION=${APP_VERSION}

EXPOSE 3000

USER node

CMD ["node", "src/server.js"]