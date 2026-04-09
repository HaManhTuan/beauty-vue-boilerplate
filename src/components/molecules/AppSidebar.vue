<script setup lang="ts">
import { ChevronsLeft } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'
import { dashboardLayoutChildren } from '@/router/dashboard-children'
import { childrenToSidebarNavItems, isSidebarItemActive } from '@/router/sidebar-nav'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const { state, toggleSidebar } = useSidebar()
const auth = useAuthStore()
const { roles } = storeToRefs(auth)

/** Same `children` array as `dashboardLayoutRoute` — sidebar stays in sync with router. */
const navItems = computed(() => {
  const items = childrenToSidebarNavItems(dashboardLayoutChildren)
  return items.filter((item) => {
    // If a route requires roles, hide it from sidebar unless user has any of them.
    const routeRecord = dashboardLayoutChildren.find((r) => r.name === item.name)
    const required = routeRecord?.meta?.roles
    if (!Array.isArray(required) || required.length === 0) {
      return true
    }
    return required.some((r) => roles.value.includes(r))
  })
})

const toggleLabel = computed(() =>
  state.value === 'expanded' ? 'Collapse sidebar' : 'Expand sidebar',
)
</script>

<template>
  <Sidebar collapsible="icon" aria-label="Main navigation">
    <SidebarHeader
      class="border-b border-sidebar-border px-4 py-3.5 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-3"
    >
      <div
        class="flex min-w-0 items-center gap-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0"
      >
        <div
          class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-xs font-bold text-sidebar-primary-foreground"
          aria-hidden="true"
        >
          A
        </div>
        <div class="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
          <p class="truncate text-sm font-semibold leading-tight tracking-tight text-sidebar-foreground">
            Admin
          </p>
          <p class="mt-0.5 truncate text-xs leading-tight text-sidebar-foreground/65">
            Console
          </p>
        </div>
      </div>
    </SidebarHeader>

    <SidebarContent class="gap-0 px-2 py-3">
      <SidebarGroup class="gap-1 p-0">
        <SidebarGroupLabel class="px-2 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/55">
          Navigation
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu class="gap-0.5">
            <SidebarMenuItem v-for="item in navItems" :key="String(item.name)">
              <SidebarMenuButton
                as-child
                :tooltip="item.title"
                :is-active="isSidebarItemActive(route.path, route.name, route.meta.activeMenu, item)"
                class="app-sidebar-nav-link cursor-pointer"
              >
                <RouterLink :to="{ name: item.name }">
                  <component
                    :is="item.icon"
                    class="size-4 shrink-0 text-sidebar-foreground/70"
                    aria-hidden="true"
                  />
                  <span>{{ item.title }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter class="border-t border-sidebar-border p-2">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            class="cursor-pointer text-sidebar-foreground/80 hover:text-sidebar-foreground"
            :tooltip="toggleLabel"
            @click="toggleSidebar"
          >
            <ChevronsLeft
              class="size-4 shrink-0 transition-transform duration-200 ease-out"
              :class="state === 'collapsed' ? 'rotate-180' : ''"
              aria-hidden="true"
            />
            <span class="group-data-[collapsible=icon]:sr-only">{{ toggleLabel }}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>

    <SidebarRail />
  </Sidebar>
</template>

<style scoped>
/* §2.3 — active route: primary tint + left rail (clear at a glance; editorial minimal). */
:deep([data-sidebar='content'] [data-sidebar='menu-button'].app-sidebar-nav-link[data-active]) {
  @apply border-l-2 border-primary bg-primary/10 font-semibold text-primary;
}

:deep([data-sidebar='content'] [data-sidebar='menu-button'].app-sidebar-nav-link[data-active] svg) {
  @apply text-primary opacity-100;
}

:deep([data-sidebar='content'] [data-sidebar='menu-button'].app-sidebar-nav-link:not([data-active])) {
  @apply border-l-2 border-transparent;
}
</style>
