import { Router } from 'express'

import { getHealthController } from '../controllers/health/get-health.ts'

const router = Router()

router.get('/', getHealthController)

export { router as healthRouter }
