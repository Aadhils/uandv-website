# U&V Platform

> Everything your business needs under one roof.

## Status

| Phase / release | Status |
|-----------------|--------|
| Phase 0 — Foundation | Complete |
| Design System (`@uandv/ui`) | Complete |
| Company website (marketing) | Production content live — deploy when ready |
| **Version 3.0 — Business Operating System** | **Ready** (Sprint 3.14) |
| **Version 3.1 — Partner Marketplace Foundation** | **Ready** (Sprint 3.1.1) |

## Version 3.0 — Business Operating System

`@uandv/web@3.0.0` connects the demo customer journey on one shared spine:

**`cus-001` / Priya Sharma / Sunrise Retail · `prj-204` · `lead-204` · `quo-101` · `agr-fin-501` · `emp-001` · `ptn-008` / `ven-001`**

| Stage | Module |
|-------|--------|
| Discovery | `/business-discovery` |
| AI Advisor | `/business-discovery/advisor`, `/dashboard/business-advisor/summary` |
| CRM Lead | `lead-204` → customer |
| Employee assignment | `emp-001` Divya |
| Vendor recommendation | Partners + Vendor Workspace |
| Quotation / Agreement / Payment | Finance ledger |
| Project delivery | `/dashboard/projects/prj-204` |

Customer dashboard (`/dashboard`) shows unified status, Smart Action Center, and Customer Journey Timeline. Demo-safe only — no backend.

## Version 3.1 — Partner Marketplace Foundation

Extends Release 3.6 Partner Network (no duplicate catalog):

| Surface | Route |
|---------|-------|
| Directory + categories + filters | `/partners` |
| Registration | `/partners/register` |
| Public profile + demo ratings | `/partners/[partnerId]` |
| Service marketplace listing | `/marketplace` |
| Admin approval queue | `/admin/partners/approvals` |

Runtime registrations / verification overrides: `localStorage` key `uandv-partner-marketplace-runtime`.

```bash
pnpm --filter @uandv/web dev
```

Open http://localhost:3000/dashboard (customer workspace) or http://localhost:3000

## Company site

Public marketing site for **U&V Technologies** (Tamil Nadu, India) — business technology & growth partner.

## Documentation

- [Landing / company site](docs/phases/PHASE-1B-LANDING-COMPLETE.md)
- [Design System](docs/phases/PHASE-1A-COMPLETE.md)
- [Phase 0](docs/phases/PHASE-0-COMPLETE.md)
- [Master Architecture](docs/architecture/MASTER_ARCHITECTURE.md)
