# Web Rules

Read this before writing web code.

## Folder Layout

Use `src` with this structure:

- `app` for routes and layouts
- `assets` for fonts/logos/static assets
- `components` for reusable UI components
- `constants` for env/constants
- `hooks/api` for API hooks
- `hooks/custom` for reusable custom hooks
- `lib` for shared helpers
- `providers` for context/query/theme providers
- `services` for integrations (for example Firebase later)
- `types` for shared web types

## Styling

1. Use Tailwind utilities and token classes.
2. Do not use hardcoded hex colors.
3. Keep color/theme tokens in `src/app/globals.css`.
4. Keep Tailwind token mapping in `tailwind.config.mjs`.
5. Prefer classes like `bg-background`, `text-foreground`, `border-border`, `bg-primary`.

## Data and API

1. Use TanStack Query for server state.
2. Keep API clients in `src/lib`.
3. Keep hook wrappers in `src/hooks/api`.

## Process

1. Build feature in small steps.
2. Run lint/typecheck before each commit.
3. Commit per step after verification.
