import { Router } from 'express'

import { google_auth } from '../controllers/auth/google.ts'
import { login } from '../controllers/auth/login.ts'
import { signup } from '../controllers/auth/signup.ts'

const router = Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/google', google_auth)

export { router as auth_router }
