'use client'

import { slugify } from '@tejadev/shared'
import { env } from '@/constants/env'

export default function HomePage() {
  const slug = slugify(env.NEXT_PUBLIC_APP_NAME)

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center p-8">
      <section className="w-full rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-red-500">
          {env.NEXT_PUBLIC_APP_NAME}
        </h1>
        <p className="mt-3 text-sm text-black/70">
          Slug from shared package: {slug}
        </p>
      </section>
    </main>
  )
}
