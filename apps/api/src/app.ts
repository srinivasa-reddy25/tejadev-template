import { createServer } from 'http'
import express, { json, Request, Response, urlencoded } from 'express'

import cors from 'cors'

import 'express-async-errors'

import fileUpload from 'express-fileupload'

import morgan from 'morgan'

import { health_router } from './routes/health.ts'
import { slug_router } from './routes/slug.ts'

const app = express()
const httpServer = createServer(app)

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(fileUpload({ createParentPath: true }))

app.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'Hello, World!' })
})

app.use('/api/v1/health', health_router)
app.use('/api/v1/slug', slug_router)

app.get('*', async (req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' })
})

export { app, httpServer }
