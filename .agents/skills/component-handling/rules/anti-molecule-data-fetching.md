---
title: Molecules Must Not Fetch Data
impact: CRITICAL
impactDescription: data fetching belongs in organisms or feature components
tags: anti-patterns, molecules, data-fetching, components
---

# anti-molecule-data-fetching

**Category:** Anti-Patterns  
**Impact:** CRITICAL

## Rule

Molecules must not fetch data. Components that fetch data belong in organisms (if reusable) or feature components (if not).

## Why It Matters

- Mis-categorized component
- Breaks Atomic Design hierarchy
- Molecules are presentation + composition only
- Data fetching implies organism-level complexity

## Incorrect

```vue
<!-- src/components/molecules/user-dropdown/index.vue — WRONG -->
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

## Correct

```vue
<!-- src/components/organisms/user-selector/index.vue -->
<script setup lang="ts">
const emit = defineEmits<{ change: [value: string] }>()
const { data: users, isLoading } = useUsers()
</script>

<template>
  <SelectSkeleton v-if="isLoading" />
  <Select v-else @change="emit('change', $event)">
    <SelectItem v-for="user in users" :key="user.id" :value="user.id">
      {{ user.name }}
    </SelectItem>
  </Select>
</template>
```

## When to Use Each

- **Molecule:** Receives data via props, no API calls
- **Organism:** Fetches own data via composable, reusable across features
- **Feature component:** Fetches data, feature-specific only
