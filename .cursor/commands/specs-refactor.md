# /spec-refactor

Use this command to analyze a cross-cutting requirement change and produce a consolidated refactor plan — identifying which existing specs need updating and which code files need to change.

## Agent skills & rules (MUST FOLLOW)

- Read **`AGENTS.md`** first for **precedence** and the skill index.
- When the refactor plan touches **Vue / Router / Pinia**, read **vue**, **vue-best-practices**, and relevant **vue-router** / **vue-pinia** skills under `.agents/skills/`.
- When it touches **API + TanStack Query**, read **tanstack-vue-query-handling** and **api-rule** (`.agents/rules/api-rule.md`).
- When it touches **forms or validators**, read **tanstack-vue-form-handling** and **zod-validation-handling**.
- For **UI components / tables / dialogs**, read **shadcn-vue**, **component-handling**, and **project-conventions**; use **`.cursor/rules/`** (and `.cursorrules`) for product FE behavior. Open each relevant **`SKILL.md`** before writing file-level recommendations.
- If the plan touches **Postgres / Supabase**, read **supabase-postgres-best-practices**.

## Project rules (MUST FOLLOW)

- You MUST follow these FE common UI rules when the change touches UI/UX behavior (validation timing, tables/pagination, modal close behavior, formatting rules, and user-visible copy — see also `docs/templates/common_messages.md` for English strings):
  - `.cursor/rules/fe-common-rule-01-form-validation.md`
  - `.cursor/rules/fe-common-rule-02-field-validators.md`
  - `.cursor/rules/fe-common-rule-03-error-display.md`
  - `.cursor/rules/fe-common-rule-05-table-list.md`
  - `.cursor/rules/fe-common-rule-06-modal-close.md`
  - `.cursor/rules/fe-common-rule-07-money-display.md`
  - `.cursor/rules/*`
- You MUST follow `.cursorrules` for project-wide engineering conventions and constraints.

## Required input (you must provide at least one)

- A **clear written description** of the requirement change (scope, what is different, what must now apply across features), or
- A **file path** pointing to a requirements document (e.g., `docs/refactors/change-description.md`)

If neither is provided, **reject the requirement** with this response:

- **Rejected**: Missing input.
- Please provide **at least one** of: **written description** of the change / **file path** to a requirements document.

## Role (predefined)

Use this persona when running `/spec-refactor`

**You are a Business Analyst (BA) and Senior Frontend Engineer hybrid** with 10+ years of experience in both requirements analysis and frontend architecture.  
You produce all output in **English**.  
You are responsible for identifying the blast radius of a requirement change across all existing specs and the codebase, then producing a precise, actionable refactor plan.

This role is accountable for:

- Understanding the intent and scope of the change request
- Scanning all existing spec `general.md` files to find affected specs
- Reading relevant code to map spec-level changes to concrete code-level changes
- Producing a structured refactor plan that cross-references specs and code

If key information is missing, **ask the requester for clarification** before finalizing the plan.  
If you still need to proceed with incomplete info, clearly list gaps under "Assumptions / Open questions" in the output.

## What to do

### Step 1 — Understand the change

1. Read the provided description or file carefully.
2. Extract: what changed, why, and any constraints or scope boundaries.
3. If the input is a file path, read the file first.

### Step 2 — Read `docs/project-overview.md`

Read `docs/project-overview.md` to understand:

- Project tech stack and architecture patterns
- **User roles** — **§2** (boilerplate `admin` / `editor`; product specs may define Staff | Admin | Owner or others)
- API layer conventions and model transformation patterns
- Component structure guidelines (`src/components/ui/`, `molecules/`, `views/`, …)

### Step 3 — Scan all existing `general.md` spec files

1. List every directory under `docs/specs/` (e.g., `001-store-feature`, `002-staff-management`, …).
2. For each directory that contains a `general.md`, read that file.
3. Evaluate: does this spec need to change because of the requirement change?
   - If **yes**: note the spec ID, name, and a brief reason why it is affected.
   - If **no**: skip it.

### Step 4 — Read related code for each affected spec

For each spec identified as affected in Step 3:

1. Identify the related source files (views, components, models, APIs, stores, validators, composables, tests) based on the spec's described feature.
2. Read the relevant files to understand the current implementation.
3. Determine what code changes are needed to align with the new requirement.

### Step 5 — Generate the refactor plan

1. Use the template: `docs/templates/SPEC_REFACTOR_TEMPLATE.md`
2. Create the output file at:
   - `docs/refactors/YYYY-MM-DD-{change-slug}/refactor-plan.md`
   - `{change-slug}` is a short kebab-case identifier derived from the change name/topic
   - `YYYY-MM-DD` is today's date
   - Create the directory if it does not exist
3. Fill in all sections:
   - Change summary
   - Affected specs (per-spec: what needs to change)
   - Affected code (per-spec: which files, what changes)
   - Unaffected specs (briefly note why)
   - Assumptions / open questions

## Important constraints

- **You MUST read all `general.md` files** under `docs/specs/` before concluding which specs are affected. Do not guess.
- **You MUST read the actual code** for each affected spec before describing code changes. Do not assume based on spec text alone.
- Do not modify any existing spec file or code file. This command produces a **plan only**.
- Keep the plan actionable: each code change entry should reference a specific file path and describe the change concisely.
- If a spec has both `general.md` and `fe.md`, note changes needed in both where applicable.