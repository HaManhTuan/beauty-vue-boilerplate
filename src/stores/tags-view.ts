import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Router } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

export interface VisitedViewTag {
  name: string
  fullPath: string
  title: string
  affix?: boolean
}

export const useTagsViewStore = defineStore('tagsView', () => {
  const visitedViews = ref<VisitedViewTag[]>([])
  /** Passed to `<KeepAlive :include="…">` — must match SFC `defineOptions({ name })`. */
  const cachedViewNames = ref<string[]>([])

  function addCache(name: string) {
    if (!cachedViewNames.value.includes(name)) {
      cachedViewNames.value.push(name)
    }
  }

  function delCache(name: string) {
    cachedViewNames.value = cachedViewNames.value.filter((n) => n !== name)
  }

  function addVisited(route: RouteLocationNormalizedLoaded) {
    if (route.meta.hidden === true) {
      return
    }
    const title = route.meta.title
    if (typeof title !== 'string' || !title) {
      return
    }
    if (route.name === undefined || route.name === null) {
      return
    }

    const name = String(route.name)
    const exists = visitedViews.value.some((v) => v.fullPath === route.fullPath)
    if (!exists) {
      visitedViews.value.push({
        name,
        fullPath: route.fullPath,
        title,
        affix: route.meta.affix === true,
      })
    }

    if (route.meta.noCache === true) {
      delCache(name)
    } else {
      addCache(name)
    }
  }

  /** Pre-open affix tabs (e.g. Dashboard) before user navigates there. */
  function initAffixTags(router: Router) {
    router.getRoutes().forEach((r) => {
      if (
        r.name === undefined
        || r.meta?.affix !== true
        || r.meta?.hidden === true
        || typeof r.meta?.title !== 'string'
      ) {
        return
      }
      const resolved = router.resolve({ name: r.name })
      if (visitedViews.value.some((v) => v.fullPath === resolved.fullPath)) {
        return
      }
      const name = String(r.name)
      visitedViews.value.unshift({
        name,
        fullPath: resolved.fullPath,
        title: r.meta.title,
        affix: true,
      })
      if (r.meta.noCache !== true) {
        addCache(name)
      }
    })
  }

  /** Returns the view to activate after close, or undefined if list empty. */
  function delView(view: VisitedViewTag): VisitedViewTag | undefined {
    if (view.affix) {
      return undefined
    }
    const i = visitedViews.value.findIndex((v) => v.fullPath === view.fullPath)
    if (i === -1) {
      return undefined
    }
    visitedViews.value.splice(i, 1)
    delCache(view.name)
    return visitedViews.value[i] ?? visitedViews.value[i - 1] ?? visitedViews.value[0]
  }

  return {
    visitedViews,
    cachedViewNames,
    addVisited,
    initAffixTags,
    delView,
  }
})
