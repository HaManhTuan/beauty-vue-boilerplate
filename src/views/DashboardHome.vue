<script setup lang="ts">
defineOptions({ name: 'dashboard' })

import { useForm } from '@tanstack/vue-form'
import { useQuery } from '@tanstack/vue-query'
import { LayoutDashboard, Sparkles } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const { lastDemoSubmit } = storeToRefs(ui)

const demoSchema = z.object({
  note: z.string().min(1, 'Note is required.'),
})

const form = useForm({
  defaultValues: {
    note: '',
  },
  validators: {
    onChange: demoSchema,
    onSubmit: demoSchema,
  },
  onSubmit: async ({ value }) => {
    ui.setLastDemoSubmit(value.note)
  },
})

const { data: health } = useQuery({
  queryKey: ['app-health'],
  queryFn: async () => ({ ok: true as const }),
})
</script>

<template>
  <div class="mx-auto max-w-3xl space-y-6 animate__animated animate__fadeIn">
    <div class="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div class="flex items-start gap-3">
        <div
          class="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-muted"
        >
          <LayoutDashboard class="size-5 text-muted-foreground" aria-hidden="true" />
        </div>
        <div>
          <h2 class="text-lg font-semibold tracking-tight">Welcome</h2>
          <p class="mt-2 text-sm text-muted-foreground">
            Base admin shell — add modules under
            <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">src/views/</code>
            and routes in
            <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">src/router/</code>.
          </p>
          <p class="mt-3 text-sm text-muted-foreground">
            TanStack Query sample:
            <span class="font-medium text-foreground">{{ health?.ok ? 'ok' : '…' }}</span>
            · Supabase:
            <span class="font-medium text-foreground">
              {{ supabase ? 'env configured' : 'not configured' }}
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div class="mb-4 flex items-center gap-2">
        <Sparkles class="size-4 text-muted-foreground" aria-hidden="true" />
        <h3 class="text-sm font-medium">TanStack Form + Zod (demo)</h3>
      </div>

      <form @submit.prevent="form.handleSubmit">
        <form.Field v-slot="{ field, state }" name="note">
          <div class="space-y-2">
            <Label :for="field.name">Note</Label>
            <Input
              :id="field.name"
              :name="field.name"
              :model-value="field.state.value"
              :aria-invalid="state.meta.errors.length > 0"
              placeholder="Type something…"
              class="placeholder:text-muted-foreground"
              @update:model-value="(v) => field.handleChange(String(v ?? ''))"
              @blur="field.handleBlur"
            />
            <p
              v-for="(err, i) in state.meta.errors"
              :key="i"
              class="text-sm text-destructive"
            >
              {{ err?.message ?? String(err) }}
            </p>
          </div>
        </form.Field>

        <Button type="submit" class="mt-4">
          Submit
        </Button>
      </form>

      <p v-if="lastDemoSubmit" class="mt-4 text-sm text-muted-foreground">
        Last submit (Pinia):
        <span class="font-medium text-foreground">{{ lastDemoSubmit }}</span>
      </p>
    </div>
  </div>
</template>
