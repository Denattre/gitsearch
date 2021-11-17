import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './assets/css/tailwind.css'

createApp(App).use(store).use(router).mount('#app')
