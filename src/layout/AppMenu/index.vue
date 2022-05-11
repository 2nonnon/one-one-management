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

    <el-menu-item index="/notice">
      <template #title>
        <el-icon>
          <bell-filled />
        </el-icon>
        <span>公告管理</span>
      </template>
    </el-menu-item>

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
    </el-sub-menu>

    <el-sub-menu index="/permission">
      <template #title>
        <el-icon>
          <user-filled />
        </el-icon>
        <span>用户管理</span>
      </template>
      <el-menu-item index="/permission/user">
        <span>用户管理</span>
      </el-menu-item>
      <el-menu-item index="/permission/admin">
        <span>管理员管理</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import { useStore } from '../../store/store'
import { HomeFilled, GoodsFilled, UserFilled, List, BellFilled } from '@element-plus/icons-vue'

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
