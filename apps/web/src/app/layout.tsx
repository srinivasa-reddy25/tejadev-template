import type { ReactNode } from 'react'

import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/providers/auth-provider'
import { OneTapProvider } from '@/providers/one-tap-provider'
import { QueryProvider } from '@/providers/query-provider'
import { ToasterProvider } from '@/providers/toaster-provider'

import './globals.css'

type TProps = {
  children: ReactNode
}

export default function RootLayout({ children }: TProps) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <ThemeProvider enableSystem attribute="class" defaultTheme="system">
          <QueryProvider>
            <AuthProvider>
              <OneTapProvider />
              {children}
            </AuthProvider>
          </QueryProvider>
          <ToasterProvider />
        </ThemeProvider>
      </body>
    </html>
  )
}
