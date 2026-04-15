# API Endpoint Implementation Checklist

## Overview

Use this checklist when implementing a **new API endpoint** on the frontend side, following the rules in `.agents/rules/api-rule.md`, `structure.md`, `naming.md`, and `data-model.md`.

**Endpoint**: `{METHOD} {PATH}`  
**Domain**: `{store|staff|category|...}`  
**Purpose**: `{brief description of what this endpoint does}`  
**Authentication Required**: `{Yes|No}`  
**Core API File**: `src/apis/cores/{domain}-api.ts`  
**Service Hook File(s)**: `src/apis/services/{domain}/{hook-file}.ts`  
**Model File**: `src/models/{domain}.ts`  
**Related Spec**: `{docs/specs/...}`  
**Estimated Complexity**: `{Low|Medium|High}`  
**Response Type (backend)**: `{JSON/Array/File/etc}`

---

## Required Prerequisites

Before implementing this API endpoint, ensure the following are completed:

### 1. Authentication & Authorization

- [ ] Confirm whether the endpoint requires authentication
  - If **Yes**:
    - [ ] Endpoint uses the same auth mechanism as the rest of the app (Bearer token from `tokenManager` / auth flow; see `src/plugins/httpClient.ts`).
    - [ ] Any role/permission checks are documented in the backend spec.

### 2. Data Model Planning

- [ ] Decide which **domain model** in `src/models/**` will represent this data
  - Example: `StoreModel` in `src/models/store.ts`.
- [ ] Identify minimal fields required by the frontend (do not overexpose).
- [ ] Decide if you need:
  - [ ] A new model.
  - [ ] Extending an existing model.
  - [ ] Additional helper methods (e.g. `fromApi`, `fromApiList`).

---

## 1. Model Definition (`src/models/**`)

**Goal**: Confirm that a proper domain model already exists and is defined according to `.agents/rules/data-model.md`.

Checklist:

- [ ] Model file exists in `src/models/{domain}.ts`.
- [ ] Model class name follows naming rules (e.g. `StoreModel`).
- [ ] Mapping helpers (`fromApi`, `fromApiList`) are implemented (or explicitly not needed for this endpoint).

---

## 2. Core API Class (`src/apis/cores/**`)

**Goal**: Implement the HTTP-level integration and map raw API data → models **only in the core API class**, as per `api-rule.md` and `data-model.md`.

For a `store` endpoint:

- [ ] In `src/apis/cores/store-api.ts`:
  - [ ] Add or update the appropriate method in `StoreApi`:
    - List: `getStores(params?: StoresQueryParams, config?: AxiosRequestConfig)`
    - Detail: `getStoreById(id: number | string, config?: AxiosRequestConfig)`
    - Mutations: `createStore`, `updateStore`, `deleteStore`, etc. (if needed).
  - [ ] Use `ApiService` via `BaseApi` for the HTTP call.
  - [ ] Map `response.data` into model(s):
    - [ ] List: `StoreModel.fromApiList(response.data)`
    - [ ] Detail: `StoreModel.fromApi(response.data)`
  - [ ] Keep method signatures typed with `ApiResponse<...>` where possible.

Checklist:

- [ ] Core API file exists: `src/apis/cores/{domain}-api.ts`.
- [ ] API class extends `BaseApi` and follows naming: `XxxApi` (e.g. `StoreApi`).
- [ ] Each new endpoint has a method:
  - [ ] `getXxx`, `createXxx`, `updateXxx`, `deleteXxx`, etc.
- [ ] All mapping from backend DTOs → models is done here (no mapping in hooks/components).
- [ ] Singleton instance exported: `export const storeApi = new StoreApi()`.

---

## 3. Service Hook (`src/apis/services/**`)

**Goal**: Expose the endpoint via a TanStack Query hook that returns **models**, not raw DTOs.

For a `store` list endpoint:

- [ ] Create or update `src/apis/services/store/use-stores.ts`:
  - [ ] Implement `useStoresQuery(params?: StoresQueryParams)`.
  - [ ] Use `useQuery` from `@tanstack/vue-query`.
  - [ ] Define a proper **query key**:
    - Example: `['stores', params]`.
  - [ ] Call `storeApi.getStores(params)` and return `response.data` (which is `StoreModel[]`).

For a `store` detail endpoint:

- [ ] Create or update `src/apis/services/store/use-store-by-id.ts`:
  - [ ] Implement `useStoreByIdQuery(id: number | string, enabled = true)`.
  - [ ] Query key: `['stores', id]`.
  - [ ] Call `storeApi.getStoreById(id)` and return `response.data` (which is `StoreModel`).

Checklist:

- [ ] Hook file name follows naming: `use-stores.ts`, `use-store-by-id.ts`, etc.
- [ ] Hook name follows naming: `useStoresQuery`, `useStoreByIdQuery`, etc.
- [ ] Query key matches the domain and filter pattern from `api-rule.md`.
- [ ] Hook does **not**:
  - [ ] Use axios directly.
  - [ ] Re-map response shapes (just returns models from core API).

---

## 4. Authentication & Error Handling (via infrastructure)

Most auth and error logic is centralized in:

- `src/plugins/httpClient.ts`
- `src/plugins/tokenManager.ts`

Per-endpoint checklist:

- [ ] Confirm the endpoint is covered by the shared Axios instance (`apiClient` in `src/plugins/httpClient.ts`: auth header, 401 cleanup + registered handler; extend here if you add refresh-token logic).
- [ ] For special error cases (e.g. 404 → show dedicated UI), handle them at the hook or component level:
  - Example: check for `error?.response?.status === 404` in the component or hook.

You **should not**:

- [ ] Reimplement token handling or login redirect in each API method.
- [ ] Bypass `apiClient` unless there is a very specific reason.

---

## 5. Request Handling (Params, Body, Headers)

Checklist for request handling in the core API method:

- [ ] Query params are merged correctly:
  - Example:
    ```ts
    params: {
      ...(config?.params || {}),
      ...(params || {}),
    }
    ```
- [ ] Request body shape matches backend expectations:
  - (Optionally) Map from model/view state to DTO in the core API for mutations.
- [ ] Headers:
  - [ ] Use default JSON headers unless a special content type is required.
  - [ ] Set `multipart/form-data` for file uploads, etc.

---

## 6. Response Processing & Data Model

Checklist:

- [ ] Core API method maps `response.data` to domain models using `Model.fromApi` / `Model.fromApiList`.
- [ ] Service hooks return models and do not expose raw DTOs.
- [ ] Components and stores only use model types (e.g. `StoreModel`), not DTOs.

Example pattern (already in code for `StoreApi`):

```ts
return this.apiService
  .get<ApiResponse<unknown[]>>('/stores', { ... })
  .then((response) => ({
    ...response,
    data: StoreModel.fromApiList(response.data),
  }))
```

---

## 7. Loading, Caching & Query Behavior

Checklist in the hook:

- [ ] Loading state is handled via TanStack Query (`isLoading`, `isFetching`).
- [ ] Caching behavior is configured (or default is acceptable):
  - [ ] Check `staleTime`, `gcTime` (TanStack Query v5) if necessary.
- [ ] `enabled` flag is used correctly for conditional queries (e.g. `id` might be undefined at first).
- [ ] Consider invalidation strategy for mutations:
  - Example: `queryClient.invalidateQueries({ queryKey: ['stores'] })` after creating/updating/deleting a store.

---

