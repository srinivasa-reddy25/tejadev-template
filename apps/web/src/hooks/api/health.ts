import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api'

type THealthResponse = {
  message: string
}

const getHealth = (): Promise<THealthResponse> => {
  return api.get('/')
}

export const useHealth = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: getHealth
  })
}
