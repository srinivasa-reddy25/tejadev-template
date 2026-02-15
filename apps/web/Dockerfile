FROM oven/bun:1.3.9

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile
RUN bun run build:pkg
RUN bun run --filter @tejadev/web build:docker

EXPOSE 3000

CMD ["bun", "run", "--filter", "@tejadev/web", "start:docker"]
