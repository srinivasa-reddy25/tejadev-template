import type { Request, Response } from 'express'

import { mg } from 'db'
import { z } from 'zod'

import firebase_auth from '../../services/firebase.ts'
import { throw_error } from '../../utils/throw-error.ts'

export const signup = async (req: Request, res: Response) => {
  const { name } = signup_schema.parse(req.body)

  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    throw_error('Missing or invalid Authorization header', 401)
  }

  const decoded = await firebase_auth().verifyIdToken(token as string)

  if (!decoded) {
    throw_error('Invalid or expired Firebase token', 401)
  }

  const db_user = await mg.User.findOne({
    email: decoded.email,
    is_active: true
  })

  if (db_user) {
    throw_error('User already exists', 409)
  }

  const created_user = await mg.User.create({
    email: decoded.email,
    name,
    firebase_uid: decoded.uid,
    provider: 'password',
    is_active: true
  })

  res.json({
    message: 'Signup successful',
    data: created_user
  })
}

const signup_schema = z.object({
  name: z.string().trim()
})
