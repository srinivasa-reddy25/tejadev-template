import { Router } from 'express'

import { postSlugController } from '../controllers/slug/post-slug.ts'

const router = Router()

router.post('/', postSlugController)

export { router as slugRouter }
