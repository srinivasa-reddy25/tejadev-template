import { createServer } from 'http'
import express from 'express'

import { healthRouter } from './routes/health.ts'
import { slugRouter } from './routes/slug.ts'

const app = express()
const httpServer = createServer(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/health', healthRouter)
app.use('/api/v1/slug', slugRouter)

export { app, httpServer }
