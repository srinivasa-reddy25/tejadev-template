'use client'

import { useEffect } from 'react'
import Script from 'next/script'

import { env } from '@/constants/env'
import { signInWithOneTap } from '@/services/auth'

import { useAuth } from './auth-provider'

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string
            callback: (response: { credential: string }) => void
          }) => void
          prompt: () => void
          cancel: () => void
        }
      }
    }
  }
}

export function OneTapProvider() {
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      window.google?.accounts.id.cancel()
    }
  }, [user])

  const initOneTap = () => {
    if (!window.google?.accounts?.id || user) return

    window.google.accounts.id.initialize({
      client_id: env.googleClientId,
      callback: async ({ credential }) => {
        await signInWithOneTap(credential)
      }
    })

    window.google.accounts.id.prompt()
  }

  return (
    <Script
      src="https://accounts.google.com/gsi/client"
      strategy="afterInteractive"
      onLoad={initOneTap}
    />
  )
}
