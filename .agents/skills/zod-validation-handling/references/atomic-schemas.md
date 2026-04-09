# Atomic Validators (`src/lib/validators/index.ts`)

Shared atomic validators live in one place:

- `emailSchema`
- `requiredString(label, max?)`
- optional helper validators for phone/postcode/furigana/date-range
- keep validator messages aligned with `../rule-field-validators.md`

### Login-aligned atomic usage

```typescript
import { z } from 'zod'
import { emailSchema, requiredString } from '@/lib/validators'

const loginFormSchema = z.object({
  email: emailSchema,
  password: requiredString('パスワード'),
})
```

The `loginFormSchema` above is used by both TanStack validators:

```typescript
validators: {
  onChange: loginFormSchema,
  onSubmit: loginFormSchema,
}
```

### Field-rule aligned examples

```typescript
// Phone: 10-11 digits, hyphen allowed
export const phoneSchema = z
  .string()
  .min(1, '電話番号は、必ず指定してください。')
  .refine(
    (v) =>
      /^[\d-]+$/.test(v) &&
      (() => {
        const digits = v.replace(/-/g, '')
        return digits.length >= 10 && digits.length <= 11
      })(),
    {
      message: '電話番号は半角数字で10〜11桁で入力してください。（ハイフン可）',
    },
  )
```

```typescript
// Postcode: 7 digits, hyphen allowed
export const postalCodeSchema = requiredString('郵便番号').refine(
  (v) => v.replace(/\D/g, '').length === 7,
  { message: '郵便番号は、7桁の半角数字で入力してください。（ハイフン可）' },
)
```

For UX consistency, keep inline errors coupled with touched-state in the form:

```typescript
const hasError = (field: { state: { meta: { isTouched: boolean; errors: unknown[] } } }) =>
  field.state.meta.isTouched && field.state.meta.errors.length > 0
```
