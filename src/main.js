import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia';
import vtooltip from "./utils/tooltip.js"

import './css/style.css'
import './css/tooltip.css'

const app = createApp(App)
app.directive('tooltip', vtooltip)
app.use(router)
app.use(createPinia());
app.mount('#app')
