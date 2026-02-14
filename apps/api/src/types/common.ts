type TValidationError = {
  fields: string[]
  details: Array<{
    field: string
    message: string
    code?: string
  }>
}

export type TErrorResponse = {
  message: string
  status_code: number
  stack?: string
  developer_message?: string
  validation_error?: TValidationError
}
