import type { Request, Response } from 'express'

import { mg } from 'db'

import firebase_auth from '../../services/firebase.ts'
import { throw_error } from '../../utils/throw-error.ts'

export const login = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    throw_error('Missing or invalid Authorization header', 401)
  }

  const decoded = await firebase_auth().verifyIdToken(token as string)

  if (!decoded.email) {
    throw_error('Token does not contain a valid email', 401)
  }

  const db_user = await mg.User.findOne({
    email: decoded.email,
    is_active: true
  })

  if (!db_user) {
    throw_error('User not found', 404)
  }

  res.json({
    message: 'Login successful',
    data: db_user
  })
}
