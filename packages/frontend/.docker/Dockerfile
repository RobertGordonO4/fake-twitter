# ---- Base Stage ----
FROM node:20-alpine AS base
WORKDIR /usr/src/app
RUN npm install -g pnpm # Install pnpm

# ---- Dependencies Stage ----
FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---- Build Stage ----
FROM base AS builder
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
# If API generation is part of the build:
# RUN pnpm generate-api # Ensure backend is accessible during build or commit generated files
RUN pnpm run build

# ---- Release Stage ----
FROM nginx:1.25-alpine AS release
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]