---
title: Direct Imports, No Barrel Files
impact: HIGH
impactDescription: import from source files to avoid circular deps and bloat
tags: anti-patterns, imports, components
---

# anti-barrel-exports

**Category:** Anti-Patterns  
**Impact:** HIGH

## Rule

Import directly from source files. Avoid barrel files (index.ts that re-exports everything).

## Why It Matters

- Circular dependency risk
- Slow imports, bundle size issues
- Hard to tree-shake

## Incorrect

```typescript
import { Button, Input, Label } from '@/components/atoms'
```

## Correct

```typescript
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'
```
