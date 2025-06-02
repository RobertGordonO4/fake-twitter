# MTODO:Image high vulnerabilities

# ---- Base Stage ----
FROM node:20-alpine AS base
WORKDIR /usr/src/app
RUN apk add --no-cache g++ make py3-pip
# Install pnpm
RUN npm install -g pnpm

# ---- Dependencies Stage ----
FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# ---- Build Stage ----
FROM base AS builder
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# ---- Release Stage ----
FROM node:20-alpine AS release
WORKDIR /usr/src/app
RUN apk add --no-cache dumb-init
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY package.json .

EXPOSE 3001
ENV NODE_ENV production
# Run the app as a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

CMD ["dumb-init", "node", "dist/main.js"]