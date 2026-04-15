import { ApiService } from '@/plugins/apiService'
import { apiClient } from '@/plugins/httpClient'

export class BaseApi {
  protected readonly apiService: ApiService

  constructor() {
    this.apiService = new ApiService(apiClient)
  }
}
