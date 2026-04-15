<div align="center">

**🇬🇧 English** · [🇻🇳 Tiếng Việt](./README.vi.md)

# Beauty Vue Boilerplate

**A production-minded Vue 3 admin starter** — dashboard shell, typed APIs, TanStack data layer, and Tailwind + Reka UI components.

<br />

[![Vue 3](https://img.shields.io/badge/Vue-3.5-42b883?style=for-the-badge&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

<br />

[![pnpm](https://img.shields.io/badge/pnpm-package%20manager-f69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Pinia](https://img.shields.io/badge/Pinia-state-yellowgreen)](https://pinia.vuejs.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack-Query%20%2B%20Form-ff4154)](https://tanstack.com/)

</div>

<br />

---

## Highlights

| | |
|:---|:---|
| **UI** | Tailwind CSS, **Reka UI** primitives, lucide icons, dark/light theming hooks |
| **Data** | **TanStack Vue Query** & **Vue Form**, **Zod**, optional **Supabase** client |
| **HTTP** | **Axios** via shared `apiClient` (`src/plugins/httpClient.ts`) + `tokenManager` |
| **Structure** | Dashboard layout, sidebar nav, router guards, Pinia stores |
| **DX** | ESLint 9, Prettier, `vue-tsc`, Vite 6, path alias `@/` |

---

## Quick start

```bash
# install dependencies
pnpm install

# copy environment template
cp .env.example .env

# start dev server (default http://localhost:5173)
pnpm dev
```

Then open the URL Vite prints in the terminal.

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Vite dev server with HMR |
| `pnpm build` | Typecheck (`vue-tsc`) + production build |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint` | Run ESLint on the project |
| `pnpm lint:fix` | ESLint with `--fix` |
| `pnpm format` | Prettier write |
| `pnpm format:check` | Prettier check only |

---

## Environment

Create a `.env` from [`.env.example`](./.env.example):

| Variable | Purpose |
|----------|---------|
| `VITE_API_BASE_URL` | REST API origin (no trailing slash). Leave empty if you only use Supabase from the browser. |
| `VITE_SUPABASE_URL` | Optional Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Optional Supabase anon key |

---

## Repository layout

```text
src/
├── apis/cores/          # Domain API classes (extend BaseApi)
├── apis/services/       # TanStack Query hooks (add per domain)
├── components/
│   ├── molecules/       # App shell pieces (header, sidebar, …)
│   └── ui/              # Reka / shadcn-style primitives
├── layouts/             # e.g. DashboardLayout
├── lib/                 # utils, supabase helper, validators (extend here)
├── plugins/             # httpClient, apiService, tokenManager, queryClient
├── router/              # routes, guards, sidebar config
├── stores/              # Pinia
├── style.css            # Tailwind + global tokens
└── views/               # Routed pages & feature screens
```

---

## Documentation

| Resource | What it’s for |
|----------|----------------|
| [`AGENTS.md`](./AGENTS.md) | **Start here** — rule precedence, skill index, stack defaults |
| [`docs/project-overview.md`](./docs/project-overview.md) | Stack, roles, architecture — **read before `/specs*` commands** |
| [`.cursorrules`](./.cursorrules) | Project CRUD, dialogs, API, pnpm, testing expectations |
| [`.agents/rules/`](./.agents/rules/) | Structure, naming, data models, API layering |
| [`docs/templates/`](./docs/templates/) | Feature specs, FE workflows, checklists, [common messages](./docs/templates/common_messages.md) |
| [`.cursor/commands/_README.md`](./.cursor/commands/_README.md) | When to use each Cursor `/specs…` command |

---

## Tooling expectations

- Use **pnpm** only (`pnpm add`, `pnpm add -D`).
- Add shadcn-vue–style components with the upstream CLI pattern from `.cursorrules` (do not hand-copy whole primitives).
- After meaningful edits, run **`pnpm lint`**; use **`pnpm lint:fix`** only when you intend to apply auto-fixes.
- Ship features with **`pnpm build`** green.

---

## License

Private / unlicensed by default — add a `LICENSE` file when you publish or redistribute.

---

<div align="center">

<sub>Built with Vue 3 · TypeScript · Vite · Tailwind · TanStack · Pinia</sub>

</div>
