# Detailed Questions

## Q1: Single basic UI element?

**What qualifies:** One HTML element wrapper, no composition of other components, minimal state, pure presentation.

**Examples:** Button, Input, Label, Badge, Icon, Avatar, Separator, Card (base)

**Decision:** `atoms/`

---

## Q2: Purely layout/spacing?

**What qualifies:** Provides structure only — no business logic, no data display. Uses CSS for layout.

**Examples:** PageContainer, ContentWrapper, Grid, Stack (vertical/horizontal), Center

**Decision:** `box/`

---

## Q3: Combines 2+ atoms into reusable pattern?

**What qualifies:** Uses multiple atoms together, creates a cohesive pattern, has some internal logic (validation, formatting). Does NOT fetch data.

**Examples:** SearchInput, FormField, UserAvatar with badge, StatCard

**Decision:** If no data fetching → `molecules/`

---

## Q4: Fetches data or has complex business logic?

**What qualifies:** API calls, Vue Query hooks, significant state, auth logic.

**Examples:** UserSelector, ChartWidget, NotificationPanel

**Decision:** Continue to Q6 (check reusability)

---

## Q5: Complex with data fetching or significant logic?

**What qualifies:** Multiple sub-components, complex state, not just presentation.

**Examples:** DataTable with sort/filter, RichTextEditor, FileUploader with preview

**Decision:** Continue to Q6

---

## Q6: Reused across multiple features?

**What qualifies:** Used in 2+ different feature modules, generic enough, configurable via props.

**Reusable examples:** UserSelector (teams, projects, tasks), DateRangePicker, DataTable

**Not reusable:** Only used in one feature, feature-specific logic

**Decision:** Reusable → `organisms/` | Not reusable → `containers/{feature}/components/`

---

## Q7: Specific to one feature?

**What qualifies:** Only used in one module, contains feature-specific logic, tightly coupled to feature.

**Examples:** UserForm, OrderSummary, ProjectSettings

**Decision:** `containers/{feature}/components/`
