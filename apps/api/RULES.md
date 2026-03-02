# API Rules

Read this before writing API code.

## Structure

1. `src/index.ts` for startup and lifecycle only.
2. `src/app.ts` for middleware and route wiring only.
3. `src/routes/*` defines endpoints and middleware chain.
4. `src/controllers/*` contains request handlers.
5. `src/middlewares/*` contains cross-cutting behavior (request-id, success, error).

## Error and Logging

1. Use `CustomError` / `throw_error` for expected API errors.
2. Keep response formatting centralized in `error-handler`.
3. Include `request_id` in error payload and logs.
4. Use shared logger package `logging`.

## DB

1. Use `connect_db` / `disconnect_db` from workspace package `db`.
2. Do not create app-local mongoose client duplicates.
3. Access model registry via `mg` from `db`.
