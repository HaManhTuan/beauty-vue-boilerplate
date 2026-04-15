# Frontend Development Workflow Templates

**Version:** 1.1  
**Date:** April 2026  
**Stack (see `package.json`):** Vue 3, TypeScript, Vite, Vue Router, Pinia, Tailwind CSS, Reka UI / shadcn-vue, TanStack Vue Query & Vue Form & Vue Table, Zod, Axios, Supabase JS (optional), VueUse, Animate.css

This document summarizes workflows for this boilerplate. For **shadcn-vue UI primitives (`src/components/ui/`) and molecules**, prefer the dedicated checklist: [FRONTEND_CREATE_COMPONENT_WORKFLOW.md](./FRONTEND_CREATE_COMPONENT_WORKFLOW.md).

---

## Table of Contents

1. [Create component](#1-workflow-create-component)
2. [Create API layer (core + hooks)](#2-workflow-create-api-layer-core--hooks)
3. [Create new page / screen](#3-workflow-create-new-page--screen)
4. [Quality commands](#4-quality-commands)

---

## 1. Workflow: Create component

### Goal

Add or reuse UI using **primitives** in **`src/components/ui/`** (shadcn-vue CLI only; see root `components.json`), **molecules** (`src/components/molecules/`), and **feature-specific UI** under `src/views/{module}/` when it is not reusable across modules.

### Canonical steps

- [ ] Read [FRONTEND_CREATE_COMPONENT_WORKFLOW.md](./FRONTEND_CREATE_COMPONENT_WORKFLOW.md) end-to-end.
- [ ] Install missing shadcn-vue primitives with:

```bash
pnpm dlx shadcn-vue@latest add <component-name>
```

- [ ] Do **not** add Storybook stories unless the task explicitly asks for them (see root `.cursorrules`).
- [ ] For forms inside modals/pages: use **TanStack Form** and validators from `src/lib/validators` (see `.cursorrules` and `docs/examples/tanstack-form-example.vue` if present).

### Before merge

- [ ] `pnpm lint` (use `pnpm lint:fix` only when you intend to apply ESLint auto-fixes).
- [ ] `pnpm build` (runs `vue-tsc` + Vite production build).

---

## 2. Workflow: Create API layer (core + hooks)

### Goal

Call the backend through the shared **Axios** instance and **TanStack Vue Query** hooks, following `.agents/rules/api-rule.md`.

### Layout (this repo)

| Layer | Path | Role |
|--------|------|------|
| HTTP client | `src/plugins/httpClient.ts` | Shared `apiClient` (base URL `VITE_API_BASE_URL`, auth header from `tokenManager`, 401 → clear cache + registered handler) |
| Token helpers | `src/plugins/tokenManager.ts` | `getAccessToken` / `setAccessToken` / `clearTokens` |
| Request wrapper | `src/plugins/apiService.ts` | `ApiService` class used by core APIs |
| Core API | `src/apis/cores/*` | Classes extending `BaseApi`; HTTP + DTO → domain mapping |
| Hooks | `src/apis/services/{domain}/` | `useQuery` / `useMutation`; unwrap data for views |

### Implementation checklist

- [ ] Add or extend a core class in `src/apis/cores/` extending `BaseApi`, using `this.apiService` (no axios imports in views).
- [ ] Map backend DTO → domain models in the **core** layer per `.agents/rules/data-model.md` (not in components).
- [ ] Add TanStack hooks under `src/apis/services/<domain>/`; define stable **array** query keys; use `queryClient.invalidateQueries` in mutation `onSuccess`.
- [ ] Views import **hooks only**, not `*Api` classes and not `axios` directly.
- [ ] Do not hardcode origin URLs; rely on `VITE_API_BASE_URL` + relative paths in core methods.

### Before merge

- [ ] `pnpm lint` and `pnpm build`.

---

## 3. Workflow: Create new page / screen

### Goal

Implement a routed screen under `src/views/` (prefer `src/views/{module}/` for feature modules) using existing layout, components, and API hooks.

### File layout

- [ ] Page SFC: `src/views/{module}/{ScreenName}.vue` (or project naming convention for that module).
- [ ] Optional composable: `src/views/{module}/composables/use{ScreenName}.ts` for orchestration-heavy logic.
- [ ] Register routes in `src/router/` (e.g. child routes in `dashboard-children.ts` or the module your project uses).

### Product / FE rules (checklists)

Align list pages, filters, forms, dialogs, and money display with:

- Root `.cursorrules` and `.cursor/rules/` (tables, filters/search, modals, forms, money in ₫, etc.).
- [checklists/fe/page.md](./checklists/fe/page.md) when implementing a full page.

### Before merge

- [ ] `pnpm lint` and `pnpm build`.

---

## 4. Quality commands

| Command | When |
|---------|------|
| `pnpm dev` | Local development |
| `pnpm build` | Typecheck + production bundle |
| `pnpm lint` | ESLint (run after substantive edits) |
| `pnpm lint:fix` | ESLint with `--fix` (use only when you want auto-fixes applied) |
| `pnpm format` / `pnpm format:check` | Prettier |

Unit tests: add scripts to `package.json` when Vitest (or similar) is introduced; until then, do not assume `pnpm test:run` exists.

---

## Related documents

- [AGENTS.md](../../AGENTS.md) — rule precedence and skills index
- [.agents/rules/api-rule.md](../../.agents/rules/api-rule.md) — API layering
- [.agents/rules/structure.md](../../.agents/rules/structure.md) — folders and placement
- [FRONTEND_CREATE_COMPONENT_WORKFLOW.md](./FRONTEND_CREATE_COMPONENT_WORKFLOW.md) — shadcn-vue component workflow
- `docs/ui/` — design system notes for new UI (if present)

---

*Template Version 1.1 — Aligned with beauty-vue-boilerplate stack (April 2026).*
