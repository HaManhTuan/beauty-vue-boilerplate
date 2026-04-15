# Feature Spec Template

## 1. Overview

- **Spec created at**: (YYYY-MM-DD HH:mm, timezone)
- **Feature name**:
- **Goal / problem statement**:
- **In scope**:
- **Out of scope**:
- **Success metrics**:
- **Implementation stack (this repo)** — confirm against root `package.json` when writing acceptance criteria:
  - Vue 3 + TypeScript + Vite; Vue Router + Pinia; Tailwind + shadcn-vue / Reka UI
  - TanStack Vue Query, Vue Form, Vue Table; Zod; Axios (`src/plugins/httpClient.ts`, `VITE_API_BASE_URL`)
  - Optional: Supabase client (`VITE_SUPABASE_*`); package manager **pnpm**

## 2. Inputs (Source of truth)

- **Figma**:
- **Docs**:
- **Screen messages / shared UI copy (optional):** [common_messages.md](./common_messages.md)
- **Requester summary**:

## 3. Assumptions / Open questions

- **Example Q1**: What user roles can access this feature?  
  - **Answer**: `admin` and `editor` can view; only `admin` can delete (replace with your product RBAC).
- **Example Q2**: Is this feature behind a feature flag?  
  - **Answer**: Yes — gated by `feature.<feature_name>` and enabled per tenant.
- **Example Q3**: What is the required response time for key actions?  
  - **Answer**: P95 < 300ms for reads; P95 < 800ms for writes (excluding third-party latency).

## 4. Analysis process (how this spec was derived)

- **Inputs reviewed**: (links, screenshots, notes)
- **Research performed**: (similar features, existing constraints, comparable flows)
- **Key decisions & rationale**: (trade-offs, why this approach)
- **Open items to validate**: (what still needs confirmation)

## 5. Actors & Permissions

- **Instruction**: Analyze the feature flows first and propose the roles + permission rules. If you cannot determine this from inputs, **ask the requester** to confirm roles and access rules.

> **Example only (NOT default)**: Replace this matrix with the real actors/actions for the requested feature.  
> **Boilerplate note:** In-repo demo roles today are `admin` / `editor` (`src/stores/auth.ts`); see **`docs/project-overview.md` §2** when aligning specs with code.

| Action      | admin | editor |
| ----------- | ----: | -----: |
| View List   |  True |   True |
| View Detail |  True |   True |
| Create      |  True |  False |
| Update      |  True |   True |
| Delete      |  True |  False |

## 6. User stories / Use cases

- **Instruction**: List **all** use cases as completely as possible, including:
  - actors/roles, permissions, and entry points
  - happy path + alternate paths
  - error/validation states
  - empty states and boundary cases
  - integrations (3rd-party, internal services) and failure modes

- **Example (format)**
  - **UC-01 — View list**
    - **Actor**: `admin` or `editor`
    - **Preconditions**: User is authenticated; has `VIEW_<RESOURCE>` permission
    - **Trigger**: Navigate to `<Feature>` page
    - **Main flow**: System loads list → user filters/sorts → user opens an item
    - **Alternate flows**: Pagination; saved filters; deep-link with query params
    - **Error/edge**: API timeout; unauthorized; empty list; invalid query params

  - **UC-02 — Create**
    - **Actor**: `admin`
    - **Preconditions**: Has `CREATE_<RESOURCE>` permission
    - **Main flow**: Open create form → fill fields → submit → success toast → item appears in list
    - **Validation**: required fields; format constraints; uniqueness
    - **Error/edge**: duplicate; conflict; offline; partial failure with external integration

  - **UC-03 — Update**
    - **Actor**: `admin`; `editor` (limited fields, example)
    - **Main flow**: Open detail → edit allowed fields → submit → audit log recorded
    - **Error/edge**: concurrent update conflict; stale data; permission changed mid-session

  - **UC-04 — Delete / Archive**
    - **Actor**: `admin`
    - **Main flow**: Initiate delete → confirm → item removed/archived → list refreshes
    - **Error/edge**: cannot delete due to dependencies; soft-delete vs hard-delete rules

- 

## 7. Requirements

### 7.1 Functional requirements

- **Business rules & validations (example, keep it concise)**

| ID | Rule | Enforcement |
|---|---|---|
| BR-01 | `<field>` is required; max length N | API + Frontend |
| BR-02 | `<field>` format/constraints (e.g., regex, enum) | API + Frontend |
| BR-03 | Entity cannot be deleted when it has dependent records | API |

### 7.2 Non-functional requirements

- **Performance**:
- **Security / compliance**:
- **Observability** (logs/metrics/tracing):
- **Reliability**:

## 8. System design (high level)

- **Actors / systems involved**:
- **Data flow**:
- **Key components**:
- **Key integrations**:

## 9. Acceptance criteria

- **Note**: Acceptance criteria can include both **functional** and **non-functional** expectations.

### Checklist

- [ ] **Functional**: All core flows from “User stories / Use cases” are implemented (happy path + key alternates).
- [ ] **Functional**: Permissions match “Actors & Permissions” (UI + API enforcement where applicable).
- [ ] **Functional**: Validations/business rules are enforced (API + FE as specified).
- [ ] **Functional**: Error/empty/loading states are handled and meet expected UX.
- [ ] **Non-functional**: Meets agreed performance targets (e.g., P95 latency, pagination behavior).
- [ ] **Non-functional**: Security/compliance requirements met (authn/authz, tenancy, data handling).
- [ ] **Non-functional**: Observability in place (logs/metrics/tracing/alerts where applicable).
- [ ] **Non-functional**: Reliability expectations met (retries/timeouts/fallbacks where applicable).
- [ ] **Delivery (when this spec ships frontend in this repo)**: `pnpm lint` and `pnpm build` pass for the merged changes.

### Table (optional)

| ID | Type | Criteria | How to verify |
|---|---|---|---|
| AC-01 | Functional | `<criteria>` | `<test / steps / metric>` |
| AC-02 | Non-functional | `<criteria>` | `<benchmark / monitoring / logs>` |
