'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/providers/auth-provider'

export default function RootPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (isLoading) return
    router.replace(user ? '/home' : '/login')
  }, [isLoading, router, user])

  return (
    <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <p className="text-base text-muted-foreground">Redirecting...</p>
    </main>
  )
}
