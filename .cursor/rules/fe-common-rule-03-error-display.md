## Error Display Implementation Guide

This document defines how to display errors in the frontend — both client-side validation errors and server-side API failure errors.

---

### 1. Two Error Categories

| Category            | Source                         | Display method                 |
| ------------------- | ------------------------------ | ------------------------------ |
| FE validation error | Client-side Zod schema         | Inline message under the field |
| API failure error   | Server response (HTTP 4xx/5xx) | Toast notification             |

---

### 2. FE Validation Error (Client-Side)

#### 2.1 Placement

Show the validation message **directly under** the corresponding input field.

#### 2.2 Styling

- **Message text color**: red (`text-destructive`)
- **Input border color**: red when invalid (`border-destructive`)

#### 2.3 Implementation Pattern (Login-aligned)

Use `FormField` from `src/components/molecules/field/Field.vue` with TanStack `form.Field`.

**Template:**

```vue
<script setup lang="ts">
import FormField from '@/components/molecules/field/Field.vue'
import { Input } from '@/components/atoms/input'
import { cn } from '@/lib/utils'

const hasError = (field: {
  state: {
    meta: {
      isTouched: boolean
      errors: unknown[]
    }
  }
}) => field.state.meta.isTouched && field.state.meta.errors.length > 0
</script>

<template>
  <form.Field name="name" v-slot="{ field }">
    <FormField :for="field.name" :errors="field.state.meta.errors" :show-error="hasError(field)">
      <Input
        :id="field.name"
        :name="field.name"
        :model-value="field.state.value"
        :class="cn(hasError(field) && 'border-destructive')"
        @input="field.handleChange(($event.target as HTMLInputElement).value)"
        @blur="field.handleBlur"
      />
    </FormField>
  </form.Field>
</template>
```

#### 2.4 Error Visibility Rule

- Show field error only when `isTouched && errors.length > 0`.
- Pass raw `field.state.meta.errors` to `FormField`.
- Let `FormField` render inline error message below input.

#### 2.5 Red Border on Invalid Input

Apply `border-destructive` class conditionally using `cn()`:

```vue
<Input :class="cn(hasError(field) && 'border-destructive')" />
```

For `Select` / `DatePicker`:

```vue
<DatePicker :class="cn(hasError(field) && 'border-destructive')" />
```

---

### 3. API Failure Error (Server-Side)

#### 3.1 Behavior

- When any API call fails (HTTP error), show a **toast notification**.
- The toast message must use the **error message returned from the backend**.

#### 3.2 Implementation

API error toasts are handled globally by the HTTP client interceptors in `src/plugins/httpClient.ts`. Individual components do **not** need to manually show error toasts for API failures.

**Global interceptor (already configured):**

```ts
// src/plugins/httpClient.ts — response error interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message ?? 'An error has occurred.'
    toast({
      variant: 'destructive',
      description: message,
    })
    return Promise.reject(error)
  },
)
```

#### 3.3 Component-Level Error Handling

Components should **not** show error toasts manually. Instead:

- For **mutations** (create/update): keep the form dialog open on error so the user can fix input and retry.
- For **delete**: close the confirm dialog after the mutation finishes (whether success or error).

**Pattern (mutation in view):**

```ts
const handleDeleteConfirm = async () => {
  if (!selectedItem.value) return
  try {
    await deleteMutation.mutateAsync(selectedItem.value.id)
    showSuccessToast('Deletion complete.')
    isDeleteDialogOpen.value = false
    selectedItem.value = null
  } catch {
    // API error toast is shown by global interceptor
    isDeleteDialogOpen.value = false
    selectedItem.value = null
  }
}
```

---

### 4. Success Toast (CRUD screens)

On successful create/update/delete operations, the **view component** shows a success toast.

**Pattern:**

```ts
import { useSuccessToast } from '@/composables/use-success-toast'

const { showSuccessToast } = useSuccessToast()

const handleFormSuccess = () => {
  if (mode.value === 'create') {
    showSuccessToast('新規登録が完了しました。')
  } else {
    showSuccessToast('更新が完了しました。')
  }
  isDialogOpen.value = false
}
```

---

### 5. Summary

| Scenario                     | What to do                                                 |
| ---------------------------- | ---------------------------------------------------------- |
| Field validation fails       | Show red error text under field + red border on input      |
| API call fails               | Global interceptor shows toast (no manual handling needed) |
| Create/update success        | View shows success toast via `useSuccessToast`             |
| Delete success               | View shows success toast, close dialog                     |
| Mutation error (create/edit) | Keep dialog open, global toast handles error message       |
| Mutation error (delete)      | Close dialog, global toast handles error message           |

---

### 6. Reference Files

| Concern                  | File                                                                          |
| ------------------------ | ----------------------------------------------------------------------------- |
| FormField molecule       | `src/components/molecules/field/Field.vue`                                    |
| Global error interceptor | `src/plugins/httpClient.ts`                                                   |
| Success toast composable | `src/composables/use-success-toast.ts`                                        |
| Login error example      | `src/views/Login.vue`                                                         |
| Form error example       | `src/views/expense-management/expense-add-edit-modal/ExpenseAddEditModal.vue` |
| Delete flow example      | `src/views/store-management/StoreManagement.vue`                              |
