import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * App roles for `route.meta.roles` checks (`router/guards.ts`).
 * Default includes `admin` so existing routes keep working; adjust in login flow later.
 */
export const useAuthStore = defineStore('auth', () => {
  const roles = ref<string[]>(['admin', 'editor'])

  function setRoles(next: string[]) {
    roles.value = [...next]
  }

  function hasAnyRole(required: readonly string[]) {
    return required.some((r) => roles.value.includes(r))
  }

  return { roles, setRoles, hasAnyRole }
})
