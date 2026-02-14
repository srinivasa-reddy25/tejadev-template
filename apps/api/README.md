# @tejadev/api

Minimal Express API app wired to shared monorepo configs.

## Scripts

- `bun run dev` - Start API in watch mode
- `bun run build` - Compile TypeScript to `dist/`
- `bun run start` - Run compiled server
- `bun run typecheck` - Type-check only
- `bun run lint` - Lint source

## Endpoints

- `GET /health`
- `GET /slug/:value`
