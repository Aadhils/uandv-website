# @uandv/ui

Reusable U&V design system — tokens, themes, and components shared by web and admin.

## Install (workspace)

```ts
import { Button, ThemeProvider, ThemeScript } from '@uandv/ui';
import { brandColors, designTokens } from '@uandv/ui/tokens';
import '@uandv/ui/styles';
```

## Themes

1. Import styles once in the app.
2. Render `<ThemeScript />` in `<head>` to avoid FOUC.
3. Wrap the app with `<ThemeProvider>`.
4. Use `<ThemeToggle variant="segmented" />` or `variant="cycle"`.

## Catalog

With `pnpm dev`, open: http://localhost:3000/design-system

## Scope

This package is UI only. It does not include Landing Page or Dashboard product pages.
