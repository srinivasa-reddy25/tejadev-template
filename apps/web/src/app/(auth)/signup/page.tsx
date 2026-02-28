'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button, toast } from '@tejadev/ui'
import { ModeToggle } from '@/components/mode-toggle'
import { env } from '@/constants/env'
import { useGoogleAuth, useSignup } from '@/hooks/api/auth'
import { signInWithGooglePopup, signUpWithEmailPassword } from '@/services/auth'

const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'object' && error !== null) {
    const errorMessage = (error as { message?: unknown }).message
    if (typeof errorMessage === 'string' && errorMessage.trim()) {
      return errorMessage
    }
  }

  return 'Something went wrong. Please try again.'
}

export default function SignupPage() {
  const router = useRouter()
  const { mutateAsync: signup } = useSignup()
  const { mutateAsync: googleAuth } = useGoogleAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const setAuthCookie = () => {
    document.cookie = 'tdv_auth=1; Path=/; Max-Age=604800; SameSite=Lax'
  }

  const onSignup = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      await signUpWithEmailPassword(email, password)
      await signup({ name })
      setAuthCookie()
      toast('Account created', {
        description: 'Signup successful. You are now logged in.'
      })
      router.push('/home')
    } catch (error) {
      toast.error('Signup failed', {
        description: getErrorMessage(error)
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const onGoogleAuth = async (): Promise<void> => {
    setIsSubmitting(true)

    try {
      await signInWithGooglePopup()
      await googleAuth()
      setAuthCookie()
      toast('Signed in with Google', {
        description: 'Google authentication successful.'
      })
      router.push('/home')
    } catch (error) {
      toast.error('Google sign-in failed', {
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
            <h2 className="mt-3 text-4xl font-extrabold">Signup</h2>
            <p className="mt-3 text-sm opacity-90">
              Create your account and continue to your private workspace.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6">
            <form className="flex flex-col gap-3" onSubmit={onSignup}>
              <label className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Name</span>
                <input
                  required
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-accent focus:ring-2"
                  placeholder="John Doe"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </label>

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

              <label className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Password</span>
                <input
                  required
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-accent focus:ring-2"
                  minLength={6}
                  placeholder="Minimum 6 characters"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>

              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? 'Please wait...' : 'Create account'}
              </Button>
            </form>

            <div className="my-4 h-px bg-border" />

            <Button
              className="w-full"
              disabled={isSubmitting}
              type="button"
              variant="secondary"
              onClick={onGoogleAuth}
            >
              Continue with Google
            </Button>

            <p className="mt-5 text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link className="text-primary underline" href="/login">
                Login
              </Link>
            </p>
          </article>
        </section>
      </div>
    </main>
  )
}
