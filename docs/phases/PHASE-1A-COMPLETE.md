# Design System Complete — `@uandv/ui`

> **Status:** Complete — awaiting approval before Landing Website or Dashboard  
> **Package:** `@uandv/ui`

## Checklist

| # | Item | Status |
|---|------|--------|
| 1 | Complete Design System package | Done |
| 2 | Color Palette | Done |
| 3 | Typography | Done |
| 4 | Button Library | Done |
| 5 | Cards | Done |
| 6 | Forms | Done |
| 7 | Icons | Done |
| 8 | Navigation | Done |
| 9 | Footer | Done |
| 10 | Responsive Layout | Done |
| 11 | Dark Mode | Done |
| 12 | Light Mode | Done |

## Deliverables

### Tokens (`@uandv/ui/tokens`)
- Brand, neutral, semantic palettes
- Color roles (surfaces, overlays, disabled)
- Typography, spacing, radii, shadows, breakpoints, z-index, motion

### Themes
- Light + dark CSS variables (`data-theme` / `.dark`)
- `ThemeProvider`, `useTheme`, `ThemeToggle` (cycle + segmented)
- `ThemeScript` for FOUC prevention

### Components
- **Buttons:** 6 variants, sizes, icons, loading, fullWidth, ButtonGroup
- **Cards:** default / elevated / outlined / ghost / muted, media, interactive
- **Forms:** Input, Textarea, Select, Checkbox, Radio, RadioGroup, Switch, InputGroup, Fieldset, FormField, Form
- **Icons:** Curated typed Lucide registry
- **Navigation:** Navbar, NavLink, NavBrand, Sidebar
- **Footer:** Columns + social slots
- **Layout:** Container, Section, Stack, Grid, PageLayout, AppShell, Show/Hide
- **Extras:** Badge, Alert, Avatar, Separator

## Preview

```bash
pnpm dev
```

**http://localhost:3000/design-system**

## Explicitly not built

- Landing website
- User dashboard
- Marketplace / business features

## Next step

Reply with **approval** to begin the Landing Website (or request design-system changes first).
