# Composed Schemas (Form-Level)

Compose form schemas with shared validators from `@/lib/validators`.

### Login example (`src/views/Login.vue`)

```typescript
import { z } from 'zod'
import { emailSchema, requiredString } from '@/lib/validators'

const loginFormSchema = z.object({
  email: emailSchema,
  password: requiredString('パスワード'),
})
```

Use with TanStack Form:

```typescript
const form = useForm({
  defaultValues: { email: '', password: '' },
  validators: {
    onChange: loginFormSchema,
    onSubmit: loginFormSchema,
  },
  onSubmit: async ({ value }) => {
    // submit API call
  },
})
```

### Login view aligned UI behavior

Keep behavior aligned with `tanstack-vue-form-handling/rule-form-ux-validation.md`:

- Submit is enabled except while submitting.
- Validate on change and full form on submit.
- Show field error only when `isTouched && errors.length > 0`.

```ts
const hasError = (field: {
  state: {
    meta: {
      isTouched: boolean
      errors: unknown[]
    }
  }
}) => field.state.meta.isTouched && field.state.meta.errors.length > 0
```

```vue
<form @submit.prevent="form.handleSubmit" class="space-y-6">
  <form.Subscribe
    :selector="(state) => ({ isSubmitting: state.isSubmitting })"
    v-slot="{ isSubmitting }"
  >
    <form.Field name="email" v-slot="{ field }">
      <FormField
        :for="field.name"
        :errors="field.state.meta.errors"
        :show-error="hasError(field)"
      >
        <Input
          :model-value="field.state.value"
          class="placeholder:text-muted-foreground"
          :disabled="isSubmitting"
          :class="cn(hasError(field) && 'border-destructive')"
          @input="field.handleChange(($event.target as HTMLInputElement).value)"
          @blur="field.handleBlur"
        />
      </FormField>
    </form.Field>

    <Button
      type="submit"
      :loading="isSubmitting"
      class="w-full bg-gray-900 text-white hover:bg-gray-900/90"
    >
      ログイン
    </Button>
  </form.Subscribe>
</form>
```

### Date range example (cross-field rule)

```typescript
const dateRangeSchema = z
  .object({
    dateFrom: z.string().optional(),
    dateTo: z.string().optional(),
  })
  .refine((data) => !data.dateFrom || !data.dateTo || data.dateFrom <= data.dateTo, {
    message: '終了日は開始日以降を選択してください。',
    path: ['dateTo'],
  })
```
