# Component Implementation Checklist

## Overview

Use this checklist when implementing a **new component** in `src/components/**`, following the rules in `.agents/rules/structure.md`, `naming.md` and project component guidelines.

**Component Name**: `{component-name}`  
**Type**: `{ui|molecules}` (use **`ui`** for shadcn-vue primitives under `src/components/ui/`)  
**Purpose**: `{brief description of component's role}`  
**Location**: `src/components/{type}/{component-name}/`  
**Related Frontend Spec**: `{path/to/fe/spec.md}`  
**Estimated Complexity**: `{Low|Medium|High}`  
**Reusable**: `{Yes|No - where it's used}`

---

## Required Prerequisites

Before implementing this component, ensure the following are completed:

### 1. Component Dependencies

- [ ] Required base **UI primitives** (`src/components/ui/`) are available or can be installed via shadcn-vue CLI.
- [ ] Required molecules (if this is a molecule) are available.
- [ ] Any required composables from `src/composables/**` exist.

### 2. Design System & Utilities

- [ ] Tailwind CSS is configured and available.
- [ ] Utility function `cn()` from `@/lib/utils` is available for conditional classes.
- [ ] Required icons from `lucide-vue-next` or other icon libraries are available.

---

## Flow: Check Before Creating Component

Because a component may already exist, follow this flow **before** creating anything new:

1. **Determine component type**
   - [ ] **Is this a module-specific form modal?** (e.g., `CategoryFormModal`, `StoreFormModal`, `ExpenseCategoryFormDialog`)
     - [ ] If **yes**: Component should be placed in `src/views/{module}/` directory, NOT in `src/components/molecules/`.
     - [ ] See `.agents/rules/structure.md` for details: "Module-specific form modals should be placed in `src/views/{module}/` directory, not in `src/components/molecules/`."
     - [ ] Only truly reusable, cross-module components should be in `src/components/molecules/`.
     - [ ] **Skip to section 2a** (Module-Specific Form Modal) if this applies.

2. **Check for existing component**
   - [ ] Search in `src/components/ui` for matching shadcn-vue primitives.
     - Use IDE search / grep for component name (e.g. `Button`, `Dialog`, `Tooltip`).
   - [ ] Search in `src/components/molecules` for an existing wrapper/composition.
     - Common reusable components to check:
       - Tables: `src/components/molecules/data-table`
       - Delete confirmations: `src/components/molecules/confirm-dialog`
       - Search forms: `src/components/molecules/search-form` (supports `field` prop for field-specific filtering)
       - Pagination: `src/components/molecules/pagination`
       - Other domain-specific molecules that may already exist.
   - [ ] Search in `src/views/{module}/` for module-specific components (if applicable).
   - [ ] If a suitable component already exists:
     - [ ] Evaluate if it fully meets the requirements:
       - [ ] If **yes**: Reuse it and **stop here**.
       - [ ] If **no** (needs modification):
         - [ ] Document the reason for modification:
           - [ ] Missing props needed for the new use case.
           - [ ] Logic needs to be extended (e.g. additional validation, new behavior).
           - [ ] UI needs to be adjusted (styling, layout changes).
         - [ ] Record the specific changes needed:
           - [ ] Props to add: `{list of props}`.
           - [ ] Logic to modify: `{description of changes}`.
           - [ ] UI adjustments: `{description of changes}`.
         - [ ] Proceed to section 2 (Molecule Component) or 2a (Module-Specific Form Modal) to extend the existing component.

3. **If component does not exist**
   - [ ] For **ui** primitives: Install via shadcn-vue CLI (see section 1 below).
   - [ ] For **molecules** (reusable): Create a new component file in `src/components/molecules/` (see section 2 below).
   - [ ] For **module-specific form modals**: Create in `src/views/{module}/` (see section 2a below).

---

## Implementation Checklist

## 1. UI primitive (from shadcn-vue)

**Goal**: Install base UI primitives using the shadcn-vue CLI. Files must live under **`src/components/ui/`** — do not hand-copy full primitive implementations.

Checklist:

- [ ] Confirm component is not already in `src/components/ui`.
- [ ] Install via CLI:
  ```bash
  pnpm dlx shadcn-vue@latest add <component-name>
  ```
- [ ] Verify generated files are under `src/components/ui/<component-name>/`.
- [ ] Confirm imports work from the module entry (`src/components/ui/<component-name>/index.ts` if present).
- [ ] Review generated component structure and adjust if needed (props, styling).

**Important**: Do **not** manually write full primitive components. Always use the shadcn-vue CLI.

---

## 2. Molecule Component (custom composition)

**Goal**: Create a reusable custom component that composes **`@/components/ui/*`** primitives and adds business logic or specific UI patterns.

**Important**: Only use this section for **truly reusable, cross-module components**. For module-specific form modals, see section 2a below.

Checklist:

- [ ] Create component directory: `src/components/molecules/{component-name}/`.
- [ ] Create main Vue file: `{component-name}.vue` (PascalCase).
- [ ] Create index file: `index.ts` for exports:
  ```ts
  export { default as ComponentName } from './ComponentName.vue'
  ```

---

## 2a. Module-Specific Form Modal (in views folder)

**Goal**: Create a module-specific form modal component that composes **`@/components/ui/*`** primitives and adds business logic.

**Important**: Module-specific form modals should be placed in `src/views/{module}/` directory, NOT in `src/components/molecules/`. See `.agents/rules/structure.md` for details.

Checklist:

- [ ] Create component file: `src/views/{module}/{ComponentName}.vue` (PascalCase).
- [ ] **Do NOT** create an `index.ts` file (not needed for module-specific components in views folder).
- [ ] Import directly in the parent page: `import ComponentName from './ComponentName.vue'` (relative import in same folder).
- [ ] Component should only be used within the same module (e.g., `ExpenseCategoryFormDialog` only used in `ExpenseCategoryManagement`).

---

## 2a. Extending Existing Molecule Component

**Goal**: Modify an existing molecule component to add new props, logic, or UI adjustments while maintaining backward compatibility.

**Prerequisite**: You have already documented the reason for modification in the Flow section above.

Checklist:

- [ ] Open the existing component file: `src/components/molecules/{component-name}/{component-name}.vue`.
- [ ] Review the current implementation to understand:
  - [ ] Existing props and their types.
  - [ ] Current logic and computed properties.
  - [ ] Template structure and styling.
- [ ] Plan the modifications:
  - [ ] **Adding new props**:
    - [ ] Add to `defineProps` interface with proper types.
    - [ ] Set default values if needed using `withDefaults`.
    - [ ] Ensure new props don't break existing usage.
  - [ ] **Extending logic**:
    - [ ] Add new computed properties if needed.
    - [ ] Extend existing methods or add new ones.
    - [ ] Add watchers if new props need reactive behavior.
  - [ ] **UI adjustments**:
    - [ ] Modify template to accommodate new props/logic.
    - [ ] Update Tailwind classes conditionally based on new props.
    - [ ] Ensure existing UI remains unchanged when new props use defaults.
- [ ] Implement changes:
  - [ ] Add new props following TypeScript best practices.
  - [ ] Extend logic without breaking existing functionality.
  - [ ] Update template with conditional rendering/styling.
- [ ] Verify backward compatibility:
  - [ ] Existing usages of the component still work without changes.
  - [ ] New props are optional or have sensible defaults.
- [ ] Update component documentation/comments if needed:
  - [ ] Document new props and their purpose.
  - [ ] Note any breaking changes (if any) in comments.

---

## 3. Component Structure (Vue SFC)

**Goal**: Set up the Vue Single File Component with proper structure, following Vue 3 Composition API patterns.

Checklist:

- [ ] Use `<script setup lang="ts">` for Composition API.
- [ ] Define component name using `defineOptions({ name: 'ComponentName' })`.
- [ ] Structure the template with semantic HTML elements.
- [ ] Add proper TypeScript types throughout.

Example structure:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ name: 'ComponentName' })

const props = withDefaults(defineProps<{ prop?: string }>(), {
  prop: 'default',
})

const emit = defineEmits<{
  change: [value: string]
}>()
</script>

<template>
  <div :class="cn('container', props.prop)">
    <!-- Component content -->
  </div>
</template>
```

---

## 4. Props & Emits

**Goal**: Define clear, typed props and emit events for parent-child communication.

Checklist:

- [ ] Define all props with proper TypeScript interfaces:
  - [ ] Use `defineProps<PropsInterface>()` or `withDefaults(defineProps<...>(), {...})`.
  - [ ] For complex props (objects, arrays), define full interfaces (not inline types).
- [ ] Set default values where appropriate using `withDefaults`.
- [ ] Document prop purposes in comments if needed.
- [ ] Define emit events with payload types:
  - [ ] Use `defineEmits<{ eventName: [payload: Type] }>()`.
  - [ ] For events with multiple payload values, use tuple types.

Example:

```ts
interface Props {
  label: string
  disabled?: boolean
  variant?: 'primary' | 'secondary'
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  variant: 'primary',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
  change: [value: string, id: number]
}>()
```

---

## 5. Template & Styling

**Goal**: Implement the component template with Tailwind CSS, responsive design, and accessibility.

Checklist:

- [ ] Use Tailwind CSS utility classes (no custom CSS unless absolutely necessary).
- [ ] **Check `src/style.css` before using inline Tailwind arbitrary values** (e.g., `w-[365px]`, `h-[40px]`):
  - [ ] If a reusable style exists in `style.css`, use the existing class
  - [ ] If a style doesn't exist but is reusable/common, add it to `style.css` in the `@layer utilities` section
  - [ ] Only use inline Tailwind arbitrary values for truly one-off, component-specific styles
- [ ] Use `cn()` utility for conditional classes:
  - [ ] Example: `:class="cn('base-class', { 'active-class': isActive })"`.
- [ ] Implement responsive breakpoints using Tailwind responsive prefixes (`sm:`, `md:`, `lg:`, etc.).
- [ ] Add interactive states:
  - [ ] Hover: `hover:bg-gray-100`.
  - [ ] Focus: `focus:ring-2 focus:ring-blue-500`.
  - [ ] Active: `active:scale-95`.
- [ ] Add accessibility attributes:
  - [ ] ARIA labels where needed (`aria-label`, `aria-describedby`).
  - [ ] Roles if semantic HTML is not sufficient.
  - [ ] Keyboard navigation support (tabindex, keyboard event handlers).

---

## 6. Component Logic (Composition API)

**Goal**: Implement component logic using Vue 3 Composition API best practices.

Checklist:

- [ ] Use `ref` for primitive reactive values:
  - [ ] Example: `const count = ref(0)`, `const isLoading = ref(false)`.
- [ ] Use `reactive` for object state (when needed):
  - [ ] Example: `const form = reactive({ name: '', email: '' })`.
  - [ ] If destructuring, use `toRefs` to maintain reactivity.
- [ ] Implement computed properties for derived state:
  - [ ] Example: `const displayName = computed(() => props.firstName + ' ' + props.lastName)`.
- [ ] Add watchers if needed:
  - [ ] Use `watch` or `watchEffect` appropriately.
- [ ] Use lifecycle hooks if needed:
  - [ ] `onMounted`, `onUnmounted`, etc.
- [ ] Import and use reusable composables from `src/composables/**` when applicable:
  - [ ] Example: `useMobile()`, `useCancelKeyboardGlobal()`.
- [ ] **For form components** (search forms, create/edit modals): Use **TanStack Form** (`useForm` from `@tanstack/vue-form`) for form state; do **not** use `reactive` + `toRefs` for form state when implementing forms. See `docs/examples/tanstack-form-example.vue` for reference.

Example (good practices):

```ts
// Good: ref for primitives
const count = ref(0)
const isLoading = ref(false)

// Good: reactive for objects
const form = reactive({
  name: '',
  email: '',
})

// Good: computed for derived values
const fullName = computed(() => `${form.name} ${form.email}`)

// Good: toRefs when destructuring reactive
const { name, email } = toRefs(form) // Maintains reactivity

// Avoid: Don't destructure reactive without toRefs
// const { name } = form // Loses reactivity!
```

---

## 7. User Interactions & Events

**Goal**: Handle user interactions, form validation, keyboard navigation, and loading/error states.

Checklist:

- [ ] Handle user interactions:
  - [ ] Click events: `@click="handleClick"`.
  - [ ] Input events: `@input`, `@change`.
  - [ ] Form submissions: `@submit.prevent="handleSubmit"`.
- [ ] Implement form validation if applicable:
  - [ ] Use validation schema **from the shared file** `src/lib/validators` (import field or form schemas). If a rule you need does **not** exist there, **add it to `src/lib/validators/index.ts` first**, then use it in the component. Do **not** define validation schema inline in the component when an equivalent rule exists or can be added to the shared file.
  - [ ] Use the `*Schema` suffix for shared field validators (e.g. `phoneSchema`, `emailSchema`, `postalCodeSchema`) so they are not confused with form field names (e.g. `formValues.phone`, `formValues.email`).
  - [ ] Client-side validation before emitting/submitting (e.g. TanStack Form `onChange` + full validation `onSubmit` per project form rules).
  - [ ] Display validation errors appropriately (inline under fields).
- [ ] Add keyboard navigation support:
  - [ ] Tab order is logical.
  - [ ] Enter/Space for button actions.
  - [ ] Escape to close dialogs/modals.
- [ ] **For Dialog components**, handle click outside and ESC key behavior:
  - [ ] Use `DialogContent` from `@/components/ui/dialog` (add via shadcn-vue CLI if missing).
  - [ ] Set `closeOnClickOutside` prop appropriately:
    - [ ] For non-critical dialogs: `closeOnClickOutside={true}` (default) so dialog closes when clicking outside.
    - [ ] For **important forms (create/edit)**: `closeOnClickOutside={false}` so dialog does **not** close when clicking outside.
  - [ ] Set `closeOnEscape` prop appropriately:
    - [ ] For non-critical dialogs: `closeOnEscape={true}` (default) so dialog closes when pressing ESC.
    - [ ] For **important forms (create/edit)**: `closeOnEscape={false}` so dialog does **not** close when pressing ESC.
  - [ ] Clear form data and validation when dialog closes (in `handleOpenChange` or watcher).
  - [ ] Use `showCloseButton` prop to control close button visibility if needed.
- [ ] Handle loading/error states:
  - [ ] Show loading indicators during async operations.
  - [ ] Display error messages when operations fail.
  - [ ] Provide retry mechanisms if appropriate.
- [ ] **Edit mode submit (project rule)**:
  - [ ] Do **not** disable submit when the user has made no changes in edit mode; **Submit** stays enabled except while `isSubmitting`.
  - [ ] You may still track `hasFormChanges` for **discard-on-close** or **unsaved** warnings only — not for disabling the primary submit button.
- [ ] **Common dialog form behavior (for create/edit components)**:
  - [ ] Validate on **change**; after submit attempt or when a field is **touched**, show inline errors; clear when valid.
  - [ ] On **Submit**, validate the **entire** form.
  - [ ] Use `isFormValid` only inside submit handlers / to decide whether to call the API — **not** to disable the submit button.
  - [ ] On successful submit:
    - [ ] Emit a `success` event to the parent (if applicable).
    - [ ] Close the dialog and reset form values + validation state.
  - [ ] On failed submit:
    - [ ] Keep the dialog open and rely on global error toasts or field-level errors for feedback.

---

## 8. Integration & Usage

**Goal**: Ensure the component can be imported and used correctly in pages and other components.

Checklist:

- [ ] Component is properly exported from `index.ts`:
  ```ts
  export { default as ComponentName } from './ComponentName.vue'
  ```
- [ ] Component can be imported in other files:
  - [ ] Example: `import { ComponentName } from '@/components/molecules/component-name'`.
- [ ] Props and emits work as expected when used in parent components.
- [ ] Component follows naming conventions:
  - [ ] File name: PascalCase (e.g. `AppHeader.vue`).
  - [ ] Component name in `defineOptions`: PascalCase (e.g. `'AppHeader'`).
