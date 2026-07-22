# Module 4 — Business Profiles

**Package location:** `packages/modules/business-profiles/`  
**Status:** Architecture only — not implemented

## Purpose

Canonical business identity on U&V — registration, profile, verification, and team management.

## Scope

- Business onboarding wizard
- Profile: name, slug, logo, description, categories, location
- Verification workflow (pending → approved/rejected)
- Team invites and role assignment
- Public profile API for marketing pages
- Stripe Connect onboarding handoff

## Out of scope

- Product listings (Module 5)
- Service listings (Module 6)
- Payment processing (Module 9)

## Key entities

- `Business`, `BusinessCategory`, `BusinessLocation`
- `BusinessVerification`, `BusinessMember`, `BusinessSettings`

## Events emitted

- `business.created` → admin verification queue
- `business.verified` → notifications, profile badge update
