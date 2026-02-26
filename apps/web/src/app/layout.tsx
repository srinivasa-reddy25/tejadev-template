import type { ReactNode } from 'react'

import { QueryProvider } from '@/providers/query-provider'
import { ToasterProvider } from '@/providers/toaster-provider'

import './globals.css'

type TProps = {
  children: ReactNode
}

export default function RootLayout({ children }: TProps) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
        <ToasterProvider />
      </body>
    </html>
  )
}
