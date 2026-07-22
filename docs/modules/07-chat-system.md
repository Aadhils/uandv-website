# Module 7 — Chat System (Socket.io)

**Location:** `apps/api/src/modules/chat/` + `apps/api/src/gateways/chat.gateway.ts`  
**Status:** Architecture approved — not implemented

## Purpose

Real-time messaging at scale via Socket.io with Redis adapter for horizontal scaling across multiple API pods.

## Scope

- 1:1 and group conversations
- Context-linked threads (order, booking, business inquiry)
- Message types: text, image, file (R2 attachments)
- Read receipts, typing indicators, presence (Redis TTL)
- Message persistence (PostgreSQL, partitioned by month at scale)
- Moderation flags → admin queue
- Triggers notification jobs on new messages

## Real-time architecture

```
Client ──WebSocket──► ChatGateway (Socket.io)
                         │
                   @socket.io/redis-adapter
                         │
              all API pods receive fan-out
                         │
                   PostgreSQL (messages)
                         │
                   BullMQ → notifications queue
```

## Out of scope

- AI assistant conversations (Module 8)
- User identity (Clerk + Module 2)

## Key entities

- `Conversation`, `ConversationParticipant`, `Message`
- `MessageAttachment`, `ReadReceipt`, `ChatReport`

## Scaling notes

- Redis adapter required from day one (no single-pod assumption)
- Message table partitioned by month at 500K+ users
- Presence stored in Redis with TTL (not PostgreSQL)

## Events emitted

- `message.created` → notifications
- `message.reported` → admin moderation queue
