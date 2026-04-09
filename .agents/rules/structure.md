## Project Structure Guidelines

This document describes the high-level structure of the project and where different kinds of code should live.

---

### 1. Top-level Layout

- `src/`
  - `main.ts`: Vue app bootstrap (Pinia, router, Vue Query plugin).
  - `App.vue`: Root application shell.
  - `router/`: Vue Router configuration.
  - `layouts/`: Layout components (e.g. dashboard layout).
  - `views/`: Page-level view components (routed screens).
  - `components/`: Reusable presentational components.
  - `stores/`: Pinia stores (application state).
  - `apis/`: HTTP and TanStack Query layer (API access).
  - `models/`: Domain models and transformation logic.
  - `plugins/`: Cross-cutting infrastructure (axios, apiService, queryClient, tokenManager).
  - `composables/`: Reusable Vue composables (non-HTTP).
  - `types/`: Shared TypeScript types for generic utilities.

---

### 2. Components

- `src/components/atoms/`
  - Lowest-level UI primitives (buttons, inputs, selects, etc.).
  - Mostly wrap shadcn-vue/radix-vue with project-specific styling.

- `src/components/molecules/`
  - Composed components built from atoms (e.g. `AppHeader`, `AppSidebar`).
  - **Reusable components**: Before creating a new molecule component, always check if a suitable component already exists in `src/components/molecules/` or `src/components/atoms/`.
    - Common reusable components that may already exist:
      - Tables: `src/components/molecules/data-table`
      - Delete confirmations: `src/components/molecules/confirm-dialog`
      - Search forms: `src/components/molecules/search-form`
      - Pagination: `src/components/molecules/pagination`
    - Only create new components if no suitable existing component can be reused or extended.
  - **Module-specific form modals**: Form modals that are specific to a single module (e.g., `CategoryFormModal`, `StoreFormModal`) should be placed in `src/views/{module}/` directory, not in `src/components/molecules/`.
    - Only truly reusable, cross-module components should be in `src/components/molecules/`.

#### 2.1 Form dialogs and submit behavior

This section aligns with **`.cursorrules`** and **`.cursor/rules/common-rule-01-form-validation.mdc`**.

- **Primary Submit / Save** stays **enabled** whenever the form is not submitting (`loading`), for both **create** and **edit** (including when **no** field has changed in edit mode).
- On **Submit** click, validate the **entire** form; use `isFormValid` / validation only inside the submit path to decide whether to call the API — **not** to disable the primary submit button.
- You may still track **`hasFormChanges`** (original vs current) for **discard-on-close**, **unsaved changes** warnings, or optional UX — **not** for disabling the primary submit button.

#### 2.2 Form state and validation

- **Form state**: Use **TanStack Form** (`useForm` from `@tanstack/vue-form`) for form state in search forms and create/edit modals; do not use `reactive` + `toRefs` for form state.
- **Validation**: Use validators from the shared file `src/lib/validators`. If a rule does not exist there, add it to `src/lib/validators/index.ts` first, then use it in the component; do not define validation schema inline in the component when it can live in the shared file. See `docs/examples/tanstack-form-example.vue` for reference.

- `src/views/`
  - Page-level components tied to routes.
  - Should orchestrate data fetching via hooks from `apis/services`.
  - Should not contain raw axios or low-level API calls.
  - **Organization by module**: Functional components (list, create, edit, detail) and module-specific form modals should be organized in folders by module name.
    - Example: For `StaffManagement.vue`, create a folder `src/views/staff/` containing:
      - `StaffManagement.vue` - List page
      - `StaffForm.vue` - Create/Edit page (if using separate page, not modal)
      - `StaffFormModal.vue` - Create/Edit modal (if using modal instead of separate page)
      - `StaffDetail.vue` - Detail page (if needed)
    - **Module-specific form modals**: Form modals that are only used within a single module should be placed in `src/views/{module}/` directory.
      - Example: `src/views/category/CategoryFormModal.vue` (not in `components/molecules/`)
      - Example: `src/views/store/StoreFormModal.vue` (not in `components/molecules/`)
      - Only reusable, cross-module modals (e.g., `ConfirmDialog`) should be in `src/components/molecules/`.
    - The folder name should be the lowercase, kebab-case version of the module name.
    - Standalone pages (e.g., `Dashboard.vue`) can remain at the root of `src/views/`.

---

### 3. State Management

- `src/stores/`
  - Pinia stores for application and domain state.
  - Stores should:
    - Use domain models from `src/models/**` where possible.
    - Call hooks from `apis/services` (or react to their results), not raw axios.
  - `auth` store:
    - Owns auth tokens, user info, and login/logout logic.

---

### 4. API Layer

- `src/apis/cores/`
  - Domain-specific API classes (e.g. `store-api.ts`).
  - Each file exports:
    - A `XxxApi` class extending `BaseApi`.
    - A singleton instance (e.g. `export const storeApi = new StoreApi()`).
  - Responsible for:
    - Talking to the backend via `ApiService`.
    - Mapping raw DTOs into domain models from `src/models/**`.

- `src/apis/services/`
  - TanStack Query hooks grouped by domain.
  - Example:
    - `src/apis/services/store/use-stores.ts`
    - `src/apis/services/store/use-store-by-id.ts`
  - Responsible for:
    - Defining query/mutation keys.
    - Calling the appropriate `XxxApi` methods.
    - Returning domain models to components.

---

### 5. Models

- `src/models/`
  - Contains TypeScript classes and helper functions that represent **application-level domain models**.
  - Organized by domain:
    - `src/models/store/store.ts`
    - Future examples: `src/models/staff/staff.ts`, `src/models/category/category.ts`, etc.
  - Responsibilities:
    - Define strong types used by components and stores.
    - Provide static helpers to transform raw API data (DTOs) into models (e.g. using `class-transformer`).

---

### 6. Plugins / Infrastructure

- `src/plugins/`
  - `httpClient.ts`: Configured axios instance (interceptors, auth headers).
  - `apiService.ts`: Thin wrapper around axios with common HTTP helpers.
  - `tokenManager.ts`: Handles token refresh, logout, and query cache clearing on auth failure.
  - `queryClient.ts`: TanStack Query client configuration.
  - `index.ts`: Common re-exports for plugins used across the app.

---

### 7. Data Flow Overview

1. **Components / Views**
   - Call hooks from `src/apis/services/**` (e.g. `useStoresQuery`).
   - Render domain models returned by those hooks.

2. **Service Hooks**
   - Use TanStack Query (`useQuery`, `useMutation`) with well-defined keys.
   - Delegate HTTP calls to `XxxApi` methods.

3. **Core APIs (`apis/cores`)**
   - Use `ApiService` + `httpClient` to talk to backend endpoints.
   - Convert raw API responses into domain models via `models/**`.

4. **Models**
   - Encapsulate transformation logic and ensure the rest of the app works with consistent types, independent of backend DTO shape.

