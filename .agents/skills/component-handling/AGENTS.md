# Component Handling

**Version 1.0.0**  
Refactored from atomic-design-guide

> **Note:**  
> This document is mainly for agents and LLMs to follow when creating,  
> organizing, or refactoring Vue component structure. Optimized for  
> automation and consistency by AI-assisted workflows.

---

## Abstract

Comprehensive guide for organizing Vue components using Atomic Design principles. Contains 20+ rules across 5 categories, prioritized by impact. Each rule includes detailed explanations, incorrect vs correct code examples, and decision criteria for automated refactoring and code generation.

---

## Table of Contents

1. [Component Placement](#1-component-placement) — **CRITICAL**
   - 1.1 [Atoms - Single Basic UI Elements](#11-atoms---single-basic-ui-elements)
   - 1.2 [Molecules - Atom Combinations](#12-molecules---atom-combinations)
   - 1.3 [Organisms - Complex Components](#13-organisms---complex-components)
   - 1.4 [Box - Layout Components](#14-box---layout-components)
   - 1.5 [Feature-Specific Components](#15-feature-specific-components)
2. [Import Hierarchy](#2-import-hierarchy) — **CRITICAL**
   - 2.1 [Import Direction Rule](#21-import-direction-rule)
   - 2.2 [No Shared Imports from Features](#22-no-shared-imports-from-features)
   - 2.3 [Direct Imports, No Barrel](#23-direct-imports-no-barrel)
3. [Usage Rules](#3-usage-rules) — **HIGH**
   - 3.1 [Prefer Molecule Over Atoms](#31-prefer-molecule-over-atoms)
   - 3.2 [Create Molecules for Repeated Patterns](#32-create-molecules-for-repeated-patterns)
   - 3.3 [No Premature Abstraction](#33-no-premature-abstraction)
   - 3.4 [Organisms for Data-Fetching Components](#34-organisms-for-data-fetching-components)
4. [Anti-Patterns](#4-anti-patterns) — **HIGH**
   - 4.1 [Using Atoms When Molecule Exists](#41-using-atoms-when-molecule-exists)
   - 4.2 [Organism Without Complexity](#42-organism-without-complexity)
   - 4.3 [Molecule with Data Fetching](#43-molecule-with-data-fetching)
   - 4.4 [Feature Components in Shared Folders](#44-feature-components-in-shared-folders)
   - 4.5 [Over-Generalization](#45-over-generalization)
   - 4.6 [Cross-Level Imports](#46-cross-level-imports)
   - 4.7 [No Tests or Storybook](#47-no-tests-or-storybook)
   - 4.8 [Multiple Responsibilities](#48-multiple-responsibilities)
   - 4.9 [Not Using Composition](#49-not-using-composition)
5. [Refactoring](#5-refactoring) — **MEDIUM**
   - 5.1 [Feature → Shared When Reused](#51-feature--shared-when-reused)
   - 5.2 [Shared → Feature When Single Use](#52-shared--feature-when-single-use)
   - 5.3 [Molecule → Organism When Data Fetching](#53-molecule--organism-when-data-fetching)
   - 5.4 [Organism → Molecule When Data Moved](#54-organism--molecule-when-data-moved)
6. [Component Patterns Summary](#component-patterns-summary)
7. [References](#references)
8. [Rules](#rules)

---

## References

- **Decision Guide** (flow for placing a component) — **When creating a new component, read all files in this section.** [Flowchart](references/decision-guide/flowchart.md) · [Questions](references/decision-guide/questions.md) · [Edge Cases](references/decision-guide/edge-cases.md) · [Matrix](references/decision-guide/matrix.md) · [Red Flags](references/decision-guide/red-flags.md)
- **Refactoring Guide** (flow for reorganizing components) — **When refactoring component placement, read all files in this section.** [When to Refactor](references/refactoring-guide/when-to-refactor.md) · [Feature→Molecule](references/refactoring-guide/pattern-feature-to-molecule.md) · [Feature→Organism](references/refactoring-guide/pattern-feature-to-organism.md) · [Molecule→Organism](references/refactoring-guide/pattern-molecule-to-organism.md) · [Organism→Molecule](references/refactoring-guide/pattern-organism-to-molecule.md) · [Shared→Feature](references/refactoring-guide/pattern-shared-to-feature.md) · [Checklist](references/refactoring-guide/checklist.md) · [Pitfalls](references/refactoring-guide/pitfalls.md) · [Best Practices](references/refactoring-guide/best-practices.md)

---

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

---

## 1. Component Placement

**Impact: CRITICAL**

Correct placement ensures maintainability and discoverability. Wrong placement causes confusion and coupling issues.

### 1.1 Atoms - Single Basic UI Elements

**Impact: CRITICAL**

Place in `atoms/` when: single HTML element wrapper, no composition of other components, minimal state, pure presentation.

**Incorrect: composite component in atoms**

```vue
<!-- src/components/atoms/form-field.vue — WRONG: combines label + input + error -->
<script setup lang="ts">
defineProps<{ label: string; error?: string }>()
</script>

<template>
  <div>
    <Label>{{ label }}</Label>
    <Input v-bind="$attrs" />
    <Alert v-if="error">{{ error }}</Alert>
  </div>
</template>
```

**Correct: single element in atoms**

```vue
<!-- src/components/atoms/button.vue -->
<template>
  <button v-bind="$attrs"><slot /></button>
</template>

<!-- src/components/atoms/input.vue -->
<template>
  <input v-bind="$attrs" />
</template>

<!-- FormField → molecules/form-field/ -->
```

**Examples:** `button`, `input`, `label`, `badge`, `avatar`, `card`, `separator`  
**Location:** `src/components/atoms/{component}.vue`

### 1.2 Molecules - Atom Combinations

**Impact: CRITICAL**

Place in `molecules/` when: combines 2+ atoms, reusable pattern, no data fetching, has internal logic (validation, formatting).

**Incorrect: molecule in organisms**

```vue
<!-- src/components/organisms/search-bar/ — WRONG: no data fetching -->
<script setup lang="ts">
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <SearchIcon />
    <Input :value="modelValue" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
    <Button @click="emit('update:modelValue', '')">Clear</Button>
  </div>
</template>
```

**Correct: molecule placement**

```vue
<!-- src/components/molecules/search-bar/index.vue -->
<script setup lang="ts">
const props = defineProps<{ modelValue: string; placeholder?: string }>()
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="relative">
    <Search class="absolute left-3" />
    <Input
      :value="modelValue"
      :placeholder="placeholder"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <Button v-if="modelValue" variant="ghost" @click="emit('update:modelValue', '')">
      <X />
    </Button>
  </div>
</template>
```

**Critical Rule:** Once a molecule exists, **DO NOT** use its constituent atoms directly. Always use the molecule.  
**Location:** `src/components/molecules/{component}/index.vue`

### 1.3 Organisms - Complex Components

**Impact: CRITICAL**

Place in `organisms/` when: fetches data, complex state, reusable across features, self-contained.

**Incorrect: data-fetching component in molecules**

```vue
<!-- src/components/molecules/user-selector/ — WRONG: fetches data -->
<script setup lang="ts">
const { data: users } = useUsers()  // Data fetching in molecule!
</script>

<template>
  <Select @change="emit('change', $event)">
    <SelectItem v-for="user in users" :key="user.id" :value="user.id">
      {{ user.name }}
    </SelectItem>
  </Select>
</template>
```

**Correct: organism placement**

```vue
<!-- src/components/organisms/user-selector/index.vue -->
<script setup lang="ts">
const props = defineProps<{ modelValue?: string }>()
const emit = defineEmits(['update:modelValue'])
const { data: users, isLoading } = useUsers()
</script>

<template>
  <SelectSkeleton v-if="isLoading" />
  <Select v-else :value="modelValue" @change="emit('update:modelValue', $event)">
    <SelectItem v-for="user in users" :key="user.id" :value="user.id">
      <Avatar :src="user.avatar" />
      {{ user.name }}
    </SelectItem>
  </Select>
</template>
```

**Location:** `src/components/organisms/{component}/index.vue`

### 1.4 Box - Layout Components

**Impact: HIGH**

Place in `box/` when: layout/structure only, no business logic, spacing/alignment/grid.

**Examples:** `page-container`, `content-wrapper`, `grid-layout`, `stack`  
**Location:** `src/components/box/{component}.vue`

### 1.5 Feature-Specific Components

**Impact: CRITICAL**

Place in `containers/{feature}/components/` when: used only in one feature, feature-specific logic, not reusable.

**Incorrect: feature component in shared**

```vue
<!-- src/components/molecules/order-status-updater/ — WRONG: only used in orders -->
<script setup lang="ts">
const props = defineProps<{ order: Order }>()
// Order-specific logic
</script>

<template><!-- ... --></template>
```

**Correct: feature folder**

```vue
<!-- src/containers/orders/components/order-status-updater/index.vue -->
<script setup lang="ts">
const props = defineProps<{ order: Order }>()
</script>

<template><!-- ... --></template>
```

**Location:** `src/containers/{feature}/components/{component}/index.vue`

---

## 2. Import Hierarchy

**Impact: CRITICAL**

### 2.1 Import Direction Rule

**Impact: CRITICAL**

Only import from lower levels: Organisms → Molecules → Atoms. Never reverse.

**Incorrect: atom importing molecule**

```vue
<!-- src/components/atoms/button.vue -->
<script setup lang="ts">
import SearchBar from '@/components/molecules/search-bar/index.vue'  // ❌
</script>

<template>
  <SearchBar />
</template>
```

**Correct: molecule importing atom**

```vue
<!-- src/components/molecules/search-bar/index.vue -->
<script setup lang="ts">
import Button from '@/components/atoms/button/index.vue'  // ✅
import Input from '@/components/atoms/input/index.vue'
</script>

<template><!-- ... --></template>
```

**Rule:** Organisms → Molecules → Atoms. Never: Atoms → Molecules, Molecules → Organisms.

### 2.2 No Shared Imports from Features

**Impact: CRITICAL**

Shared components must not import from feature folders. Use slots or render props via scoped slots.

**Incorrect: shared depending on feature**

```vue
<!-- src/components/organisms/data-table/index.vue -->
<script setup lang="ts">
import UserBadge from '@/containers/users/components/user-badge/index.vue'  // ❌
</script>

<template>
  <UserBadge />
</template>
```

**Correct: use scoped slots**

```vue
<!-- src/components/organisms/data-table/index.vue -->
<script setup lang="ts">
defineProps<{ columns: Column[]; data: any[] }>()
</script>

<template>
  <table>
    <tr v-for="row in data" :key="row.id">
      <td v-for="col in columns" :key="col.id">
        <slot name="cell" :column="col" :row="row" />
      </td>
    </tr>
  </table>
</template>

<!-- Usage in feature -->
<DataTable :columns="columns" :data="data">
  <template #cell="{ column, row }">
    <UserBadge v-if="column.id === 'status'" :status="row.status" />
  </template>
</DataTable>
```

### 2.3 Direct Imports, No Barrel

**Impact: HIGH**

Import directly from source. Avoid barrel files to prevent circular deps and bundle bloat.

**Incorrect: barrel import**

```typescript
import { Button, Input, Label } from '@/components/atoms'  // ❌
```

**Correct: direct import**

```typescript
import Button from '@/components/atoms/button/index.vue'
import Input from '@/components/atoms/input/index.vue'
import Label from '@/components/atoms/label/index.vue'
```

---

## 3. Usage Rules

**Impact: HIGH**

### 3.1 Prefer Molecule Over Atoms

**Impact: HIGH**

When a molecule exists that encapsulates a pattern, use it. Don't compose atoms directly.

**Incorrect: composing atoms when molecule exists**

```vue
<script setup lang="ts">
import Input from '@/components/atoms/input/index.vue'
import Label from '@/components/atoms/label/index.vue'
import Alert from '@/components/atoms/alert/index.vue'
</script>

<template>
  <div>
    <Label>Name</Label>
    <Input v-model="form.name" />
    <Alert v-if="errors.name">{{ errors.name }}</Alert>
  </div>
</template>
```

**Correct: use molecule**

```vue
<script setup lang="ts">
import FormField from '@/components/molecules/form-field/index.vue'
</script>

<template>
  <FormField label="Name" v-model="form.name" :error="errors.name" />
</template>
```

### 3.2 Create Molecules for Repeated Patterns

**Impact: MEDIUM-HIGH**

If same atom combination appears in 3+ places, extract to molecule.

**Signals:**

- Copy-pasting atom combinations
- Same pattern in multiple files
- Repeated layout/structure

### 3.3 No Premature Abstraction

**Impact: HIGH**

Keep feature-specific until actually reused. YAGNI.

**Incorrect: shared "just in case"**

```vue
<!-- src/components/molecules/user-profile-card/ — "might be reused someday" -->
<script setup lang="ts">
const props = defineProps<{ user: User }>()
// Complex logic for ONE feature
</script>
```

**Correct: feature-specific first**

```vue
<!-- src/containers/users/components/user-profile-card/index.vue -->
<script setup lang="ts">
const props = defineProps<{ user: User }>()
</script>
```

**When to move:** When another feature actually needs it.

### 3.4 Organisms for Data-Fetching Components

**Impact: HIGH**

Components that fetch data: organisms if reusable, feature-specific if not.

**Organism (reusable):**

```vue
<!-- src/components/organisms/user-selector/index.vue -->
<script setup lang="ts">
const emit = defineEmits(['select'])
const { data: users } = useUsers()
</script>

<template>
  <Select v-bind="$attrs"><!-- ... --></Select>
</template>
```

**Feature-specific (not reusable):**

```vue
<!-- src/containers/projects/components/project-user-selector/index.vue -->
<script setup lang="ts">
const props = defineProps<{ projectId: string }>()
const { data: users } = useProjectUsers(props.projectId)
</script>

<template><!-- ... --></template>
```

---

## 4. Anti-Patterns

**Impact: HIGH**

### 4.1 Using Atoms When Molecule Exists

See [3.1 Prefer Molecule Over Atoms](#31-prefer-molecule-over-atoms).

### 4.2 Organism Without Complexity

**Impact: MEDIUM**

Don't put simple presentation components in organisms.

**Incorrect:**

```vue
<!-- src/components/organisms/simple-card/ — no data, no complex logic -->
<script setup lang="ts">
defineProps<{ title: string; content: string }>()
</script>

<template>
  <Card><h3>{{ title }}</h3><p>{{ content }}</p></Card>
</template>
```

**Correct:** Move to `molecules/content-card/`

### 4.3 Molecule with Data Fetching

**Impact: CRITICAL**

Molecules must not fetch data. Promote to organism.

### 4.4 Feature Components in Shared Folders

**Impact: CRITICAL**

Don't put feature-only components in `components/`. Use `containers/{feature}/components/`.

### 4.5 Over-Generalization

**Impact: MEDIUM**

Don't create one component with 20+ props. Split into specific variants.

**Incorrect:**

```vue
<script setup lang="ts">
defineProps<{
  title?: string; subtitle?: string; content?: string
  footer?: string; headerAction?: unknown; variant?: string; size?: string
}>()
// Too many props
</script>
```

**Correct:**

```vue
<!-- content-card.vue -->
<script setup lang="ts">
defineProps<{ title: string; content: string }>()
</script>

<!-- stat-card.vue -->
<script setup lang="ts">
defineProps<{ label: string; value: string | number; icon?: string }>()
</script>

<!-- action-card.vue -->
<script setup lang="ts">
defineProps<{ title: string; actions: Action[] }>()
</script>
```

### 4.6 Cross-Level Imports

Atoms cannot import molecules. Molecules cannot import organisms. See [2.1](#21-import-direction-rule).

### 4.7 No Tests or Storybook

**Impact: MEDIUM**

Molecules and organisms must have tests and Storybook stories.

**Correct structure:**

```
molecules/search-bar/
├── index.vue
├── search-bar.stories.ts
└── __tests__/
    └── search-bar.test.ts
```

### 4.8 Multiple Responsibilities

**Impact: MEDIUM**

Split components that display AND handle mutations AND navigate. Use composition.

### 4.9 Not Using Composition

**Impact: MEDIUM**

Use slots over conditional props for flexibility.

**Incorrect:**

```vue
<script setup lang="ts">
defineProps<{
  hasHeader?: boolean; hasFooter?: boolean
  headerContent?: string; footerContent?: string; bodyContent?: string
}>()
</script>

<template>
  <div>
    <div v-if="hasHeader">{{ headerContent }}</div>
    <div>{{ bodyContent }}</div>
    <div v-if="hasFooter">{{ footerContent }}</div>
  </div>
</template>
```

**Correct:**

```vue
<!-- card.vue — uses named slots -->
<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header"><slot name="header" /></div>
    <div class="card-body"><slot /></div>
    <div v-if="$slots.footer" class="card-footer"><slot name="footer" /></div>
  </div>
</template>

<!-- Usage -->
<Card>
  <template #header>Title</template>
  Content goes here
  <template #footer>Actions</template>
</Card>
```

---

## 5. Refactoring

**Impact: MEDIUM**

### 5.1 Feature → Shared When Reused

**When:** Component used in 2+ features, no/simple data fetching.  
**Action:** Extract to `molecules/` or `organisms/`, remove feature coupling, add Storybook + tests.

### 5.2 Shared → Feature When Single Use

**When:** Organism only used in one feature.  
**Action:** Move to `containers/{feature}/components/`.

### 5.3 Molecule → Organism When Data Fetching

**When:** Molecule needs to fetch its own data.  
**Action:** Add data fetching via composable, move to `organisms/`.

### 5.4 Organism → Molecule When Data Moved

**When:** Data fetching moved to parent.  
**Action:** Convert to presentation component, move to `molecules/`.

---

## Quick Reference Table

| Type     | Location                           | Reusability | Data Fetching | Complexity |
| -------- | ---------------------------------- | ----------- | ------------- | ---------- |
| Atom     | `atoms/`                           | High        | No            | Low        |
| Molecule | `molecules/`                       | High        | No            | Medium     |
| Organism | `organisms/`                       | High        | Yes           | High       |
| Box      | `box/`                             | High        | No            | Low        |
| Feature  | `containers/{feature}/components/` | None        | Maybe         | Any        |

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

**Key takeaways:**

- Name by **pattern** (card-item, selector, search), not by entity (product-card, user-selector)
- Examples use **{Entity}{Pattern}** — ProductCard, UserSelector, SearchBar
- **Reusability** decides shared vs feature-specific
- **Data fetching** → organism when reusable
