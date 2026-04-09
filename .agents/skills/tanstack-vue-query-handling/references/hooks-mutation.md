# Mutation Composables (useMutation)

Composables wrap core API methods with `useMutation`. **Required**: call `invalidateQueries` in `onSuccess` (or `onSettled`). Always expose **async** action only (use `mutateAsync`, not `mutate`).

Paths below follow **`src/apis/services/<domain>/`**.

## Return shape

```typescript
{
  data: Ref<T | undefined>
  isPending: Ref<boolean>
  isSuccess: Ref<boolean>
  isError: Ref<boolean>
  error: Ref<Error | null>
  [actionName]: (variables: TVariables) => Promise<T>
}
```

Return `error` directly from `mutation.error` — no helper.

The async action is `mutateAsync`. Name it after the composable: `useStoreCreate` → `createStore`.

## Rule: Invalidate

After each successful mutation, invalidate affected queries so the UI stays in sync.

## Example

```typescript
// src/apis/services/store/use-store-create.ts
import { useMutation, useQueryClient } from '@tanstack/vue-query'

import { storeApi } from '@/apis/cores/store-api'
import type { CreateStoreInput } from '@/models/store/store'

export const useStoreCreate = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (input: CreateStoreInput) => storeApi.createStore(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stores'] })
    },
  })

  return {
    data: mutation.data,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    createStore: mutation.mutateAsync,
  }
}
```

## Usage in `<script setup>`

```vue
<script setup lang="ts">
import { useStoreCreate } from '@/apis/services/store/use-store-create'

const { createStore, isPending, isError, error } = useStoreCreate()

const handleSubmit = async (input: CreateStoreInput) => {
  await createStore(input)
}
</script>

<template>
  <button :disabled="isPending" @click="handleSubmit(formData)">
    {{ isPending ? 'Saving...' : 'Create' }}
  </button>
  <span v-if="isError">Error: {{ error?.message }}</span>
</template>
```

## Invalidate strategy

| Mutation                              | Invalidate                      |
| ------------------------------------- | ------------------------------- |
| Create                                | `[resource]` (list)             |
| Update                                | `[resource]`, `[resource, id]`  |
| Delete                                | `[resource]`                    |
| Nested create (e.g. add post to user) | `[resource, id, subResource]`   |
