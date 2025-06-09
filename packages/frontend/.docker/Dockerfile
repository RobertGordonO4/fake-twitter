FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /usr/src/app

# Copy all manifest files
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY packages/backend/package.json ./packages/backend/
COPY packages/frontend/package.json ./packages/frontend/

# Install ALL dependencies for the entire workspace
RUN pnpm install

# Copy the entire monorepo source code into the image.
COPY . .

# The CMD will now run the dev command directly.
CMD ["pnpm", "--filter", "frontend", "run", "dev"]