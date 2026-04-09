import { LayoutDashboard, Table2 } from 'lucide-vue-next'
import type { RouteRecordRaw } from 'vue-router'

/**
 * Dashboard shell children — vue-element-admin style:
 * - `constantDashboardChildren`: no permission requirements (all roles can access).
 * - `asyncDashboardChildren`: permission-based via `meta.roles`.
 *
 * Sidebar + tags + keep-alive read from `dashboardLayoutChildren`.
 * - `affix`: pinned tab (cannot close).
 * - `noCache`: excluded from `<KeepAlive>`.
 * - `roles`: guard in `router/guards.ts` (see `useAuthStore().roles`).
 */
export const constantDashboardChildren: RouteRecordRaw[] = [
  {
    path: '',
    name: 'dashboard',
    meta: {
      title: 'Dashboard',
      icon: LayoutDashboard,
      affix: true,
    },
    component: () => import('@/views/DashboardHome.vue'),
  },
  {
    path: '403',
    name: 'forbidden',
    meta: {
      title: 'Access denied',
      hidden: true,
      breadcrumb: false,
    },
    component: () => import('@/views/Forbidden403.vue'),
  },
]

export const asyncDashboardChildren: RouteRecordRaw[] = [
  {
    path: 'table-demo',
    name: 'table-demo',
    meta: {
      title: 'Table demo',
      icon: Table2,
      roles: ['admin'],
      /** Example: page remounts each visit — not kept in `<KeepAlive>`. */
      noCache: true,
    },
    component: () => import('@/views/TableDemo.vue'),
  },
  {
    path: 'vip-area',
    name: 'vip-area',
    meta: {
      title: 'VIP area',
      roles: ['superadmin'],
      hidden: true,
      noCache: true,
    },
    component: () => import('@/views/VipArea.vue'),
  },
]

export const dashboardLayoutChildren: RouteRecordRaw[] = [
  ...constantDashboardChildren,
  ...asyncDashboardChildren,
]
