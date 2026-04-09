<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const crumbs = computed(() =>
  route.matched
    .filter(
      (r) =>
        typeof r.meta?.title === 'string'
        && r.meta.title.length > 0
        && r.meta.breadcrumb !== false,
    )
    .map((r) => ({
      title: r.meta.title as string,
      name: r.name,
    })),
)
</script>

<template>
  <nav aria-label="Breadcrumb" class="min-w-0">
    <ol class="flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
      <template v-for="(c, i) in crumbs" :key="`${i}-${c.title}`">
        <li v-if="i > 0" class="shrink-0" aria-hidden="true">
          <ChevronRight class="size-3.5 opacity-50" />
        </li>
        <li class="min-w-0 truncate">
          <RouterLink
            v-if="i < crumbs.length - 1 && c.name !== undefined && c.name !== null"
            v-slot="{ navigate, href }"
            :to="{ name: c.name }"
            custom
          >
            <a
              :href="href"
              class="cursor-pointer text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              @click="
                (e) => {
                  e.preventDefault()
                  navigate()
                }
              "
            >
              {{ c.title }}
            </a>
          </RouterLink>
          <span v-else class="font-medium text-foreground">{{ c.title }}</span>
        </li>
      </template>
    </ol>
  </nav>
</template>
