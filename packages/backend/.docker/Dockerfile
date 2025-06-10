FROM node:20-alpine

# Install build dependencies for native modules like bcrypt
RUN apk add --no-cache python3 make g++

RUN npm install -g pnpm

WORKDIR /usr/src/app

# Copy package management files
COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY packages/backend/package.json ./packages/backend/
COPY packages/frontend/package.json ./packages/frontend/

# Install dependencies and force rebuild of native modules
RUN pnpm install --frozen-lockfile
RUN pnpm rebuild bcrypt

# Copy source code (excluding node_modules due to .dockerignore)
COPY . .

# Build the backend
RUN pnpm --filter backend build

# Expose port
EXPOSE 3001

# Run the application
CMD ["pnpm", "--filter", "backend", "run", "dev"]