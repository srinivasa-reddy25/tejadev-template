import {
  connect_db as connect_database,
  disconnect_db as disconnect_database,
  get_db_status
} from 'db'

import { env } from '../constants/env.ts'

export const connect_db = async (): Promise<void> => {
  await connect_database(env.db_url)
}

export const disconnect_db = async (): Promise<void> => {
  await disconnect_database()
}

export { get_db_status }
