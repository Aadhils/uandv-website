# Notifications System (Cross-Cutting)

**API location:** `apps/api/src/modules/notifications/`  
**Worker location:** `apps/worker/src/processors/notifications/`  
**Status:** Architecture approved — not implemented

## Purpose

Multi-channel notification delivery for all platform events — push, email, Telegram, and WhatsApp.

## Channels

| Channel | Provider | Phase | Use cases |
|---------|----------|-------|-----------|
| Push (mobile) | Firebase FCM | Phase 2 | Order updates, chat messages, booking reminders |
| Email | Resend / SendGrid | Phase 1 | Verification, receipts, digests, referral earnings |
| Telegram | Telegram Bot API | Phase 3 | Real-time alerts, admin alerts, opt-in user notifications |
| WhatsApp | WhatsApp Business API | Phase 3 | Order confirmations, booking reminders (opt-in) |

## Architecture

```
Domain event → BullMQ notifications queue → NotificationProcessor
                                                    │
                              ┌─────────────────────┼─────────────────────┐
                              ▼                     ▼                     ▼
                        Firebase FCM            Email (Resend)         Telegram Bot
                              │                     │                     │
                              └─────────────────────┼─────────────────────┘
                                                    ▼
                                              WhatsApp Business
```

## Scope

- User notification preferences (per-channel opt-in/out)
- FCM device token registration and management
- Admin-configurable templates per event type
- Delivery tracking, retry logic, and dead-letter queue
- Rate limiting per channel per user
- In-app notification inbox (PostgreSQL)

## Out of scope

- Domain event generation (each module emits events)
- Chat message content (Module 7 emits `message.created`)

## Key entities

- `NotificationPreference`, `NotificationTemplate`
- `NotificationEvent`, `DeviceToken`, `NotificationInbox`

## Events consumed

All domain events listed in Master Architecture Section 9 that require user notification.

## Phasing

1. **Phase 1:** Email only (transactional)
2. **Phase 2:** Firebase push (mobile)
3. **Phase 3:** Telegram + WhatsApp (opt-in channels)
