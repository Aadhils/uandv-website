# Module 5 — Marketplace (Products)

**Package location:** `packages/modules/marketplace/`  
**Status:** Architecture only — not implemented

## Purpose

E-commerce marketplace for physical and digital products sold by businesses on U&V.

## Scope

- Product CRUD with variants, images, inventory
- Categories, search, and filtering
- Shopping cart
- Order lifecycle management
- Product reviews and ratings

## Out of scope

- Payment capture (Module 9)
- Service bookings (Module 6)
- Business identity (Module 4)

## Key entities

- `Product`, `ProductVariant`, `ProductImage`, `Category`
- `Cart`, `CartItem`, `Order`, `OrderItem`, `ProductReview`

## Events emitted

- `order.placed` → payments, chat, referrals
- `order.fulfilled` → notifications
