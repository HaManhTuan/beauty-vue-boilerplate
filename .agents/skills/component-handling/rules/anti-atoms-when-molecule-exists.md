---
title: Do Not Use Atoms When Molecule Exists
impact: HIGH
impactDescription: avoid composing atoms when molecule encapsulates pattern
tags: anti-patterns, molecules, atoms, components
---

# anti-atoms-when-molecule-exists

**Category:** Anti-Patterns  
**Impact:** HIGH

## Rule

Do not compose atoms directly when a molecule exists that encapsulates the pattern.

## Why It Matters

- Repeated pattern, inconsistent styling
- Hard to maintain, error-prone
- Violates "prefer higher-level component" principle

## Incorrect

Composing Label + Input + Alert directly when FormField molecule exists.

## Correct

Use FormField molecule instead. See [usage-prefer-molecule](./usage-prefer-molecule.md).
