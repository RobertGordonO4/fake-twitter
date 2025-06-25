# Twitter Clone Monorepo

A simplified Twitter-like application built with a modern React frontend, NestJS backend, and MariaDB database. Structured as a pnpm monorepo.

## Features

- 📝 List posts (publicly accessible)
- 👤 User registration and login
- ✨ Authenticated users can:
  - Create new posts
  - Like/unlike posts
  - Delete their own posts
- 📚 Swagger API documentation
- 🔄 Automatic API client generation

## Tech Stack

- **Frontend:** React + Vite, TypeScript, React Router, Axios
- **Backend:** NestJS, TypeScript, TypeORM, Passport.js, JWT, Swagger
- **Database:** MariaDB 11
- **Package Manager:** pnpm workspaces
- **API Generation:** swagger-typescript-api

## Quick Start

### Prerequisites

- **Node.js** v18+
- **pnpm** (`npm install -g pnpm`)
- **MariaDB** (local installation or cloud instance)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd twitter-clone-monorepo
pnpm install
```

### 2. Setup Database

Ensure MariaDB is running and create the database:

```sql
CREATE DATABASE twitter_clone CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'twitter_user'@'localhost' IDENTIFIED BY 'twitter_password';
GRANT ALL PRIVILEGES ON twitter_clone.* TO 'twitter_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Configure Environment

Set up environment files in both packages (see individual package READMEs for details).

### 4. Start Development

```bash
# Start backend first
cd packages/backend
pnpm dev

# In another terminal, generate API client
cd packages/frontend
pnpm generate-api

# Start frontend
pnpm dev
```

### 5. Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001/api
- **Swagger Docs:** http://localhost:3001/api-docs

## Development Scripts

```bash
# Start all services locally
pnpm dev

# Build all packages
pnpm build

# Generate frontend API client
pnpm --filter frontend generate-api
```

## Package Structure

```
twitter-clone-monorepo/
├── packages/
│   ├── frontend/     # React + Vite app
│   └── backend/      # NestJS API
├── package.json      # Root package with workspaces
└── README.md
```

## Individual Package Documentation

- **Frontend Setup:** [packages/frontend/README.md](packages/frontend/README.md)
- **Backend Setup:** [packages/backend/README.md](packages/backend/README.md)

## Environment Configuration

Each package has its own environment configuration. See individual package READMEs for details.

## Database

- **Database:** MariaDB 11 with UTF8MB4 encoding
- **Auto-schema:** TypeORM automatically creates/syncs database schema in development
- **Migrations:** Use TypeORM migrations for production deployments

## Development Workflow

1. **Start Backend:** `cd packages/backend && pnpm dev`
2. **Generate API Client:** `cd packages/frontend && pnpm generate-api`
3. **Start Frontend:** `cd packages/frontend && pnpm dev`
4. **Make Changes:** Edit code, API client regenerates automatically on backend changes

## Production Deployment

- Build both packages: `pnpm build`
- Use TypeORM migrations for database schema management
- Configure production environment variables
- Serve frontend static files and run backend as Node.js service