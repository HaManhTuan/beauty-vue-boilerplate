---
title: Shared Must Not Import from Features
impact: CRITICAL
impactDescription: use composition or props instead of feature imports
tags: anti-patterns, imports, components
---

# anti-shared-imports-feature

**Category:** Anti-Patterns  
**Impact:** CRITICAL

## Rule

Shared components must not import from feature folders (containers).

## Why It Matters

- Tight coupling, not reusable
- Breaks other features that use the shared component

## Incorrect

DataTable importing UserBadge from `containers/users/components/`.

## Correct

Use renderCell prop or composition. Pass custom cell renderer from feature; shared component stays generic.
