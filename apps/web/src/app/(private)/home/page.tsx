'use client'

import { Button, toast } from '@tejadev/ui'
import { ModeToggle } from '@/components/mode-toggle'
import { env } from '@/constants/env'
import { useAuth } from '@/providers/auth-provider'

const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'object' && error !== null) {
    const errorMessage = (error as { message?: unknown }).message
    if (typeof errorMessage === 'string' && errorMessage.trim()) {
      return errorMessage
    }
  }

  return 'Something went wrong. Please try again.'
}

export default function PrivatePage() {
  const { user, signOut } = useAuth()

  const onLogout = async (): Promise<void> => {
    try {
      await signOut()
      toast('Logged out', {
        description: 'You have been signed out.'
      })
    } catch (error) {
      toast.error('Logout failed', {
        description: getErrorMessage(error)
      })
    }
  }

  if (!user) return null

  return (
    <main className="min-h-screen bg-background p-6 text-foreground md:p-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary">
            {env.NEXT_PUBLIC_APP_NAME}
          </h1>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-border bg-card p-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Logged in as
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-primary">
              {user.name}
            </h2>
            <p className="mt-1 text-sm text-tertiary">{user.email}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Provider: {user.provider}
            </p>
          </article>
        </section>
      </div>
    </main>
  )
}
