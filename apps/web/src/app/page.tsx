'use client'

import { slugify } from '@tejadev/shared'
import { Button, toast } from '@tejadev/ui'
import { ModeToggle } from '@/components/mode-toggle'
import { env } from '@/constants/env'
import { useHealth } from '@/hooks/api/health'

export default function HomePage() {
  const slug = slugify(env.NEXT_PUBLIC_APP_NAME)
  const { data, error, isLoading } = useHealth()

  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-8">
        <div className="flex w-full justify-end">
          <ModeToggle />
        </div>

        <div className="rounded-2xl border border-border bg-secondary p-8">
          <h1 className="text-5xl font-extrabold tracking-tight text-primary">
            {env.NEXT_PUBLIC_APP_NAME}
          </h1>
          <p className="mt-3 text-base text-tertiary">
            Slug from shared package: {slug}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Font weight test</p>
            <h2 className="mt-2 text-3xl font-normal text-primary">
              Osiris 400
            </h2>
            <h2 className="mt-2 text-3xl font-medium text-primary">
              Osiris 500
            </h2>
            <h2 className="mt-2 text-3xl font-semibold text-primary">
              Osiris 600
            </h2>
            <h2 className="mt-2 text-3xl font-bold text-primary">Osiris 700</h2>
            <h2 className="mt-2 text-3xl font-extrabold text-primary">
              Osiris 800
            </h2>
          </article>

          <article className="rounded-xl border border-border bg-primary p-6 text-primary-foreground">
            <p className="text-sm/6 opacity-90">Brand tokens preview</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-md bg-secondary p-3 text-secondary-foreground">
                Secondary
              </div>
              <div className="rounded-md bg-accent p-3 text-accent-foreground">
                Accent
              </div>
              <div className="rounded-md bg-tertiary p-3 text-tertiary-foreground">
                Tertiary
              </div>
              <div className="rounded-md border border-primary-foreground/30 p-3">
                Primary
              </div>
            </div>
          </article>
        </div>

        <article className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">API connectivity test</p>
          <h2 className="mt-2 text-2xl font-semibold text-primary">
            Backend Health
          </h2>
          {isLoading ? (
            <p className="mt-2 text-base text-muted-foreground">
              Checking API...
            </p>
          ) : null}
          {!isLoading && data ? (
            <p className="mt-2 text-base text-foreground">{data.message}</p>
          ) : null}
          {!isLoading && error ? (
            <p className="mt-2 text-base text-destructive">
              API not reachable. Check `NEXT_PUBLIC_API_URL` and API server.
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button
              variant="outline"
              onClick={() => {
                toast('Toast is working', {
                  description: 'Sonner is mounted at top-center.',
                  action: {
                    label: 'Undo',
                    onClick: () => console.log('Undo')
                  }
                })
              }}
            >
              Show Toast
            </Button>
          </div>
        </article>
      </section>
    </main>
  )
}
