import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './styles/index.scss'
import elementPlus from './plugins/element-plus'
import { createPinia } from 'pinia'
import { piniaPlugin } from './plugins/pinia-plugin'

const pinia = createPinia()
pinia.use(piniaPlugin({
  key: 'pinia'
}))

createApp(App).use(pinia).use(router).use(elementPlus).mount('#app')
