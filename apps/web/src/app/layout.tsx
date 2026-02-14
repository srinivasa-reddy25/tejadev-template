import type { ReactNode } from 'react'

type TProps = {
  children: ReactNode
}

export default function RootLayout({ children }: TProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
