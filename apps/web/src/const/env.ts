type TEnv = {
  NEXT_PUBLIC_APP_NAME: string
}

export const env: TEnv = {
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME ?? 'TejaDev Web'
}
