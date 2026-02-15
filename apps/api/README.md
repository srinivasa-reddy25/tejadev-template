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

## Environment Variables

| Key | Required | Example | Notes |
| --- | --- | --- | --- |
| `API_PORT` | Yes | `8000` | API server port |
| `NODE_ENV` | Yes | `dev` | Use `dev` or `prod` |
| `DB_URL` | Yes | `mongodb+srv://user:pass@cluster.mongodb.net/tejadev?retryWrites=true&w=majority` | Set `NA` to skip DB connection |

## Troubleshooting

- Startup is slow or exits before server starts:
  - Usually DB connection is failing.
  - Set `DB_URL=NA` to confirm server works without DB.
- Mongo Atlas connection fails:
  - Ensure DB user/password are correct.
  - Ensure your current IP is allowlisted in Atlas Network Access.
  - Ensure password special characters are URL-encoded.
  - Ensure URI includes a database name (for example `/tejadev`).
