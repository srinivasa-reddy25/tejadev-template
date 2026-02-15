type TEnv = {
  NEXT_PUBLIC_APP_NAME: string
  NEXT_PUBLIC_API_URL: string
}

export const env: TEnv = {
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME ?? 'TejaDev Web',
  NEXT_PUBLIC_API_URL:
    process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'
}
