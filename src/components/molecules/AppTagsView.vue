<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useTagsViewStore } from '@/stores/tags-view'

const route = useRoute()
const router = useRouter()
const tagsView = useTagsViewStore()
const { visitedViews } = storeToRefs(tagsView)

onMounted(() => {
  tagsView.initAffixTags(router)
})

function isActive(fullPath: string) {
  return route.fullPath === fullPath
}

function closeTab(e: Event, fullPath: string) {
  e.stopPropagation()
  const view = visitedViews.value.find((v) => v.fullPath === fullPath)
  if (!view) {
    return
  }
  const next = tagsView.delView(view)
  if (isActive(fullPath)) {
    if (next) {
      void router.push(next.fullPath)
    } else {
      void router.push('/')
    }
  }
}

function onTabClick(fullPath: string) {
  if (route.fullPath !== fullPath) {
    void router.push(fullPath)
  }
}
</script>

<template>
  <div
    class="flex min-h-9 items-center gap-1 overflow-x-auto border-b border-border bg-muted/20 px-2 py-1"
    role="tablist"
    aria-label="Open pages"
  >
    <div
      v-for="v in visitedViews"
      :key="v.fullPath"
      class="inline-flex max-w-[11rem] shrink-0 overflow-hidden rounded-md border text-xs transition-colors"
      :class="
        isActive(v.fullPath)
          ? 'border-primary/40 bg-primary/5 font-medium text-primary'
          : 'border-border/80 bg-background text-foreground hover:bg-accent hover:text-accent-foreground'
      "
    >
      <button
        type="button"
        role="tab"
        class="min-w-0 flex-1 cursor-pointer truncate px-2 py-1 text-left"
        :aria-selected="isActive(v.fullPath)"
        @click="onTabClick(v.fullPath)"
      >
        {{ v.title }}
      </button>
      <button
        v-if="!v.affix"
        type="button"
        class="flex w-7 shrink-0 cursor-pointer items-center justify-center border-l border-border/60 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        aria-label="Close tab"
        @click="closeTab($event, v.fullPath)"
      >
        <X class="size-3.5" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>
