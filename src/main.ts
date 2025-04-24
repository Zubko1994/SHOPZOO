import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './routes/routes.ts'

createApp(App).use(router).mount('#app')
