# Module 2 — Authentication (Clerk)

**Backend location:** `apps/api/src/modules/auth/`  
**Frontend location:** `apps/web/app/(auth)/` + Clerk components  
**External provider:** Clerk  
**Status:** Architecture approved — not implemented

## Purpose

Identity and access management via Clerk, with platform user sync and RBAC enforced in NestJS.

## Scope

- Clerk-hosted sign-up, sign-in, OAuth (Google, Apple, etc.)
- MFA via Clerk
- JWT validation in NestJS on every protected route
- Webhook sync: Clerk events → PostgreSQL `users` table
- RBAC: roles in Clerk metadata + PostgreSQL `user_roles`
- Business membership linking
- Admin role enforcement for `apps/admin`

## NestJS auth module owns

- Clerk webhook handler (`user.created`, `user.updated`, `user.deleted`)
- User sync service (Clerk ID ↔ internal user ID)
- `ClerkAuthGuard` and `@Roles()` decorator
- Internal user profile extensions not stored in Clerk

## Out of scope

- Business profile data (Module 4)
- Payment methods (Module 9)

## Key entities

- `User` (clerk_id, email, name, avatar, role)
- `UserRole`, `BusinessMembership`, `AuthAuditLog`

## Integration flow

```
User signs in → Clerk issues JWT → Client sends JWT to NestJS API
                                         → ClerkAuthGuard validates
                                         → RBAC guard checks role
                                         → Service layer checks business ownership
```

## Consumers

All apps and modules depend on Clerk JWT + NestJS guards for identity and access control.
