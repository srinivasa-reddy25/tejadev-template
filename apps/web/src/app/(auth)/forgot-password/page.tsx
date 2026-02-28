'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import Link from 'next/link'

import { Button, toast } from '@tejadev/ui'
import { ModeToggle } from '@/components/mode-toggle'
import { env } from '@/constants/env'
import { resetPassword } from '@/services/auth'

const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'object' && error !== null) {
    const errorMessage = (error as { message?: unknown }).message
    if (typeof errorMessage === 'string' && errorMessage.trim()) {
      return errorMessage
    }
  }

  return 'Something went wrong. Please try again.'
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resetSent, setResetSent] = useState(false)

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      await resetPassword(email)
      setResetSent(true)
    } catch (error) {
      toast.error('Failed to send reset email', {
        description: getErrorMessage(error)
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-background p-6 text-foreground md:p-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary">
            {env.NEXT_PUBLIC_APP_NAME}
          </h1>
          <ModeToggle />
        </header>

        <section className="grid items-stretch gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-border bg-primary p-6 text-primary-foreground">
            <p className="text-sm uppercase tracking-[0.2em]">Authentication</p>
            <h2 className="mt-3 text-4xl font-extrabold">Reset password</h2>
            <p className="mt-3 text-sm opacity-90">
              Enter your email and we&apos;ll send you a link to reset your
              password.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6">
            {resetSent ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-foreground">
                    Check your inbox
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We sent a password reset link to{' '}
                    <span className="font-medium text-foreground">{email}</span>
                    . Click it to set a new password, then come back to log in.
                  </p>
                </div>
                <Link href="/login">
                  <Button className="w-full" type="button" variant="secondary">
                    Back to login
                  </Button>
                </Link>
              </div>
            ) : (
              <form className="flex flex-col gap-3" onSubmit={onSubmit}>
                <label className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <input
                    required
                    className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-accent focus:ring-2"
                    placeholder="john@site.com"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </label>

                <Button disabled={isSubmitting} type="submit">
                  {isSubmitting ? 'Sending...' : 'Send reset link'}
                </Button>

                <p className="mt-2 text-sm text-muted-foreground">
                  Remember your password?{' '}
                  <Link className="text-primary underline" href="/login">
                    Login
                  </Link>
                </p>
              </form>
            )}
          </article>
        </section>
      </div>
    </main>
  )
}
