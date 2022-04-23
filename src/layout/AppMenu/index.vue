<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    default-active="2"
    text-color="#fff"
    router
    :collapse="store.isCollapse"
  >
    <el-menu-item index="/">
      <el-icon>
        <home-filled />
      </el-icon>
      <span>首页</span>
    </el-menu-item>

    <el-sub-menu index="/good">
      <template #title>
        <el-icon>
          <goods-filled />
        </el-icon>
        <span>商品管理</span>
      </template>
      <el-menu-item index="/good/list">
        <span>商品列表</span>
      </el-menu-item>
      <el-menu-item index="/good/category">
        <span>商品分类</span>
      </el-menu-item>
      <el-menu-item index="/good/attr">
        <span>商品规格</span>
      </el-menu-item>
      <el-menu-item index="/good/reply">
        <span>商品评论</span>
      </el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="/order">
      <template #title>
        <el-icon>
          <list />
        </el-icon>
        <span>订单管理</span>
      </template>
      <el-menu-item index="/order/list">
        <span>订单列表</span>
      </el-menu-item>
      <el-menu-item index="/order/offline">
        <span>订单offline</span>
      </el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="/permission">
      <template #title>
        <el-icon>
          <user-filled />
        </el-icon>
        <span>权限管理</span>
      </template>
      <el-menu-item index="/permission/role">
        <span>角色</span>
      </el-menu-item>
      <el-menu-item index="/permission/admin">
        <span>管理员</span>
      </el-menu-item>
      <el-menu-item index="/permission/rule">
        <span>规则</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import { useStore } from '../../store/store'
import { HomeFilled, GoodsFilled, UserFilled, List } from '@element-plus/icons-vue'

const store = useStore()
</script>

<style scoped lang="scss">
.el-menu {
  height: 100%;
}
.el-menu:not(.el-menu--collapse) {
  width: 200px;
}
</style>
