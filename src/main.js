import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia';

import './css/style.css'

const app = createApp(App)
app.use(createPinia());
app.use(router)
app.mount('#app')
