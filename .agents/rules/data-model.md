## Data Modeling Rules

This document defines how data must flow between the backend API and the application, with a strict requirement to use models defined under `src/models/**` and a transfer/transform layer in the API core.

---

### 1. Core Principles

1. **Separation of concerns**:
   - Backend DTO shapes (raw API responses) are treated as external contracts.
   - Application code (components, stores) should not depend directly on DTO shapes.

2. **Model-first in the app**:
   - All application logic (components, stores, derived state) should work with **models** defined in `src/models/**`.

3. **Transfer layer in API cores**:
   - All mapping from raw API data → application models must happen in `src/apis/cores/**` (the core API classes), not in components or hooks.

---

### 2. Where Models Live

- **Location**:
  - `src/models/<domain>/<domain>.ts`
  - Examples:
    - `src/models/store/store.ts` → `StoreModel`
    - Future: `src/models/staff/staff.ts` → `StaffModel`

- **Responsibilities**:
  - Define TypeScript classes representing the **application-level** view of the data.
  - Provide static helper methods for transforming DTOs to models:
    - `fromApi(dto: unknown): Model`
    - `fromApiList(dtos: unknown[]): Model[]`
  - Optionally use `class-transformer` to simplify mapping.

---

### 3. DTOs (Raw API Data)

- DTOs represent the raw shape returned by the backend.
- You can:
  - Fully define them as TypeScript interfaces (recommended when backend is stable).
  - Or treat them as `unknown`/`any` if you want to avoid strict typing, but the mapping logic must stay in **models** or **core APIs**, not in components.

- Example DTO definition (optional but recommended):

```ts
// src/models/store/store.ts
export interface StoreApiDto {
  id: number
  name: string
}
```

If you do not want to maintain DTO types, you can adjust your model mapping methods to accept `unknown` and perform runtime checks/casts.

---

### 4. Mapping Rules (Transfer Layer)

- **Mandatory**:
  - Every API response that is consumed by the app must be transformed into a model before leaving the core API layer.

- **Where mapping happens**:
  - In `src/apis/cores/<domain>-api.ts`:
    - Fetch raw data using `ApiService`.
    - Map `data` into model instances using the domain model.

- **Example**:

```ts
// src/models/store/store.ts
import { plainToInstance } from 'class-transformer'

export interface StoreApiDto {
  id: number
  name: string
}

export class StoreModel {
  id!: number
  name!: string

  static fromApi(dto: unknown): StoreModel {
    return plainToInstance(StoreModel, dto as object)
  }

  static fromApiList(dtos: unknown[]): StoreModel[] {
    return plainToInstance(StoreModel, dtos as object[])
  }
}
```

```ts
// src/apis/cores/store-api.ts
import type { AxiosRequestConfig } from 'axios'

import type { ApiResponse } from '@/plugins/apiService'
import { StoreModel } from '@/models/store/store'

import { BaseApi } from './base-api'

export interface StoresQueryParams {
  page?: number
  limit?: number
  [key: string]: unknown
}

export class StoreApi extends BaseApi {
  getStores(params?: StoresQueryParams, config?: AxiosRequestConfig) {
    return this.apiService
      .get<ApiResponse<unknown[]>>('/stores', {
        ...(config || {}),
        params: {
          ...(config?.params || {}),
          ...(params || {}),
        },
      })
      .then((response) => ({
        ...response,
        data: StoreModel.fromApiList(response.data),
      }))
  }

  getStoreById(id: number | string, config?: AxiosRequestConfig) {
    return this.apiService
      .get<ApiResponse<unknown>>(`/stores/${id}`, config)
      .then((response) => ({
        ...response,
        data: StoreModel.fromApi(response.data),
      }))
  }
}
```

> Note: You can choose between using explicit DTO types (`StoreApiDto`) or `unknown` + casting, but the mapping responsibility remains in the core API layer.

---

### 5. Usage in Service Hooks

- Service hooks in `src/apis/services/**` **must not**:
  - Re-map or mutate the shape of `response.data`.
  - Depend on DTO field names from the backend.

- Service hooks **must**:
  - Treat `response.data` as **already-mapped models**.
  - Forward models directly to components:

```ts
// src/apis/services/store/use-stores.ts
import { useQuery } from '@tanstack/vue-query'

import type { StoresQueryParams } from '@/apis/cores/store-api'
import { storeApi } from '@/apis/cores/store-api'

export function useStoresQuery(params?: StoresQueryParams) {
  return useQuery({
    queryKey: ['stores', params],
    queryFn: async () => {
      const response = await storeApi.getStores(params)
      return response.data // StoreModel[]
    },
  })
}
```

---

### 6. Usage in Components and Stores

- Components and Pinia stores **must only** work with models, not raw DTOs:
  - Do not call `plainToInstance` or manual mapping logic in components/stores.
  - Do not rely on backend field names directly (e.g. `api_store_name`).

- Components:
  - Receive `StoreModel[]` or `StoreModel` from hooks.
  - Render and manipulate these models.

- Stores:
  - Store instances of models (`StoreModel`) or arrays of them in state.
  - Avoid persisting raw DTOs in store state.

---

### 7. Mutations and Write Operations

- For write operations (create/update):
  - Components / stores construct payloads from models or view state.
  - Core APIs (`XxxApi`) are responsible for:
    - Converting model/view state into DTOs expected by the backend if the shapes differ.
    - Optionally mapping mutation responses back into models.

- Example:
  - Component:
    - Calls `useStoreCreateMutation` with a `StoreModel`-like payload or view model.
  - Core:
    - Transforms that payload into the correct DTO shape for the backend.
    - Maps backend response back to `StoreModel` if needed.

---

### 8. Summary Rules

1. **Always define and use domain models under `src/models/**` for application logic.**
2. **All API responses must be transformed into models in `src/apis/cores/**` before being exposed to hooks or components.**
3. **Service hooks (`apis/services`) forward models, not raw DTOs.**
4. **Components and stores never depend on backend DTO shapes directly.**
5. **Write operations (mutations) may map models/view state back into DTOs in the core API layer.**

