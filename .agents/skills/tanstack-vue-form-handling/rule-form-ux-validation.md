## Form UX & Validation Implementation Guide

This guide is aligned with `.cursor/rules/common-rule-01-form-validation.mdc`.

---

### 1. Validation Behavior (Required)

- Keep `Submit` enabled at all times, except while submitting (`loading`).
- On `Submit` click, validate the **entire form** (all fields), not only changed fields.
- Validate on `change` and show the validation message directly under the related field.
- When a value becomes valid, clear and hide that field's error immediately.

---

### 2. Submit Button Rule

- `Submit` must not be disabled by `isValid`, `dirty`, or `hasChanges`.
- Keep submit available and let form-level validation run on submit.
- Use loading state from form subscription (`isSubmitting`) for UI/disabled behavior.

**Example (from Login flow):**

```vue
<form @submit.prevent="form.handleSubmit" class="space-y-6">
  <form.Subscribe
    :selector="(state) => ({ isSubmitting: state.isSubmitting })"
    v-slot="{ isSubmitting }"
  >
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

---

### 3. Full Validation on Submit (Login pattern)

Trigger full-form validation when user submits.

**Example (from Login flow):**

```ts
const form = useForm({
  validators: {
    onChange: formSchema,
    onSubmit: formSchema,
  },
  onSubmit: async ({ value }) => {
    // API call
  },
})
```

---

### 4. Error Display Rule (Login pattern)

- Show inline validation message under each field using `FormField`.
- Error visibility follows `isTouched && errors.length > 0`.
- Apply error border when field has visible error.
- Error disappears immediately after input becomes valid.

**Example (from Login flow):**

```ts
const hasError = (field: {
  state: {
    meta: {
      isTouched: boolean
      isValid: boolean
    }
  }
}) => field.state.meta.isTouched && !field.state.meta.isValid
```

```vue
<form.Field name="email" v-slot="{ field }">
  <FormField
    :for="field.name"
    :errors="field.state.meta.errors"
    :show-error="hasError(field)"
  >
    <Input
      :id="field.name"
      :name="field.name"
      :model-value="field.state.value"
      placeholder="メールアドレス"
      :disabled="isSubmitting"
      :class="cn(hasError(field) && 'border-destructive')"
      @input="field.handleChange(($event.target as HTMLInputElement).value)"
      @blur="field.handleBlur"
    />
  </FormField>
</form.Field>
```

---

### 5. Placeholder Color

- Placeholder text must be light gray and consistent across all screens.

**Example:**

```vue
<Input placeholder="テキストを入力" class="placeholder:text-muted-foreground" />
```

---

### 6. Hover Behavior

- On hover, dropdowns, buttons, and checkboxes must show `cursor: pointer`.

**Examples:**

```vue
<Select trigger-class="cursor-pointer" />
<Checkbox class="cursor-pointer" />
```

---

### 7. Submit Loading Behavior (Login pattern)

When `Submit` is loading:

- Button must be disabled.
- Cursor must be `not-allowed`.

**Example (from Login flow):**

```vue
<Button
  type="submit"
  :loading="isSubmitting"
  class="w-full bg-gray-900 text-white hover:bg-gray-900/90"
>
  ログイン
</Button>
```

---

### 8. Implementation Checklist

- [ ] Submit button always enabled except loading.
- [ ] Full form validation on submit.
- [ ] Validate on change.
- [ ] Inline field error message under input.
- [ ] Error disappears immediately when value is valid.
- [ ] Placeholder uses consistent light-gray style.
- [ ] Hover pointer for dropdown/button/checkbox.
- [ ] Loading submit is disabled and uses `cursor-not-allowed`.
