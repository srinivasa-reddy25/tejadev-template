type TEnv = {
  API_PORT: number
  db_url: string
  node_env: 'dev' | 'prod'
}

export const env: TEnv = {
  API_PORT: Number(process.env.API_PORT ?? 8000),
  db_url: process.env.DB_URL ?? 'NA',
  node_env: process.env.NODE_ENV === 'prod' ? 'prod' : 'dev'
}
