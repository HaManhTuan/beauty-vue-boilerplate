## Field-Level Validators Implementation Guide

This document defines how to implement validation for common field types (phone, postcode, email, name, furigana, birthday, date range) using the shared validator library at `src/lib/validators/index.ts`.

All validators use **Zod** and must be centralized in the shared file. Components import validators; they never define reusable validation schema inline.

---

### 1. Shared Validators Location

- **File**: `src/lib/validators/index.ts`
- **Rule**: If a validator does not exist, add it here first, then import in the component.

---

### 2. Phone Number (電話番号)

| Property      | Value                                                            |
| ------------- | ---------------------------------------------------------------- |
| Placeholder   | `090-1234-5678`                                                  |
| Allowed input | Half-width digits `0-9`; `-` (hyphen) allowed as separator       |
| Digit count   | 10-11 digits (hyphens excluded from count)                       |
| Save to DB    | Strip `-`, store digits only                                     |
| Display       | Show with `-` (e.g. `090-1234-5678`)                             |
| Error message | `電話番号は半角数字で10〜11桁で入力してください。（ハイフン可）` |

**Validator (in `src/lib/validators/index.ts`):**

```ts
export const phoneSchema = z
  .string()
  .min(1, '電話番号は、必ず指定してください。')
  .refine(
    (v) => {
      if (!/^[\d-]+$/.test(v)) return false
      const digits = v.replace(/-/g, '')
      return digits.length >= 10 && digits.length <= 11
    },
    { message: '電話番号は半角数字で10〜11桁で入力してください。（ハイフン可）' },
  )
```

**Strip hyphens before saving:**

```ts
const digitsOnly = phoneValue.replace(/-/g, '')
```

**Format for display:**

```ts
function formatPhone(digits: string): string {
  if (digits.length === 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
  }
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  return digits
}
```

---

### 3. Postcode (郵便番号)

| Property      | Value                                                         |
| ------------- | ------------------------------------------------------------- |
| Placeholder   | `100-1000`                                                    |
| Allowed input | Half-width digits `0-9`; `-` allowed                          |
| Digit count   | Exactly 7 digits (hyphens excluded)                           |
| Save to DB    | Strip `-`, store digits only                                  |
| Display       | Show with `-` (e.g. `100-1000`)                               |
| Error message | `郵便番号は、7桁の半角数字で入力してください。（ハイフン可）` |

**Validator:**

```ts
export const postalCodeSchema = requiredString('郵便番号').refine(
  (v) => v.replace(/\D/g, '').length === 7,
  { message: '郵便番号は、7桁の半角数字で入力してください。（ハイフン可）' },
)
```

**Format for display:**

```ts
function formatPostalCode(digits: string): string {
  if (digits.length === 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`
  }
  return digits
}
```

---

### 4. Email (メールアドレス)

| Property      | Value                                                            |
| ------------- | ---------------------------------------------------------------- |
| Max length    | 255 characters                                                   |
| Validation    | Valid email format (must include `@`)                            |
| Error message | `メールアドレスは、有効なメールアドレス形式で指定してください。` |

**Validator:**

```ts
export const emailSchema = requiredString('メールアドレス', 255).email(
  'メールアドレスは、有効なメールアドレス形式で指定してください。',
)
```

---

### 5. Name Fields (customer_name, product_name, etc.)

| Property   | Value          |
| ---------- | -------------- |
| Max length | 255 characters |

**Validator:**

```ts
const nameSchema = requiredString('名前', 255)
```

---

### 6. Furigana (フリガナ)

| Property      | Value                                    |
| ------------- | ---------------------------------------- |
| Max length    | 255 characters                           |
| Allowed chars | Katakana only (`ァ-ヶー` + spaces)       |
| Error message | `フリガナはカタカナで入力してください。` |

**Validator (required):**

```ts
export function furiganaRequired(max: number) {
  return z
    .string()
    .min(1, 'フリガナは、必ず指定してください。')
    .max(max, `フリガナは、${max}文字以下にしてください。`)
    .regex(/^[ァ-ヶー\s]+$/, 'フリガナはカタカナで入力してください。')
}
```

**Validator (optional):**

```ts
export function furiganaOptional(max: number) {
  return z
    .string()
    .max(max, `フリガナは、${max}文字以下にしてください。`)
    .regex(/^$|^[ァ-ヶー\s]+$/, 'フリガナはカタカナで入力してください。')
    .optional()
}
```

---

### 7. Birthday (生年月日)

| Property   | Value                                          |
| ---------- | ---------------------------------------------- |
| Constraint | Must be today or in the past (no future dates) |

**Validator:**

```ts
export const birthdatePast = requiredString('生年月日').refine(
  (v) => {
    const date = new Date(v)
    const today = new Date()
    today.setHours(23, 59, 59, 999)
    return date <= today
  },
  { message: '生年月日は、過去の日付を選択してください。' },
)
```

**DatePicker usage (disable future dates):**

```vue
<DatePicker :model-value="field.state.value" :max="todayYYYYMMDD()" placeholder="生年月日を選択" />
```

---

### 8. Date Range (開始日 <= 終了日)

| Property      | Value                                  |
| ------------- | -------------------------------------- |
| Condition     | `Date from <= Date to`                 |
| Error message | `終了日は開始日以降を選択してください。` |

**Zod schema with cross-field validation:**

```ts
const dateRangeSchema = z
  .object({
    dateFrom: z.string().optional(),
    dateTo: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.dateFrom && data.dateTo) {
        return data.dateFrom <= data.dateTo
      }
      return true
    },
    { message: '終了日は開始日以降を選択してください。', path: ['dateTo'] },
  )
```

---

### 9. Standard Error Messages

**Required field:**

```
${label}は、必ず指定してください。
```

**Max length:**

```
${label}は、${max}文字以下にしてください。
```

**Helper functions already available:**

```ts
requiredString(label, max?)     // required + optional max
optionalStringMax(max, label?)  // optional + max
```

---

### 10. Adding a New Validator

When a new validation rule is needed:

1. Open `src/lib/validators/index.ts`.
2. Add the new schema or helper function.
3. Export it.
4. Import and use in the component.
5. Never define Zod schemas inline in components for rules that may be reused.

---

### 11. Reference Files

| Concern               | File                                                                      |
| --------------------- | ------------------------------------------------------------------------- |
| All shared validators | `src/lib/validators/index.ts`                                             |
| Phone validator usage | `src/views/store-management/store-form-dialog/StoreFormDialog.vue`        |
| Furigana usage        | `src/views/customer-management/customer-edit-modal/CustomerEditModal.vue` |
| Date range usage      | Search/filter forms across views                                          |
