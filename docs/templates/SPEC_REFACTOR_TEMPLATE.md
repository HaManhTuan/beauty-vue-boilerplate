# Spec Refactor Plan

<!--
  HOW TO USE THIS TEMPLATE
  ========================
  This file is the output of the /spec-refactor command.
  It is a READ-ONLY plan — do not edit specs or code directly here.
  Use this plan as a checklist when executing the actual refactor work.

  Sections at a glance:
    1  Overview       — what changed and why
    2  Change Summary — human-readable description
    3  Open questions — gaps to resolve before starting work
    4  Affected Specs — per spec: spec changes (general.md) + code changes
    5  Unaffected     — specs reviewed but not impacted
    6  Order          — recommended execution order
    7  Checklist      — done-criteria to tick off as you go
-->

---

## 1. Overview

- **Plan created at**: (YYYY-MM-DD HH:mm, timezone)
- **Change title**: (short name for this requirement change)
- **Change source**: (written description inline / path to source doc)
- **Goal**: (what this change achieves — one or two sentences)
- **Scope**: (which features / domains are in scope)
- **Out of scope**: (what is explicitly NOT touched)

---

## 2. Change Summary

<!--
  Describe the requirement change in plain language.
  Include: what is different from before, why the change is needed,
  and what the system should do after the refactor.
  Keep it to 3–6 sentences.
-->

(Write summary here.)

---

## 3. Assumptions / Open questions

<!--
  List anything that is unclear or needs confirmation before work starts.
  Do not skip this section — unresolved questions cause rework.
-->

- **Q1**: (question)
  - **Status**: TBD / (answer if already known)
- **Q2**: (question)
  - **Status**: TBD / (answer if already known)

---

## 4. Affected Specs

<!--
  One sub-section per affected spec.
  Each spec block has exactly two parts:
    1. general.md — spec-level changes (requirements, rules, user stories)
    2. Code        — source files that need to change for this feature

  Duplicate the block for each affected spec.
-->

### [NNN-feature-name] `docs/specs/NNN-feature-name/general.md`

**Why affected**: (which part of this spec is now incorrect or incomplete because of the change)

#### `general.md`

<!--
  List every section in general.md that needs to be updated.
  Use "Current" / "Change to" to make the delta immediately clear.
-->

- **Section {N}: {Section Title}**
  - **Current**: (what it currently says — paste key phrase or summarize)
  - **Change to**: (what it should say after the update)

- **Section {N}: {Section Title}**
  - **Current**: (...)
  - **Change to**: (...)

#### Code

<!--
  List every source file that needs to change for this feature.
  "Required change" must be specific enough to act on without re-reading the spec.
-->

- **`src/path/to/file.ts`** — (model / API core / API hook / view / component / store / validator / composable / test)
  - **Current**: (what the code currently does that is relevant)
  - **Change**: (exactly what to add / remove / modify — field names, conditions, return values)
  - **Impact**: low / medium / high — (reason)

- **`src/path/to/file.vue`** — (type)
  - **Current**: (...)
  - **Change**: (...)
  - **Impact**: (...)

---

### [NNN-feature-name-2] `docs/specs/NNN-feature-name-2/general.md`

**Why affected**: (...)

#### `general.md`

- **Section {N}: {Section Title}**
  - **Current**: (...)
  - **Change to**: (...)

#### Code

- **`src/path/to/file.ts`** — (type)
  - **Current**: (...)
  - **Change**: (...)
  - **Impact**: (...)

---

## 5. Unaffected Specs

<!--
  List every spec that was reviewed but does NOT need to change.
  A brief reason confirms it was checked, not skipped.
-->

| Spec | Reason not affected |
|---|---|
| `NNN-feature-name` | (e.g., unrelated domain / already implements the new rule) |
| `NNN-feature-name-2` | (e.g., no UI or data flow touched by this change) |

---

## 6. Recommended Execution Order

<!--
  Order the work to avoid circular dependencies and reduce rework.
  Shared / low-level changes (models, validators) always come first.
-->

1. (e.g., Update shared validators / models — depended on by everything below)
2. (e.g., Update API cores and mutation hooks)
3. (e.g., Update views / components — one feature at a time)
4. (e.g., Update or add unit tests for changed logic)
5. (e.g., Update spec files: general.md for each affected spec)

---

## 7. Done Checklist

<!--
  Tick each item as you complete the refactor.
  Do not mark the task done until all items are checked.
-->

- [ ] All affected `general.md` files updated to reflect the new requirement.
- [ ] All listed code files changed as described in section 4.
- [ ] Unit tests updated or added for changed logic (when a test runner is configured in `package.json`).
- [ ] Existing tests still pass (e.g. `pnpm test:run` — add script first if missing).
- [ ] Lint passes with no new errors (`pnpm lint`; use `pnpm lint:fix` only when auto-fix is desired).
- [ ] Typecheck + production build succeeds (`pnpm build`).
