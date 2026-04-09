<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Moon, Sun } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'

const isDark = useDark({
  storageKey: 'admin-dashboard-color-mode',
  valueDark: 'dark',
  valueLight: '',
})

const toggleDark = useToggle(isDark)
</script>

<template>
  <Button
    type="button"
    variant="outline"
    size="icon"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggleDark()"
  >
    <Sun v-if="isDark" class="size-4" aria-hidden="true" />
    <Moon v-else class="size-4" aria-hidden="true" />
  </Button>
</template>
