import { useMutation } from '@tanstack/react-query'

import type { TAuthProvider } from '@tejadev/shared'
import { api } from '@/lib/api'

export type TAuthUser = {
  id: string
  email: string
  name: string
  profile_image: string | null
  firebase_uid: string
  provider: TAuthProvider
  created_at: string
  updated_at: string
}

type TAuthResponse = {
  message: string
  data: TAuthUser
}

const postSync = (): Promise<TAuthResponse> => {
  return api.post('/auth/sync')
}

export const useSync = () => {
  return useMutation({
    mutationFn: postSync
  })
}
