## Naming Conventions

This document defines how to name files, variables, functions, hooks, models, and components in this project.

Consistent naming makes the codebase more predictable and easier to navigate.

---

### 1. File Names

- **General rule**: Use **kebab-case** for file names.
  - Examples:
    - `store-api.ts`
    - `base-api.ts`
    - `use-stores.ts`
    - `use-store-by-id.ts`
    - `store.ts`

- **Vue components**:
  - Existing components follow `PascalCase.vue` (e.g. `Input.vue`).
  - New Vue single-file components:
    - Use `PascalCase.vue` to stay consistent with Vue ecosystem.

---

### 2. Variables and Functions

- **Variables (local, parameters, properties)**:
  - Use **camelCase**.
  - Examples:
    - `storeId`, `pageSize`, `isLoading`, `accessToken`.

- **Functions (non-hooks)**:
  - Use **camelCase**.
  - Name should be action-oriented or descriptive.
  - Examples:
    - `fetchStore`, `buildQueryParams`, `mapStoreResponse`.

---

### 3. Classes and Models

- **Classes**:
  - Use **PascalCase**.
  - Examples:
    - `BaseApi`, `StoreApi`, `StoreModel`.

- **Domain models (in `src/models/**`)**:
  - Use `PascalCase` for the class name.
  - File name is the domain name in kebab-case or plain lower-case (depending on folder):
    - `src/models/store/store.ts` → class `StoreModel`.
  - Suffix:
    - Class names should end with `Model` when they represent application-level models (e.g. `StoreModel`).

---

### 4. Hooks (TanStack Query, Vue composables)

- **Vue composables / hooks**:
  - Must start with `use`.
  - Use **camelCase** for the function name.
  - For API-related hooks in `apis/services`:
    - Queries:
      - `useStoresQuery`
      - `useStoreByIdQuery`
    - Mutations:
      - `useStoreCreateMutation`
      - `useStoreUpdateMutation`
      - `useStoreDeleteMutation`

- **Hook file names**:
  - Use **kebab-case** that mirrors the hook name without `Query`/`Mutation` suffix when useful.
  - Examples:
    - Hook: `useStoresQuery` → File: `use-stores.ts`
    - Hook: `useStoreByIdQuery` → File: `use-store-by-id.ts`

---

### 5. Core API Classes (`apis/cores`)

- **File names**:
  - Use **kebab-case** with `-api` suffix.
  - Examples:
    - `store-api.ts`
    - `staff-api.ts`

- **Class names**:
  - Use **PascalCase** with `Api` suffix:
    - `StoreApi`, `StaffApi`.

- **Singleton instances**:
  - Use **camelCase** domain name + `Api` shortened if needed:
    - `export const storeApi = new StoreApi()`

---

### 6. Components

- **Vue SFCs**:
  - File name: `PascalCase.vue` (e.g. `AppHeader.vue`, `DashboardLayout.vue`).
  - Component name inside script/template: same `PascalCase`.

- **Atoms / Molecules**:
  - Atoms:
    - `Input.vue`, `Button.vue`, `Select.vue`, etc.
  - Molecules:
    - `AppHeader.vue`, `AppSidebar.vue`.

---

### 7. Query Keys (TanStack Query)

- **General shape**:
  - Always use **array** keys.
  - First element: domain in **plural** form.
  - Subsequent elements: scope or identifier.

- **Examples**:
  - List:
    - `['stores']`
    - `['stores', params]`
  - Detail:
    - `['stores', storeId]`
  - Scoped:
    - `['stores', 'list', params]`
    - `['stores', 'detail', storeId]`

---

### 8. DTOs vs Models

- **DTO interfaces** (if defined explicitly):
  - Use `PascalCase` with `Dto` suffix.
  - Example: `StoreApiDto`.

- **Models**:
  - Use `PascalCase` with `Model` suffix.
  - Example: `StoreModel`.

---

### 9. Miscellaneous

- **Booleans**:
  - Prefix with `is`, `has`, `can`, `should` where appropriate:
    - `isLoading`, `hasError`, `canSubmit`, `shouldRefetch`.

- **Enums / union-like constants**:
  - Use `PascalCase` for enum names.
  - Use `UPPER_SNAKE_CASE` for raw constant values when defined as consts.

