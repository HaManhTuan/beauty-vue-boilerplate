## Table List Display (一覧表) Implementation Guide

This document defines how to implement data tables across all list/management pages using the shared `DataTable` molecule.

---

### 1. Core Rules

| Rule               | Value                                   |
| ------------------ | --------------------------------------- |
| Empty state text   | `No matching data was found.`          |
| Pagination options | `[10, 25, 50, 100]`                     |
| Default page size  | `25`                                    |
| Column width       | Fixed width for every column            |
| Long text          | Ellipsis (`...`) + tooltip on hover     |
| Row click          | Disabled — use dedicated action buttons |

---

### 2. DataTable Component

Use `DataTable` from `src/components/molecules/data-table`.

**Basic usage:**

```vue
<script setup lang="ts">
import { DataTable, type TableColumn } from '@/components/molecules/data-table'

const columns: TableColumn<ItemModel>[] = [
  { key: 'id', header: 'ID', width: '80px' },
  { key: 'name', header: 'name', width: '200px', truncate: true },
  { key: 'description', header: 'description', width: '300px', truncate: true },
  // ...action column (see section 7)
]
</script>

<template>
  <DataTable
    :columns="columns"
    :data="items"
    :loading="isLoading"
    :pagination="pagination"
    @page-change="handlePageChange"
    @page-size-change="handlePageSizeChange"
  />
</template>
```

---

### 3. Empty State

The `DataTable` component handles empty state automatically with the `emptyText` prop (default: `No matching data was found.`).

This message appears for both:

- No data exists at all
- Search returned no results

**If you need a custom message:**

```vue
<DataTable :columns="columns" :data="items" empty-text="No matching data was found." />
```

---

### 4. Pagination

The `DataTable` component includes pagination via the `Pagination` molecule.

**Page size options:** `[10, 25, 50, 100]` — configured in `DataTable.vue`.

**Default page size:** `25` — set via query params.

**Parent view pattern:**

```ts
import { useQueryParams } from '@/composables/useQueryParams'

const { queryParams, updateParams } = useQueryParams<QueryParams>({
  page: 1,
  limit: 25, // default page size
})

const handlePageChange = (page: number) => {
  updateParams({ page })
}

const handlePageSizeChange = (size: number) => {
  updateParams({ limit: size, page: 1 })
}
```

**Template:**

```vue
<DataTable
  :columns="columns"
  :data="items"
  :loading="isLoading"
  :pagination="pagination"
  @page-change="handlePageChange"
  @page-size-change="handlePageSizeChange"
/>
```

---

### 5. Column Width & Long Text (Ellipsis + Tooltip)

Every column must have a **fixed width**. Long text must show `...` with a tooltip on hover.

**Column definition with truncate:**

```ts
const columns: TableColumn<ItemModel>[] = [
  {
    key: 'name',
    header: 'name',
    width: '200px',
    truncate: true,
    tooltipText: (row: ItemModel) => row.name ?? '-',
    render: (row: ItemModel) => h('span', row.name ?? '-'),
  },
  {
    key: 'description',
    header: 'description',
    width: '300px',
    truncate: true,
    render: (row: ItemModel) => h('span', row.description ?? '-'),
  },
]
```

The `DataTable` internally renders truncated columns with `TooltipProvider` + `Tooltip`:

```vue
<template v-if="getColumnConfig(cell.column.id)?.truncate">
  <TooltipProvider>
    <Tooltip :delay-duration="300">
      <TooltipTrigger as-child>
        <span class="block w-full truncate">
          <component :is="() => renderCell(cell)" />
        </span>
      </TooltipTrigger>
      <TooltipContent class="max-w-[320px] break-words">
        {{ getTooltipText(cell) }}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
```

---

### 6. Row Click — Disabled

Do **not** enable opening detail by clicking a table row. Use dedicated action buttons instead.

**Do not set `row-clickable` or `@row-click` unless specifically needed for other interactions.**

---

### 7. Action Column

Every management table has an action column with Edit and Delete buttons.

**Column definition:**

```ts
import { h } from 'vue'
import { Pencil, Trash2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

{
  key: 'actions',
  header: 'actions',
  width: '160px',
  align: 'center',
  render: (row: ItemModel) =>
    h('div', { class: 'flex items-center justify-center gap-2' }, [
      h(
        Button,
        {
          class: 'bg-cobalt-100 text-cobalt-700 hover:bg-cobalt-100-hover border-cobalt-700/20',
          size: 'sm',
          onClick: (e: Event) => {
            e.stopPropagation()
            handleEditClick(row)
          },
        },
        () => [h(Pencil, { class: 'h-4 w-4' }), h('span', ' edit')],
      ),
      h(
        Button,
        {
          class: 'bg-red-100 text-red-600 hover:bg-red-100-hover border-red-600/20',
          size: 'sm',
          onClick: (e: Event) => {
            e.stopPropagation()
            handleDeleteClick(row)
          },
        },
        () => [h(Trash2, { class: 'h-4 w-4' }), h('span', ' delete')],
      ),
    ]),
}
```

Key points:

- Header: `operate`
- Align: `center`
- Always `e.stopPropagation()` on action buttons
- Actions visible on all rows (no hidden-on-hover)
- Edit button: cobalt style + Pencil icon + `sửa`
- Delete button: red style + Trash2 icon + `xóa`

---

### 8. Delete Confirmation

After clicking `delete`, show a `ConfirmDialog`:

```vue
<ConfirmDialog
  v-model="isDeleteDialogOpen"
  title="Deletion confirmation"
  :message="`{Entity}Delete it. Is that OK\n「{Entity}ID：${selectedItem?.id}」\n「{Entity}名: ${selectedItem?.name}」`"
  confirm-text="Yes"
  cancel-text="No"
  variant="destructive"
  :loading="isDeleting"
  :show-cancel-icon="true"
  :show-confirm-icon="true"
  @confirm="handleDeleteConfirm"
  @cancel="handleDeleteCancel"
/>
```

---

### 9. Full Page Pattern

A complete management page wires together: header + filter form + data table + form dialog + confirm dialog.

```vue
<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 class="text-xl font-semibold text-gray-900">{Entity}manage</h1>
      <Button @click="handleCreateClick" class="bg-gray-900 text-white hover:bg-gray-900-hover">
        <Plus class="mr-2 h-4 w-4" />
        {Entity}add
      </Button>
    </div>

    <!-- Filter Form (optional) -->
    <FilterForm v-model="queryParams" @search="handleSearch" @clear="handleClear" />

    <!-- Data Table -->
    <DataTable
      :columns="columns"
      :data="items"
      :loading="isLoading"
      :pagination="pagination"
      @page-change="handlePageChange"
      @page-size-change="handlePageSizeChange"
    />

    <!-- Form Dialog -->
    <FormDialog
      v-model="isFormDialogOpen"
      :item="selectedItem"
      :mode="dialogMode"
      @success="handleFormSuccess"
    />

    <!-- Delete Confirm Dialog -->
    <ConfirmDialog v-model="isDeleteDialogOpen" ... />
  </div>
</template>
```

---

### 10. Reference Files

| Concern             | File                                                        |
| ------------------- | ----------------------------------------------------------- |
| DataTable molecule  | `src/components/molecules/data-table/DataTable.vue`         |
| Pagination molecule | `src/components/molecules/pagination/Pagination.vue`        |
| Table column type   | `src/components/molecules/data-table/types.ts`              |
| ConfirmDialog       | `src/components/molecules/confirm-dialog/ConfirmDialog.vue` |
