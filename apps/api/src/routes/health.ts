import { Router } from 'express'

import { get_health_controller } from '../controllers/health/get-health.ts'

const router = Router()

router.get('/', get_health_controller)

export { router as health_router }
