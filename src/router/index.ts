import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { asyncDashboardChildren, constantDashboardChildren } from '@/router/dashboard-children'

/** Base pages: no permission requirements, all roles can access. */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DashboardLayout,
    children: [...constantDashboardChildren, ...asyncDashboardChildren],
  },
]

/** Permission-based routes: enforced via `meta.roles` (see `router/guards.ts`). */
export const asyncRoutes: RouteRecordRaw[] = asyncDashboardChildren

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
})

export default router
