FROM oven/bun:1.3.9

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile

EXPOSE 8000

CMD ["bun", "run", "--filter", "@tejadev/api", "start:docker"]
