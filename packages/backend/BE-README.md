# Backend (NestJS API)

RESTful API built with NestJS, TypeORM, and MariaDB with JWT authentication and Swagger documentation.

## Tech Stack

- **Framework:** NestJS with TypeScript
- **Database:** MariaDB 11 with TypeORM
- **Authentication:** Passport.js + JWT
- **Documentation:** Swagger/OpenAPI 3
- **Validation:** class-validator + class-transformer
- **Security:** CORS, helmet, rate limiting

## Development Setup

### Prerequisites

- Node.js v18+
- pnpm
- MariaDB instance (local or cloud)

### Install Dependencies

```bash
# From the backend directory
cd packages/backend
pnpm install
```

### Environment Variables

Create `.env` file in `packages/backend/`:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=twitter_user
DB_PASSWORD=twitter_password
DB_NAME=twitter_clone

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRATION=3600s

# Server Configuration
PORT=3001
NODE_ENV=development
```

## Development Commands

```bash
# Start development server (with auto-reload)
pnpm dev
# → http://localhost:3001

# Build for production
pnpm build

# Start production server
pnpm start

# Database operations
pnpm migration:generate <name>  # Generate migration
pnpm migration:run              # Run pending migrations
pnpm migration:revert           # Revert last migration

# Testing
pnpm test            # Unit tests
pnpm test:e2e        # End-to-end tests
pnpm test:cov        # Test coverage
```

## API Documentation

### Swagger UI
- **Interactive Docs:** http://localhost:3001/api-docs
- **JSON Spec:** http://localhost:3001/api-docs-json

### Authentication Endpoints

```http
POST /api/auth/register
POST /api/auth/login
```

### Posts Endpoints

```http
GET    /api/posts           # List all posts (public)
POST   /api/posts           # Create post (auth required)
PATCH  /api/posts/:id/like  # Like/unlike post (auth required)
DELETE /api/posts/:id       # Delete post (auth required)
```

## Database Schema

### Users Table
```sql
users (
  _id VARCHAR(36) PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt DATETIME,
  updatedAt DATETIME
)
```

### Posts Table
```sql
posts (
  id VARCHAR(36) PRIMARY KEY,
  content TEXT(280) NOT NULL,
  likes INT DEFAULT 0,
  createdAt DATETIME,
  updatedAt DATETIME
)
```

## Authentication

### JWT Configuration
- **Algorithm:** HS256
- **Default Expiration:** 1 hour (`3600s`)
- **Storage:** Client stores token in localStorage
- **Headers:** `Authorization: Bearer <token>`

### Security Features
- Password hashing with bcrypt
- JWT token validation on protected routes
- CORS configuration for frontend access
- Rate limiting on authentication endpoints

## Project Structure

```
src/
├── auth/              # Authentication module
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   └── dto/           # Login/Register DTOs
├── posts/             # Posts module
│   ├── posts.controller.ts
│   ├── posts.service.ts
│   ├── post.entity.ts
│   └── dto/           # Create/Update Post DTOs
├── users/             # Users module
│   ├── user.entity.ts
│   └── users.service.ts
├── config/            # Configuration files
└── main.ts           # Application bootstrap
```

## Database Operations

### Development (Auto-sync)
TypeORM automatically creates and updates database schema in development mode.

### Production (Migrations)
For production, use TypeORM migrations:

```bash
# Generate migration after entity changes
pnpm migration:generate AddNewColumn

# Apply pending migrations
pnpm migration:run

# Revert last migration if needed
pnpm migration:revert
```

## Configuration

### CORS Setup
Configured to allow requests from frontend (`http://localhost:5173`).

### Swagger Configuration
- **Title:** Twitter Clone API
- **Version:** 1.0
- **Tags:** Auth, Posts
- **Security:** JWT Bearer token

### TypeORM Configuration
- **Type:** MariaDB
- **Charset:** UTF8MB4 (full Unicode support)
- **Synchronize:** `true` in development, `false` in production
- **Logging:** Enabled in development

## Troubleshooting

### Database Connection Issues

```bash
# Check if MariaDB is running and accessible
mysql -h localhost -u twitter_user -p twitter_clone

# Verify database credentials in .env file
# Ensure database and user exist
```

### JWT Issues

```bash
# Check if JWT_SECRET is set
echo $JWT_SECRET

# Verify token format in requests
# Should be: Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Swagger Not Loading

```bash
# Ensure server is running
curl http://localhost:3001/api-docs-json

# Check for CORS errors in browser console
# Verify frontend origin is allowed in CORS config
```

### Port Conflicts

If port 3001 is in use, change in `.env`:

```env
PORT=3002
```

Don't forget to update the frontend's `VITE_API_URL` accordingly.

## API Testing

### Using curl

```bash
# Register user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"password123"}'

# Login (get token)
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"password123"}'

# Create post (with token)
curl -X POST http://localhost:3001/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"content":"Hello world!"}'
```

### Using Swagger UI
Visit http://localhost:3001/api-docs for interactive API testing with built-in authentication support.