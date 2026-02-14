import type { NextFunction, Request, Response } from 'express'

import { ZodError } from 'zod'
import { generateErrorMessage } from 'zod-error'

import { env } from '../constants/env.ts'
import type { TErrorResponse } from '../types/common.ts'
import CustomError from '../utils/CustomError.ts'

const error_handler = (
  err: Error | ZodError | CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let custom_error: TErrorResponse = err as TErrorResponse

  if (err instanceof ZodError) {
    custom_error = { ...handle_zod_error(err), stack: err.stack }
  } else if (err instanceof CustomError) {
    custom_error = {
      message: err.message,
      status_code: err.status_code,
      stack: err.stack
    }
  }

  send_error_as_response(custom_error, req, res)
}

const handle_zod_error = (err: ZodError): TErrorResponse => {
  const invalid_fields = err.issues.map((error) => error.path.join('.'))
  const formatted_message = generateErrorMessage(err.issues, {
    maxErrors: 1,
    path: { enabled: false },
    code: { enabled: false },
    message: {
      enabled: true,
      label: ''
    }
  })

  return {
    message:
      formatted_message ||
      'Invalid input. Please check your entries and try again.',
    status_code: 400,
    validation_error: {
      fields: invalid_fields,
      details: err.issues.map((error) => ({
        field: error.path.join('.'),
        message: error.message,
        code: error.code
      }))
    }
  }
}

const send_error_as_response = (
  err: TErrorResponse,
  _req: Request,
  res: Response
): void => {
  const error_response: TErrorResponse = {
    message: err.message || 'Unknown error occurred',
    status_code: err.status_code || 500,
    stack: env.node_env === 'prod' ? undefined : err.stack,
    validation_error: env.node_env === 'prod' ? undefined : err.validation_error
  }

  res.status(error_response.status_code).json(error_response)
}

export default error_handler
