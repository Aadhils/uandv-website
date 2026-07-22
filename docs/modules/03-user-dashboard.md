# Module 3 — User Dashboard

**App location:** `apps/web/app/(dashboard)/`  
**Status:** Architecture only — not implemented

## Purpose

Authenticated workspace where users manage their activity, businesses, orders, messages, and settings.

## Scope

- Personal overview and notifications
- Business switcher (multi-business users)
- Embedded views from domain modules (orders, chat, AI, referrals)
- Account and security settings

## Out of scope

- Domain business logic (orchestrates module APIs, does not own data)

## Planned routes

| Route | Description |
|-------|-------------|
| `/dashboard` | Overview |
| `/dashboard/orders` | Order and booking history |
| `/dashboard/messages` | Chat inbox |
| `/dashboard/ai` | AI assistant |
| `/dashboard/referrals` | Referral stats and links |
| `/dashboard/settings` | Account settings |
| `/dashboard/business/*` | Business management |

## Dependencies

All domain modules expose dashboard widgets and APIs consumed here.
