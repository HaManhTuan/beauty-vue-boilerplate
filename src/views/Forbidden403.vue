<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { Button } from '@/components/ui/button'

defineOptions({ name: 'forbidden' })
</script>

<template>
  <div class="flex min-h-[40vh] flex-col items-center justify-center gap-4 p-6 text-center">
    <h1 class="text-lg font-semibold text-foreground">Access denied</h1>
    <p class="max-w-md text-sm text-muted-foreground">
      You do not have permission to open this page. Required roles are set on
      <code class="rounded bg-muted px-1 py-0.5 text-xs">route.meta.roles</code>.
    </p>
    <Button as-child variant="default">
      <RouterLink to="/">Back to dashboard</RouterLink>
    </Button>
  </div>
</template>
