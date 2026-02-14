import { slugify } from '@tejadev/shared'

import { httpServer } from './app.ts'
import { env } from './constants/env.ts'

httpServer.listen(env.API_PORT, () => {
  const serviceName = slugify('Teja Dev API')
  console.log(`[${serviceName}] listening on http://localhost:${env.API_PORT}`)
})
