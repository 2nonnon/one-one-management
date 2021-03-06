import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'permission',
  name: 'permission',
  component: RouterView,
  meta: {
    title: '用户管理'
  },
  redirect: {
    name: 'permission-user'
  },
  children: [
    {
      path: 'role',
      name: 'permission-role',
      component: () => import('@/views/permission/role/index.vue'),
      meta: {
        title: '角色管理'
      }
    },
    {
      path: 'user',
      name: 'permission-user',
      component: () => import('@/views/permission/user/index.vue'),
      meta: {
        title: '用户管理'
      }
    },
    {
      path: 'admin',
      name: 'permission-admin',
      component: () => import('@/views/permission/admin/index.vue'),
      meta: {
        title: '管理员管理'
      }
    },
    {
      path: 'rule',
      name: 'permission-rule',
      component: () => import('@/views/permission/rule/index.vue'),
      meta: {
        title: '权限规则'
      }
    }
  ]
}

export default routes
