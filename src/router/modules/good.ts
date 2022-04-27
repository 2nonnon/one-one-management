import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'good',
  name: 'good',
  component: RouterView,
  meta: {
    title: '商品管理'
  },
  children: [
    {
      path: 'list',
      name: 'good-list',
      component: () => import('@/views/good/list/index.vue'),
      meta: {
        title: '商品列表'
      }
    },
    {
      path: 'category',
      name: 'good-category',
      component: () => import('@/views/good/category/index.vue'),
      meta: {
        title: '商品分类'
      }
    },
    {
      path: 'attr',
      name: 'good-attr',
      component: () => import('@/views/good/attr/index.vue'),
      meta: {
        title: '商品规格'
      }
    },
    {
      path: 'reply',
      name: 'good-reply',
      component: () => import('@/views/good/reply/index.vue'),
      meta: {
        title: '商品评论'
      }
    },
    {
      path: 'create',
      name: 'good-create',
      component: () => import('@/views/good/create/index.vue'),
      meta: {
        title: '新增商品'
      }
    },
    {
      path: 'edit/:id',
      name: 'good-edit',
      component: () => import('@/views/good/edit/index.vue'),
      meta: {
        title: '编辑商品'
      }
    }
  ]
}

export default routes
