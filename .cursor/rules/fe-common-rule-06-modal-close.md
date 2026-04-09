## Modal Close Behavior Implementation Guide

This document defines how to control modal/dialog close behavior across the application.

---

### 1. Core Rules

Aligned with **`.cursorrules`** (Form & CRUD / Dialog).

| Rule             | Description                                                                 |
| ---------------- | --------------------------------------------------------------------------- |
| Close via button | User can close using `Close` / `Cancel` / `X` where shown                  |
| **Form CRUD**    | **Create/edit** form dialogs: **no** overlay click, **no** **Esc** — see §2 |
| **Other modals** | May allow **Esc** (and sometimes overlay) — see §2                          |
| Other actions    | Do **not** close the modal from random actions before an explicit close path |

---

### 2. Two Dialog Categories

| Category                       | Click outside | Esc key   | Notes |
| ------------------------------ | ------------- | --------- | ----- |
| **Form dialogs** (create/edit) | **Disabled**  | **Disabled** | User closes via **Cancel** / success flow; avoids accidental loss of input (matches **`.cursorrules`**) |
| **Confirm dialogs** (delete)   | Disabled      | Enabled   | `ConfirmDialog` pattern — Esc ok for quick dismiss |

---

### 3. Form Dialog Implementation

For create/edit form dialogs, disable **both** click-outside **and** Esc (same as **`.cursorrules`**):

```vue
<Dialog :open="modelValue" @update:open="handleOpenChange">
  <DialogContent
    :close-on-click-outside="false"
    :close-on-escape="false"
    :show-close-button="true"
    class="max-h-[90vh] overflow-y-auto sm:max-w-[600px]"
  >
    <DialogHeader>
      <DialogTitle>{{ mode === 'create' ? 'Create New' : 'Edit' }}</DialogTitle>
    </DialogHeader>

    <!-- Form content -->

    <DialogFooter>
      <Button variant="ghost" @click="handleCancel">cancel</Button>
      <Button @click="handleSubmit">keep</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Key props:**

- `:close-on-click-outside="false"` — prevent accidental closure while filling the form
- `:close-on-escape="false"` — do **not** close on Esc; user uses **Cancel** or completes the flow
- `:show-close-button="true"` — optional header **X**; ensure `handleOpenChange` still resets validation when closing

---

### 4. Open State Management

Use `v-model` or `:open` + `@update:open` for controlled dialog state:

```ts
const props = defineProps<{
  modelValue: boolean
  mode: 'create' | 'edit'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  success: []
}>()

function handleOpenChange(open: boolean) {
  if (!open) {
    resetForm()
  }
  emit('update:modelValue', open)
}

function handleCancel() {
  resetForm()
  emit('update:modelValue', false)
}
```

---

### 5. Reset Form on Close

When a dialog is closed (via cancel, header close, or success), always clear form values and validation state:

```ts
function resetForm() {
  form.reset()
  // Clear any additional local state if needed
}
```

This applies to both create and edit modes.

---

### 6. Confirm Dialog (Delete)

The `ConfirmDialog` molecule handles its own close behavior:

```vue
<ConfirmDialog
  v-model="isDeleteDialogOpen"
  title="Deletion confirmation"
  :message="deleteMessage"
  confirm-text="yes"
  cancel-text="no"
  variant="destructive"
  :loading="isDeleting"
  @confirm="handleDeleteConfirm"
  @cancel="handleDeleteCancel"
/>
```

The `ConfirmDialog` component internally:

- Shows a close (X) button in the header
- Closes on Esc
- Does **not** close on click outside (no overlay click handler)

**Handlers:**

```ts
const handleDeleteConfirm = async () => {
  if (!selectedItem.value) return
  try {
    await deleteMutation.mutateAsync(selectedItem.value.id)
    showSuccessToast('削除が完了しました。')
  } catch {
    // Error toast handled by global interceptor
  }
  isDeleteDialogOpen.value = false
  selectedItem.value = null
}

const handleDeleteCancel = () => {
  isDeleteDialogOpen.value = false
  selectedItem.value = null
}
```

---

### 7. DialogContent Props Summary

| Prop                     | Type      | Default | Description                        |
| ------------------------ | --------- | ------- | ---------------------------------- |
| `close-on-click-outside` | `boolean` | `true`  | Close dialog when clicking overlay |
| `close-on-escape`        | `boolean` | `true`  | Close dialog when pressing Esc     |
| `show-close-button`      | `boolean` | `true`  | Show X button in top-right corner  |

**Recommended settings by dialog type:**

| Dialog type        | `close-on-click-outside` | `close-on-escape` | `show-close-button` |
| ------------------ | ------------------------ | ----------------- | ------------------- |
| Form (create/edit) | `false`                  | `false`           | `true`              |
| Confirm (delete)   | `false`                  | `true`            | `true`              |
| Info / read-only   | `true`                   | `true`            | `true`              |

---

### 8. Reference Files

| Concern                 | File                                                               |
| ----------------------- | ------------------------------------------------------------------ |
| DialogContent atom      | `src/components/atoms/dialog/DialogContent.vue`                    |
| Project CRUD rules      | `.cursorrules` (Dialog + Form & CRUD sections)                     |
