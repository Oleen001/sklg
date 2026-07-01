# UX/UI Pro Max Review

## Safe Changes Applied

- Global font is now `Noto Sans Thai`, falling back to `Noto Sans`.
- Added a tokenized design system based on current colors, spacing, radius, shadows, and motion.
- Skill Scan now uses mock API data instead of hardcoded component data.
- Skill Scan market demand uses color plus labels/ARIA text, not color alone.

## Needs Approval Before Broad Changes

- Reworking the full palette. A stronger orange CTA system was recommended by the design-system search, but applying it across the whole site would change the current blue/yellow/green identity too much.
- Re-spacing generated Figma pages globally. The current exports use many absolute positions, so normalizing every section to a clean responsive grid would visually change the pages.
- Migrating all generated Figma content into reusable responsive components. This would be healthier long term, but it is a larger redesign/refactor.
- Replacing decorative mascots or hero composition. These are now part of the current product identity and should stay unless the visual direction changes.

## Recommended Later

- Convert remaining repeated generated Figma sections into named components after the page content is confirmed.
- Add route-level code splitting because the build still warns about large Figma asset chunks.
- Add focus management on route change for accessibility.
- Add a real API contract document once backend fields are known.
