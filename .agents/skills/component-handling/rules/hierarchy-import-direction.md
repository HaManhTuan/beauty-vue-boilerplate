---
title: Import Direction Rule
impact: CRITICAL
impactDescription: organisms → molecules → atoms only
tags: imports, hierarchy, atomic-design, components
---

# hierarchy-import-direction

**Category:** Import Hierarchy  
**Impact:** CRITICAL

## Rule

Only import from lower levels: Organisms → Molecules → Atoms. Never reverse.

## Why It Matters

- Violates component hierarchy
- Circular dependency risk
- Wrong abstraction level
- Breaks separation of concerns

## Incorrect

```typescript
// src/components/atoms/button.tsx
import { SearchBar } from '@/components/molecules/search-bar'  // ❌

export function Button() {
  return <SearchBar />
}
```

```typescript
// src/components/molecules/search-bar/index.tsx
import { UserSelector } from '@/components/organisms/user-selector'  // ❌
```

## Correct

```typescript
// src/components/molecules/search-bar/index.tsx
import { Button } from '@/components/atoms/button'  // ✅
import { Input } from '@/components/atoms/input'

export function SearchBar() {
  return (...)
}
```

```typescript
// src/components/organisms/user-selector/index.tsx
import { Select } from '@/components/atoms/select'
import { Avatar } from '@/components/atoms/avatar'
// ✅ Organism imports atoms/molecules
```

## Import Direction

- Organisms → Molecules → Atoms ✅
- Molecules → Atoms ✅
- Atoms → Molecules ❌
- Atoms → Organisms ❌
- Molecules → Organisms ❌
