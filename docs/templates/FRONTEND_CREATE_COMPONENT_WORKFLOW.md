## Workflow: Create New Component (shadcn-vue + Molecules)

**Version:** 1.0  
**Date:** January 2026  
**Tech Stack:** Vue 3 + TypeScript + Tailwind CSS + shadcn-vue

This workflow covers creating or wiring a **new UI component** using shadcn-vue **UI primitives** (`src/components/ui/`, CLI output) and optional molecule wrappers.

---

### 1. Goal

Create a reusable component that:

- Reuses shadcn-vue **UI primitives** under `src/components/ui/` when possible (installed via CLI only)  
- Adds project-specific behavior/styling via molecules  
- Exposes a well-typed, documented props API

---

### 2. Prerequisites Checklist

- [ ] Desired component name decided (e.g. `Button`, `Select`, `Dialog`)  
- [ ] Design reference available (Figma / screenshot / existing screen)  
- [ ] Expected atomic level decided:
  - [ ] UI primitive (pure shadcn-vue output under `src/components/ui/`)
  - [ ] Molecule (`src/components/molecules/*`) wrapper  
- [ ] Routing / screen context understood (where it will be used)

---

### 3. High-level Plan

1. **Check if the component (or equivalent) already exists** in the project.  
2. **If not present**, install the primitive via **shadcn-vue CLI** (never hand-write full primitive code).  
3. **Check complexity**:
   - If simple → use a primitive directly from `src/components/ui`.  
   - If complex (business logic, composition of multiple UI primitives, or shared layout) → create a **molecule** under `src/components/molecules`.  
4. **Design the props API**:
   - List all props in a table (name, type, description, optional?).  
   - Align props with the shadcn-vue primitive and project conventions.  
5. **Implement the component**:
   - Create a folder for the molecule.  
   - Implement the Vue component in that folder.  
   - Export it via a barrel `index.ts`.  
6. **Run lint** and verify everything compiles and passes checks.

---

### 4. Step-by-step Workflow

#### Step 1: Check if component already exists

- [ ] Search in `src/components/ui` for matching shadcn-vue primitives.  
  - [ ] Use IDE search / grep for component name (e.g. `Button`, `Dialog`, `Tooltip`).  
- [ ] Search in `src/components/molecules` for an existing wrapper.  
- [ ] If a suitable component already exists:
  - [ ] Reuse it and **stop here** unless you are extending it.

#### Step 2: Install shadcn-vue primitive (if not found)

> **Rule:** UI primitives under `src/components/ui/` come **only** from the shadcn-vue CLI. Do not hand-copy full primitive implementations.

- [ ] Confirm component is not already in `src/components/ui`.  
- [ ] Install via CLI:

```bash
pnpm dlx shadcn-vue@latest add <component-name>
```

- [ ] Verify generated files are under `src/components/ui/<component-name>/`.  
- [ ] Confirm imports work from the module entry (`src/components/ui/<component-name>/index.ts` if present).

#### Step 3: Decide if a molecule wrapper is needed

Mark **true** if any of these are required:

- [ ] Combines **multiple UI primitives** into a cohesive unit (e.g., input with label + helper text + error).  
- [ ] Adds **business logic** (validation, async behavior, store/router integration).  
- [ ] Implements **reusable layout** (common header, card layout, sidebar, etc.).  
- [ ] Needs **custom prop names** more aligned with domain language.  
- [ ] Used across **multiple screens** with same behavior.

If any box is checked → **create a molecule**.

#### Step 4: Create molecule folder and barrel

Target location:

- [ ] `src/components/molecules/[component-name]/` (kebab-case folder name).

**Naming convention:**
- **Folder name**: Use kebab-case (e.g., `app-header`, `app-sidebar`, `select`, `user-card`)
- **Component file name**: Use PascalCase (e.g., `AppHeader.vue`, `AppSidebar.vue`, `Select.vue`, `UserCard.vue`)
- **Export name**: Use PascalCase (e.g., `AppHeader`, `AppSidebar`, `Select`, `UserCard`)

**Important:** Only `AppHeader` and `AppSidebar` use the `App` prefix. All other components should use their base name without the `App` prefix.

Create files:

- [ ] `src/components/molecules/[component-name]/[ComponentName].vue`  
- [ ] `src/components/molecules/[component-name]/index.ts`

Example `index.ts`:

```ts
export { default as [ComponentName] } from './[ComponentName].vue'
```

**Examples:**
- Folder: `app-header/` → Component: `AppHeader.vue` → Export: `AppHeader` (uses `App` prefix)
- Folder: `app-sidebar/` → Component: `AppSidebar.vue` → Export: `AppSidebar` (uses `App` prefix)
- Folder: `select/` → Component: `Select.vue` → Export: `Select` (no `App` prefix)
- Folder: `user-card/` → Component: `UserCard.vue` → Export: `UserCard` (no `App` prefix)

#### Step 5: Design the props API (props table)

Before coding, list props you plan to support.

- [ ] Open a scratch note (or code comment) and create a **props table**:

| Name        | Type                    | Description                              | Optional? |
|------------ |------------------------ |------------------------------------------|----------|
| `modelValue`| `string`               | Current value of the input               | Yes      |
| `label`     | `string`               | Visible label text                       | No       |
| `disabled`  | `boolean`              | Disable interactions                     | Yes      |
| `variant`   | `'default' \| 'ghost'` | Visual variant (mapped to shadcn primitive)   | Yes      |

Checklist:

- [ ] Map props directly to shadcn / Reka primitive props where possible.  
- [ ] Use union string literals instead of `string` for variants/sizes when known.  
- [ ] Prefer **optional** props only when there is a clear default.  
- [ ] Document emitted events (e.g. `update:modelValue`, `click`, `change`).

You can keep this table as:

- A code comment near the component, or  
- A task description / ticket comment (no need for separate doc unless required).

#### Step 6: Implement the molecule component

In `[ComponentName].vue`:

- [ ] Use `<script setup lang="ts">`.  
- [ ] Import required primitives from `@/components/ui/...`.  
- [ ] Define `props` with proper TypeScript types matching the props table.  
- [ ] Define `emits` with typed payloads.  
- [ ] Use `cn()` from `@/lib/utils` for conditional Tailwind classes.  
- [ ] Compose UI primitives and add business logic / layout as required.  
- [ ] Avoid hard-coded strings if your project uses i18n (use translation keys instead).

Layout & behavior:

- [ ] Implement all required visual states (normal, hover, focus, disabled, error, etc.).  
- [ ] Make sure component is keyboard-accessible.  
- [ ] Support responsive behavior if needed.

#### Step 7: Wire up exports

- [ ] Ensure barrel file `index.ts` exports the component:

```ts
export { default as [ComponentName] } from './[ComponentName].vue'
```

- [ ] Update any central exports if your project maintains them (e.g. `src/components/molecules/index.ts`), if applicable.

---

### 5. Final Checklist (Before Merge)

- [ ] Component (UI primitive or molecule) **does not already exist** or has been intentionally extended.  
- [ ] Any new primitive was installed using:

```bash
pnpm dlx shadcn-vue@latest add <component-name>
```

- [ ] No manually written shadcn-vue primitive code (use CLI).  
- [ ] Molecule folder exists under `src/components/molecules/[component-name]/` (kebab-case).  
- [ ] Component file is named `[ComponentName].vue` (PascalCase).  
- [ ] Barrel `index.ts` correctly exports the molecule with PascalCase name.  
- [ ] Props API has been designed and reviewed (props table created).  
- [ ] Types are explicit and avoid `any`.  
- [ ] Component composes `ui/` primitives and adds only the necessary business logic.  
- [ ] Visual behavior matches design (spacing, typography, states).  
- [ ] Keyboard and basic accessibility are considered.  
- [ ] No console errors or warnings.  
- [ ] Project builds successfully (`pnpm build`).

---

### 6. Linting & Quality

After implementing or updating the component:

- [ ] Run linter:

```bash
pnpm lint
```

- [ ] (Optional) Apply safe auto-fixes when you explicitly want ESLint to rewrite code:

```bash
pnpm lint:fix
```

- [ ] Review the output:
  - [ ] Note any remaining lint **errors** (do not silently ignore).  
  - [ ] Only auto-fix what the project rules allow; otherwise adjust code until lints pass.

---

### 7. Quick Reference: Locations

- **UI primitives (shadcn-vue)**  
  - `src/components/ui/<component-name>/` (kebab-case folder)

- **Molecules (wrappers / compositions)**  
  - `src/components/molecules/<component-name>/` (kebab-case folder)  
  - `src/components/molecules/<component-name>/<ComponentName>.vue` (PascalCase file)  
  - `src/components/molecules/<component-name>/index.ts` (barrel export)

**Naming Examples:**
- `src/components/molecules/app-header/AppHeader.vue`
- `src/components/molecules/app-sidebar/AppSidebar.vue`
- `src/components/molecules/user-card/UserCard.vue`

---

*Template Version 1.0 - Created January 2026 for shadcn-vue component workflow.*

