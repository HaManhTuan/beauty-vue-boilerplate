# AGENTS

This file is the **entry point for AI agents** working in this repository. Use it to decide **what to read before coding** and how skills, project rules, and Cursor rules fit together.

---

## Precedence (when two sources disagree)

1. **`.cursorrules`** — repo-specific overrides (CRUD UX, dialogs, API behavior, pnpm, etc.).
2. **`.agents/rules/`** (`structure.md`, `naming.md`, `data-model.md`, `api-rule.md`) — structure, naming, models, API layering.
3. **`.cursor/rules/`** — contextual specs (forms, tables, validators, money, …); must **not** contradict **`.cursorrules`**.
4. **`.agents/skills/`** — stack patterns and references; if a skill conflicts with **(1)** or **(2)**, follow **(1)** or **(2)**.

---

## Canonical source: `.agents/skills/`

- Each **subfolder is one skill**. Before implementing a task in that area, open that folder’s **`SKILL.md`** and follow it.
- For details, use the skill’s **`reference/`** or **`references/`** files (Supabase: see `references/_sections.md` and the files listed by prefix in `SKILL.md`).
- Skills are the **main stack reference** (Vue, TanStack, Tailwind patterns, etc.). If a skill text conflicts with **`.cursorrules`** or **`.agents/rules/`**, use the **Precedence** section above.

---

## Skill index (read `SKILL.md` when the task matches)

| Area | Skill folder | Use when |
|------|----------------|----------|
| **Vue core** | `vue` | SFCs, `defineProps` / `defineEmits` / `defineModel`, reactivity, built-ins |
| | `vue-best-practices` | Idioms, patterns, and quality for Vue 3 code |
| | `vue-pinia-best-practices` | Pinia stores, state, actions, getters |
| | `vue-router-best-practices` | Routes, navigation guards, route meta |
| | `vueuse-functions` | VueUse composables and utilities |
| | `vue-debug-guides` | Debugging Vue apps and reactivity |
| **UI / styling** | `shadcn-vue` | Reka UI / shadcn-vue components, forms, tables, theming |
| | `tailwind-design-system` | Tailwind v4, tokens, scalable UI patterns |
| | `tailwind-css-patterns` | Concrete Tailwind layout/styling patterns |
| | `frontend-design` | Distinctive, production-grade UI direction (typography, color, motion, layout) — read **`README.md`** in the skill folder; combine with **`docs/ui/`** for in-app screens |
| | `animate` | Animation — project default is **[Animate.css](https://animate.style/)** (e.g. `animate__` prefix; imported via `main.ts`). Respect **`prefers-reduced-motion`** (library supports this; do not override blindly). |
| **Forms & data** | `tanstack-vue-form-handling` | TanStack Form, fields, wiring to the app |
| | `tanstack-vue-query-handling` | TanStack Query hooks in **`src/apis/services/<domain>/`** wrapping **`src/apis/cores`** — see **`api-rule.md`**. |
| | `zod-validation-handling` | Zod schemas and shared validators under `src/lib/validators` |
| **Backend / DB** | `supabase-postgres-best-practices` | SQL, indexes, schema, migrations, RLS, connection pooling (Postgres / Supabase) |
| **Structure** | `component-handling` | Atomic Design — atoms / molecules / organisms, where components live |
| | `project-conventions` | Repo layout, naming, models vs DTOs, API cores vs services — aligns with **`.agents/rules/`** (`structure.md`, `naming.md`, `data-model.md`, `api-rule.md`) |

---

## Project rules (human-written, repo-specific)

- **`.agents/rules/`** — structure, naming, data models, and API layering. Use together with the **`project-conventions`** skill.
- **`docs/ui/`** — before new UI, layout, or components, read at least (in this order): `design-system.md` → `design-style.md`.

---

## Cursor rules: `.cursor/rules/`

- These apply **by context** (e.g. Vue SFCs, Pinia, router, Tailwind, Supabase, animation).
- They cover **product/FE specs** (forms, validation messages, tables, modals, money format, filters/search, errors vs toasts, etc.).
- They **supplement** skills and `docs/ui/` and must **not** contradict **`.cursorrules`** (see **Precedence**).

---

## Default stack (unless a task says otherwise)

- **Vue 3**, **Composition API**, **`<script setup lang="ts">`**
- **Pinia**, **Vue Router**, **TanStack Query** & **TanStack Form**, **Tailwind**, **shadcn-vue** / Reka UI

When in doubt: check **Precedence** → open the relevant **`SKILL.md`** → **`docs/ui/`** for UI work → **`.cursor/rules/`** for behavioral specs → **`.cursorrules`** for project-specific CRUD/dialog/API rules.
