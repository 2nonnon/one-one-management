import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
import goodRoutes from './modules/good'
import orderRoutes from './modules/order'
import permissionRoutes from './modules/permission'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { useStore } from '../store/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: AppLayout,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/Home/index.vue')
      },
      goodRoutes,
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

router.beforeEach((to, from, next) => {
  const store = useStore()
  nprogress.start()
  if (to.path === '/login' || store.accessToken) {
    next()
  } else {
    next({
      path: '/login',
      query: {
        redirect: to.path
      }
    })
  }
})

router.afterEach(() => {
  nprogress.done()
})

export default router
