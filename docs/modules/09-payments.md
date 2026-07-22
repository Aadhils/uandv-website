# Module 9 — Payments (Razorpay → Stripe)

**Location:** `apps/api/src/modules/payments/`  
**Status:** Architecture approved — not implemented

## Purpose

All money movement with a provider abstraction layer — Razorpay for India-first launch, Stripe for international expansion.

## Scope

### Phase 2 — Razorpay (active)
- One-time product checkout
- Service booking payments
- Platform subscription billing (Free / Pro / Enterprise)
- Razorpay webhook processing via BullMQ
- Refunds and invoice generation

### Phase 5+ — Stripe Connect (international)
- Marketplace seller payouts
- International currency support
- Stripe Connect onboarding for businesses

## Provider abstraction

```
PaymentProvider (interface)
├── RazorpayProvider   ← Phase 2 (active)
└── StripeProvider     ← Phase 5+ (international)
```

All payment operations go through the interface. Switching or adding providers requires no changes to marketplace or services modules.

## Out of scope

- Order/booking state machines (Modules 5 & 6)
- Referral rule definition (Module 10)

## Key entities

- `PaymentAccount`, `PaymentIntent`, `Transaction`, `Payout`
- `Subscription`, `Invoice`, `Refund`, `PlatformFee`

## Events

**Consumed:** `order.placed`, `booking.completed`, `referral.converted`  
**Emitted:** `payment.succeeded`, `payout.completed`, `refund.processed`

## Event flow

```
OrderPlaced → payments.createOrder → Razorpay checkout
    → Razorpay webhook → BullMQ payments queue → OrderPaid → notifications
```
