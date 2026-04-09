<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { RouterView, useRoute } from 'vue-router'

import DashboardHeader from '@/components/molecules/DashboardHeader.vue'
import AppSidebar from '@/components/molecules/AppSidebar.vue'
import AppTagsView from '@/components/molecules/AppTagsView.vue'
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { useTagsViewStore } from '@/stores/tags-view'
import { useUiStore } from '@/stores/ui'

const route = useRoute()
const ui = useUiStore()
const tagsView = useTagsViewStore()
const { dataDensity } = storeToRefs(ui)
const { cachedViewNames } = storeToRefs(tagsView)
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset class="min-h-svh">
      <DashboardHeader />
      <AppTagsView />
      <div
        class="ds-shell-main min-h-0 flex-1 overflow-auto"
        :data-density="dataDensity"
      >
        <RouterView v-slot="{ Component }">
          <KeepAlive :include="cachedViewNames">
            <component :is="Component" v-if="Component" :key="route.fullPath" />
          </KeepAlive>
        </RouterView>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
