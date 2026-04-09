---
name: form-handling
description: 'Form handling with TanStack Form, Zod validation, and FormField wrapper. Use when: (1) creating or modifying forms in features/, (2) form validation, (3) form state management, (4) connecting form fields to Zod schemas. Triggers on: form, form validation, TanStack Form, useForm, form.Field, FormField, create/edit form.'
metadata:
  keywords: form, tanstack-form, useForm, form-field, zod-validation, form-validation, form-state
---

# Form Handling

## Overview

All forms use **TanStack Form** for state management and shared validators from `src/lib/validators` for validation. Every form field should follow the project `FormField` error-display pattern for consistent label and error behavior.

This skill is governed by:

- `rule-form-ux-validation.md`

## Rules

1. **TanStack Form only** — Use `useForm` from `@tanstack/vue-form`. No `reactive` form state for primary form handling.
2. **Project validators first** — Reuse validators from `src/lib/validators`. If missing, add shared validators there first.
3. **Submit UX rule** — Keep submit enabled except while submitting. Never disable by `canSubmit`, `isValid`, `dirty`, or `hasChanges`.
4. **Validation trigger rule** — Validate on change and validate full form on submit.
5. **Display consistency** — Use `FormField`-style inline error display, light gray placeholders, and pointer/not-allowed cursor behavior per rule file.

## Integration Stack

| Layer      | Library/Source | Purpose                                          |
| ---------- | -------------- | ------------------------------------------------ |
| Form state | TanStack Form  | `useForm`, `form.Field`, `form.Subscribe`        |
| Validation | Shared rules   | Validators from `src/lib/validators`             |
| Field UI   | FormField      | Inline error display and consistent field layout |

## Form Setup Pattern

```typescript
// In <script setup lang="ts">
import { useForm } from '@tanstack/vue-form'
import { loginFormSchema } from '@/lib/validators'

const form = useForm({
  defaultValues: { email: '', password: '' },
  validators: {
    onChange: loginFormSchema,
    onSubmit: loginFormSchema,
  },
  onSubmit: async ({ value }) => onSubmit(value),
})
```

## Field + FormField Pattern

```vue
<form.Field name="email">
  <template v-slot="{ field }">
    <FormField
      :label="t('auth.login.email_label')"
      :errors="field.state.meta.errors"
      :show-error="field.state.meta.isTouched && field.state.meta.errors.length > 0"
      required
    >
      <Input
        :model-value="field.state.value"
        class="placeholder:text-muted-foreground"
        @input="field.handleChange(($event.target as HTMLInputElement).value)"
        @blur="field.handleBlur"
      />
    </FormField>
  </template>
</form.Field>
```

## Resources

- **Core rule** → read `rule-form-ux-validation.md`
- **TanStack Form + Zod** → read `references/tanstack-zod-integration.md`
- **FormField usage** → read `references/form-field-usage.md`
- **Form structure** → read `references/form-structure.md`
