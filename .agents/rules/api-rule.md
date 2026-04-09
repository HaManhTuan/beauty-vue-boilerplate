## API Guidelines (Axios + TanStack Query)

This document defines how to design and implement API access in this project using:

- Axios (`apiClient`, `ApiService`)
- TanStack Vue Query
- Pinia auth store + `tokenManager`

The goals are:

- Consistent structure for all APIs
- Clear separation between HTTP layer and UI logic
- Easy caching/invalidation with TanStack Query

---

### 1. Folder Structure

- **`src/apis/cores`**
  - Domain-level API classes for each feature (e.g. `StoreApi`, `StaffApi`, `CategoryApi`).
  - Each class:
    - Extends `BaseApi`.
    - Uses `apiService` internally.
    - Contains only HTTP methods (no UI or component logic).
  - Each domain exports a shared instance:
    - `export const storeApi = new StoreApi()`

- **`src/apis/services`**
  - TanStack Query hooks that wrap `cores` APIs.
  - Organized by domain:
    - `src/apis/services/store/useStores.ts`
    - `src/apis/services/store/useStoreById.ts`
    - etc.
  - Responsible for:
    - Defining query/mutation keys.
    - Calling the appropriate `XxxApi` methods.
    - Unwrapping `response.data`.
    - Providing TanStack Query options.

---

### 2. Base API Class (`BaseApi`)

- File: `src/apis/cores/BaseApi.ts`

- Rules:
  - The base class owns an `ApiService` instance:
    - `protected readonly apiService: ApiService`
  - The `ApiService` is always created from the shared `apiClient`.
  - No business logic is allowed in `BaseApi`.

**Pattern:**

```ts
import { ApiService } from '@/plugins/apiService'
import { apiClient } from '@/plugins/httpClient'

export class BaseApi {
  protected readonly apiService: ApiService

  constructor() {
    this.apiService = new ApiService(apiClient)
  }
}
```

---

### 3. Domain API Classes (`src/apis/cores`)

Each domain (Store, Staff, Category, etc.) defines:

- A TypeScript interface/model for its data.
- A class `XxxApi` that extends `BaseApi`.
- A single exported instance `xxxApi`.

**Naming:**

- Class: `StoreApi`, `StaffApi`, `CategoryApi`, …
- Instance: `storeApi`, `staffApi`, `categoryApi`, …

**Responsibilities of `XxxApi`:**

- Expose methods that map 1:1 to backend endpoints.
- Input:
  - Parameters required by the endpoint.
  - Optional `AxiosRequestConfig` when needed.
- Output:
  - `Promise<ApiResponse<T>>` where `T` is the domain type.

**Example (`StoreApi`):**

```ts
import type { AxiosRequestConfig } from 'axios'

import type { ApiResponse } from '@/plugins/apiService'

import { BaseApi } from './BaseApi'

export interface Store {
  id: number
  name: string
}

export interface StoresQueryParams {
  page?: number
  limit?: number
  [key: string]: unknown
}

export class StoreApi extends BaseApi {
  getStores(params?: StoresQueryParams, config?: AxiosRequestConfig) {
    return this.apiService.get<ApiResponse<Store[]>>('/stores', {
      ...(config || {}),
      params: {
        ...(config?.params || {}),
        ...(params || {}),
      },
    })
  }

  getStoreById(id: number | string, config?: AxiosRequestConfig) {
    return this.apiService.get<ApiResponse<Store>>(`/stores/${id}`, config)
  }
}

export const storeApi = new StoreApi()
```

---

### 4. Service Hooks (`src/apis/services`)

Service hooks are the only place where:

- TanStack Query is used (`useQuery`, `useMutation`, etc.).
- Query keys are defined.
- Data is unwrapped (`response.data`).

**File & hook naming:**

- List queries:
  - File: `useStores.ts`
  - Hook: `useStoresQuery`
- Detail queries:
  - File: `useStoreById.ts`
  - Hook: `useStoreByIdQuery`
- Mutations:
  - File: `useStoreCreate.ts`
  - Hook: `useStoreCreateMutation`
  - Similar for update/delete.

**Example – list query:**

```ts
// src/apis/services/store/useStores.ts
import { useQuery } from '@tanstack/vue-query'

import type { Store, StoresQueryParams } from '@/apis/cores/StoreApi'
import { storeApi } from '@/apis/cores/StoreApi'

export function useStoresQuery(params?: StoresQueryParams) {
  return useQuery({
    queryKey: ['stores', params],
    queryFn: async () => {
      const response = await storeApi.getStores(params)
      return response.data as Store[]
    },
  })
}
```

**Example – detail query:**

```ts
// src/apis/services/store/useStoreById.ts
import { useQuery } from '@tanstack/vue-query'

import type { Store } from '@/apis/cores/StoreApi'
import { storeApi } from '@/apis/cores/StoreApi'

export function useStoreByIdQuery(id: number | string, enabled = true) {
  return useQuery({
    queryKey: ['stores', id],
    queryFn: async () => {
      const response = await storeApi.getStoreById(id)
      return response.data as Store
    },
    enabled,
  })
}
```

---

### 5. Query Key Conventions

Query keys **must** be arrays.

- Base domain:
  - `['stores']`, `['staffs']`, `['categories']`, …
- Lists with parameters:
  - `['stores', params]` where `params` is a serializable object.
  - Example: `{ page: 1, limit: 20 }`.
- Detail by ID:
  - `['stores', id]`.

For more complex cases:

- `['stores', 'list', params]`
- `['stores', 'detail', id]`

**Rules:**

- First element: domain name in plural (`'stores'`, `'staffs'`, …).
- Next elements: scope / identifier / parameters.

---

### 6. Mutation Hook Conventions

- Location: `src/apis/services/<domain>/`
- Naming:
  - `useStoreCreateMutation`
  - `useStoreUpdateMutation`
  - `useStoreDeleteMutation`
- Responsibilities:
  - Call the appropriate method on `xxxApi` (e.g. `storeApi.createStore`).
  - Invalidate or update related queries via `queryClient`.

**Typical invalidation:**

```ts
queryClient.invalidateQueries({ queryKey: ['stores'] })
```

This must be done in the mutation `onSuccess` handler.

---

### 7. Component Usage Rules

- Components **must not**:
  - Import `XxxApi` directly.
  - Call axios directly.
  - Manage query keys manually.

- Components **must**:
  - Import hooks from `src/apis/services/...`.
  - Use the data returned by TanStack Query (`data`, `isLoading`, `error`, etc.).

**Example:**

```ts
import { useStoresQuery } from '@/apis/services/store/useStores'

const { data: stores, isLoading, error } = useStoresQuery({ page: 1, limit: 20 })
```

---

### 8. Auth / Token Handling with TanStack Query

- Token handling lives in:
  - `src/stores/auth.ts`
  - `src/plugins/tokenManager.ts`
  - `src/plugins/httpClient.ts`

- Hooks in `src/apis/services` **must not**:
  - Read or write tokens directly.
  - Redirect on auth errors.

- When a refresh token fails:
  - `tokenManager`:
    - Clears auth state in the store.
    - Calls `queryClient.clear()` to remove all cached queries/mutations.
    - Redirects to `/login`.

This ensures no stale authenticated data remains in TanStack Query after logout/expiry.

---

### 9. Adding a New API

When implementing a new API endpoint, follow this order:

1. **Model & Core API**
   - Add types/interfaces in `src/apis/cores/<Domain>Api.ts`.
   - Add a method to `XxxApi` that calls the correct backend endpoint.

2. **Service Hook**
   - Create a new file in `src/apis/services/<domain>/`.
   - Implement:
     - A query hook (`useXxxQuery`) for GET endpoints.
     - Or a mutation hook (`useXxxMutation`) for POST/PUT/PATCH/DELETE.
   - Define a proper `queryKey` or mutation key.

3. **Use Hook in Components**
   - Import the hook in the Vue component.
   - Do **not** call axios or `XxxApi` directly from the component.

## API Guidelines (Axios + TanStack Query)

This document defines how to design and implement API access in this project using:

- Axios (`apiClient`, `ApiService`)
- TanStack Vue Query
- Pinia auth store + tokenManager

The goals are:

- Consistent structure for all APIs
- Clear separation between HTTP layer and UI logic
- Easy caching/invalidation with TanStack Query

---

### 1. Folder Structure

- **`src/apis/cores`**
  - Domain-level API classes for each feature (e.g. `StoreApi`, `StaffApi`, `CategoryApi`).
  - Each class:
    - Extends `BaseApi`.
    - Uses `apiService` internally.
    - Contains only HTTP methods (no UI or component logic).
  - Each domain exports a shared instance:
    - `export const storeApi = new StoreApi()`

- **`src/apis/services`**
  - TanStack Query hooks that wrap `cores` APIs.
  - Organized by domain:
    - `src/apis/services/store/useStores.ts`
    - `src/apis/services/store/useStoreById.ts`
    - etc.
  - Responsible for:
    - Defining query/mutation keys.
    - Calling the appropriate `XxxApi` methods.
    - Unwrapping `response.data`.
    - Providing TanStack Query options.

---

### 2. Base API Class (`BaseApi`)

- File: `src/apis/cores/BaseApi.ts`

- Rules:
  - The base class owns an `ApiService` instance:
    - `protected readonly apiService: ApiService`
  - The `ApiService` is always created from the shared `apiClient`.
  - No business logic is allowed in `BaseApi`.

**Pattern:**

```ts
import { ApiService } from '@/plugins/apiService'
import { apiClient } from '@/plugins/httpClient'

export class BaseApi {
  protected readonly apiService: ApiService

  constructor() {
    this.apiService = new ApiService(apiClient)
  }
}
```

---

### 3. Domain API Classes (`src/apis/cores`)

Each domain (Store, Staff, Category, etc.) defines:

- A TypeScript interface/model for its data.
- A class `XxxApi` that extends `BaseApi`.
- A single exported instance `xxxApi`.

**Naming:**

- Class: `StoreApi`, `StaffApi`, `CategoryApi`, …
- Instance: `storeApi`, `staffApi`, `categoryApi`, …

**Responsibilities of `XxxApi`:**

- Expose methods that map 1:1 to backend endpoints.
- Input:
  - Parameters required by the endpoint.
  - Optional `AxiosRequestConfig` when needed.
- Output:
  - `Promise<ApiResponse<T>>` where `T` is the domain type.

**Example (`StoreApi`):**

```ts
import type { AxiosRequestConfig } from 'axios'

import type { ApiResponse } from '@/plugins/apiService'

import { BaseApi } from './BaseApi'

export interface Store {
  id: number
  name: string
}

export interface StoresQueryParams {
  page?: number
  limit?: number
  [key: string]: unknown
}

export class StoreApi extends BaseApi {
  getStores(params?: StoresQueryParams, config?: AxiosRequestConfig) {
    return this.apiService.get<ApiResponse<Store[]>>('/stores', {
      ...(config || {}),
      params: {
        ...(config?.params || {}),
        ...(params || {}),
      },
    })
  }

  getStoreById(id: number | string, config?: AxiosRequestConfig) {
    return this.apiService.get<ApiResponse<Store>>(`/stores/${id}`, config)
  }
}

export const storeApi = new StoreApi()
```

---

### 4. Service Hooks (`src/apis/services`)

Service hooks are the only place where:

- TanStack Query is used (`useQuery`, `useMutation`, etc.).
- Query keys are defined.
- Data is unwrapped (`response.data`).

**File & hook naming:**

- List queries:
  - File: `useStores.ts`
  - Hook: `useStoresQuery`
- Detail queries:
  - File: `useStoreById.ts`
  - Hook: `useStoreByIdQuery`
- Mutations:
  - File: `useStoreCreate.ts`
  - Hook: `useStoreCreateMutation`
  - Similar for update/delete.

**Example – list query:**

```ts
// src/apis/services/store/useStores.ts
import { useQuery } from '@tanstack/vue-query'

import type { Store, StoresQueryParams } from '@/apis/cores/StoreApi'
import { storeApi } from '@/apis/cores/StoreApi'

export function useStoresQuery(params?: StoresQueryParams) {
  return useQuery({
    queryKey: ['stores', params],
    queryFn: async () => {
      const response = await storeApi.getStores(params)
      return response.data as Store[]
    },
  })
}
```

**Example – detail query:**

```ts
// src/apis/services/store/useStoreById.ts
import { useQuery } from '@tanstack/vue-query'

import type { Store } from '@/apis/cores/StoreApi'
import { storeApi } from '@/apis/cores/StoreApi'

export function useStoreByIdQuery(id: number | string, enabled = true) {
  return useQuery({
    queryKey: ['stores', id],
    queryFn: async () => {
      const response = await storeApi.getStoreById(id)
      return response.data as Store
    },
    enabled,
  })
}
```

---

### 5. Query Key Conventions

Query keys **must** be arrays.

- Base domain:
  - `['stores']`, `['staffs']`, `['categories']`, …
- Lists with parameters:
  - `['stores', params]` where `params` is a serializable object.
  - Example: `{ page: 1, limit: 20 }`.
- Detail by ID:
  - `['stores', id]`.

For more complex cases:

- `['stores', 'list', params]`
- `['stores', 'detail', id]`

**Rules:**

- First element: domain name in plural (`'stores'`, `'staffs'`, …).
- Next elements: scope / identifier / parameters.

---

### 6. Mutation Hook Conventions

- Location: `src/apis/services/<domain>/`
- Naming:
  - `useStoreCreateMutation`
  - `useStoreUpdateMutation`
  - `useStoreDeleteMutation`
- Responsibilities:
  - Call the appropriate method on `xxxApi` (e.g. `storeApi.createStore`).
  - Invalidate or update related queries via `queryClient`.

**Typical invalidation:**

```ts
queryClient.invalidateQueries({ queryKey: ['stores'] })
```

This must be done in the mutation `onSuccess` handler.

---

### 7. Component Usage Rules

- Components **must not**:
  - Import `XxxApi` directly.
  - Call axios directly.
  - Manage query keys manually.

- Components **must**:
  - Import hooks from `src/apis/services/...`.
  - Use the data returned by TanStack Query (`data`, `isLoading`, `error`, etc.).

**Example:**

```ts
import { useStoresQuery } from '@/apis/services/store/useStores'

const { data: stores, isLoading, error } = useStoresQuery({ page: 1, limit: 20 })
```

---

### 8. Auth / Token Handling with TanStack Query

- Token handling lives in:
  - `src/stores/auth.ts`
  - `src/plugins/tokenManager.ts`
  - `src/plugins/httpClient.ts`

- Hooks in `src/apis/services` **must not**:
  - Read or write tokens directly.
  - Redirect on auth errors.

- When a refresh token fails:
  - `tokenManager`:
    - Clears auth state in the store.
    - Calls `queryClient.clear()` to remove all cached queries/mutations.
    - Redirects to `/login`.

This ensures no stale authenticated data remains in TanStack Query after logout/expiry.

---

### 9. Adding a New API

When implementing a new API endpoint, follow this order:

1. **Model & Core API**
   - Add types/interfaces in `src/apis/core/<Domain>Api.ts`.
   - Add a method to `XxxApi` that calls the correct backend endpoint.

2. **Service Hook**
   - Create a new file in `src/apis/services/<domain>/`.
   - Implement:
     - A query hook (`useXxxQuery`) for GET endpoints.
     - Or a mutation hook (`useXxxMutation`) for POST/PUT/PATCH/DELETE.
   - Define a proper `queryKey` or mutation key.

3. **Use Hook in Components**
   - Import the hook in the Vue component.
   - Do **not** call axios or `XxxApi` directly from the component.
