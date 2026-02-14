import type { Request, Response } from 'express'

const getHealthController = (_req: Request, res: Response) => {
  res.json({
    message: 'Hello World',
    timestamp: new Date().toISOString()
  })
}

export { getHealthController }
