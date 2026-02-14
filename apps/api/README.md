# @tejadev/api

Minimal Express API app wired to shared monorepo configs.

## Scripts

- `bun run dev` - Start API with Bun watch mode
- `bun run build` - Bundle server entry to `dist/`
- `bun run start` - Run server directly from `src/`
- `bun run typecheck` - Type-check only
- `bun run lint` - Lint source

## Endpoints

- `GET /api/v1/health`
- `POST /api/v1/slug`
