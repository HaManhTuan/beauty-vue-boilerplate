---
name: tanstack-vue-query-handling
description: "TanStack Query composables — wrap API cores with useQuery/useMutation. Use when: (1) creating or modifying hooks under src/apis/services/, (2) query keys and invalidateQueries, (3) mutation onSuccess cache updates. Triggers: useQuery, useMutation, queryClient, api hooks."
metadata:
  keywords: tanstack-query, vue-query, useQuery, useMutation, query-key, invalidate, api-hooks, queryClient
---

# TanStack Vue Query Handling

## Overview

API composables wrap **core API classes** with TanStack Vue Query. One composable per file. These are API data composables — distinct from UI/component composables.

**This repository** places them under **`src/apis/services/<domain>/`**, not `hooks/`. See **`.agents/rules/api-rule.md`**.

## Folder Structure

```
src/apis/
├── cores/
│   └── store-api.ts          # XxxApi + storeApi singleton
└── services/
    └── store/                 # One folder per domain
        ├── use-stores.ts
        ├── use-store-by-id.ts
        ├── use-store-create.ts
        ├── use-store-update.ts
        └── use-store-delete.ts
```

## Rules

1. **One file = one API composable.**
2. **Read** → `useQuery`. **Write** → `useMutation`.
3. **Mutations required**: Call `queryClient.invalidateQueries()` in `onSuccess` (or `onSettled`) to sync cache.
4. **Query key**: Follow unified rules (see `references/query-keys.md`).
5. **Naming**: Files use kebab-case; composables use camelCase.
6. **Always async**: Expose `mutateAsync`, not `mutate`. Name the action by removing `use` prefix (`useStoreCreate` → `createStore`).
7. **Return `error` directly** from query/mutation — no helper.

## Naming Convention

| Layer | File | Export | Action key (mutation) | Example |
|-------|------|--------|----------------------|---------|
| Query composable | `use-{resource}.ts` | Composable | — | `use-stores.ts` → `useStores` |
| Mutation composable | `use-{action}-{resource}.ts` | Composable | Remove `use` prefix | `useStoreCreate` → `createStore` |

## Return Shapes

**Query composables:**
```typescript
{ data, isLoading, isSuccess, isError, error, refetch }
// All reactive Refs — auto-unwrapped in Vue templates
```

**Mutation composables:**
```typescript
{ data, isPending, isSuccess, isError, error, [actionName] }
// All reactive Refs — auto-unwrapped in Vue templates
```

## Resources

- **Query keys** → read `references/query-keys.md`
- **Query composables** (useQuery) → read `references/hooks-query.md`
- **Mutation composables** (useMutation + invalidate) → read `references/hooks-mutation.md`
