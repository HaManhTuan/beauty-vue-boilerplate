---
title: No Cross-Level Imports
impact: CRITICAL
impactDescription: atoms cannot import molecules; molecules cannot import organisms
tags: anti-patterns, imports, hierarchy, components
---

# anti-cross-level-imports

**Category:** Anti-Patterns  
**Impact:** CRITICAL

## Rule

Atoms cannot import molecules. Molecules cannot import organisms. Only import from lower levels.

## Why It Matters

- Violates hierarchy, circular dependency risk
- Wrong abstraction, breaks separation of concerns

## Incorrect

Atom importing molecule; molecule importing organism.

## Correct

Only Organisms → Molecules → Atoms. See [hierarchy-import-direction](./hierarchy-import-direction.md).
