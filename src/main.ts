import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { LogInFilled } from '@vicons/material'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('LogInFilled', LogInFilled)
app.use(createPinia())
app.use(router)

app.mount('#app')
