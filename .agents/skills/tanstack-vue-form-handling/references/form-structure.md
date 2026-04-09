# Form Structure

## Placement

Form components live in feature folders:

```
src/features/{feature}/
├── components/
│   └── {form-name}/           # e.g. login-form, sign-up-form
│       ├── index.vue
│       └── __tests__/
├── screens/
└── index.ts
```

## Form Component Props

Follow this interface for reusable forms (create/edit):

```typescript
interface FormProps {
  /** Initial values (for edit mode) */
  initialData?: FormData
  /** Called with valid data on submit */
  onSubmit: (data: FormData) => void | Promise<void>
  /** External loading state from parent */
  isLoading?: boolean
  /** Submit button label */
  submitLabel?: string
  /** Optional cancel handler */
  onCancel?: () => void
}
```

```vue
<!-- Example props declaration in <script setup> -->
<script setup lang="ts">
const props = defineProps<{
  initialData?: LoginFormData
  isLoading?: boolean
  submitLabel?: string
  onCancel?: () => void
}>()

const emit = defineEmits<{
  submit: [data: LoginFormData]
}>()
</script>
```

## Separation of Concerns

| Layer                | Responsibility                                          |
| -------------------- | ------------------------------------------------------- |
| Form component       | Display fields, validation, emit `submit` event         |
| Parent (screen/page) | Fetch initial data, call API, navigation, loading state |

Form does NOT:

- Call APIs directly
- Navigate
- Handle toast/error UI (unless part of form UX)

Parent does:

- `useMutation` or API call in `onSubmit` callback
- `router.push()` on success
- Toast on success/error

## Form Submit Flow

1. User submits → `form.handleSubmit()`
2. TanStack Form validates full form with configured validators
3. If valid → `onSubmit` callback with `value`
4. Parent receives data, calls API, handles result

## Form Container (Vue)

Use `<form>` with `@submit.prevent.stop`:

```vue
<template>
  <form @submit.prevent.stop="form.handleSubmit">
    <form.Field name="email">
      <template v-slot="{ field }">
        <!-- ... -->
      </template>
    </form.Field>

    <form.Field name="password">
      <template v-slot="{ field }">
        <!-- ... -->
      </template>
    </form.Field>

    <form.Subscribe :selector="(state) => ({ isSubmitting: state.isSubmitting })">
      <template v-slot="{ isSubmitting }">
        <button
          type="submit"
          :disabled="isLoading || isSubmitting"
          class="cursor-pointer disabled:cursor-not-allowed"
        >
          {{ isLoading || isSubmitting ? t('common.loading') : t('auth.login.submit') }}
        </button>
      </template>
    </form.Subscribe>
  </form>
</template>
```

## Validation Schema Location

- Prefer shared validators in `src/lib/validators`
- If missing, add reusable validator helpers to `src/lib/validators/index.ts`
- Keep behavior aligned with `../rule-form-ux-validation.md`
