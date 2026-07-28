# U&V v3.2 — Deployment Checklist

**Status:** Production deployment guide for the U&V monorepo.

**Stack:** Next.js 16 (App Router) · pnpm workspaces · Turbo · PostgreSQL · Clerk · Resend · Vercel (recommended)

---

## Pre-deploy verification

### Code quality

```bash
# From repository root
pnpm install
pnpm build
pnpm lint
pnpm typecheck
```

### Web app only

```bash
pnpm --filter @uandv/web build
pnpm --filter @uandv/web lint
pnpm --filter @uandv/web typecheck
pnpm --filter @uandv/web test
```

### Marketing UI freeze (v3.2)

- [ ] No unapproved changes to marketing layouts, typography, spacing, or content
- [ ] Why U&V WebP assets added if visual launch is included (see `03-image-assets.md`)
- [ ] Smoke test all frozen routes (below)

---

## Frozen marketing routes — smoke test

| URL | Check |
|-----|-------|
| `/` | Hero, sections, CTAs, no console errors |
| `/business-solutions` | Standard hero grid, cinema sections |
| `/why-uandv` | All sections, placeholders or WebP visuals, hero priority |
| `/services` | Index + one `[slug]` page |
| `/portfolio` | Index + one case study |
| `/solutions/digital-marketing` | Page loads, cards, hero |
| `/mlm` | Page loads |
| `/fintech` | Page loads |
| `/startup` | Page loads |

Responsive: desktop, tablet, mobile — no horizontal overflow.

---

## Environment variables

See also `docs/PRODUCTION_FOUNDATION.md` for auth/contact details.

### Required (production)

| Variable | Public? | Purpose |
|----------|---------|---------|
| `DATABASE_URL` | No | PostgreSQL connection |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk auth |
| `CLERK_SECRET_KEY` | No | Clerk server |
| `CLERK_WEBHOOK_SECRET` | No | User sync webhook |
| `RESEND_API_KEY` | No | Transactional email |
| `RESEND_FROM_EMAIL` | No | Sender address |
| `CONTACT_TO_EMAIL` | No | Enquiry inbox |

### Recommended

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/login` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/signup` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | `/dashboard` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | `/dashboard` |

**Never** expose `DATABASE_URL`, `CLERK_SECRET_KEY`, `CLERK_WEBHOOK_SECRET`, or `RESEND_API_KEY` as `NEXT_PUBLIC_*`.

---

## Database

```bash
# Generate Prisma client
pnpm --filter @uandv/database db:generate

# Apply migrations (CI / production)
pnpm --filter @uandv/database db:migrate:deploy
```

Requires `DATABASE_URL` pointing to production PostgreSQL.

---

## Clerk setup

1. Create Clerk application for production domain.
2. Configure paths: sign-in `/login`, sign-up `/signup`, after auth → `/dashboard`.
3. Webhook endpoint: `https://<domain>/api/webhooks/clerk`  
   Events: `user.created`, `user.updated`, `user.deleted`
4. Add keys to Vercel environment variables.

---

## Resend setup

1. Verify sending domain.
2. Set `RESEND_FROM_EMAIL` and `CONTACT_TO_EMAIL`.
3. Test contact form on `/contact` after deploy.

---

## Vercel deployment

### Project settings

| Setting | Value |
|---------|-------|
| Framework | Next.js |
| Root directory | `apps/web` |
| Build command | `cd ../.. && pnpm build --filter=@uandv/web` or monorepo default |
| Install command | `pnpm install` |
| Node version | ≥ 20 |

### Build output

Confirm static marketing routes show `○` (Static) in build log:

```
○ /why-uandv
○ /services
○ /portfolio
...
```

### Post-deploy

- [ ] Verify `https://<domain>/robots.txt`
- [ ] Verify `https://<domain>/sitemap.xml`
- [ ] Test contact form submission
- [ ] Test sign-up / sign-in flow
- [ ] Check OG preview (Twitter/LinkedIn card debugger)

---

## Asset deployment (Why U&V)

1. Add 16 WebP files to `apps/web/public/images/why-uandv/`
2. Commit and deploy — no code change needed if filenames match manifest
3. Verify hero loads with priority on production URL
4. Clear CDN cache if old 404s were cached (Vercel redeploy usually sufficient)

---

## Docker (optional local infra)

```bash
pnpm docker:up    # Start local services
pnpm docker:down
pnpm docker:logs
```

Compose file: `infrastructure/docker/docker-compose.yml`

---

## Rollback

1. Revert to previous Vercel deployment in dashboard.
2. If migration was applied, assess whether DB rollback is needed (avoid destructive down migrations in production).

---

## Monorepo scripts reference

| Command | Action |
|---------|--------|
| `pnpm dev` | Start all apps (Turbo) |
| `pnpm build` | Build all packages |
| `pnpm lint` | Lint all packages |
| `pnpm typecheck` | TypeScript all packages |

Web dev server only:

```bash
pnpm --filter @uandv/web dev
# → http://localhost:3000
```

---

## Related documentation

| Doc | Topic |
|-----|-------|
| `01-design-system.md` | Tokens and layout |
| `02-component-library.md` | Reusable components |
| `03-image-assets.md` | Why U&V WebP manifest |
| `04-brand-guidelines.md` | Colors, type, voice |
| `05-performance-checklist.md` | LCP, a11y, SEO |
| `PRODUCTION_FOUNDATION.md` | Auth, enquiries, DB models |

---

## Sign-off

Before marking v3.2 marketing as live:

- [ ] Build passes
- [ ] Lint passes
- [ ] Smoke tests pass on staging URL
- [ ] Environment variables set on Vercel
- [ ] Database migrations applied
- [ ] Why U&V assets delivered (if visual launch scope includes them)
- [ ] Stakeholder approval on frozen UI (no further layout changes)
