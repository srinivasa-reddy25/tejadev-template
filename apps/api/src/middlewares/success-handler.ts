import type { NextFunction, Request, Response } from 'express'

export const success_handler = (
  _req: Request,
  _res: Response,
  next: NextFunction
): void => {
  next()
}
