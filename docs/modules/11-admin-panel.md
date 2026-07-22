# Module 11 — Admin Panel

**App location:** `apps/admin/`  
**Status:** Architecture only — not implemented

## Purpose

Internal operations console for U&V staff — moderation, verification, finance, configuration, and analytics.

## Scope

- User and business management (search, suspend, audit-logged actions)
- Business verification queue
- Marketplace and services moderation
- Chat report queue
- Financial dashboard (GMV, fees, payouts)
- Referral campaign management
- AI knowledge base and prompt editor
- Platform settings and feature flags
- Full audit log

## Out of scope

- Domain business logic (calls module admin APIs)

## Security requirements

- Separate deployment from public web
- Mandatory MFA for admin roles
- All actions audit-logged
- Optional IP allowlist

## Planned routes

See `docs/architecture/MASTER_ARCHITECTURE.md` Section 7, Module 11.
