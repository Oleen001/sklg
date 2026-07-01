# Sklg*

Sklg* is a Next.js app for a learning and career-skills platform. The app started as a Figma Make export and has been wrapped with a responsive React shell, App Router routes, mock data, and Vercel-ready deployment config.

## Quick Start

Requirements:

- Node.js 20.9+
- pnpm

```bash
pnpm install
pnpm run dev
```

The dev server usually starts at:

```text
http://127.0.0.1:3000/
```

If that port is already in use, Next.js will choose the next available port.

## Scripts

```bash
pnpm run dev
pnpm run build
pnpm run start
pnpm run typecheck
pnpm audit --audit-level low
```

- `pnpm run dev` starts the local Next.js dev server.
- `pnpm run build` creates a production Next.js build.
- `pnpm run start` serves the production build locally after `pnpm run build`.
- `pnpm run typecheck` runs TypeScript without emitting files.
- `pnpm audit --audit-level low` checks known dependency vulnerabilities.

## App Routes

The app uses Next.js App Router routes. The client shell in `src/app/App.tsx` keeps the shared navigation, mock auth state, and legacy Figma animation bridge.

| Route | Screen |
| --- | --- |
| `/` | Home |
| `/login` | Login / mock signup |
| `/skill-dashboard` | Skill dashboard / scan entry |
| `/skill-trends` | Skill trends |
| `/skill-builder` | Learning / course discovery |
| `/skill-opportunities` | Opportunity discovery |

Unknown paths redirect to `/` through `src/app/not-found.tsx`.

## Project Structure

```text
src/
  app/
    layout.tsx                 Next.js root layout and global CSS import
    page.tsx                   Home route
    home/page.tsx              `/home` compatibility route
    login/page.tsx             Login route
    skill-*/page.tsx           Feature routes
    not-found.tsx              Unknown-route redirect
    App.tsx                    Client shell, layout, mock auth, legacy animation bridge
    routes.ts                  Route definitions
    ResponsiveNavbar.tsx       Responsive navigation shell
    ResponsiveFooter.tsx       Responsive footer shell
    pages/                     Route-level pages
    components/                Reusable app components
    mock-api/                  Mock data and async helpers
  imports/                     Figma Make generated screens
  assets/                      SVG and PNG assets
  styles/                      Global CSS, theme, design-system tokens
docs/
  DESIGN_SYSTEM.md
next.config.ts                 Next.js webpack asset compatibility config
vercel.json                    Empty Vercel override; Next.js handles routing
```

## Important Notes

- `src/imports/**` is generated from Figma Make. Prefer changing code in `src/app/**` so future design exports do not overwrite hand-authored work.
- Several animation hooks still depend on Figma `data-name` attributes. Renaming those attributes can silently break animation behavior.
- Authentication is currently mock-only and stored in a local `localStorage` flag.
- Data for learning, skill scan, and opportunities lives in `src/app/mock-api/**`; there is no backend integration yet.
- Large image assets are currently committed for visual fidelity.
- `next.config.ts` uses webpack asset rules so existing Vite-style SVG `?raw` imports and image URL imports keep working. The `dev` and `build` scripts explicitly pass `--webpack` for that compatibility layer.

## Deployment

This repo is ready for Vercel deployment as a Next.js app.

Recommended Vercel settings:

```text
Framework Preset: Next.js
Install Command: pnpm install
Build Command: pnpm run build
Output Directory: leave empty
```

Next.js handles direct visits to routes like `/skill-builder` or `/skill-trends`; the old Vite SPA rewrite has been removed.

## Verification Checklist

Before pushing deploy-facing changes:

```bash
pnpm install
pnpm run build
pnpm run typecheck
pnpm audit --audit-level low
git diff --check
```

For UI changes, also smoke test these routes in a browser:

- `/`
- `/login`
- `/skill-dashboard`
- `/skill-trends`
- `/skill-builder`
- `/skill-opportunities`

Recommended viewport checks:

- Mobile: 390px wide
- Tablet: 768px wide
- Desktop: 1024px and 1440px wide

## Known Follow-Up Work

- Optimize PNG assets and consider WebP/AVIF variants.
- Split large route bundles with dynamic imports.
- Add a lint script once the Figma-exported code is stabilized.
- Consider migrating the SVG raw import compatibility layer from webpack to Turbopack config when the team is ready to use Turbopack for dev/build.
- Replace mock auth/data with real backend services when product scope is confirmed.
- Continue moving long-lived UI away from generated Figma markup into semantic React components.
