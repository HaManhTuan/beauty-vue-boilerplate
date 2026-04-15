import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * Alias for JSON response bodies. If the backend wraps payloads (e.g. `{ data: T }`),
 * change this type and adjust TanStack hooks that unwrap `response.data`.
 */
export type ApiResponse<T> = T

export class ApiService {
  constructor(private readonly client: AxiosInstance) {}

  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config)
  }

  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config)
  }

  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config)
  }

  patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.patch<T>(url, data, config)
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config)
  }
}
