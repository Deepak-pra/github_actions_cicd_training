# syntax=docker/dockerfile:1

# ============================================================
# Stage 1: Install production dependencies
# ============================================================
FROM node:20-alpine AS dependencies

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev \
    && npm cache clean --force


# ============================================================
# Stage 2: Create the final runtime image
# ============================================================
FROM node:20-alpine AS runtime

ARG APP_VERSION=local

WORKDIR /app

# npm is not required in the running container.
# Remove npm and its bundled packages from the final image.
RUN rm -rf /usr/local/lib/node_modules/npm \
    && rm -f /usr/local/bin/npm \
    && rm -f /usr/local/bin/npx

COPY --from=dependencies --chown=node:node /app/node_modules ./node_modules

COPY --chown=node:node src ./src

ENV NODE_ENV=production
ENV PORT=3000
ENV APP_VERSION=${APP_VERSION}

EXPOSE 3000

USER node

CMD ["node", "src/server.js"]