# Query Composables (useQuery)

Composables wrap core API methods with `useQuery`. All query composables return a fixed shape.

Paths below follow **`src/apis/services/<domain>/`** (see **`api-rule.md`**).

## Return shape

```typescript
{
  data: Ref<T | undefined>
  isLoading: Ref<boolean>
  isSuccess: Ref<boolean>
  isError: Ref<boolean>
  error: Ref<Error | null>
  refetch: () => void
}
// All reactive Refs — auto-unwrapped in Vue templates
```

Return `error` directly from `query.error` — no helper.

## List (with params)

```typescript
// src/apis/services/store/use-stores.ts
import { useQuery } from '@tanstack/vue-query'

import { storeApi } from '@/apis/cores/store-api'
import type { StoresQueryParams } from '@/apis/cores/store-api'

/**
 * Paginated store list.
 */
export const useStores = (params?: StoresQueryParams) => {
  const query = useQuery({
    queryKey: ['stores', params],
    queryFn: () => storeApi.getStores(params),
  })

  return {
    data: query.data,
    isLoading: query.isLoading,
    isSuccess: query.isSuccess,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  }
}
```

## Detail (by id)

```typescript
// src/apis/services/store/use-store-by-id.ts
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

import { storeApi } from '@/apis/cores/store-api'

export const useStoreById = (id: number) => {
  const query = useQuery({
    queryKey: ['stores', id],
    queryFn: () => storeApi.getStoreById(id),
    enabled: computed(() => id > 0),
  })

  return {
    data: query.data,
    isLoading: query.isLoading,
    isSuccess: query.isSuccess,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  }
}
```

## Usage in `<script setup>`

```vue
<script setup lang="ts">
import { useStores } from '@/apis/services/store/use-stores'

const { data, isLoading, isError, error } = useStores({ page: 1 })
</script>

<template>
  <span v-if="isLoading">Loading...</span>
  <span v-else-if="isError">Error: {{ error?.message }}</span>
  <ul v-else>
    <li v-for="store in data" :key="store.id">{{ store.name }}</li>
  </ul>
</template>
```
