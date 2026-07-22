# ADR 001 — Approved Technology Stack

> **Status:** Accepted  
> **Date:** 2026-06-30  
> **Deciders:** U&V Platform team

## Context

U&V requires a production-grade stack capable of scaling to millions of users across web, admin, and mobile clients.

## Decisions

| Area | Decision | Rationale |
|------|----------|-----------|
| Authentication | Clerk | Hosted auth, MFA, OAuth, JWT — reduces build time and security burden |
| Backend | NestJS + PostgreSQL + Prisma | Structured modules, guards, DI — scales to large teams and codebases |
| Real-time | Socket.io + Redis adapter | Proven horizontal WebSocket scaling without vendor lock-in |
| AI | OpenAI + Claude | Best-of-both: GPT-4o for speed, Claude for reasoning and long context |
| Admin | Separate Next.js app | Security isolation, independent deploy, no shared cookies |
| Storage | Cloudflare R2 | S3-compatible, zero egress fees, integrated CDN |
| Payments | Razorpay first, Stripe later | India-first launch; provider abstraction allows Stripe for international |
| Search | Meilisearch | Fast faceted search, simple ops, scales to millions of documents |
| Notifications | Firebase + Email + Telegram + WhatsApp | Multi-channel reach for global user base |
| Scale | Millions of users | Stateless API, Redis adapter, read replicas, BullMQ, partitioning path |

## Consequences

- Domain logic lives in NestJS modules (`apps/api/src/modules/`), not standalone packages
- `apps/mobile-api/` is deprecated; mobile consumes `apps/api/v1/*`
- Payment provider interface required from day one (Razorpay + future Stripe)
- AI model router required to select OpenAI vs Claude per task
- Notifications module is a first-class cross-cutting concern with dedicated worker processors
- BullMQ worker app (`apps/worker`) is required from Phase 0, not added later

## Alternatives Considered

- Auth.js — rejected in favor of Clerk for faster launch and hosted MFA
- Hono mobile API — rejected; unified NestJS API serves all clients
- Stripe-only payments — rejected; Razorpay required for India-first launch
- PostgreSQL full-text search — rejected; Meilisearch from start for scale
- Typesense — rejected in favor of Meilisearch (simpler ops, sufficient scale)
