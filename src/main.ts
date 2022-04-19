import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './styles/index.scss'
import elementPlus from './plugins/element-plus'
import { createPinia } from 'pinia'

const store = createPinia()

createApp(App).use(router).use(store).use(elementPlus).mount('#app')
