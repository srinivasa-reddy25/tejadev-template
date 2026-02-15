import { slugify } from '@tejadev/shared'
import { env } from '@/constants/env'

export default function HomePage() {
  const slug = slugify(env.NEXT_PUBLIC_APP_NAME)

  return (
    <main style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>{env.NEXT_PUBLIC_APP_NAME}</h1>
      <p>Slug from shared package: {slug}</p>
    </main>
  )
}
