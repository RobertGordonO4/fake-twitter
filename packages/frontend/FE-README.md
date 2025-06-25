# Frontend (React + Vite)

Modern React frontend built with Vite, TypeScript, and automatic API client generation.

## Tech Stack

- **Build Tool:** Vite (fast, modern bundler)
- **Framework:** React 18 with TypeScript
- **Routing:** React Router v6
- **HTTP Client:** Axios with interceptors
- **API Generation:** swagger-typescript-api
- **Styling:** CSS Modules

## Development Setup

### Prerequisites

- Node.js v18+
- pnpm
- Backend running (for API generation)

### Install Dependencies

```bash
# From the frontend directory
cd packages/frontend
pnpm install
```

### Environment Variables

Create `.env` file in `packages/frontend/`:

```env
# API endpoint (Vite uses VITE_ prefix, not REACT_APP_)
VITE_API_URL=http://localhost:3001
```

**Note:** Vite uses `VITE_` prefix instead of `REACT_APP_` for environment variables.

## Development Commands

```bash
# Start development server
pnpm dev
# → http://localhost:5173 (Vite default port)

# Build for production
pnpm build

# Preview production build
pnpm preview

# Generate API client (requires backend running)
pnpm generate-api

# Type checking
pnpm type-check

# Linting
pnpm lint
```

## API Client Generation

The frontend automatically generates TypeScript API clients from the backend's Swagger specification:

```bash
# Generate API client (backend must be running)
pnpm generate-api
```

**What this does:**
- Fetches Swagger spec from `http://localhost:3001/api-docs-json`
- Generates TypeScript types and interfaces
- Creates `src/services/api/Api.ts` with all backend types
- No external dependencies required!

**Generated files:**
- `src/services/api/Api.ts` - TypeScript types and interfaces
- Integrated into `src/services/apiClient.ts` for easy imports

## Project Structure

```
src/
├── components/          # React components
│   ├── auth/           # Login/Register forms
│   ├── posts/          # Post-related components
│   └── common/         # Shared components
├── pages/              # Page components
├── services/           # API client and utilities
│   ├── api/           # Generated API types
│   └── apiClient.ts   # Configured Axios client
├── styles/            # CSS files
└── types/             # Custom TypeScript types
```

## API Client Usage

```typescript
import { authApi, postsApi, CreatePostDto } from '../services/apiClient';

// Authentication
const { data } = await authApi.login({ username, password });

// Posts
const { data: posts } = await postsApi.getAllPosts();
const { data: newPost } = await postsApi.createPost({ content: "Hello!" });
```

## Authentication

- JWT tokens stored in `localStorage`
- Automatic token injection via Axios interceptors
- Auto-cleanup of expired tokens on 401 responses
- Manual refresh required when token expires

## Development Notes

### TypeScript Configuration

- Strict mode enabled
- Path mapping configured (`@/*` → `src/*`)
- Vite client types included for `import.meta.env`

## Troubleshooting

### API Generation Issues

```bash
# If API generation fails, ensure backend is running
curl http://localhost:3001/api-docs-json

# Clear generated files and regenerate
rm -rf src/services/api/
pnpm generate-api
```

### Environment Variables Not Working

Make sure you're using the `VITE_` prefix and restart the dev server:

```bash
# Stop dev server (Ctrl+C) and restart
pnpm dev
```

### Port Conflicts

Vite defaults to port 5173. If needed, specify a different port:

```bash
pnpm dev --port 3000
```