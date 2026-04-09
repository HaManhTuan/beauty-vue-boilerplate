---
title: No Simple Components in Organisms
impact: MEDIUM
impactDescription: organisms need data fetching or complex logic
tags: anti-patterns, organisms, components
---

# anti-organism-without-complexity

**Category:** Anti-Patterns  
**Impact:** MEDIUM

## Rule

Do not place simple presentation components in organisms. Organisms need data fetching or complex logic.

## Why It Matters

- Mis-categorized, misleading structure
- Over-placement pollutes organisms folder

## Incorrect

Simple Card with title + content in `organisms/simple-card/` — no data fetching, no complex logic.

## Correct

Move to `molecules/content-card/`. Organisms require complexity (data fetching, significant state, complex interactions).
