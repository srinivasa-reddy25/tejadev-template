type TEnv = {
  API_PORT: number
}

export const env: TEnv = {
  API_PORT: Number(process.env.API_PORT ?? 8000)
}
