# Module 6 — Services Marketplace

**Package location:** `packages/modules/services-marketplace/`  
**Status:** Architecture only — not implemented

## Purpose

Marketplace for services — consulting, appointments, gigs, and project-based work with booking and milestone flows.

## Scope

- Service listing CRUD with packages and pricing models
- Availability calendar and slot booking
- Booking lifecycle: request → accept → deliver → review
- Milestone-based deliverables and escrow releases
- Service reviews and dispute initiation

## Out of scope

- Product catalog (Module 5)
- Generic chat infrastructure (Module 7)
- Payment escrow logic (Module 9 — this module triggers events)

## Key entities

- `Service`, `ServicePackage`, `ServiceAvailability`
- `Booking`, `BookingMilestone`, `ServiceReview`

## Events emitted

- `booking.requested`, `booking.accepted`, `booking.completed`
- `booking.completed` → payments (escrow release), referrals
