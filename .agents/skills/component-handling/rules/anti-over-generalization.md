---
title: No Over-Generalization
impact: MEDIUM
impactDescription: split into specific variants instead of 20+ props
tags: anti-patterns, api-design, components
---

# anti-over-generalization

**Category:** Anti-Patterns  
**Impact:** MEDIUM

## Rule

Do not create one component with 20+ props to handle all cases. Split into specific variants.

## Why It Matters

- Complex API, hard to use and maintain
- Trying to do everything = does nothing well

## Incorrect

SuperCard with title, subtitle, content, footer, headerAction, variant, size, showBorder, onClick, onHover, leftIcon, rightIcon, badge, etc.

## Correct

Split into ContentCard, StatCard, ActionCard. Each has focused props and purpose.
