# Query Keys

Rules for TanStack Vue Query keys.

## Structure

Keys follow **general to specific** order, using an array.

```typescript
// Resource (list)
['users']

// Resource + identifier
['users', userId]

// Resource + sub-resource
['users', userId, 'posts']

// Resource + filters/params (use object)
['users', { status: 'active', page: 1 }]
```

## Rules

| Pattern | Key | Use when |
|---------|-----|----------|
| List all | `[resource]` | List without filters |
| List with params | `[resource, params]` | List with filter/pagination |
| Detail by id | `[resource, id]` | Single item detail |
| Nested | `[resource, id, subResource]` | Child resource |

## Naming

- **Resource**: singular for one item (`user`, `overview`), plural for list (`users`).
- **Params**: object with keys in snake_case or camelCase consistently (project uses camelCase).

## Examples by resource

```typescript
// overview
['overview']
['overview', { period: 'current', userId: 'u1' }]

// users
['users']
['users', { status: 'active', page: 1 }]
['users', userId]

// budgets
['budgets']
['budgets', budgetId]
['budgets', budgetId, 'transactions']
```

## Invalidate

When invalidating, use the prefix to match all related queries:

```typescript
import { useQueryClient } from '@tanstack/vue-query'

const queryClient = useQueryClient()

// Invalidate all users queries
queryClient.invalidateQueries({ queryKey: ['users'] })

// Invalidate only specific user
queryClient.invalidateQueries({ queryKey: ['users', userId] })
```

## Reactive params with `computed`

When query params depend on reactive state (refs, props), wrap the entire `queryKey` or individual params with `computed` to ensure reactivity:

```typescript
import { useQuery } from '@tanstack/vue-query'
import { computed, type Ref } from 'vue'

export const useGetUsers = (params: Ref<GetUsersParams>) => {
  const query = useQuery({
    queryKey: computed(() => ['users', params.value]),
    queryFn: () => getUsers(params.value),
  })

  return { ... }
}
```
