# Project overview

High-level description of **this repository** (Beauty Vue Boilerplate — Vue 3 admin dashboard starter) and the technologies it uses.  
**Use this file as the single “helper” spec for onboarding:** keep it aligned with `package.json` and `src/` when you change the stack or layout. Cursor commands under `.cursor/commands/` (e.g. `/specs`, `/specs.fe`) instruct agents to read this document first.

---

## 1. Purpose

- Provide a **dashboard shell** (layout, sidebar, router, tags) ready for product features.
- Standardize **HTTP + server state** (Axios + TanStack Query), **forms** (TanStack Form + Zod), and **UI** (Tailwind + Reka / shadcn-vue pattern in `src/components/ui/`).
- Act as a **boilerplate**: fork or copy and replace this overview (and `README.md`) when you ship a named product (e.g. a tenant admin client).

---

## 2. User roles & access (boilerplate defaults)

- **Router** enforces optional `meta.roles` (see `src/router/guards.ts` and `src/stores/auth.ts`).
- **Default demo roles** in the Pinia auth store: `admin`, `editor` (placeholder until a real login flow exists).
- **Product specs** sometimes define exactly three roles (e.g. Staff | Admin | Owner). Treat that as a **product requirement**: when you implement auth, map or replace the demo roles and keep **one** canonical role model in code and in specs.

---

## 3. Tech stack

### Core

| Area                    | Packages / notes                                                    |
| ----------------------- | ------------------------------------------------------------------- |
| **Framework**           | Vue 3, Composition API, `<script setup lang="ts">`                  |
| **Build**               | Vite 6, `vue-tsc` + production build                                |
| **Routing**             | Vue Router — pages under `src/views/`, layouts under `src/layouts/` |
| **Global client state** | Pinia (`src/stores/**`)                                             |

### Server state & HTTP

| Area                   | Location / notes                                                                                                       |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **TanStack Vue Query** | `src/plugins/queryClient.ts`, registered in `src/main.ts`                                                              |
| **Axios**              | Shared instance `src/plugins/httpClient.ts` (`apiClient`), base URL `VITE_API_BASE_URL`                                |
| **API wrapper**        | `src/plugins/apiService.ts` (`ApiService`) used by core API classes                                                    |
| **Tokens**             | `src/plugins/tokenManager.ts` — in-memory access token; 401 clears token + query cache + `registerUnauthorizedHandler` |

### UI

| Area             | Notes                                                                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Styling**      | Tailwind CSS, `src/style.css` (tokens + utilities)                                                                                                                       |
| **Primitives**   | **`src/components/ui/**`** — shadcn-vue / Reka output (see root `components.json`, alias `"ui": "@/components/ui"`). _Atomic Design “atoms” = this folder in this repo._ |
| **Compositions** | `src/components/molecules/**` — app chrome (header, sidebar, …)                                                                                                          |
| **Icons**        | `lucide-vue-next` (not Element Plus icons)                                                                                                                               |
| **Motion**       | Animate.css (see `src/main.ts`)                                                                                                                                          |

### Forms & validation

- **TanStack Vue Form** + **Zod** (and `@tanstack/zod-form-adapter` where used).
- Shared field rules: add under **`src/lib/validators/`** when you introduce forms (folder may be created on first feature; see `.cursorrules`).

### Optional backend-as-a-service

- **Supabase** client helper: `src/lib/supabase.ts` — env `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (optional).

### Tooling

- **pnpm** only for installs.
- **ESLint 9** + **Prettier** (`pnpm lint`, `pnpm lint:fix`, `pnpm format`).

---

## 4. Architecture highlights

| Layer                      | Path                   | Responsibility                                                                                                                             |
| -------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **HTTP + domain HTTP**     | `src/apis/cores/**`    | Classes extending `BaseApi`, calling `this.apiService`, mapping DTO → domain models when models exist (see `.agents/rules/data-model.md`). |
| **Query / mutation hooks** | `src/apis/services/**` | TanStack Query hooks; unwrap data for views; **add per domain** as features land.                                                          |
| **Domain models**          | `src/models/**`        | Optional; add when APIs need typed mapping (see `data-model.md`).                                                                          |
| **Views**                  | `src/views/**`         | Routed screens; prefer `src/views/{module}/` for feature modules and module-only modals.                                                   |
| **Cross-cutting plugins**  | `src/plugins/**`       | `httpClient`, `apiService`, `tokenManager`, `queryClient`.                                                                                 |

**Auth (current boilerplate):** `useAuthStore` holds **roles** only; it does not yet persist JWTs. Wire `setAccessToken` from your login flow into `tokenManager` when you connect a real API.

---

## 5. Recommended reading order

1. **`AGENTS.md`** (repo root) — precedence: `.cursorrules` → `.agents/rules/` → `.cursor/rules/` → `.agents/skills/`.
2. **`.cursorrules`** — CRUD UX, dialogs, tables, forms, pnpm, testing expectations.
3. **`.agents/rules/structure.md`** — where files live (`ui/`, `molecules/`, `views/`, `apis/`, …).
4. **`.agents/rules/api-rule.md`** — cores vs services, query keys, mutations.
5. **`src/main.ts`** — bootstrap (Pinia, Vue Query, router, unauthorized handler).
6. **`src/plugins/httpClient.ts`** + **`src/apis/cores/BaseApi.ts`** — minimal end-to-end HTTP pattern before first real `*Api` class exists.

---

## 6. Keeping this doc in sync

When you change **dependencies, env vars, folder layout, or default roles**, update **this file in the same PR** so `/specs`, `/specs.fe`, `/specs-refactor`, and teammates stay aligned.
