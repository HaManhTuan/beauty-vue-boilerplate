# FormField Usage

## Rule: Every Field Must Use FormField

All form fields **must** be wrapped with `FormField` for consistent:

- Label display
- Required indicator (\*)
- Error message display

## FormField Props

| Prop             | Type      | Description                                  |
| ---------------- | --------- | -------------------------------------------- |
| `label`          | `string`  | Label text                                   |
| `error`          | `string`  | Error message (displayed below input)        |
| `required`       | `boolean` | Shows \* next to label                       |
| `containerStyle` | `object`  | Optional container style                     |
| `labelStyle`     | `object`  | Optional label style                         |
| `errorStyle`     | `object`  | Optional error style                         |
| `default slot`   | `slot`    | Input component (Input, PasswordInput, etc.) |

## Pattern: form.Field + FormField

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
        :placeholder="t('auth.login.email_placeholder')"
        class="placeholder:text-muted-foreground"
        @input="field.handleChange(($event.target as HTMLInputElement).value)"
        @blur="field.handleBlur"
      />
    </FormField>
  </template>
</form.Field>
```

## Pattern: Custom Input Components (e.g. PasswordInput)

Some molecules like `PasswordInput` already use `FormField` internally. Pass `label` and `error` to the molecule, not a separate FormField wrapper:

```vue
<form.Field name="password">
  <template v-slot="{ field }">
    <PasswordInput
      :value="field.state.value"
      :label="t('auth.login.password_label')"
      :errors="field.state.meta.errors"
      :show-error="field.state.meta.isTouched && field.state.meta.errors.length > 0"
      :placeholder="t('auth.login.password_placeholder')"
      @change="field.handleChange"
    />
  </template>
</form.Field>
```

**Check the component**: If it already wraps with FormField internally, do NOT wrap again.

## Pattern: Label with Right Content (e.g. Forgot Password)

```vue
<FormField :error="error">
  <template #label>
    <div :class="styles.labelRow">
      <span>{{ t('auth.login.password_label') }}</span>
      <a href="#" @click.prevent="onForgotPassword?.()">{{ t('auth.login.forgot_password') }}</a>
    </div>
  </template>
  <Input ... />
</FormField>
```

## Error Flow

1. Shared validator returns message key/text
2. Form stores in `field.state.meta.errors[0]`
3. Translate before passing to FormField when needed
4. FormField displays below input

## Do NOT

- Wrap FormField around FormField (double wrap)
- Use raw label/input/error structure — always use FormField
- Disable submit by form validity flags (follow `../rule-form-ux-validation.md`)
