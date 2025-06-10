FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /usr/src/app

# Copy package management files
COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY packages/backend/package.json ./packages/backend/
COPY packages/frontend/package.json ./packages/frontend/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code (excluding node_modules due to .dockerignore)
COPY . .

# Expose port
EXPOSE 3000

# Run the application
CMD ["pnpm", "--filter", "frontend", "run", "dev"]