import { Axiom } from '@axiomhq/js'

import { env } from './constants/env'

type TLogPayload = {
  message: string
  app: string
  notify_on_slack?: boolean
  meta?: Record<string, unknown>
}

const axiom =
  env.node_env === 'prod' && env.axiom_token && env.axiom_dataset
    ? new Axiom({ token: env.axiom_token })
    : null

const write_log = async (
  level: 'info' | 'warn' | 'error',
  payload: TLogPayload
): Promise<void> => {
  if (!axiom) {
    if (level === 'error') {
      console.error(`[${payload.app}] ${payload.message}`, payload.meta ?? {})
      return
    }

    if (level === 'warn') {
      console.warn(`[${payload.app}] ${payload.message}`, payload.meta ?? {})
      return
    }

    console.log(`[${payload.app}] ${payload.message}`, payload.meta ?? {})
    return
  }

  await axiom.ingest(env.axiom_dataset, [
    {
      level,
      ...payload,
      timestamp: new Date().toISOString()
    }
  ])
}

export const log = {
  info: (payload: TLogPayload): void => {
    void write_log('info', payload)
  },
  warn: (payload: TLogPayload): void => {
    void write_log('warn', payload)
  },
  error: (payload: TLogPayload): void => {
    void write_log('error', payload)
  }
}
