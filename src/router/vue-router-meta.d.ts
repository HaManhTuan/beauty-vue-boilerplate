import type { Component } from 'vue'

/**
 * Route `meta` — aligned with vue-element-admin / `index_ex.js`.
 * Wiring: `guards.ts` (roles + tags), `DashboardLayout` (KeepAlive), `AppBreadcrumb`, `AppTagsView`.
 */
declare module 'vue-router' {
  interface RouteMeta {
    /** Required roles; guard redirects to `forbidden` if `useAuthStore().hasAnyRole` fails. */
    roles?: string[]
    /** Shell header context, sidebar, tags, breadcrumb. */
    title?: string
    /** Lucide component for sidebar (index_ex used string ids). */
    icon?: Component
    /** When true, omitted from `<KeepAlive :include>` (see `stores/tags-view.ts`). */
    noCache?: boolean
    /** Pinned tab; cannot close in `AppTagsView`. */
    affix?: boolean
    /** If false, hidden in `AppBreadcrumb` (default: show when `title` is set). */
    breadcrumb?: boolean
    /**
     * When set on the **current** route, sidebar highlights the menu item whose path matches.
     * (index_ex: highlight list while on detail/edit.)
     */
    activeMenu?: string
    /** Omit from sidebar (index_ex `hidden` on parent route). */
    hidden?: boolean
  }
}

export {}
