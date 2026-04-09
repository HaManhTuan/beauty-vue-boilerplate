# Schema Composition Reference

Optional patterns when commons/composes patterns are insufficient.

| Pattern          | When                            | Example                                            |
| ---------------- | ------------------------------- | -------------------------------------------------- |
| **optional**     | Optional field                  | `emailSchema.optional().or(z.literal(''))`         |
| **transform**    | Normalize value before submit   | `z.string().transform((v) => v.replace(/-/g, ''))` |
| **async refine** | API check (e.g. username taken) | `z.string().refine(async (v) => await check(v))`   |
| **pick/omit**    | Partial form                    | `loginFormSchema.pick({ email: true })`            |

### Field-validator aligned transforms

```typescript
// Store digits only before sending payload
const normalizePhone = (v: string) => v.replace(/-/g, '')
const normalizePostcode = (v: string) => v.replace(/-/g, '')
```

Use transforms cautiously; keep UI display formatted, normalize only for API payload if possible.

### Login pattern alignment (required)

When composing schema for TanStack forms, follow this baseline from `src/views/Login.vue`:

```typescript
const form = useForm({
  defaultValues: { email: '', password: '' },
  validators: {
    onChange: loginFormSchema,
    onSubmit: loginFormSchema,
  },
})
```

And keep UI/error behavior aligned with `tanstack-vue-form-handling/rule-form-ux-validation.md`:

- Submit is not disabled by validity flags (`isValid`, `dirty`, `hasChanges`).
- Show inline errors with touched + errors length check.
- Keep placeholder style consistent with `placeholder:text-muted-foreground`.

Relate to TanStack usage in `src/views/Login.vue` and validator rules in `../rule-field-validators.md`.
