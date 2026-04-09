---
title: Molecules and Organisms Need Tests and Storybook
impact: MEDIUM
impactDescription: require tests and stories for shared components
tags: anti-patterns, testing, storybook, components
---

# anti-no-tests-stories

**Category:** Anti-Patterns  
**Impact:** MEDIUM

## Rule

Molecules and organisms must have tests and Storybook stories.

## Why It Matters

- Untested reusable code breaks easily
- No visual documentation, developers don't know component exists
- No confidence in changes

## Incorrect

Molecule with only index.vue — no __tests__/, no .stories.ts.

## Correct

```
molecules/search-bar/
├── index.vue
├── search-bar.stories.ts
└── __tests__/
    └── search-bar.test.ts
```
