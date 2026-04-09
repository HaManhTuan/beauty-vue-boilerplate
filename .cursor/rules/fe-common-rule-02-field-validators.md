## Field-Level Validators Implementation Guide

This document defines how to implement validation for common field types (phone, postcode, email, name, birthday, date range) using the shared validator library at src/lib/validators/index.ts.

All validators use Zod and must be centralized in the shared file. Components import validators — they never define validation schema inline.

---

### 1. Shared Validators Location

- **File**: `src/lib/validators/index.ts`
- **Rule**: If a validator does not exist, add it here first, then import in the component.

---

### 2. Phone Number (電話番号)

| Property      | Value                                                            |
| ------------- | ---------------------------------------------------------------- |
| Placeholder   | `0901234567`                                                  |
| Allowed input | Digits 0-9 only (no spaces, no hyphen recommended)     |
| Digit count   | Exactly 10 digits                   |
| Format rule   | Must start with 0                  |
| Save to DB    | Store digits only                                     |
| Display       | Show raw or format (`090 123 4567`)                            |
| Error message | `Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0.` |

**Validator (in `src/lib/validators/index.ts`):**

```ts
export const phoneSchema = z
  .string()
  .min(1, 'Số điện thoại là bắt buộc.')
  .regex(/^0\d{9}$/, 'Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0.')
```

---

### 3. Postcode (Mã bưu chính)

| Property      | Value                                                         |
| ------------- | ------------------------------------------------------------- |
| Placeholder   | `10000`                                                    |
| Allowed input | Half-width digits `0-9`;                       |
| Digit count   | Exactly 5 digits                          |
| Save to DB    | Store digits only                                  |
| Display       | Show raw or format (e.g. `10000`)                               |
| Error message | `Mã bưu chính phải gồm 5 chữ số.` |

**Validator:**

```ts
export const postalCodeSchema = requiredString('Mã bưu chính').regex(
  /^\d{5}$/,
  'Mã bưu chính phải gồm 5 chữ số.',
)
```

---

### 4. Email

| Property      | Value                                                            |
| ------------- | ---------------------------------------------------------------- |
| Max length    | 255 characters (project uses 50 in current schema)               |
| Validation    | Valid email format (must include `@`)                            |
| Error message | `Email không hợp lệ.` |

**Validator:**

```ts
export const emailSchema = requiredString('Email', 255).email(
  'Email không hợp lệ.',
)
```

---

### 5. Name Fields (customer_name, product_name, etc.)

| Property   | Value          |
| ---------- | -------------- |
| Max length | 255 characters |

**Validator:**

```ts
const nameSchema = requiredString('Tên', 255)
```

### 6. Birthday

| Property   | Value                                          |
| ---------- | ---------------------------------------------- |
| Constraint | Must be today or in the past (no future dates) |

**Validator:**

```ts
export const birthdatePast = requiredString('Ngày sinh').refine(
  (v) => {
    const date = new Date(v)
    const today = new Date()
    today.setHours(23, 59, 59, 999)
    return date <= today
  },
  { message: 'Ngày sinh phải là ngày trong quá khứ.' },
)
```

**DatePicker usage (disable future dates):**

```vue
<DatePicker :model-value="field.state.value" :max="todayYYYYMMDD()" placeholder="Select your date of birth" />
```

---

### 8. Date Range

| Property      | Value                                    |
| ------------- | ---------------------------------------- |
| Condition     | `Date from <= Date to`                   |
| Error message | `Ngày kết thúc phải sau hoặc bằng ngày bắt đầu.` |

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
    {
      message: 'Ngày kết thúc phải sau hoặc bằng ngày bắt đầu.',
      path: ['dateTo'],
    },
  )
```

---

### 9. Standard Error Messages

**Required field:**

```
${label} là bắt buộc.
```

**Max length:**

```
${label} không được vượt quá ${max} ký tự.
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
