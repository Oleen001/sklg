# Skillogy Design System

This system is extracted from the current Skillogy visual direction. It preserves the existing playful education/career identity instead of replacing the product with a new style.

## Principles

- Use `Noto Sans Thai`, then `Noto Sans`, for every text surface.
- Keep the current light, rounded, playful interface with blue as trust/navigation, yellow and green as friendly highlights, and orange reserved for strong career actions.
- Use SVG/vector icons from one family, currently Lucide for app chrome and new product UI.
- Use color plus text labels for data meaning. The Skill Scan market-demand dots must always have a legend or accessible label.

## Color Tokens

| Token | Value | Use |
| --- | --- | --- |
| `--sk-color-blue-50` | `#eff7ff` | Pale panels |
| `--sk-color-blue-100` | `#dff0ff` | Soft section backgrounds |
| `--sk-color-blue-200` | `#bfe5ff` | Skill Scan outer orbit |
| `--sk-color-blue-300` | `#a9d4f6` | Character and moderate demand |
| `--sk-color-blue-500` | `#1e78d4` | Primary navigation and controls |
| `--sk-color-blue-600` | `#0d6ec8` | Primary hover/active |
| `--sk-color-blue-800` | `#1b3a5c` | Secondary text |
| `--sk-color-navy-900` | `#0e2440` | Main heading |
| `--sk-color-ink` | `#05101f` | Body text |
| `--sk-color-yellow` | `#ffde33` | Highlight and high demand |
| `--sk-color-green` | `#2ac66d` | Highest market demand |
| `--sk-color-red` | `#db475f` | Accent/alert decoration |
| `--sk-color-orange` | `#ff7a1a` | Career goal CTA |

## Spacing

Use an 8px rhythm with 4px available for fine adjustment: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80`.

Section spacing should generally use `48, 64, 80`. Component padding should generally use `12, 16, 20, 24, 32`.

## Radius And Elevation

- Small controls: `8px`
- Cards and panels: `12px` to `16px`
- Sheets/modals: `24px` or larger when matching the current character-heavy visual style
- Pills: `999px`
- Shadows: use the shared `--sk-shadow-sm`, `--sk-shadow-md`, and `--sk-shadow-lg` scale

## Motion

- Fast feedback: `160ms`
- Normal interaction: `240ms`
- Page transition: `350ms`
- Always respect `prefers-reduced-motion`.

## Mock API Rule

When a feature represents backend data, keep data in `src/app/mock-api/` and expose async functions. Components should consume the mock API as if it were a real API client.
