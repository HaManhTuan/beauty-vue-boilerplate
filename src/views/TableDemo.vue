<script setup lang="ts">
defineOptions({ name: 'table-demo' })

import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const { dataDensity } = storeToRefs(ui)

const isLoading = ref(false)

const rows = [
  {
    id: 'INV-001',
    name: 'Acme Corp subscription renewal',
    amount: 1284000,
    status: 'Paid',
  },
  {
    id: 'INV-002',
    name: 'Very long description that should truncate in the layout with tooltip on hover for full text access per design-system §7',
    amount: 45209900,
    status: 'Pending',
  },
  {
    id: 'INV-003',
    name: 'Line items — analytics export',
    amount: 0,
    status: 'Draft',
  },
]

function formatMoneyVnd(n: number): string {
  const rounded = Math.round(n)
  return `${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}₫`
}
</script>

<template>
  <div class="mx-auto max-w-6xl space-y-4">
    <div class="flex flex-wrap items-center gap-2">
      <span class="text-xs font-medium text-muted-foreground">Density</span>
      <Button
        size="sm"
        :variant="dataDensity === 'comfortable' ? 'default' : 'outline'"
        @click="ui.setDataDensity('comfortable')"
      >
        Comfortable
      </Button>
      <Button
        size="sm"
        :variant="dataDensity === 'compact' ? 'default' : 'outline'"
        @click="ui.setDataDensity('compact')"
      >
        Compact
      </Button>
      <span class="mx-2 hidden text-border sm:inline">|</span>
      <Button size="sm" variant="secondary" @click="isLoading = !isLoading">
        {{ isLoading ? 'Show data' : 'Skeleton loading' }}
      </Button>
    </div>

    <p class="text-xs text-muted-foreground">
      <code class="rounded bg-muted px-1 font-mono">data-density="{{ dataDensity }}"</code>
      on shell <code class="font-mono">&lt;main&gt;</code> — see
      <code class="font-mono">src/style.css</code> (<span class="font-mono">.ds-data-table</span>).
    </p>

    <div class="rounded-lg border border-border bg-card shadow-sm">
      <Table class="ds-data-table caption-bottom text-sm">
        <TableHeader>
          <TableRow class="border-b bg-muted/50 hover:bg-muted/50">
            <TableHead
              scope="col"
              class="ds-z-sticky-table-col sticky left-0 min-w-[140px] bg-muted/50 font-medium"
            >
              Name
            </TableHead>
            <TableHead scope="col" class="font-medium"> Invoice </TableHead>
            <TableHead scope="col" class="text-right font-medium"> Amount </TableHead>
            <TableHead scope="col" class="font-medium"> Status </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="isLoading">
            <TableRow v-for="i in 5" :key="i" class="border-b">
              <TableCell class="sticky left-0 bg-card">
                <Skeleton class="h-4 w-[min(100%,12rem)]" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-4 w-20" />
              </TableCell>
              <TableCell class="text-right">
                <Skeleton class="ml-auto h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-4 w-16" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow v-for="row in rows" :key="row.id" class="border-b">
              <TableCell
                class="ds-z-sticky-table-col sticky left-0 max-w-[14rem] truncate bg-card font-medium"
                :title="row.name"
              >
                {{ row.name }}
              </TableCell>
              <TableCell class="text-muted-foreground">
                {{ row.id }}
              </TableCell>
              <TableCell
                class="ds-tabular-nums text-right font-medium"
              >
                {{ formatMoneyVnd(row.amount) }}
              </TableCell>
              <TableCell>
                {{ row.status }}
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
