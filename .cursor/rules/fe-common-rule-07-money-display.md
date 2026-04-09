## Money Display Implementation Guide

This document defines how to format and display monetary values (Japanese Yen) across the application.

---

### 1. Core Rules

| Rule             | Description                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------ |
| Format           | `[number]₫` (e.g. `1.234₫`)                                                                          |
| Comma separators | Use dot (`.`) for thousands (e.g. `1.000.000₫`)                                                    |
| Decimals         | Never display decimals; round when they exist                                                           |
| Null/undefined   | Use `formatMoney` (shows `0₫`) and `formatVnd` (shows `-` for optional)  |
| Money input      | Input fields for money must allow a maximum of 10 characters                                          |

---

### 2. Shared Formatters

All money formatting uses helpers from `src/lib/helpers/money.ts`.

**Two formatters available:**

```ts
import { formatMoney, formatJpy } from '@/lib/helpers/money'
```

#### `formatMoney(amount?)` — null/undefined → `0₫`

Use when empty should display as zero (summaries, totals, balances).

```ts
formatMoney(1234) // → "1.234₫"
formatMoney(1000000) // → "1.000.000₫"
formatMoney(0) // → "0₫"
formatMoney(null) // → "0₫"
formatMoney(undefined) // → "0₫"
```

**Implementation:**

```ts
export function formatMoney(amount?: number | null): string {
  const value = typeof amount === 'number' ? amount : 0
  return `${value.toLocaleString('vi-VN')}₫`
}
```

#### `formatJpy(value, fallback?)` — null/undefined → fallback (`-`)

Use when empty means "no value" (tables, optional fields).

```ts
formatVnd(1234) // → "1.234₫"
formatVnd(null) // → "-"
formatVnd(undefined) // → "-"
formatVnd(null, 'Chưa có') // → "Chưa có"
```

**Implementation:**

```ts
export function formatVnd(value: number | null | undefined, fallback = '-'): string {
  if (value === null || value === undefined) return fallback
  return `${Math.round(value).toLocaleString('vi-VN')}₫`
}
```

---

### 3. When to Use Which Formatter

| Context                     | Formatter     | Reason                                  |
| --------------------------- | ------------- | --------------------------------------- |
| Summary / total row         | `formatMoney` | Zero is a valid display value           |
| Table cell (optional field) | `formatVnd`   | Missing value should show - |
| Form display (read-only)    | `formatMoney` | Empty form value should show 0₫     |
| Balance / cash count        | `formatMoney` | Zero balance is meaningful              |

---

### 4. Usage in Table Columns

**Pattern (render function):**

```ts
import { h } from 'vue'
import { formatVnd, formatMoney } from '@/lib/helpers/money'

const columns: TableColumn<ItemModel>[] = [
  {
    key: 'amount',
    header: 'Số tiền',
    width: '120px',
    align: 'right',
    render: (row: ItemModel) => h('span', formatVnd(row.amount)),
  },
  {
    key: 'totalPrice',
    header: 'Tổng',
    width: '120px',
    align: 'right',
    render: (row: ItemModel) => h('span', formatMoney(row.totalPrice)),
  },
]
```

---

### 5. Usage in Templates

**Inline display:**

```vue
<template>
  <span>{{ formatMoney(item.price) }}</span>
</template>
```

**Conditional display (table/optional values):**

```vue
<template>
  <span>{{ item.price != null ? formatVnd(item.price) : '-' }}</span>
</template>
```

**Form display (empty shows `0`):**

```vue
<template>
  <span>{{ formatMoney(item.price) }}</span>
</template>
```

---

### 6. Usage in Models

Domain models can expose pre-formatted getters:

```ts
import { formatVnd } from '@/lib/helpers/money'

export class ExpenseModel {
  amount!: number

  get formattedAmount(): string {
    return formatVnd(this.amount)
  }
}
```

---

### 7. Do NOT

- Do **not** use `Intl.NumberFormat` directly in components — always use the shared helpers.
- Do **not** display decimal places (e.g. `1.234,56₫` is wrong).
- Do **not** use `₫1,000` prefix — always use `₫` suffix.
- Do **not** create new money formatting functions in components — import from `src/lib/helpers/money.ts`.

---

### 8. Adding New Money Helpers

If a new formatting variant is needed:

1. Add it to `src/lib/helpers/money.ts`.
2. Export it.
3. Import and use in components.

---

### 9. Reference Files

| Concern              | File                                                       |
| -------------------- | ---------------------------------------------------------- |
| Money formatters     | `src/lib/helpers/money.ts`                                 |
