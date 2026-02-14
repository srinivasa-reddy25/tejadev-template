import type { NextFunction, Request, Response } from 'express'

import { env } from '../constants/env.ts'
import type { TErrorResponse } from '../types/common.ts'
import CustomError from '../utils/CustomError.ts'

const error_handler = (
  err: Error | CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const status_code = err instanceof CustomError ? err.status_code : 500
  const error_response: TErrorResponse = {
    message: err.message || 'Unknown error occurred',
    status_code,
    stack: env.node_env === 'prod' ? undefined : err.stack
  }

  res.status(status_code).json(error_response)
}

export default error_handler
