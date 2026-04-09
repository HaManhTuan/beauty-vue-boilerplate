---
title: No Premature Abstraction (YAGNI)
impact: HIGH
impactDescription: keep feature-specific until actually reused
tags: anti-patterns, refactoring, components
---

# anti-premature-abstraction

**Category:** Anti-Patterns  
**Impact:** HIGH

## Rule

Do not move to shared (molecules/organisms) until another feature actually needs it. YAGNI.

## Why It Matters

- Unclear requirements, wrong abstraction risk
- Harder to change when needs evolve
- Unused shared code adds maintenance cost

## Incorrect

Creating shared component "just in case" or "might be reused someday."

## Correct

Keep in `containers/{feature}/components/` until a second feature actually uses it. Then refactor to shared.
