---
name: component-handling
description: Guide for organizing Vue components using Atomic Design methodology. Use when creating or organizing components, deciding component placement, refactoring component structure, or when the user asks about component architecture, atoms, molecules, organisms, or where to place a component.
license: MIT
metadata:
  version: '1.0.0'
  keywords: atomic-design, atoms, molecules, organisms, component-placement, component-structure, component-architecture, feature-component, container, component-handling
---

# Component Handling

Comprehensive guide for organizing Vue components using Atomic Design principles. Contains 20+ rules across 5 categories, prioritized by impact to guide component placement and refactoring.

## Repository mapping (beauty-vue-boilerplate)

This repo uses **`src/views/{module}/`** for feature-specific pages and modals. In generic Atomic Design terms, **“feature / container”** placement maps to **`src/views/<module>/`**, not a separate `src/containers/` tree. Shared rules: **`.agents/rules/structure.md`**, **`.cursorrules`**.

**UI “atoms” path:** shadcn-vue CLI installs primitives under **`src/components/ui/`** (see root `components.json`, alias `"ui": "@/components/ui"`). When linked **placement / hierarchy** rules or examples say `atoms/` or `@/components/atoms/…`, translate to **`src/components/ui/`** and **`@/components/ui/…`** in this repository.

## When to Apply

Reference these guidelines when:

- Creating new components
- Deciding where to place a component (atoms, molecules, organisms, box, feature)
- Organizing or refactoring component structure
- Importing components (direction, barrel vs direct)
- User asks about component architecture, atoms, molecules, organisms

## Rule Categories by Priority

| Priority | Category            | Impact   | Prefix       |
| -------- | ------------------- | -------- | ------------ |
| 1        | Component Placement | CRITICAL | `placement-` |
| 2        | Import Hierarchy    | CRITICAL | `hierarchy-` |
| 3        | Usage Rules         | HIGH     | `usage-`     |
| 4        | Anti-Patterns       | HIGH     | `anti-`      |
| 5        | Refactoring         | MEDIUM   | `refactor-`  |

## Quick Reference

### 1. Component Placement (CRITICAL)

- `placement-atoms` - Single basic UI element → atoms/
- `placement-molecules` - Combines 2+ atoms, no data fetch → molecules/
- `placement-organisms` - Complex, data fetching, reusable → organisms/
- `placement-box` - Layout only → box/
- `placement-feature` - Feature-specific → in **this repo**: `src/views/{module}/` (generic docs: `containers/{feature}/components/`)

### 2. Import Hierarchy (CRITICAL)

- `hierarchy-import-direction` - Only import from lower levels (organisms→molecules→atoms)
- `hierarchy-no-shared-from-feature` - Shared components must not import from feature folders
- `hierarchy-no-barrel` - Import directly, avoid barrel exports

### 3. Usage Rules (HIGH)

- `usage-prefer-molecule` - Use molecule when it exists, don't compose atoms directly
- `usage-create-molecule` - Create molecule when same atom combination in 3+ places
- `usage-no-premature-abstraction` - Keep feature-specific until actually reused (YAGNI)
- `usage-organisms-for-data` - Data-fetching components → organisms if reusable

### 4. Anti-Patterns (HIGH)

- `anti-atoms-when-molecule-exists` - Don't use atoms when molecule encapsulates pattern
- `anti-organism-without-complexity` - Simple components belong in molecules
- `anti-molecule-data-fetching` - Molecules must not fetch data
- `anti-feature-in-shared` - Don't put feature-only components in shared folders
- `anti-over-generalization` - Split into variants, not one component with many props
- `anti-cross-level-imports` - Atoms importing molecules violates hierarchy
- `anti-no-tests-stories` - Molecules/organisms need tests and Storybook
- `anti-multiple-responsibilities` - Split responsibilities into separate components
- `anti-no-composition` - Use composition over conditional props

### 5. Refactoring (MEDIUM)

- `refactor-feature-to-shared` - When used in 2+ features, move to shared
- `refactor-shared-to-feature` - When organism only used once, move to feature
- `refactor-molecule-to-organism` - When molecule needs data fetching
- `refactor-organism-to-molecule` - When data fetching moved to parent

## Rules

### Placement
- [placement-atoms](rules/placement-atoms.md)

### Hierarchy
- [hierarchy-import-direction](rules/hierarchy-import-direction.md)

### Usage
- [usage-prefer-molecule](rules/usage-prefer-molecule.md)

### Anti-Patterns
- [anti-atoms-when-molecule-exists](rules/anti-atoms-when-molecule-exists.md)
- [anti-premature-abstraction](rules/anti-premature-abstraction.md)
- [anti-organism-without-complexity](rules/anti-organism-without-complexity.md)
- [anti-molecule-data-fetching](rules/anti-molecule-data-fetching.md)
- [anti-feature-in-shared](rules/anti-feature-in-shared.md)
- [anti-cross-level-imports](rules/anti-cross-level-imports.md)
- [anti-shared-imports-feature](rules/anti-shared-imports-feature.md)
- [anti-over-generalization](rules/anti-over-generalization.md)
- [anti-barrel-exports](rules/anti-barrel-exports.md)
- [anti-ignoring-component-size](rules/anti-ignoring-component-size.md)
- [anti-no-tests-stories](rules/anti-no-tests-stories.md)
- [anti-multiple-responsibilities](rules/anti-multiple-responsibilities.md)
- [anti-no-composition](rules/anti-no-composition.md)
- [anti-prevention-checklist](rules/anti-prevention-checklist.md)

## Full Compiled Document

For the complete guide: `AGENTS.md`

## Component Patterns Summary

| Pattern   | Examples                         | Type                 | Reusable?     |
| --------- | -------------------------------- | -------------------- | ------------- |
| card-item | ProductCard, UserCard, OrderCard | Molecule or Feature  | Depends       |
| selector  | UserSelector, GenderSelector     | Organism or Molecule | Yes           |
| search    | SearchBar                        | Molecule             | Yes           |
| data-view | DataTable, UserList              | Organism             | Yes (generic) |
| form      | UserForm, OrderForm              | Feature              | Usually no    |
| picker    | DateRangePicker, DatePicker      | Molecule             | Yes           |
| badge     | StatusBadge, OrderStatusBadge    | Molecule or Feature  | Depends       |
| panel     | NotificationPanel, FilterPanel   | Organism or Molecule | Depends       |

**Key takeaways:** Name by pattern; use {Entity}{Pattern}; reusability decides placement; data fetching → organism.

## References

- **Decision Guide** (flow for placing a component) — **When creating a new component, read all files in this section.** [Flowchart](references/decision-guide/flowchart.md) · [Questions](references/decision-guide/questions.md) · [Edge Cases](references/decision-guide/edge-cases.md) · [Matrix](references/decision-guide/matrix.md) · [Red Flags](references/decision-guide/red-flags.md)
- **Refactoring Guide** (flow for reorganizing components) — **When refactoring component placement, read all files in this section.** [When to Refactor](references/refactoring-guide/when-to-refactor.md) · [Feature→Molecule](references/refactoring-guide/pattern-feature-to-molecule.md) · [Feature→Organism](references/refactoring-guide/pattern-feature-to-organism.md) · [Molecule→Organism](references/refactoring-guide/pattern-molecule-to-organism.md) · [Organism→Molecule](references/refactoring-guide/pattern-organism-to-molecule.md) · [Shared→Feature](references/refactoring-guide/pattern-shared-to-feature.md) · [Checklist](references/refactoring-guide/checklist.md) · [Pitfalls](references/refactoring-guide/pitfalls.md) · [Best Practices](references/refactoring-guide/best-practices.md)

## Component Hierarchy

```
src/components/
├── atoms/              # Smallest, reusable UI elements
├── molecules/          # Combinations of atoms
├── organisms/          # Complex, self-contained with data/logic
└── box/                # Layout components

src/views/{module}/     # Feature-specific pages & modals (this repo — generic Atomic Design: containers/{feature}/components/)
```
