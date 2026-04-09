# TanStack Form Validation Integration

## Dependencies

```bash
pnpm add @tanstack/vue-form zod
```

## Setup

Import `useForm`:

```typescript
import { useForm } from '@tanstack/vue-form'
```

## Use Shared Validators from lib/validators

**Prefer shared validators and schemas from `src/lib/validators`.** Avoid duplicating inline validators when reusable ones exist:

```typescript
import { loginFormSchema } from '@/lib/validators'
```

If needed validator does not exist, add it to `src/lib/validators/index.ts` first.

## Form Configuration

```typescript
// <script setup lang="ts">
const form = useForm({
  defaultValues: { email: '', password: '' },
  validators: {
    onChange: loginFormSchema, // Validate on change
    onSubmit: loginFormSchema, // Re-validate full form on submit
  },
  onSubmit: async ({ value }) => {
    await onSubmit(value)
  },
})
```

## Validation Timing

| Option     | When            | Use case           |
| ---------- | --------------- | ------------------ |
| `onChange` | Every keystroke | Real-time feedback |
| `onBlur`   | Field blur      | Less intrusive     |
| `onSubmit` | Form submit     | Final check        |

For this project rule, keep `onChange` + `onSubmit` together to satisfy immediate feedback and full submit validation.

## Type Inference

Zod schema infers form value type. For explicit typing:

```typescript
import type { z } from 'zod'

type LoginFormState = z.infer<typeof loginFormSchema>

const form = useForm<LoginFormState>({
  defaultValues: { email: '', password: '' },
  validators: {
    onChange: loginFormSchema,
    onSubmit: loginFormSchema,
  },
  onSubmit: async ({ value }) => onSubmit(value),
})
```

## Error Access

```typescript
// Field-level errors (from Zod) — accessed inside v-slot="{ field }"
field.state.meta.errors // string[]
field.state.meta.errors[0] // First error message (i18n key or string)
field.state.meta.isValid // boolean
field.state.meta.isTouched // boolean
```

If validator returns i18n keys, translate before display:

```vue
:errors="field.state.meta.errors" :show-error="field.state.meta.isTouched &&
field.state.meta.errors.length > 0"
```

## Vue Notes

- Use `<form @submit.prevent.stop="form.handleSubmit">` for the form element
- Use `<button type="submit">` for the submit button
- Bind input events with `@input="(e) => field.handleChange((e.target as HTMLInputElement).value)"`
- Bind blur events with `@blur="field.handleBlur"`
- Use `form.Subscribe` with `isSubmitting` and keep submit enabled unless submitting
- Apply `cursor-pointer` for interactive controls, and `disabled:cursor-not-allowed` for loading submit
