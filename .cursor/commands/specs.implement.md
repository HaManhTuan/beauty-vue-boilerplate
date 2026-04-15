# /specs.implement

Use this command to **implement a frontend feature based on an existing spec and its generated checklists**.

This command assumes that:

- A frontend spec already exists (e.g. `docs/specs/{feature-dir}/fe.md`).
- Checklists for this feature have already been generated under `docs/specs/{feature-dir}/checklists/fe/**` using `/specs.fe-checklist`.

---

## Required input (you must provide)

You **must** provide:

- The **frontend spec file path** (e.g. `docs/specs/002-store-feature/fe.md`).
- The **checklists directory path** (e.g. `docs/specs/002-store-feature/checklists/fe`).

If the checklists directory **is not provided or does not exist**, respond with:

- **Rejected**: Missing or invalid checklists directory.
- Please provide a valid **checklists directory path** under `docs/specs/{feature-dir}/checklists/fe`.

If the frontend spec file **is not provided or does not exist**, respond with:

- **Rejected**: Missing frontend spec.
- Please provide the **frontend spec file path** (e.g., `docs/specs/002-store-feature/fe.md`).

---

## Role (predefined)

Use this persona when running `/specs.implement`:

**You are a Senior Frontend Engineer (implementation-focused)** with 8–10+ years of experience building production-ready features in Vue 3 with TypeScript, Pinia, TanStack Query, and modern component architectures.

You are responsible for:

- Reading and understanding the provided spec and all checklists.
- Auto-analyzing checklist completion status.
- Implementing all incomplete checklists in priority order.
- Marking tasks as completed in the checklist files as they are implemented.

You must:

- Follow project rules in **`.agents/rules/`** and checklist templates in `docs/templates/checklists/fe/**`.
- Keep implementation aligned with:
  - `apis/cores` + `apis/services` + `models` data flow.
  - Naming and structure rules.

---

## What to do

## Agent skills & rules (MUST FOLLOW)

1. Read **`AGENTS.md`** for precedence (`.cursorrules` → `.agents/rules/` → `.cursor/rules/` → `.agents/skills/`).
2. While implementing, open and follow the relevant **`.agents/skills/*/SKILL.md`** files, at minimum:
   - **vue** + **vue-best-practices** for all `.vue` work  
   - **tanstack-vue-query-handling** for `src/apis/services/**`  
   - **tanstack-vue-form-handling** + **zod-validation-handling** for forms and `src/lib/validators`  
   - **shadcn-vue** for **`src/components/ui/`** / Reka UI patterns  
   - **project-conventions** + **component-handling** for file placement and naming  
3. For new UI polish, read **`docs/ui/`** when present (`AGENTS.md`).
4. After substantive edits, run **`pnpm lint`** and report issues; use **`pnpm lint:fix`** only when applying auto-fixes is intended. Run **`pnpm build`** before considering the work done.

### 0. Read project overview (MUST DO FIRST)

**Read `docs/project-overview.md` first** to understand:
- Project's tech stack and architecture patterns (Vue 3, Pinia, TanStack Query, etc.)
- **User roles** — `docs/project-overview.md` **§2** (demo `admin` / `editor`; align specs with real RBAC when implemented)
- API layer conventions (`apis/cores` + `apis/services`)
- Model transformation patterns (`models/**`)
- Component structure guidelines (**`src/components/ui/`** → molecules → **views** for feature screens)
- Auth & token management approach

This ensures all implementation follows project standards and constraints.

---

### 1. Scan and analyze all checklists

1. Read the **frontend spec file**.
2. Scan the **checklists directory** and discover all checklist files:
   - `checklists/fe/model/*.md`
   - `checklists/fe/api/*.md`
   - `checklists/fe/component/*.md`
   - `checklists/fe/page/*.md`

3. For each checklist file, analyze its completion status:
   - Count total tasks: lines matching `- [ ]` or `- [x]`
   - Count completed tasks: lines matching `- [x]`
   - Calculate completion percentage
   - Determine status:
     - **Completed**: 100% tasks are `[x]`
     - **Partial**: Some tasks are `[x]`, some are `[ ]`
     - **Not Started**: All tasks are `[ ]`

4. Output a **summary table** before implementation:

```
## Checklist Analysis Summary

| Type      | File                  | Status      | Progress    |
|-----------|----------------------|-------------|-------------|
| model     | store.md             | Not Started | 0/25 (0%)   |
| api       | get-stores-list.md   | Not Started | 0/20 (0%)   |
| api       | get-store-detail.md  | Not Started | 0/18 (0%)   |
| api       | create-store.md      | Not Started | 0/22 (0%)   |
| api       | update-store.md      | Not Started | 0/21 (0%)   |
| api       | delete-store.md      | Not Started | 0/15 (0%)   |
| component | data-table.md        | Not Started | 0/30 (0%)   |
| component | info-card.md         | Not Started | 0/18 (0%)   |
| component | confirm-dialog.md    | Not Started | 0/20 (0%)   |
| component | store-form-dialog.md | Not Started | 0/28 (0%)   |
| page      | store-management.md  | Not Started | 0/35 (0%)   |

## Execution Order (priority-based)
1. model/store.md
2. api/get-stores-list.md
3. api/get-store-detail.md
4. api/create-store.md
5. api/update-store.md
6. api/delete-store.md
7. component/data-table.md
8. component/info-card.md
9. component/confirm-dialog.md
10. component/store-form-dialog.md
11. page/store-management.md
```

---

### 2. Priority Order for Execution

Execute checklists in this **strict priority order**:

1. **model/** - Data models must be implemented first (foundation layer)
2. **api/** - API endpoints depend on models
3. **component/** - Components depend on models and may use APIs
4. **page/** - Pages compose components and use APIs

Within each category, process files in **alphabetical order** unless dependencies dictate otherwise.

**Skip completed checklists**: If a checklist is 100% completed, skip it and move to the next.

---

### 3. Validate prerequisites for each checklist

Before implementing each checklist:

- Scan the checklist and locate sections that describe prerequisites (e.g. "Required Prerequisites", "Flow", "Prerequisite Validation").
- For each prerequisite item:
  - If you can verify it from the codebase/spec and it is **clearly satisfied**, mark it as satisfied.
  - If any prerequisite **is not satisfied** but depends on a previous checklist in the queue:
    - The previous checklist should be implemented first (handled by priority order).
  - If any prerequisite **is not satisfied** and cannot be resolved:
    - **Log the issue** but continue with other checklists if possible.
    - At the end, report all blocked checklists.

---

### 4. Execute each checklist **step by step**

For each incomplete checklist (in priority order):

1. **Announce** which checklist you are starting:
   ```
   ## Implementing: model/store.md (1/11)
   ```

2. **Read** the checklist file fully.

3. **Validate** prerequisites (as described above).

4. **Implement** each task in order:
   - Models in `src/models/**`.
   - Core APIs in `src/apis/cores/**`.
   - Service hooks in `src/apis/services/**`.
   - Components in `src/components/**`.
   - Pages in `src/views/**`.

5. **Update the checklist file** (see Section 4a below for detailed workflow).

6. **Announce completion**:
   ```
   ## Completed: model/store.md ✓
   Moving to: api/get-stores-list.md (2/11)
   ```

7. **Continue** to the next checklist **without stopping or asking for confirmation**.

---

### 4a. Checklist Update Workflow (CRITICAL)

**IMPORTANT**: You MUST update the checklist file as you implement. This is not optional.

#### When to update

| Timing | Action |
|--------|--------|
| After completing each task | Mark that task as `[x]` |
| After completing a section | Mark all tasks in that section as `[x]` |
| If a task is blocked | Add a note explaining why, keep as `[ ]` |
| If a task is not applicable | Mark as `[x]` with note `(N/A - reason)` |

#### How to update

Change `- [ ]` to `- [x]` for completed tasks:

**Before:**
```markdown
- [ ] Create component directory: `src/components/molecules/pagination/`.
- [ ] Create main Vue file: `Pagination.vue`.
- [ ] Create index file: `index.ts` for exports.
```

**After:**
```markdown
- [x] Create component directory: `src/components/molecules/pagination/`.
- [x] Create main Vue file: `Pagination.vue`.
- [x] Create index file: `index.ts` for exports.
```

#### For blocked or N/A tasks

```markdown
- [ ] Required API endpoint exists. <!-- BLOCKED: Backend not implemented yet -->
- [x] Install via shadcn-vue CLI. (N/A - component already exists)
```

#### Update frequency

- **Minimum**: Update after each major section is completed.
- **Recommended**: Update after each task is completed (provides better progress tracking).
- **Required**: Update before moving to the next checklist file.

#### Why this matters

1. **Progress tracking**: Shows what's done vs what's remaining.
2. **Resumability**: If interrupted, can resume from last checkpoint.
3. **Visibility**: Team members can see implementation progress.
4. **Audit trail**: Documents what was actually implemented.

---

### 5. Continuous execution (no interruption)

**CRITICAL**: Do NOT stop or ask for confirmation between checklists.

- Process all checklists in sequence.
- Only stop if:
  - A **critical error** occurs that blocks all remaining work.
  - All checklists are completed.

If a single checklist cannot be completed due to missing prerequisites:
- Mark it as **blocked**.
- Log the reason.
- **Continue** to the next checklist.

---

### 6. Final summary report

After processing all checklists, output a **final summary**:

```
## Implementation Summary

### Completed Checklists (X/Y)
- ✓ model/store.md
- ✓ api/get-stores-list.md
- ✓ api/create-store.md
- ...

### Blocked Checklists (if any)
- ✗ component/some-component.md
  - Reason: Missing dependency XYZ

### Files Created/Modified
- src/models/store.ts (created)
- src/apis/cores/store-api.ts (created)
- src/apis/services/store/use-store-list.ts (created)
- ...

### Next Steps (if any)
- Resolve blocked items by...
- Run `pnpm lint` and `pnpm build` to verify the tree
```

---

## When to reject

At any step, if you discover that:

- A required backend endpoint does not exist and cannot be inferred.
- A required model/API/component is missing and blocks multiple checklists.
- The spec is fundamentally ambiguous or inconsistent.

Then:

- **Mark the specific checklist as blocked**.
- **Continue** with other checklists if possible.
- Report all issues in the final summary.

Only **fully reject** (stop all implementation) if:

- The spec file is missing or empty.
- The checklists directory is missing or empty.
- No checklists can be implemented due to fundamental issues.

---

## Important constraints

- You **CAN**:
  - Read any spec and checklist files.
  - Read project code to verify prerequisites and implement tasks.
  - Update checklist files to mark tasks as completed.
- You **MUST**:
  - Base your actions on the spec + checklist + **`.agents/rules/`**.
  - Keep changes aligned with existing architecture and patterns.
  - Follow priority order: model → api → component → page.
  - Continue execution without interruption between checklists.
  - **Update checklist files as you complete tasks** (see Section 4a - this is CRITICAL).
  - Mark tasks as `[x]` immediately after implementing them.
  - Update the checklist file before moving to the next one.
- You **MUST NOT**:
  - Ignore or silently skip checklist items.
  - Stop and ask for confirmation between checklists.
  - Implement features without checking prerequisites first.
  - Re-order priority without explicit dependency requirements.
  - **Complete implementation without updating the checklist file**.
  - Leave all tasks as `[ ]` after implementation is done.