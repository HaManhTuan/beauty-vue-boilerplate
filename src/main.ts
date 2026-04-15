import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import { registerUnauthorizedHandler } from './plugins/httpClient'
import { queryClient } from './plugins/queryClient'
import router from './router'
import { setupRouterGuards } from './router/guards'

import 'animate.css'
import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(VueQueryPlugin, { queryClient })
app.use(router)
setupRouterGuards(router)

registerUnauthorizedHandler(() => {
  void router.replace('/')
})

app.mount('#app')
