# TejaDev TypeScript Monorepo Template

Reusable starter template to bootstrap full-stack TypeScript projects with a clean monorepo foundation.

## Tech Stack

- Bun workspaces
- Turborepo
- TypeScript
- ESLint (flat config) + Prettier
- Husky + lint-staged + Commitlint
- Next.js (`apps/web`) + Express (`apps/api`)

## Monorepo Structure

- `apps/api` - Express API app
- `apps/web` - Next.js app
- `packages/typescript-config` - shared TypeScript presets
- `packages/eslint-config` - shared ESLint presets
- `packages/shared` - shared utils/types
- `.github/workflows/ci.yml` - CI pipeline

## Environment Variables

Use a single root env file for all apps.

1. Create `.env` in repo root from `.env.example`
2. Keep app env access in `src/const/env.ts` per app
3. Do not add app-level `.env` files unless intentionally required

## Quick Start

```bash
bun install
cp .env.example .env
bun run dev
```

## Useful Commands

- `bun run dev` - Run all app/package dev tasks with Turbo
- `bun run build` - Build all workspaces
- `bun run lint` - Run ESLint across workspaces
- `bun run typecheck` - Run TypeScript checks across workspaces
- `bun run format` - Format repo files with Prettier
- `bun run ci:check` - Full local CI check (format, lint, typecheck, build)
- `bun run docker:build` - Build all Docker images
- `bun run docker:up` - Start containers (build + run)
- `bun run docker:down` - Stop and remove running containers
- `bun run docker:logs` - Stream container logs

## Docker Setup

This repo includes:

- `apps/api/Dockerfile` for API container
- `apps/web/Dockerfile` for Web container
- `docker-compose.yml` to run API + Web + MongoDB together
- `.dockerignore` to keep images clean and fast to build

### Run with Docker

```bash
bun run docker:up
```

Open:

- Web: `http://localhost:3000`
- API: `http://localhost:8000`
- MongoDB: `mongodb://localhost:27017`

### Stop Docker

```bash
bun run docker:down
```

### Notes

- By default, compose uses local Mongo container URL:
  - `mongodb://mongo:27017/tejadev`
- You can override env values using shell envs before running compose.
- API and Web run using Bun inside containers.

## Smoke Checklist

- `bun run ci:check` passes locally
- `bun run --filter @tejadev/api dev` starts API
- `bun run --filter @tejadev/web dev` starts web app
- `GET /health` on API returns JSON
- web app renders and uses shared import from `@tejadev/shared`

## Author

- Teja (TejaDev)
