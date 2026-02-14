type TEnv = {
  API_PORT: number
  node_env: 'dev' | 'prod'
}

export const env: TEnv = {
  API_PORT: Number(process.env.API_PORT ?? 8000),
  node_env: process.env.NODE_ENV === 'prod' ? 'prod' : 'dev'
}
