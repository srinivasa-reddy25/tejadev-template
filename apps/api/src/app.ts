import { createServer } from 'http'
import type { NextFunction, Request, Response } from 'express'
import express, { json, urlencoded } from 'express'

import cors from 'cors'

import 'express-async-errors'

import fileUpload from 'express-fileupload'

import { get_db_status } from 'db'
import morgan from 'morgan'

import { env } from './constants/env.ts'
import error_handler from './middlewares/error-handler.ts'
import { success_handler } from './middlewares/success-handler.ts'
import { slug_router } from './routes/slug.ts'
import CustomError from './utils/CustomError.ts'

const app = express()
const httpServer = createServer(app)

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(fileUpload({ createParentPath: true }))

app.use(success_handler)

app.get('/', async (_req: Request, res: Response) => {
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

app.use('/api/v1/slug', slug_router)

app.all('*', (req: Request, _res: Response, next: NextFunction) => {
  next(new CustomError(`Route '${req.originalUrl}' not found`, 404))
})

app.use(error_handler)

export { app, httpServer }
