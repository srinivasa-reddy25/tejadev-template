import type { Request, Response } from 'express'

import { mg } from 'db'

import firebase_auth from '../../services/firebase.ts'
import { throw_error } from '../../utils/throw-error.ts'

export const google_auth = async (req: Request, res: Response) => {
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
    res.json({
      message: 'Google login successful',
      data: db_user
    })
    return
  }

  const new_db_user = await mg.User.create({
    email: decoded.email,
    name: decoded.name?.trim(),
    profile_image: decoded.picture ?? null,
    firebase_uid: decoded.uid,
    provider: 'google',
    is_active: true
  })

  res.json({
    message: 'Google login successful',
    data: new_db_user
  })
}
