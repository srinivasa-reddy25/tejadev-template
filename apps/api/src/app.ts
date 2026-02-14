import { createServer } from 'http'
import express, {
  json,
  urlencoded,
  type NextFunction,
  type Request,
  type Response
} from 'express'

import cors from 'cors'

import 'express-async-errors'

import fileUpload from 'express-fileupload'

import morgan from 'morgan'

import error_handler from './middlewares/error-handler.ts'
import { success_handler } from './middlewares/success-handler.ts'
import { health_router } from './routes/health.ts'
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

app.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'Hello, World!' })
})

app.use('/api/v1/health', health_router)
app.use('/api/v1/slug', slug_router)

app.all('*', (req: Request, _res: Response, next: NextFunction) => {
  next(new CustomError(`Route '${req.originalUrl}' not found`, 404))
})

app.use(error_handler)

export { app, httpServer }
