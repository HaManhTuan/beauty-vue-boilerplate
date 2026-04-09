import type { Router } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { useTagsViewStore } from '@/stores/tags-view'

export function setupRouterGuards(router: Router) {
  router.beforeEach((to) => {
    const auth = useAuthStore()
    const record = [...to.matched]
      .reverse()
      .find((r) => {
        const roles = r.meta.roles
        return Array.isArray(roles) && roles.length > 0
      })

    if (record?.meta.roles?.length) {
      const ok = auth.hasAnyRole(record.meta.roles)
      if (!ok) {
        return { name: 'forbidden', replace: true }
      }
    }

    useTagsViewStore().addVisited(to)
  })
}
