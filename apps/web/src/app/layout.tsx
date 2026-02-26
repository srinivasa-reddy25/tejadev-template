import type { ReactNode } from 'react'

import { ThemeProvider } from '@/components/theme-provider'
import { QueryProvider } from '@/providers/query-provider'
import { ToasterProvider } from '@/providers/toaster-provider'

import './globals.css'

type TProps = {
  children: ReactNode
}

export default function RootLayout({ children }: TProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>{children}</QueryProvider>
          <ToasterProvider />
        </ThemeProvider>
      </body>
    </html>
  )
}
