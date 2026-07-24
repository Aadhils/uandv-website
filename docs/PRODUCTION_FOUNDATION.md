# Sprint 3.2.1 — Production Foundation

## 1. What is now truly production-ready

- **Contact + service enquiry** → `POST /api/contact` (Zod validation, honeypot, IP/email rate limit, PostgreSQL `enquiries`, Resend team + customer acknowledgement, `UV-XXXXXX` reference)
- **Clerk auth** on `/signup`, `/login`, `/forgot-password`, protected `/dashboard` + `/api/me/*` (when Clerk keys are set)
- **PostgreSQL user sync** via Clerk webhook `POST /api/webhooks/clerk` + fallback upsert on first dashboard/`/api/me` visit
- **Customer dashboard home + profile** — real name, account type, profile fields, own enquiries + status (CUSTOMER only)
- Vendor/Partner signup accepted → `/signup/pending` (under review), not a full workspace

## 2. What remains demo-only

- All `/demo/*` product demos (mock auth / mock data)
- Most `/dashboard/*` modules beyond home + profile (projects, payments, agreements, Business OS, etc.)
- `/admin/*`, `/employee/*`, `/vendor/*` UI (not production auth for this sprint)
- Public `/login/admin`, `/login/employee`, `/login/vendor` entry points (disabled / not live Clerk workspaces)

## 3. Database models added or changed

| Model | Notes |
|-------|--------|
| `User` | Extended: `fullName`, `mobile`, `accountType` (`CUSTOMER` \| `VENDOR` \| `PARTNER`). External id field remains `clerkId` (maps to product “clerkUserId”). Internal `role` is never set from signup. |
| `CustomerProfile` | New: `companyName`, `city`, `state`, `businessType` |
| `Enquiry` | New: `reference`, optional `userId`, contact fields, `status` (`NEW` \| `CONTACTED` \| `QUALIFIED` \| `CLOSED`) |
| Enums | `AccountType`, `EnquiryStatus` |

Migration folder: `packages/database/prisma/migrations/20260724000000_customer_enquiries`

## 4. Prisma migration command

```bash
# Generate client
pnpm --filter @uandv/database db:generate

# Apply migrations (CI / production)
pnpm --filter @uandv/database db:migrate:deploy

# Local interactive migrate (dev)
pnpm --filter @uandv/database db:migrate
```

Requires `DATABASE_URL`.

## 5. Clerk setup required

1. Create a Clerk application.
2. Paths: sign-in `/login`, sign-up `/signup`; after sign-in/up → `/dashboard`.
3. Enable email verification + password reset (Clerk defaults).
4. Webhook: `https://<domain>/api/webhooks/clerk`  
   Events: `user.created`, `user.updated`, `user.deleted`  
   Secret → `CLERK_WEBHOOK_SECRET`
5. Copy publishable + secret keys into Vercel / `.env.local`.

**Fallback:** if webhook is not wired yet, `ensureDbUser()` upserts on first authenticated dashboard/`/api/me` visit. Webhook is still recommended.

## 6. Resend setup required

1. Create Resend API key (`RESEND_API_KEY`).
2. Verify sending domain (or temporary onboarding sender).
3. Set `RESEND_FROM_EMAIL` and `CONTACT_TO_EMAIL` (business inbox).

## 7. Vercel environment variables required

| Variable | Public? |
|----------|---------|
| `DATABASE_URL` | No |
| `RESEND_API_KEY` | No |
| `RESEND_FROM_EMAIL` | No |
| `CONTACT_TO_EMAIL` | No |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes |
| `CLERK_SECRET_KEY` | No |
| `CLERK_WEBHOOK_SECRET` | No |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/login` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/signup` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | `/dashboard` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | `/dashboard` |
| `NEXT_PUBLIC_SITE_URL` | Recommended |

Never put `RESEND_API_KEY`, `CLERK_SECRET_KEY`, `CLERK_WEBHOOK_SECRET`, or `DATABASE_URL` behind `NEXT_PUBLIC_*`.

Placeholders: root `.env.example` and `apps/web/.env.example`.

## 8. Routes tested (build / typecheck / lint)

Verified locally:

- `pnpm --filter @uandv/database db:generate` + `prisma validate` (with `DATABASE_URL`)
- `pnpm --filter @uandv/web typecheck`
- `pnpm --filter @uandv/web lint`
- `pnpm --filter @uandv/web build` (success)

Manual / env-dependent (requires live Clerk + Postgres + Resend):

| Route | Expectation |
|-------|-------------|
| `/` | Public marketing unchanged |
| `/contact` | Enquiry → DB + email + reference |
| `/services` | Service inquiry → same API |
| `/signup` | Clerk registration + email code |
| `/login` | Clerk login; authed → `/dashboard` |
| `/dashboard` | Live profile + enquiries; unauth → `/login` |
| `/signup/pending` | Vendor/Partner under review |
| `/api/webhooks/clerk` | Svix-verified sync |

## 9. Security checks

- Server-side Zod validation on contact payload
- Honeypot field `website` + basic rate limiting
- `RESEND_API_KEY` / DB / Clerk secrets server-only
- Dashboard + `/api/me/*` require Clerk session
- Profile/enquiries scoped to authenticated DB user
- No admin role from signup; `User.role` defaults to `USER`
- `accountType` accepted only as CUSTOMER/VENDOR/PARTNER (normalized); not overwritten from client metadata on every webhook update after create
- Webhook signature verification via Svix
- Sanitized JSON errors; avoid logging tokens/passwords/private form dumps

## 10. Known limitations

- End-to-end auth/email tests need real Clerk, Postgres, and Resend credentials (not committed).
- In-memory rate limit resets on serverless cold starts; use Redis/Upstash for multi-instance hardening later.
- Logged-in enquiry association requires an existing DB user row (webhook or prior `ensureDbUser`); otherwise `userId` may be null until sync.
- Vendor/Partner workspaces are not live.
- Advanced customer dashboard modules remain demo / coming soon.
- Next.js warns that the `middleware` file convention is deprecated in favor of `proxy` (Clerk still uses middleware patterns today).
