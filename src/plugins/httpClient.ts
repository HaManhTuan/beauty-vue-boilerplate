import axios, { isAxiosError } from 'axios'

import { queryClient } from '@/plugins/queryClient'
import { clearTokens, getAccessToken } from '@/plugins/tokenManager'

const baseURL = import.meta.env.VITE_API_BASE_URL ?? ''

export const apiClient = axios.create({
  baseURL,
  timeout: 30_000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

let onUnauthorized: (() => void) | null = null

/**
 * Register navigation / store reset when the API returns 401.
 * Call once from `main.ts` after router is available.
 */
export function registerUnauthorizedHandler(handler: () => void): void {
  onUnauthorized = handler
}

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (isAxiosError(error) && error.response?.status === 401) {
      clearTokens()
      queryClient.clear()
      onUnauthorized?.()
    }
    return Promise.reject(error)
  },
)
