import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type UserCredential
} from 'firebase/auth'

import { auth } from '@/services/firebase'

import { AuthenticationError } from './errors'

export const signInWithEmailPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    return userCredential
  } catch (error) {
    throw new AuthenticationError(error)
  }
}

export const signUpWithEmailPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    return userCredential
  } catch (error) {
    throw new AuthenticationError(error)
  }
}
