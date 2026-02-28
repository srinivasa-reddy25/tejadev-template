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

type TSignupPayload = {
  name: string
}

const postSignup = (payload: TSignupPayload): Promise<TAuthResponse> => {
  return api.post('/auth/signup', payload)
}

const postLogin = (): Promise<TAuthResponse> => {
  return api.post('/auth/login')
}

const postGoogle = (): Promise<TAuthResponse> => {
  return api.post('/auth/google')
}

export const useSignup = () => {
  return useMutation({
    mutationFn: postSignup
  })
}

export const useLogin = () => {
  return useMutation({
    mutationFn: postLogin
  })
}

export const useGoogleAuth = () => {
  return useMutation({
    mutationFn: postGoogle
  })
}
