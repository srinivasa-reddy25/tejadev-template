'use client'

import type { ReactNode } from 'react'

import { QueryClientProvider } from '@tanstack/react-query'

import { query_client } from '@/lib/query-client'

type TProps = {
  children: ReactNode
}

export function QueryProvider({ children }: TProps) {
  return (
    <QueryClientProvider client={query_client}>{children}</QueryClientProvider>
  )
}
