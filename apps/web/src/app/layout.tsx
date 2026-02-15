import type { ReactNode } from 'react'

import './globals.css'

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
