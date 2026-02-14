import type { Request, Response } from 'express'

const get_health_controller = (_req: Request, res: Response) => {
  res.json({
    message: 'Hello World',
    timestamp: new Date().toISOString()
  })
}

export { get_health_controller }
