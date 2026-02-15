import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'

import { env } from '@/constants/env'

let get_access_token: (() => Promise<string | null>) | null = null

export const set_access_token_getter = (
  getter: () => Promise<string | null>
): void => {
  get_access_token = getter
}

const api: AxiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  },
  timeout: 15_000
})

api.interceptors.request.use(
  async (config) => {
    config.headers = config.headers || {}

    const token = get_access_token ? await get_access_token() : null

    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError<{ message?: string }>) => {
    return Promise.reject(error?.response?.data ?? error)
  }
)

export { api }
export const api_client = api
