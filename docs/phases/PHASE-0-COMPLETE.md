# Phase 0 — Foundation Complete

> **Status:** Complete — awaiting approval before Phase 1  
> **Date:** 2026-06-30

## What Was Built

Phase 0 delivers a production-ready foundation with no business features (no marketplace, chat, payments, or AI).

### Monorepo

- **pnpm workspaces** + **Turborepo** orchestration
- Packages: `@uandv/database`, `@uandv/shared`, `@uandv/config`
- Apps: `@uandv/api`, `@uandv/web`, `@uandv/worker`

### NestJS Backend (`apps/api`)

| Feature | Implementation |
|---------|----------------|
| REST API | NestJS 11 with `/v1` prefix |
| Health | `GET /health` (liveness), `GET /ready` (DB + Redis) |
| Logging | `nestjs-pino` structured JSON logs, request IDs |
| Error handling | Global exception filter with consistent error envelope |
| Security | Helmet, CORS allowlist, rate limiting, validation pipe |
| Swagger | `GET /docs` (non-production only) |
| Auth | Clerk JWT guard on all routes (public routes opt-out) |
| Webhooks | `POST /webhooks/clerk` with Svix signature verification |
| Users | `GET /v1/users/me` protected endpoint |

### PostgreSQL + Prisma (`packages/database`)

- `User` model (Clerk sync)
- `AuthAuditLog` model (security events)
- Initial migration: `20250630000000_init`

### Clerk Authentication

- Web: `@clerk/nextjs` provider + middleware (`apps/web`)
- API: JWT verification via `@clerk/backend`
- Webhook user sync (create, update, soft-delete)
- RBAC-ready via `UserRole` enum and `@Roles()` decorator

### Redis

- Global `RedisModule` with health check
- Used by readiness probe; ready for BullMQ/Socket.io in later phases

### Worker (`apps/worker`)

- Minimal scaffold connecting to Redis
- BullMQ dependency installed; processors added in Phase 1+

### Docker

- `infrastructure/docker/docker-compose.yml`
- PostgreSQL 16 + Redis 7 with health checks and persistent volumes

### CI/CD

- `.github/workflows/ci.yml`
- Runs on push/PR to `main`: install, prisma generate, migrate, typecheck, build, test

### Environment Variables

- Root `.env.example` with all required variables documented
- Per-app `.env.example` files
- Zod validation in `@uandv/shared` — app fails fast on missing/invalid env

## Project Structure

```
apps/
  api/          NestJS backend
  web/          Next.js landing + Clerk auth
  worker/       Background worker scaffold
packages/
  database/     Prisma schema + client
  shared/       Env validation, types, constants
  config/       Shared TypeScript configs
infrastructure/
  docker/       docker-compose.yml
  k8s/          (empty — for production manifests in later phases)
  ci/           (CI defined in .github/workflows/)
docs/
  architecture/ Master architecture + ADRs
  phases/       This document
```

## How to Run Locally

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker Desktop

### Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Copy environment variables
cp .env.example .env
# Edit .env with your Clerk keys from https://dashboard.clerk.com

# 3. Start infrastructure
pnpm docker:up

# 4. Generate Prisma client and run migrations
pnpm db:generate
pnpm db:migrate:deploy

# 5. Start all apps in development
pnpm dev
```

### Services

| Service | URL |
|---------|-----|
| Web (landing) | http://localhost:3000 |
| API | http://localhost:3001 |
| API health | http://localhost:3001/health |
| API readiness | http://localhost:3001/ready |
| API docs (dev) | http://localhost:3001/docs |
| PostgreSQL | localhost:5432 |
| Redis | localhost:6379 |

### Clerk Setup

1. Create a Clerk application at https://dashboard.clerk.com
2. Copy `CLERK_SECRET_KEY` and `CLERK_PUBLISHABLE_KEY` to `.env`
3. Add webhook endpoint: `https://your-api-url/webhooks/clerk`
   - Local dev: use ngrok or Clerk CLI forwarding
   - Events: `user.created`, `user.updated`, `user.deleted`
4. Copy webhook signing secret to `CLERK_WEBHOOK_SECRET`

## API Endpoints (Phase 0)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | Public | Liveness probe |
| GET | `/ready` | Public | Readiness probe (DB + Redis) |
| POST | `/webhooks/clerk` | Public (Svix signed) | Clerk user sync |
| GET | `/v1/users/me` | Bearer JWT | Current user profile |

## Security Checklist

- [x] Clerk JWT validation on all protected routes
- [x] Webhook signature verification (Svix)
- [x] Helmet security headers
- [x] CORS origin allowlist
- [x] Rate limiting (100 req/min default)
- [x] Input validation (whitelist + forbid unknown fields)
- [x] Structured logging with sensitive field redaction
- [x] Consistent error responses (no stack traces in production)
- [x] Environment variable validation at startup
- [x] Soft-delete for users (no hard delete on webhook)
- [x] Auth audit log for webhook events

## What Is NOT Built (By Design)

- Marketplace, Services, Chat, AI, Payments, Referrals
- Admin panel (`apps/admin/` — scaffold only)
- Meilisearch, R2, Razorpay, Firebase notifications
- Business profiles, dashboard routes

These are Phase 1+ scope.

## Next Step

**Reply with approval to begin Phase 1:**
- Business profiles + R2 uploads
- User dashboard shell
- Admin panel shell
- Meilisearch setup
- Email notifications
