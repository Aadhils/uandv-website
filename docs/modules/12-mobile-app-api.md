# Module 12 — API Layer (NestJS — Web + Mobile)

**Location:** `apps/api/`  
**Status:** Architecture approved — not implemented

## Purpose

Unified NestJS backend serving web dashboard, admin panel, and mobile apps. Replaces the initial `apps/mobile-api/` scaffold.

## Scope

- Versioned REST API (`/v1/*`)
- Socket.io WebSocket gateway (chat, AI streaming)
- OpenAPI 3.1 spec (auto-generated via `@nestjs/swagger`)
- Clerk JWT validation on all protected routes
- Redis-backed rate limiting (per-user and per-IP)
- Request validation (class-validator + Zod from `packages/shared`)
- Idempotency key support on mutating endpoints
- Presigned R2 upload URL generation
- K8s health and readiness probes

## Out of scope

- Business logic (delegates to NestJS domain modules)
- Frontend rendering (web and admin are separate Next.js apps)

## Endpoint groups

```
/v1/users/*           Profile, settings, device tokens
/v1/businesses/*       CRUD, team, public profile
/v1/products/*         Browse, search, cart, orders
/v1/services/*         Browse, book, manage bookings
/v1/chat/*             Conversations, messages (REST history)
/v1/ai/*               Assistant chat (SSE stream)
/v1/payments/*         Checkout, history, subscriptions
/v1/referrals/*        Code, stats, share links
/v1/notifications/*    Preferences, inbox
/v1/search/*           Unified Meilisearch query
/v1/admin/*            Admin-only (role-guarded)
/ws                    Socket.io gateway
/health                Liveness probe
/ready                 Readiness probe
```

## API standards

- **Pagination:** cursor-based (`?cursor=`, `?limit=`)
- **Errors:** `{ "statusCode", "error", "message", "details" }`
- **Auth:** `Authorization: Bearer <clerk_jwt>`
- **Idempotency:** `Idempotency-Key` header on POST/PATCH/DELETE

## Clients

| Client | Auth | Transport |
|--------|------|-----------|
| Web dashboard | Clerk session JWT | REST + Socket.io |
| Admin panel | Clerk admin JWT | REST |
| iOS / Android | Clerk mobile JWT | REST + Socket.io |
