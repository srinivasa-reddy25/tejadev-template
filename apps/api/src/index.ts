import express, { type Request, type Response } from 'express'

import { slugify } from '@tejadev/shared'

import { env } from './const/env.js'

const app = express()
const port = env.API_PORT

app.use(express.json())

app.get('/health', (_req: Request, res: Response) => {
  res.json({
    message: 'Hello World',
    timestamp: new Date().toISOString()
  })
})

app.get('/slug', (req: Request, res: Response) => {
  const { text } = req.body
  const slug = slugify(text ?? '')
  res.json({ input: text, slug })
})

app.listen(port, () => {
  const serviceName = slugify('Teja Dev API')
  console.log(`[${serviceName}] listening on http://localhost:${port}`)
})
