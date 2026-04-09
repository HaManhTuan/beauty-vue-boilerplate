---
title: Use Composition Over Conditional Props
impact: MEDIUM
impactDescription: prefer slots over hasHeader, headerContent boolean props
tags: anti-patterns, composition, components
---

# anti-no-composition

**Category:** Anti-Patterns  
**Impact:** MEDIUM

## Rule

Use slots and composition over conditional props. Prefer named slots over hasHeader, headerContent, bodyContent props.

## Why It Matters

- Inflexible, many conditional props
- Hard to extend, rigid API

## Incorrect

```vue
<Card :has-header="true" :has-footer="true" header-content="..." footer-content="..." body-content="..." />
```

## Correct

```vue
<Card>
  <template #header>Title</template>
  Content goes here
  <template #footer>Actions</template>
</Card>
```

The `Card` component uses named slots:

```vue
<!-- src/components/molecules/card/index.vue -->
<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    <div class="card-body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
```
