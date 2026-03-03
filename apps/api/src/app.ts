import { createServer } from 'http'
import type { NextFunction, Request, Response } from 'express'
import express, { json, urlencoded } from 'express'
import { rateLimit } from 'express-rate-limit'

import cors from 'cors'
import helmet from 'helmet'

import 'express-async-errors'

import fileUpload from 'express-fileupload'

import { get_db_status } from 'db'
import morgan from 'morgan'

import { env } from './constants/env.ts'
import error_handler from './middlewares/error-handler.ts'
import { request_id_handler } from './middlewares/request-id.ts'
import { success_handler } from './middlewares/success-handler.ts'
import { auth_router } from './routes/auth.ts'
import { slug_router } from './routes/slug.ts'
import CustomError from './utils/CustomError.ts'

const app = express()
const httpServer = createServer(app)

const rate_limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' }
})

app.use(helmet())
app.use(cors())
app.use(rate_limiter)
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan(env.node_env === 'prod' ? 'combined' : 'dev'))
app.use(fileUpload({ createParentPath: true }))

app.use(request_id_handler)
app.use(success_handler)

app.get('/api/v1', async (_req: Request, res: Response) => {
  res.json({
    message: 'tejadev api is running - health check',
    data: {
      environment: env.node_env,
      uptime: Math.floor(process.uptime()),
      db_status: get_db_status(),
      timestamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    }
  })
})

app.use('/api/v1/auth', auth_router)
app.use('/api/v1/slug', slug_router)

app.all('*', (req: Request, _res: Response, next: NextFunction) => {
  next(new CustomError(`Route '${req.originalUrl}' not found`, 404))
})

app.use(error_handler)

export { app, httpServer }
