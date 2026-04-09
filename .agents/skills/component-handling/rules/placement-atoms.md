---
title: Atoms - Single Basic UI Elements
impact: CRITICAL
impactDescription: component placement for single-element components
tags: placement, atoms, atomic-design, components
---

# placement-atoms

**Category:** Component Placement  
**Impact:** CRITICAL

## Rule

Single basic UI elements belong in `atoms/`.

## When to Apply

- Single HTML element wrapper
- No composition of other components
- Minimal or no state
- Pure presentation
- Usually from UI library (shadcn)

## Incorrect

```typescript
// src/components/atoms/form-field.tsx — WRONG: combines label + input + error
export function FormField({ label, error, ...props }: Props) {
  return (
    <div>
      <Label>{label}</Label>
      <Input {...props} />
      {error && <Alert>{error}</Alert>}
    </div>
  )
}
```

## Correct

```typescript
// src/components/atoms/button.tsx
export function Button(props: ButtonProps) {
  return <button {...props} />
}

// FormField → molecules/form-field/
```

## Examples

- ✅ button, input, label, badge, avatar, card, separator
- ❌ form-field (combines input + label + error)
- ❌ search-bar (combines input + icon + button)

## Location

`src/components/atoms/{component}.tsx`
