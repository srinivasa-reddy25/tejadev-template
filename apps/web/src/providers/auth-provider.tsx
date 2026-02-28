'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from 'react'
import { usePathname, useRouter } from 'next/navigation'

import {
  getIdToken,
  onAuthStateChanged,
  type User as FirebaseUser
} from 'firebase/auth'

import type { TAuthUser } from '@/hooks/api/auth'
import { api, setAccessTokenGetter } from '@/lib/api'
import { signOut as authSignOut } from '@/services/auth'
import { auth } from '@/services/firebase'

type TAuthContextType = {
  user: TAuthUser | null
  isLoading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<TAuthContextType | undefined>(undefined)
const AUTH_COOKIE_NAME = 'tdv_auth'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const pathname = usePathname()

  const [user, setUser] = useState<TAuthContextType['user']>(null)
  const [loading, setLoading] = useState<TAuthContextType['isLoading']>(true)

  const setAuthCookie = useCallback(() => {
    document.cookie = `${AUTH_COOKIE_NAME}=1; Path=/; Max-Age=604800; SameSite=Lax`
  }, [])

  const clearAuthCookie = useCallback(() => {
    document.cookie = `${AUTH_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`
  }, [])

  useEffect(() => {
    setAccessTokenGetter(async () => {
      const currentUser = auth.currentUser
      if (!currentUser) return null
      return currentUser.getIdToken()
    })
  }, [])

  const syncUser = useCallback(
    async (firebaseUser: FirebaseUser) => {
      const token = await getIdToken(firebaseUser, true)

      if (!token) {
        console.error('[AuthProvider] Failed to get ID token')
        setUser(null)
        return
      }

      try {
        const userResponse: { message: string; data: TAuthUser } =
          await api.post('/auth/login')
        setUser(userResponse.data)
        setAuthCookie()
      } catch {
        setUser(null)
        clearAuthCookie()
      }
    },
    [clearAuthCookie, setAuthCookie]
  )

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: FirebaseUser | null) => {
        try {
          setLoading(true)

          if (firebaseUser) {
            await syncUser(firebaseUser)
          } else {
            setUser(null)
            clearAuthCookie()
          }
        } catch (error) {
          console.error('[AuthProvider] Error fetching user', error)
          setUser(null)
          clearAuthCookie()
        } finally {
          setLoading(false)
        }
      }
    )

    return () => unsubscribe()
  }, [clearAuthCookie, syncUser])

  useEffect(() => {
    const firebaseUser = auth.currentUser

    if (!firebaseUser || user || loading) return

    syncUser(firebaseUser).catch((error) => {
      console.error('[AuthProvider] Retry sync failed', error)
      setUser(null)
    })
  }, [loading, pathname, syncUser, user])

  const signOut = async () => {
    try {
      await authSignOut()
      setUser(null)
      clearAuthCookie()
      router.push('/home')
    } catch (error) {
      console.error('[AuthProvider] Error signing out', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: loading,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
