# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.21

# --- base stage ---
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /heimr-server
COPY package.json package-lock.json ./

# --- development stage ---
FROM base AS dev
RUN npm install
#COPY --from=base /app/node_modules ./node_modules
# Install dependencies (npm ci for deterministic builds)
#COPY --link package.json package-lock.json ./
#RUN --mount=type=cache,target=/root/.npm \
#    npm ci
# Files are linked as volume here
# Copy the rest of the application source code

EXPOSE 3000

# --- production-build stage ---
FROM base AS production-build
RUN npm install --omit=dev
#COPY --from=production-build /app/node_modules ./node_modules
# Copy the source code
COPY app ./app
COPY i18n ./i18n
COPY public ./public
COPY nuxt.config.ts tsconfig.json .env .env.docker ./

RUN npm run build && npm cache clean --force

# Remove dev dependencies to reduce image size
RUN npm prune --production

# Create non-root user
RUN addgroup --system --gid 1001 appuser && \
    adduser --system --uid 1001 --ingroup appuser appuser

#RUN find . \( ! -name 'service-account-key.json' \) -maxdepth 1 -type f -exec rm -rf {} + && \
#    find . \( ! -name '.output' -a ! -name 'node_modules' -a ! -name '.' -a ! -name '..' \) -maxdepth 1 -type d -exec rm -rf {} +

FROM production-build AS production
# Copy only the built output and production dependencies
COPY --from=production-build /heimr-server/.output ./.output
#COPY --from=production-build /heimr-server/service-account-key.json ./service-account-key.json
COPY --from=production-build /heimr-server/package.json ./

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"

USER appuser

EXPOSE 3000