# Page Implementation Checklist

## Overview

Use this checklist when implementing a **new page/view** in `src/views/**`, following the rules in `.agents/rules/structure.md`, `naming.md`, `data-model.md` and `api-rule.md`.

**Page Name**: `{page-name}`  
**Route**: `{route-path}`  
**Purpose**: `{brief description of page's purpose}`  
**Location**: `src/views/{module-folder}/{page-name}.vue` (for functional pages) or `src/views/{page-name}.vue` (for standalone pages)  
**Related Frontend Spec**: `{path/to/fe/spec.md}`  
**Related General Spec**: `{path/to/general/spec.md}`  
**Estimated Complexity**: `{Low|Medium|High}`  
**Priority**: `{High|Medium|Low}`

---

## Required Prerequisites

Before implementing this page, ensure the following are completed:

### 1. Domain Models & APIs

- [ ] Required domain models exist in `src/models/{domain}.ts`.
- [ ] Core API methods exist in `src/apis/cores/{domain}-api.ts`.
- [ ] Service hooks exist in `src/apis/services/{domain}/...`:
  - [ ] Query hooks (e.g. `useStoresQuery`, `useStoreByIdQuery`).
  - [ ] Mutation hooks (e.g. `useStoreCreateMutation`, `useStoreUpdateMutation`) if needed.

### 2. Components

- [ ] Check for existing reusable components before creating new ones:
  - [ ] Search in `src/components/molecules/**` for existing components (e.g., `data-table`, `confirm-dialog`, `search-form`, `pagination`).
  - [ ] Search in `src/components/ui/**` for base primitives.
  - [ ] Reuse existing components when possible, or extend them if they need modification.
  - [ ] Only create new components if no suitable existing component exists.
- [ ] Components follow naming conventions and are properly exported.

### 3. Data Models

- [ ] Confirm required domain models exist in `src/models/{domain}.ts`.
- [ ] If not, create/update models following `.agents/rules/data-model.md`.

---

## Implementation Checklist

## 1. Page Structure & Routing

**Goal**: Create the page file and register it in the router.

Checklist:

- [ ] Determine page organization:
  - [ ] For functional pages (list, create, edit, detail): Create module folder in `src/views/{module-name}/` (e.g., `src/views/staff/`).
  - [ ] For standalone pages: Create directly in `src/views/` (e.g., `src/views/Dashboard.vue`).
- [ ] Create page file(s):
  - [ ] List page: `src/views/{module-name}/{ModuleName}Management.vue` (e.g., `src/views/staff/StaffManagement.vue`).
  - [ ] Form page: `src/views/{module-name}/{ModuleName}Form.vue` (e.g., `src/views/staff/StaffForm.vue`) for create/edit.
  - [ ] Detail page: `src/views/{module-name}/{ModuleName}Detail.vue` (e.g., `src/views/staff/StaffDetail.vue`) if needed.
- [ ] Set up Vue SFC structure (`<script setup>`, `<template>`, `<style>`).
- [ ] Configure route in `src/router/index.ts`:
  - [ ] Route path matches the spec.
  - [ ] Component is imported (lazy-loaded if appropriate).
- [ ] Add route guards if needed:
  - [ ] Authentication check.
  - [ ] Permission/role checks.

---

## 2. Layout & Visual Structure

**Goal**: Define the page layout, header, content areas, and action sections.

Checklist:

- [ ] Implement page layout structure:
  - [ ] Use layout component from `src/layouts/**` if applicable.
  - [ ] Or define page-specific layout structure.
- [ ] Add header section:
  - [ ] Page title.
  - [ ] Breadcrumbs/navigation if needed.
  - [ ] Action buttons (create, filter, export, etc.).
- [ ] Create main content area:
  - [ ] List/table area.
  - [ ] Form area (for create/edit pages).
  - [ ] Detail view area (for detail pages).
- [ ] Add footer/action sections if needed:
  - [ ] Pagination controls.
  - [ ] Save/Cancel buttons for forms.

---

## 3. Data Fetching (Server State)

**Goal**: Fetch server data using TanStack Query hooks from `src/apis/services/**`.

Checklist:

- [ ] Import required query hooks:
  - [ ] Example: `import { useStoresQuery } from '@/apis/services/store/use-stores'`.
- [ ] Call hooks in the component:
  - [ ] List queries: `const { data, isLoading, error } = useStoresQuery(params)`.
  - [ ] Detail queries: `const { data, isLoading, error } = useStoreByIdQuery(id, enabled)`.
- [ ] Handle loading states:
  - [ ] Show skeleton/loading UI when `isLoading` is true.
- [ ] Handle error states:
  - [ ] Display error messages when `error` exists.
  - [ ] Provide retry/refresh actions if appropriate.

**Important**: Do **not** call axios or core APIs directly in the page component. Use hooks only.

---

## 4. Component Integration

**Goal**: Compose the page using reusable components from `src/components/**`.

Checklist:

- [ ] Import required components:
  - [ ] Atoms: `Button`, `Input`, `Select`, etc.
  - [ ] Molecules: `AppHeader`, `AppSidebar`, etc.
- [ ] Pass proper props to components:
  - [ ] Use model types (e.g. `StoreModel`) when passing data.
- [ ] **For SearchForm component**:
  - [ ] Use `SearchForm` from `@/components/molecules/search-form` for search/filter functionality.
  - [ ] Pass `field` prop to specify which field to filter by (e.g., `field="name"`).
  - [ ] The `field` prop automatically configures label and placeholder based on common field names:
    - [ ] Supported fields: `name`, `code`, `assessment-method-name`, `category-name`, `expense-category-name`.
    - [ ] You can override with explicit `label` and `placeholder` props if needed.
  - [ ] Filter logic should only filter by the specified field (e.g., if `field="name"`, only filter by name field).
  - [ ] Example usage:
    ```vue
    <SearchForm
      v-model:search-query="searchQuery"
      field="name"
      :loading="isLoading"
      @search="handleSearch"
      @clear="handleClearSearch"
    />
    ```
- [ ] Handle component events:
  - [ ] `@click`, `@submit`, `@change`, etc.
- [ ] Implement component communication:
  - [ ] Parent-child via props/events.
  - [ ] Sibling components via shared state (store or lifted state).
- [ ] **For DataTable with action column (Edit/Delete)**:
  - [ ] Action column header must be `操作`
  - [ ] Action column must be center-aligned (`align: 'center'`)
  - [ ] Use container with `class="flex items-center justify-center gap-2"` inside the cell
  - [ ] Edit button: label `編集` with pencil icon (`Pencil` or `Edit`)
  - [ ] Delete button: label `削除` with trash icon (`Trash2`)
  - [ ] Always stop row click propagation for action buttons: `onClick: (e: Event) => { e.stopPropagation(); handleEdit(row) }`
  - [ ] Keep actions visible on all rows (no hidden-on-hover patterns)
  - [ ] Example:
    ```typescript
    {
      key: 'actions',
      header: '操作',
      width: '160px',
      align: 'center' as const,
      render: (row: Model) =>
        h('div', { class: 'flex items-center justify-center gap-2' }, [
          h(Button, {
            onClick: (e: Event) => {
              e.stopPropagation()
              handleEdit(row)
            },
          }, () => [h(Pencil, { class: 'h-4 w-4' }), h('span', ' 編集')]),
          h(Button, {
            onClick: (e: Event) => {
              e.stopPropagation()
              handleDelete(row)
            },
          }, () => [h(Trash2, { class: 'h-4 w-4' }), h('span', ' 削除')]),
        ]),
    }
    ```
- [ ] **List tables (project FE rules)**:
  - [ ] Empty state message: **`No matching records found.`** (zero rows **and** search with no results).
  - [ ] **Do not** open detail or navigate by clicking a table row; provide an explicit **detail** (or equivalent) action.
  - [ ] Pagination: sizes **10 / 25 / 50 / 100**, default **25** (unless product spec overrides).

---

## 5. User Interactions & Actions

**Goal**: Implement user actions (CRUD operations, navigation, confirmations).

Checklist:

- [ ] Primary actions:
  - [ ] Create: Use mutation hook (e.g. `useStoreCreateMutation`).
  - [ ] Edit: Navigate to edit page or open edit dialog.
  - [ ] Delete: Use mutation hook with confirmation dialog.
- [ ] Form submissions:
  - [ ] Handle form validation.
  - [ ] Call mutation hooks on submit; mutation hooks should use `queryClient.invalidateQueries` in `onSuccess` (do not call `refetch()` in the view).
- [ ] **API create/update**: Core API methods in `src/apis/cores/*-api.ts` call the backend and map **DTO → domain model** in the **core** layer (see `.cursorrules` and `.agents/rules/data-model.md`); hooks unwrap for the view without re-mapping shapes.
- [ ] Navigation:
  - [ ] Use `vue-router` for navigation between pages.
  - [ ] Handle route params and query strings.
- [ ] Confirmation dialogs:
  - [ ] Use `ConfirmDialog` from `@/components/molecules/confirm-dialog` for delete confirmations.
  - [ ] Follow the standard pattern:
    ```vue
    <ConfirmDialog
      v-model="isDeleteDialogOpen"
      title="削除確認"
      :message="`{Entity}を削除します。よろしいですか。\n「{Entity}ID : ${selectedItem?.id}」\n「{Entity}名: ${selectedItem?.name}」`"
      confirm-text="はい"
      cancel-text="いいえ"
      variant="destructive"
      :loading="isDeleting"
      :show-cancel-icon="true"
      :show-confirm-icon="true"
      @confirm="handleDeleteConfirm"
      @cancel="handleDeleteCancel"
    />
    ```
  - [ ] In `handleDeleteConfirm`:
    - [ ] Call mutation hook
    - [ ] Show success toast **in the view** (do not show toast inside mutation)
    - [ ] Close dialog and clear selected item when the mutation finishes (success or error)
    - [ ] Do **not** call `refetch()`; list refetch is handled by mutation `onSuccess` via `queryClient.invalidateQueries`
  - [ ] Always include entity ID and name in the confirmation message.
- [ ] **Common CRUD behavior (apply to all pages using dialogs)**:
  - [ ] On **create / edit / delete success** (in the **view component**):
    - [ ] Show a **success toast** using the shared toast system (e.g. `useSuccessToast`).
    - [ ] **Close** the form dialog or confirmation dialog and clear any selected entity.
  - [ ] Do **not** call `refetch()` in the view; mutation hooks should use `queryClient.invalidateQueries` in `onSuccess`.
  - [ ] Do **not** show success toast inside mutation hooks; handle toast only in the view.
  - [ ] On **create / edit / delete failure**:
    - [ ] Rely on the **global HTTP client interceptors** to show **error toasts**.
    - [ ] Keep **form dialogs open** so the user can fix input and retry.
    - [ ] For **delete**, close the confirmation dialog after the mutation finishes and clear the selected entity (even when there is an error).
  - [ ] **Form validation behavior** (TanStack Form + `.cursor/rules/common-rule-01-form-validation.mdc`):
    - [ ] Keep **Submit** enabled whenever the form is not submitting (including edit with no edits, and when invalid); disable only while submitting.
    - [ ] On **Submit**, validate the **entire** form and show errors for invalid fields.
    - [ ] Validate on **change**; show inline errors under the field when it was **touched** (e.g. blurred) **or** after a submit attempt; clear the error when the value becomes valid.
    - [ ] Use `isFormValid` only inside submit handlers / to decide whether to call the API — **not** to disable the primary submit button.
    - [ ] You may use `hasFormChanges` for discard-on-close or unsaved warnings only — **not** for disabling submit in edit mode.
  - [ ] **Dialog close behavior**:
    - [ ] Do **not** allow closing important form dialogs with ESC or click outside (`closeOnClickOutside=false`, `closeOnEscape=false`).
    - [ ] When a dialog closes (via cancel or success), **reset form values and validation state** in a dedicated helper (e.g. `resetForm()`).

---

## 6. Local State Management (UI State)

**Goal**: Manage UI-only state (filters, selections, dialog visibility) using Pinia stores or local component state.

Checklist:

- [ ] If using a Pinia store:
  - [ ] Import store: `import { useXxxStore } from '@/stores/xxx'`.
  - [ ] Use store state for filters, selections, dialog visibility, etc.
- [ ] If using local component state:
  - [ ] Use `ref`/`reactive` for simple UI state (e.g. `const isDialogOpen = ref(false)`).
- [ ] **For Search/Filter State**:
  - [ ] Use local `ref` for search query: `const searchQuery = ref('')`.
  - [ ] **Trigger search** on **Search** button click and on **Enter** in filter fields (see `.cursor/rules/common-rule-04-filter-search.mdc`); each action **refetches** the API even if params are unchanged.
  - [ ] **Clear** resets filters to **defaults** (same rule file).
  - [ ] Sync search query with URL query params if the spec requires deep-linking:
    - [ ] Read from `route.query` on mount.
    - [ ] Update URL query params when search runs (if applicable).
  - [ ] Filter should only filter by the field specified in `SearchForm`'s `field` prop:
    - [ ] If `field="name"`, only filter by `name` field in API params.
    - [ ] Example: `queryParams.name = searchQuery.value.trim() || undefined`.
- [ ] Do **not**:
  - [ ] Store server data in Pinia stores (server data lives in TanStack Query cache).
  - [ ] Duplicate query cache in store state.

---

## 7. Error Handling

**Goal**: Handle errors gracefully and provide user feedback.

Checklist:

- [ ] Handle API errors from hooks:
  - [ ] Check `error` from `useQuery`/`useMutation`.
  - [ ] Display user-friendly error messages.
  - [ ] Provide retry actions when appropriate.
- [ ] Handle validation errors:
  - [ ] Form field validation errors.
  - [ ] Display inline error messages.
- [ ] Implement fallback states:
  - [ ] Empty state UI (no data).
  - [ ] Error state UI (failed to load).

---

## 8. Permissions & Security

**Goal**: Enforce permissions and hide/restrict UI elements based on user roles.

Checklist:

- [ ] Check user permissions:
  - [ ] Use auth store or permission helpers to check access.
- [ ] Hide/restrict UI elements:
  - [ ] Hide create button if user lacks create permission.
  - [ ] Disable edit/delete actions if user lacks permissions.
- [ ] Handle unauthorized access:
  - [ ] Show appropriate message or redirect if user lacks access.

---

## 9. Responsive Design & Styling

**Goal**: Ensure the page works well on mobile, tablet, and desktop, and follows styling best practices.

Checklist:

- [ ] **Check `src/style.css` before using inline Tailwind arbitrary values** (e.g., `w-[365px]`, `h-[40px]`):
  - [ ] If a reusable style exists in `style.css`, use the existing class
  - [ ] If a style doesn't exist but is reusable/common, add it to `style.css` in the `@layer utilities` section
  - [ ] Only use inline Tailwind arbitrary values for truly one-off, component-specific styles
- [ ] Test mobile layouts:
  - [ ] Ensure touch-friendly button sizes.
  - [ ] Stack elements vertically on small screens.
- [ ] Implement responsive breakpoints:
  - [ ] Use Tailwind responsive classes (e.g. `md:`, `lg:`).
- [ ] Test on various screen sizes:
  - [ ] Mobile (< 768px).
  - [ ] Tablet (768px - 1024px).
  - [ ] Desktop (> 1024px).

---

## 10. Performance Optimization

**Goal**: Optimize page performance and user experience.

Checklist:

- [ ] Implement lazy loading:
  - [ ] Lazy-load heavy components if needed.
  - [ ] Use `defineAsyncComponent` for code splitting.
- [ ] Optimize re-renders:
  - [ ] Use proper `key` attributes in `v-for`.
  - [ ] Use `v-memo` for expensive lists if needed.
- [ ] Pagination/virtualization:
  - [ ] Add pagination for large datasets.
  - [ ] Consider virtual scrolling for very long lists.

---

## 11. Integration & Verification

**Goal**: Verify the page works end-to-end and integrates correctly with the rest of the app.

Checklist:

- [ ] Verify data flow:
  - [ ] Component → Hook → Core API → Backend → Model → UI.
- [ ] Test navigation:
  - [ ] Links to/from this page work correctly.
  - [ ] Browser back/forward buttons work.
- [ ] Verify integration with stores (if used):
  - [ ] UI state persists correctly.
  - [ ] No circular dependencies.
- [ ] Quality: `pnpm lint` and `pnpm build` pass for the delivered work (use `pnpm lint:fix` only when you want ESLint auto-fixes).