---
name: project-conventions
description: 'Apply project-specific conventions for structure, naming, data models, and API layer in beauty-vuets-boilerplate. Use when checking file location, folder structure, naming, and how models/APIs are wired (especially during code review).'
---

# Project Conventions

## Overview

Use this skill to enforce the **project-level conventions** defined in:

- `.cursorrules`
- `.agents/rules/structure.md`
- `.agents/rules/naming.md`
- `.agents/rules/data-model.md`
- `.agents/rules/api-rule.md`

It focuses on:

- **File/folder structure** (where things live).
- **Naming** (files, components, hooks, models, query keys).
- **Models vs DTOs** and mapping in the **API core layer**.
- **API layer responsibilities** (cores vs services vs components).

## When to Use This Skill

Use `project-conventions` when:

- Reviewing or adding **APIs**, **models**, **stores**, or **views**.
- Reviewing a PR that introduces new **folders/files** under `src/**`.
- The `code-review` skill says to check **project-conventions** (file location, naming).
- You see new **TanStack Query hooks**, **core API classes**, or **models** being added.

## What to Read

When this skill is invoked, read (or recall) these rules as needed:

- `.agents/rules/structure.md` — high-level project structure (where components, views, apis, models, plugins live; form/dialog/table patterns).
- `.agents/rules/naming.md` — naming conventions for files, hooks, components, models, DTOs, query keys.
- `.agents/rules/data-model.md` — rules for using `src/models/**`, mapping DTOs → models in `apis/cores`, and keeping components free of DTO shapes.
- `.agents/rules/api-rule.md` — API layer design: `apis/cores` vs `apis/services`, BaseApi, query keys, mutation hooks, and how components must consume hooks.

## Review Checks (Project Conventions)

Apply these checks when reviewing code:

### 1. Structure & Location (`structure.md`)

- [ ] Files live in the correct **top-level directory**:
  - Components under `src/components/` (atoms/molecules); feature pages and module modals under **`src/views/{module}/`** (see `structure.md`; generic “containers” in Atomic Design docs map here).
  - APIs under `src/apis/cores/**` and `src/apis/services/**`.
  - Models under `src/models/**`.
  - Stores under `src/stores/**`.
  - Plugins under `src/plugins/**`.
- [ ] **Form dialogs** and feature-specific modals live in their module folder under `src/views/{module}/`, not in shared molecules (except truly reusable ones like `ConfirmDialog`).
- [ ] Views orchestrate data via **service hooks**, not by calling axios or core APIs directly.

### 2. Naming (`naming.md`)

- [ ] File names follow the rules:
  - General TS files in **kebab-case** (e.g. `store-api.ts`, `use-stores.ts`).
  - Vue SFCs use **PascalCase.vue** (e.g. `StoreManagement.vue`, `AppHeader.vue`).
- [ ] Classes and models use **PascalCase**:
  - Core APIs: `StoreApi`, `StaffApi`.
  - Models: `StoreModel`, `StaffModel`.
- [ ] Hooks/composables start with **`use`** and use **camelCase**:
  - Queries: `useStoresQuery`, `useStoreByIdQuery`.
  - Mutations: `useStoreCreateMutation`, `useStoreUpdateMutation`, `useStoreDeleteMutation`.
- [ ] Query keys follow the array convention:
  - Base: `['stores']`
  - With params: `['stores', params]`
  - Detail: `['stores', id]`

### 3. Data Models (`data-model.md`)

- [ ] Domain models are defined under `src/models/<domain>/<domain>.ts` (e.g. `src/models/store/store.ts` with `StoreModel`).
- [ ] Mapping from **raw API data (DTOs)** → **models** happens in `src/apis/cores/**`, not in components or service hooks.
- [ ] Service hooks (`src/apis/services/**`) treat `response.data` as **already-mapped models** and forward them directly to components/stores.
- [ ] Components and stores do **not** depend on backend DTO shapes or perform mapping logic (`plainToInstance`, manual mapping) themselves.

### 4. API Layer (`api-rule.md`)

- [ ] Each domain has a **core API class** in `src/apis/cores` extending `BaseApi` and exporting a singleton instance.
- [ ] Service hooks live in `src/apis/services/<domain>/` and are the **only place** that:
  - Use TanStack Query (`useQuery`, `useMutation`).
  - Define query keys.
  - Unwrap `response.data`.
- [ ] Components:
  - Import **hooks** from `apis/services` (never `XxxApi` or axios directly).
  - Use TanStack Query return values (`data`, `isLoading`, `error`, etc.).
- [ ] Mutation hooks invalidate or update related queries using `queryClient.invalidateQueries` in `onSuccess`.
- [ ] Auth/token handling is delegated to `tokenManager`, `httpClient`, and the auth store; hooks do not manipulate tokens or redirects.

## Summary

Before finishing a review that touches structure, naming, models, or APIs:

- [ ] Confirm the code respects **structure**, **naming**, **data-model**, and **API** rules above.
- [ ] If a violation is found, **fix** it (or suggest a clear fix) instead of only reporting.
- [ ] Keep changes consistent with existing patterns in this project (e.g. store management screens, current API/model implementations).
