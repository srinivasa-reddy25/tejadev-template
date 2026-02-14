import { connect_db, disconnect_db } from 'db'

import { slugify } from '@tejadev/shared'

import { httpServer } from './app.ts'
import { env } from './constants/env.ts'

const start_server = async (): Promise<void> => {
  try {
    await connect_db()

    httpServer.listen(env.API_PORT, () => {
      const service_name = slugify('Teja Dev API')
      console.log(
        `[${service_name}] listening on http://localhost:${env.API_PORT}`
      )
    })
  } catch (error) {
    console.error('Failed to start server...', error)
    process.exit(1)
  }
}

const graceful_shutdown = async (): Promise<void> => {
  try {
    console.log('Shutting down gracefully...')
    await disconnect_db()
    process.exit(0)
  } catch (error) {
    console.error('Error during shutdown...', error)
    process.exit(1)
  }
}

start_server()

process.on('SIGTERM', graceful_shutdown)
process.on('SIGINT', graceful_shutdown)
