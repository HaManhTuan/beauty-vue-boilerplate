---
title: Prefer Molecule Over Atoms
impact: HIGH
impactDescription: use molecule when pattern exists
tags: usage, molecules, atomic-design, components
---

# usage-prefer-molecule

**Category:** Usage Rules  
**Impact:** HIGH

## Rule

When a molecule exists that encapsulates a pattern, use it. Do not compose atoms directly.

## Why It Matters

- Consistent pattern across the app
- Single source of truth
- Less code, easier to maintain
- Reduces inconsistency and errors

## Incorrect

```vue
<!-- RegistrationForm.vue — composing atoms when FormField molecule already exists -->
<script setup lang="ts">
import Input from '@/components/atoms/input/index.vue'
import Label from '@/components/atoms/label/index.vue'
import Alert from '@/components/atoms/alert/index.vue'
</script>

<template>
  <div>
    <Label>Email</Label>
    <Input v-model="form.email" type="email" />
    <Alert v-if="errors.email">{{ errors.email }}</Alert>

    <Label>Password</Label>
    <Input v-model="form.password" type="password" />
    <Alert v-if="errors.password">{{ errors.password }}</Alert>
  </div>
</template>
```

**Problems:** Repeated pattern, inconsistent styling, hard to maintain.

## Correct

```vue
<!-- RegistrationForm.vue -->
<script setup lang="ts">
import FormField from '@/components/molecules/form-field/index.vue'
</script>

<template>
  <div>
    <FormField label="Email" type="email" v-model="form.email" :error="errors.email" />
    <FormField label="Password" type="password" v-model="form.password" :error="errors.password" />
  </div>
</template>
```

**Benefits:** Consistent, less code, single source of truth.

## Critical Rule

Once a molecule exists, **DO NOT** use its constituent atoms directly in that pattern. Always use the molecule.
