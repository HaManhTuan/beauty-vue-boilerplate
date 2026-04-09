import type { Component } from 'vue'
import type { RouteRecordRaw, RouteRecordNameGeneric } from 'vue-router'

/** Normalize for comparison (Vue Router paths usually have no trailing slash). */
export function normalizeRoutePath(path: string): string {
  const p = path.trim()
  if (p === '' || p === '/') {
    return '/'
  }
  return p.replace(/\/+$/, '') || '/'
}

/** Full path for a layout child (parent `/`, child `table-demo` → `/table-demo`). */
export function layoutChildPath(parentPath: string, childPath: string): string {
  const base = parentPath === '/' ? '' : parentPath.replace(/\/$/, '')
  if (childPath === '' || childPath === undefined) {
    return base === '' ? '/' : normalizeRoutePath(base)
  }
  return normalizeRoutePath(`${base}/${childPath}`)
}

/** Sidebar row — built from layout `children` + `meta`. */
export interface SidebarNavItem {
  name: RouteRecordNameGeneric
  /** Resolved path for `activeMenu` matching and deep links. */
  path: string
  title: string
  icon: Component
}

/**
 * Uses `meta.title`, `meta.icon` (Lucide), skips `meta.hidden`.
 * `path` is derived from `parentPath` + child `path` (default parent `/`).
 */
export function childrenToSidebarNavItems(
  children: RouteRecordRaw[],
  parentPath = '/',
): SidebarNavItem[] {
  const items: SidebarNavItem[] = []

  for (const child of children) {
    if (child.meta?.hidden === true) {
      continue
    }
    const title = child.meta?.title
    const icon = child.meta?.icon
    if (typeof title !== 'string' || title.length === 0) {
      continue
    }
    if (child.name === undefined || icon === undefined) {
      continue
    }

    const path = layoutChildPath(parentPath, child.path ?? '')

    items.push({
      name: child.name,
      path,
      title,
      icon: icon as Component,
    })
  }

  return items
}

/**
 * Active sidebar item: current route name matches, or `route.meta.activeMenu` matches item path.
 */
export function isSidebarItemActive(
  routePath: string,
  routeName: RouteRecordNameGeneric | null | undefined,
  routeActiveMenu: string | undefined,
  item: Pick<SidebarNavItem, 'name' | 'path'>,
): boolean {
  if (routeName !== undefined && routeName !== null && routeName === item.name) {
    return true
  }
  if (typeof routeActiveMenu === 'string' && routeActiveMenu.length > 0) {
    return normalizeRoutePath(routeActiveMenu) === normalizeRoutePath(item.path)
  }
  return normalizeRoutePath(routePath) === normalizeRoutePath(item.path)
}
