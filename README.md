# Twitter Clone Monorepo (React + NestJS + MariaDB)

This project is a simplified mock of a Twitter-like application built with a React frontend, NestJS backend, and MariaDB database, all containerized using Docker. It's structured as a pnpm monorepo.

## Features

- List posts (publicly accessible)
- User registration and login (simple, app-specific accounts)
- Authenticated users can:
  - Add new posts
  - Like posts
  - Delete their own posts (Note: Current implementation allows any authenticated user to delete any post; this would need refinement for user-specific deletion)
- Swagger API documentation for the backend
- API client generation for the frontend using `swagger-typescript-api`

## Tech Stack

- **Frontend:** React, TypeScript, React Router, Axios, `swagger-typescript-api`
- **Backend:** NestJS, TypeScript, TypeORM (for MariaDB), Passport.js (for authentication), JWT, Swagger
- **Database:** MariaDB
- **Package Manager:** pnpm (with workspaces)
- **Containerization:** Docker, Docker Compose

## Prerequisites

- Node.js (v18+ recommended, for pnpm compatibility and backend/frontend needs)
- pnpm (Install globally: `npm install -g pnpm`)
- Docker Desktop (or Docker Engine + Docker Compose)

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd twitter-clone-monorepo
   ```

2. **Install dependencies for all packages:**
   From the root directory (`twitter-clone-monorepo`):
   ```bash
   pnpm install
   ```
   This will install dependencies for the root, `packages/backend`, and `packages/frontend`.

3. **Environment Variables:**
   
   **Backend:**
   Copy `packages/backend/.env.example` to `packages/backend/.env` (if an example is provided, otherwise create it).
   The `.env` file in `packages/backend` should look like this for local development (if running backend outside Docker):
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=twitter_user
   DB_PASSWORD=twitter_password
   DB_NAME=twitter_clone
   JWT_SECRET=YOUR_VERY_SECRET_KEY_CHANGE_ME_LOCAL
   JWT_EXPIRATION=3600s
   PORT=3001
   ```
   *Note: When using `docker-compose`, these values (especially database connection settings) are overridden by the `docker-compose.yml` environment settings.*

   **Frontend:**
   Copy `packages/frontend/.env.example` to `packages/frontend/.env` (if an example is provided, otherwise create it).
   The `.env` file in `packages/frontend` should look like this:
   ```env
   REACT_APP_API_URL=http://localhost:3001/api
   ```

## Running the Application

### Using Docker (Recommended)

This is the simplest way to get everything up and running.

1. **Build and start all services:**
   From the root directory (`twitter-clone-monorepo`):
   ```bash
   docker-compose up --build -d
   ```
   The `-d` flag runs the containers in detached mode.

2. **Access the application:**
   - **Frontend:** `http://localhost:3000`
   - **Backend API:** `http://localhost:3001/api`
   - **Swagger API Docs:** `http://localhost:3001/api-docs`
   - **Swagger JSON Spec:** `http://localhost:3001/api-docs-json` (Used for API client generation)

3. **Generate Frontend API Client (after backend is running via Docker):**
   If you haven't generated the API client yet, or if the API has changed:
   ```bash
   pnpm --filter frontend generate-api
   ```
   Or, navigate to the frontend package and run it:
   ```bash
   cd packages/frontend
   pnpm generate-api
   cd ../..
   ```
   *This step assumes the backend is running and `http://localhost:3001/api-docs-json` is accessible.* If you had manually created API client files, delete `packages/frontend/src/services/api/` before running this.

4. **To stop the services:**
   ```bash
   docker-compose down
   ```

### Local Development (Without Docker, for individual services)

You can also run the frontend and backend separately for development. Ensure MariaDB is running and accessible (e.g., a local MariaDB instance or a Dockerized one started independently).

1. **Start Backend (NestJS):**
   ```bash
   cd packages/backend
   # Ensure .env has database connection settings pointing to your local/accessible MariaDB
   pnpm dev
   ```
   The backend will typically run on `http://localhost:3001`.

2. **Start Frontend (React):**
   In a new terminal:
   ```bash
   cd packages/frontend
   # Ensure .env has REACT_APP_API_URL or setupProxy.js is configured
   pnpm start
   ```
   The frontend will typically run on `http://localhost:3000`.
   The `setupProxy.js` file in `packages/frontend/src` is configured to proxy API requests from `/api` on the React dev server to `http://localhost:3001` (your backend).

3. **Generate Frontend API Client (if backend is running locally):**
   Ensure the backend is running and providing the Swagger JSON at `http://localhost:3001/api-docs-json`.
   ```bash
   pnpm --filter frontend generate-api
   ```

## Database Information

- **Database:** MariaDB 11
- **Default Database:** `twitter_clone`
- **Default User:** `twitter_user`
- **Character Set:** UTF8MB4 (full Unicode support)
- **Port:** 3306 (standard MariaDB/MySQL port)

The database schema is automatically created and synchronized by TypeORM when running in development mode. In production, you should use TypeORM migrations for better control over schema changes.

## Available pnpm Scripts (Root `package.json`)

- `pnpm dev`: Runs `dev` script in both `backend` and `frontend` packages concurrently (for local development)
- `pnpm build`: Runs `build` script in both `backend` and `frontend` packages
- `pnpm start:docker`: Equivalent to `docker-compose up --build`
- `pnpm stop:docker`: Equivalent to `docker-compose down`

Check `package.json` files within `packages/backend` and `packages/frontend` for more specific scripts.