import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'order',
  name: 'order',
  component: RouterView,
  meta: {
    title: '订单管理'
  },
  redirect: {
    name: 'order-list'
  },
  children: [
    {
      path: 'list',
      name: 'order-list',
      component: () => import('@/views/order/list/index.vue'),
      meta: {
        title: '订单列表'
      }
    },
    {
      path: 'detail/:id',
      name: 'order-detail',
      component: () => import('@/views/order/detail/index.vue'),
      meta: {
        title: '订单详情'
      }
    },
    {
      path: 'offline',
      name: 'order-offline',
      component: () => import('@/views/order/offline/index.vue'),
      meta: {
        title: '订单offline'
      }
    }
  ]
}

export default routes
