# Module 10 — Referral System

**Package location:** `packages/modules/referrals/`  
**Status:** Architecture only — not implemented

## Purpose

Growth engine — trackable referral links, attribution, commission rules, and reward payouts.

## Scope

- Unique referral codes and shareable links
- Attribution: signup, first purchase, first listing, upgrade
- Configurable commission rules (%, flat, tiered, campaigns)
- Referral dashboard (clicks, conversions, earnings)
- Fraud detection (self-referral, duplicate accounts)
- Admin campaign management

## Out of scope

- User registration (Module 2 — receives attribution cookie/token)
- Money transfer (Module 9 — executes payouts)

## Key entities

- `ReferralCode`, `ReferralLink`, `ReferralEvent`, `ReferralCampaign`
- `ReferralCommission`, `ReferralPayout`, `ReferralFraudFlag`

## Events consumed

- `user.registered`, `order.paid`, `booking.completed`

## Events emitted

- `referral.converted` → payments (commission payout)
