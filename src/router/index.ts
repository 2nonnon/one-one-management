import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
import productRoutes from './modules/product'
import mediaRoutes from './modules/media'
import orderRoutes from './modules/order'
import permissionRoutes from './modules/permission'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/Home/index.vue')
      },
      productRoutes,
      mediaRoutes,
      orderRoutes,
      permissionRoutes
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  }
]

const router = createRouter({
  scrollBehavior: () => {
    return {
      top: 0
    }
  },
  history: createWebHistory(),
  routes
})

export default router
