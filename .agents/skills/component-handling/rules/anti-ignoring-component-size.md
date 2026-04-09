---
title: Do Not Ignore Component Size
impact: MEDIUM
impactDescription: split 2000+ line components into sections and hooks
tags: anti-patterns, refactoring, components
---

# anti-ignoring-component-size

**Category:** Anti-Patterns  
**Impact:** MEDIUM

## Rule

Do not keep 2000+ line components. Split into sections + hooks.

## Why It Matters

- Hard to test, hard to maintain
- Single responsibility violated
- Should be organism or multiple components

## Incorrect

MegaForm with all validation, sub-forms, logic in one file.

## Correct

Split into organism with sub-components: `user-registration/` with `personal-info-section`, `account-info-section`, `preferences-section`, and `use-registration-form` hook.
