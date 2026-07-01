# Skillogy

Skillogy is a React + Vite prototype for a learning and career-skills platform. The app started as a Figma Make export and has been wrapped with a responsive React shell, client-side routing, mock data, and Vercel-ready SPA deployment config.

Original Figma source: https://www.figma.com/design/G4j2TMMOZHHiJYBidncRcQ/Add-transitions-and-animations

## Quick Start

Requirements:

- Node.js 18+
- pnpm

```bash
pnpm install
pnpm run dev
```

The dev server usually starts at:

```text
http://127.0.0.1:5173/
```

If that port is already in use, Vite will choose the next available port.

## Scripts

```bash
pnpm run dev
pnpm run build
pnpm audit --audit-level low
```

- `pnpm run dev` starts the local Vite dev server.
- `pnpm run build` creates a production build in `dist/`.
- `pnpm audit --audit-level low` checks known dependency vulnerabilities.

## App Routes

The app uses `react-router` with browser history.

| Route | Screen |
| --- | --- |
| `/` | Home |
| `/login` | Login / mock signup |
| `/skill-dashboard` | Skill dashboard / scan entry |
| `/skill-trends` | Skill trends |
| `/skill-builder` | Learning / course discovery |
| `/skill-opportunities` | Opportunity discovery |

Unknown paths fall back to the app shell, then the React router resolves the UI.

## Project Structure

```text
src/
  app/
    App.tsx                    Main routing, layout, legacy animation bridge
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
  UX_UI_REVIEW.md
HANDOFF.md                     Engineering handoff and known follow-up work
vercel.json                    SPA rewrite config for Vercel
```

## Important Notes

- `src/imports/**` is generated from Figma Make. Prefer changing code in `src/app/**` so future design exports do not overwrite hand-authored work.
- Several animation hooks still depend on Figma `data-name` attributes. Renaming those attributes can silently break animation behavior.
- Authentication is currently mock-only and stored in `localStorage` under `skillogy_mock_logged_in`.
- Data for learning, skill scan, and opportunities lives in `src/app/mock-api/**`; there is no backend integration yet.
- Large image assets are currently committed for visual fidelity. The production build works, but image optimization and route-level code splitting are recommended next.

## Deployment

This repo is ready for Vercel static deployment.

Recommended Vercel settings:

```text
Framework Preset: Vite
Install Command: pnpm install
Build Command: pnpm run build
Output Directory: dist
```

`vercel.json` rewrites all paths to `index.html` so direct visits to routes like `/skill-builder` or `/skill-trends` work correctly.

## Verification Checklist

Before pushing deploy-facing changes:

```bash
pnpm install
pnpm run build
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
- Add TypeScript and lint scripts once the Figma-exported code is stabilized.
- Replace mock auth/data with real backend services when product scope is confirmed.
- Continue moving long-lived UI away from generated Figma markup into semantic React components.
