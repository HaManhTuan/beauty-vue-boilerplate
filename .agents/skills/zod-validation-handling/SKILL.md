---
name: validation-with-zod
description: 'Guide for validation with Zod and shared validators. Use when creating/refactoring validators in src/lib/validators, composing form schemas, and applying field-level specs. Triggers on: Zod validation, emailSchema, requiredString, shared validators, form schema.'
metadata:
  keywords: zod, validation, schema, shared-validators, lib-validators, emailSchema, requiredString, safeparse
---

# Validation With Zod

## Overview

Validation is centralized in `src/lib/validators/index.ts`. Build form-level schemas by composing shared validators in view/form files (example: `src/views/Login.vue`). All validation goes through Zod.

This skill must follow:

- `rule-field-validators.md`

## Rules

1. **Shared validators first**: Reuse/export validators from `src/lib/validators/index.ts`.
2. **No duplicated inline reusable rules**: if validator might be reused (email/phone/postcode/furigana), add shared validator first.
3. **Compose schema close to form**: for view-local forms (like login), compose with `z.object({ ...sharedValidators })` in the view/form file.
4. **Rule messages**: required/max-length and field-specific messages must follow `rule-field-validators.md`.
5. **Submit compatibility**: schemas should work with both TanStack `onChange` and `onSubmit` validation.
6. **Unit tests required**: update/add unit tests for shared validators when validation behavior changes.

## Naming Convention

| Layer             | Location                      | Example                                    |
| ----------------- | ----------------------------- | ------------------------------------------ |
| Shared validators | `src/lib/validators/index.ts` | `emailSchema`, `requiredString`            |
| Form schema       | form/view file                | `loginFormSchema` in `src/views/Login.vue` |

Schema name: camelCase + `Schema`.

## Resources

- **Atomic schemas** → read `references/atomic-schemas.md`
- **Composed schemas** → read `references/composed-schemas.md`
- **Composition patterns** (optional, transform, async, pick) → read `references/schema-composition.md`
- **Field validator rule** → read `rule-field-validators.md`
