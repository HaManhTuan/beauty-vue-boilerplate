# Feature Spec Template (Frontend)

**Boilerplate alignment:** Paths and behaviors below must match this repo: `src/views/{module}/`, **`src/components/ui/`** (primitives) + **`src/components/molecules/`**, `src/apis/cores/` + `src/apis/services/`, Axios via `apiClient`, TanStack Form + `src/lib/validators`, and `.cursor/rules/` + root `.cursorrules` (list/search/table/modals/money).

## 1. Overview

- **Spec created at**: (YYYY-MM-DD HH:mm, timezone)
- **Feature name**:
- **Related master spec**: (link to `docs/specs/NNN-<feature-name>/general.md`)

## 2. Assumptions / Open questions

- **Example Q1**: What is the expected behavior when API call fails?  
  - **Answer**: Show error toast and keep form data intact for retry.
- **Example Q2**: Should the form auto-save draft?  
  - **Answer**: No, user must explicitly save.
- **Example Q3**: What is the default page size and which sizes are offered?  
  - **Answer**: Default **25**; options **10 / 25 / 50 / 100** (unless product overrides).

## 3. Summary

- **Content summary**: (Summary of analyzed requirements, key decisions, and frontend implementation approach)

## 4. Scope (Frontend)

**Overview**: Define what is included and excluded from the frontend implementation scope.

- **In scope (FE)**:
- **Out of scope (FE)**:

## 5. UX / UI

**Overview**: Document all user interface requirements, flows, states, and design considerations for each page/screen in the feature.

**Screen messages:** For empty states, success toasts, and API-related errors, reuse copy from [common_messages.md](./common_messages.md) unless the product explicitly requires different wording; add a per-screen **Screen messages** table where helpful.

### Pages

| Page Name | Route | Description |
|---|---|---|
| {page-name-1} | `/feature/list` | Brief description of what this page does |
| {page-name-2} | `/feature/detail/:id` | Brief description of what this page does |

### Page Details: {page-name-1}

**Route**: `/feature/list`

**Layout Structure**:
- **Header Section**: 
  - Breadcrumb navigation
  - Page title: "Feature List"
  - Action buttons: "Create New", "Export"
  - Search/Filter bar (if applicable)
- **Main Content Area**:
  - Filters/Sorting controls (top/left sidebar)
  - Data table/list with pagination
  - Empty state (when no data)
  - Loading state (skeleton/spinner)
- **Footer**: Pagination controls (if not in main area)

**User Flows**:
1. **Initial Load**: Page loads → API call to fetch data → Display loading → Show results or empty state
2. **Search/Filter**: User sets criteria → **Search** button or **Enter** in a filter field triggers API call → Same params still refetches on each search → Loading during request
3. **Pagination**: User changes page or page size → API call with updated params → Update results
4. **Action Click**: User clicks "Create New" (or route action) → Navigate or open create flow
5. **Open detail**: User uses the dedicated **detail** (or equivalent) control — **do not** open detail by clicking the table row (project table rule)

**Interactive Elements**:

| Element | Component Strategy | Implementation Notes |
|---|---|---|
| Search input | Reuse `Input` (or project `SearchForm`) | Trigger search via **Search** + **Enter**; refetch on every search action |
| Filter dropdowns | Reuse `Select` component | Multi-select for categories, single-select for status |
| Sort buttons | Create `SortButton` molecule | Toggle asc/desc, show current sort state |
| Action buttons | Reuse `Button` component | Primary for "Create", secondary for "Export" |
| Table | Reuse table / column patterns | Fixed column widths; ellipsis + tooltip for long text; empty copy **No matching records found.**; row click does **not** open detail |

### Page Details: {page-name-2}

**Route**: `/feature/detail/:id`

**Layout Structure**:
- **Header Section**: 
  - Breadcrumb: "Home > Feature List > Item Details"
  - Page title: dynamic from API data
  - Action buttons: "Edit", "Delete", "Back"
- **Content Sections**:
  - Info cards/sections for different data groups
  - Form sections (read-only mode)
  - Related data tables (if applicable)
- **Footer**: Action buttons (if needed)

**User Flows**:
1. **Initial Load**: Page loads with ID → API call to fetch data → Display loading → Show data or error
2. **Edit Mode**: User clicks "Edit" → Switch to edit mode → Form validation → Save changes
3. **Delete Action**: User clicks "Delete" → Confirmation modal → API delete call → Navigate back
4. **Navigation**: User clicks "Back" → Navigate to list page

**Interactive Elements**:

| Element | Component Strategy | Implementation Notes |
|---|---|---|
| Edit/Save/Cancel buttons | Reuse `Button` component | State-dependent styling (primary/secondary) |
| Form inputs | Reuse `Input`, `Select` components | Validation states, error messages |
| Delete confirmation modal | Create `ConfirmDialog` molecule | Reusable for all delete actions |
| Loading states | Reuse `Skeleton` component | For form submissions and data loading |
| Success/error toasts | Reuse existing toast system | Via composable or global store |

## 6. Components & structure

**Overview**: Identify and document all components, pages, and reusable patterns needed for the feature implementation. For each component/page, specify its purpose, location, and interface (props for components).

### Components to create/update

#### Component: {component-name}

- **Purpose**: (what this component is used for, its role in the feature)
- **Location**: `src/components/{ui|molecules}/{component-name}/` — shared primitives live under **`ui/`**; feature-only modals/forms often live under `src/views/{module}/` per `AGENTS.md` / `.agents/rules/structure.md`
- **Type**: (**ui** primitive / **molecule**; avoid a parallel `containers` layer — use **views** for feature screens)
- **Props**:

| Prop Name | Type | Required | Default | Description |
|---|---|---|---|---|
| `example` | `string` | Yes | - | Description of what this prop does |
| `onClick` | `() => void` | No | - | Callback function when clicked |

#### Component: {component-name-2}

- **Purpose**: (what this component is used for)
- **Location**: `src/components/{ui|molecules}/{component-name-2}/`
- **Type**: (ui primitive / molecule)
- **Props**:

| Prop Name | Type | Required | Default | Description |
|---|---|---|---|---|
| `example` | `string` | Yes | - | Description of what this prop does |

### Pages to create/update

#### Page: {page-name}

- **Purpose**: (what this page is used for, its role in the feature)
- **Location**: `src/views/{module}/{PageName}.vue` (prefer module folder; avoid `src/containers/` unless the repo explicitly adds it)
- **Route**: (e.g., `/feature/list`)
- **Key responsibilities**: (what this page handles - data fetching, state management, etc.)

#### Page: {page-name-2}

- **Purpose**: (what this page is used for)
- **Location**: `src/views/{module}/{PageName-2}.vue`
- **Route**: (e.g., `/feature/detail/:id`)
- **Key responsibilities**: (what this page handles)

### Reusable UI patterns

- **Pattern 1**: (description of reusable pattern)
- **Pattern 2**: (description of reusable pattern)

### Forms (create / edit)

- Use **TanStack Form** (`@tanstack/vue-form`) for form state; validators from **`src/lib/validators`** (extend `src/lib/validators/index.ts` before inventing one-off rules).
- **Submit** stays enabled except while submitting; validate the **whole** form on submit; validate on **change** with inline errors; follow modal rules in `.cursorrules` (`DialogContent` `closeOnClickOutside` / `closeOnEscape` for CRUD forms).

## 7. Data

**Overview**: Define how data flows through the application, where state is managed, and how forms and data updates are handled. Reference data structures from the general spec and document frontend-specific data requirements.

### Data items (from general spec)

| Data ID | Name | Type | Optional | Purpose / Description |
|---|---|---|---|---|
| `data-1` | `exampleData` | `Array<Item>` | No | List of items to display in the table |
| `data-2` | `formData` | `FormData` | No | Form input data for creating/editing |
| `data-3` | `filterState` | `FilterState` | Yes | Current filter values for list view |

### API data types

Define data types used for API communication (GET, POST, PUT, DELETE requests/responses).

#### Data type: {data-type-name}

- **Used for**: (GET / POST / PUT / DELETE endpoint name)
- **Type**: (TypeScript type definition)
- **Validation**: (validation rules, required fields, format constraints)

Example:
- **Used for**: GET `/api/items` response
- **Type**: 
  ```typescript
  interface Item {
    id: string;
    name: string;
    status: 'active' | 'inactive';
  }
  ```
- **Validation**: `id` is required, `name` max length 100, `status` must be one of the enum values

#### Data type: {data-type-name-2}

- **Used for**: (API endpoint name)
- **Type**: (TypeScript type definition)
- **Validation**: (validation rules)

## 8. API

**Overview**: List all API endpoints necessary to complete the feature, including their purpose, request/response structures, and handling requirements.

### API endpoints

#### API-1: {endpoint-name}

- **Method**: `GET` / `POST` / `PUT` / `DELETE` / `PATCH`
- **Path**: `/api/endpoint/path`
- **Authentication**: (yes/no, what type of auth required)
- **Purpose**: (what this API is used for in the feature)
- **Request**:
  - **Body**: (request body structure, if applicable)
  - **Query params**: (query parameters, if applicable)
  - **Path params**: (path parameters, if applicable)
- **Response**:
  - **Success**: (response structure on success)
  - **Error**: (error response structure)
- **Pagination**: (yes/no, how pagination is handled)
- **Filtering/Sorting**: (yes/no, how filtering/sorting is handled)
- **Error handling**: (how errors are displayed/handled in UI)

#### API-2: {endpoint-name-2}

- **Method**: `GET` / `POST` / `PUT` / `DELETE` / `PATCH`
- **Path**: `/api/endpoint/path-2`
- **Authentication**: (yes/no, what type of auth required)
- **Purpose**: (what this API is used for)
- **Request**:
  - **Body**: (request body structure)
  - **Query params**: (query parameters)
  - **Path params**: (path parameters)
- **Response**:
  - **Success**: (response structure on success)
  - **Error**: (error response structure)
- **Pagination**: (yes/no, how pagination is handled)
- **Filtering/Sorting**: (yes/no, how filtering/sorting is handled)
- **Error handling**: (how errors are displayed/handled in UI)

## 9. Permissions & feature gating (Frontend)

**Overview**: Define visibility rules, action permissions, and feature flag requirements for frontend implementation.

### Permissions matrix

| Feature/Page/Component | Permission | Actor(s) | Description |
|---|---|---|---|
| Feature: {feature-name} | `VIEW` | `admin`, `editor` | Can view the feature |
| Page: {page-name} | `CREATE` | `admin` | Can create new items |
| Component: {component-name} | `EDIT` | `admin`, `editor` | Can edit items (example: scope per role in spec) |
| Component: {component-name} | `DELETE` | `admin` | Can delete items |

> **Example only:** Demo roles in this repo are `admin` / `editor` — replace actor lists when the product uses different roles; see **`docs/project-overview.md` §2**.

### Feature flags

| Flag Name | Default Behavior | Description |
|---|---|---|
| `feature.{feature-name}` | `false` | Enable/disable the entire feature |
| `feature.{feature-name}.advanced` | `false` | Enable advanced features |

## 10. Analytics / tracking (if applicable)

**Overview**: Document analytics events and properties to track user interactions and feature usage.

- **Events**:
- **Properties**:

## 11. Acceptance criteria (Frontend)

**Overview**: Define clear, testable criteria that must be met for the frontend implementation to be considered complete.

- [ ] Routes and copy match this section; list/table/filter/money behavior matches `.cursor/rules/` (e.g. filter/search, table list, money display).
- [ ] Data access goes through `src/apis/services/**` hooks only (no direct `axios` in views).
- [ ] `pnpm lint` and `pnpm build` succeed for the delivered changes.
 
