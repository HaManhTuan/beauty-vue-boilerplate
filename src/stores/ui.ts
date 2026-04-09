import { defineStore } from 'pinia'
import { ref } from 'vue'

export type UiDataDensity = 'comfortable' | 'compact'

/** Shell + demo UI preferences */
export const useUiStore = defineStore('ui', () => {
  const lastDemoSubmit = ref<string | null>(null)
  const dataDensity = ref<UiDataDensity>('comfortable')

  function setLastDemoSubmit(value: string) {
    lastDemoSubmit.value = value
  }

  function setDataDensity(value: UiDataDensity) {
    dataDensity.value = value
  }

  function toggleDataDensity() {
    dataDensity.value =
      dataDensity.value === 'comfortable' ? 'compact' : 'comfortable'
  }

  return {
    lastDemoSubmit,
    setLastDemoSubmit,
    dataDensity,
    setDataDensity,
    toggleDataDensity,
  }
})
