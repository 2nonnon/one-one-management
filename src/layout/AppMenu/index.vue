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
        <location />
      </el-icon>
      <span>首页</span>
    </el-menu-item>

    <el-sub-menu index="/product">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>商品</span>
      </template>
      <el-menu-item index="/product/list">
        <el-icon>
          <location />
        </el-icon>
        <span>商品列表</span>
      </el-menu-item>
      <el-menu-item index="/product/classify">
        <el-icon>
          <location />
        </el-icon>
        <span>商品分类</span>
      </el-menu-item>
      <el-menu-item index="/product/attr">
        <el-icon>
          <location />
        </el-icon>
        <span>商品规格</span>
      </el-menu-item>
      <el-menu-item index="/product/reply">
        <el-icon>
          <location />
        </el-icon>
        <span>商品评论</span>
      </el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="/order">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>订单</span>
      </template>
      <el-menu-item index="/order/list">
        <el-icon>
          <location />
        </el-icon>
        <span>订单列表</span>
      </el-menu-item>
      <el-menu-item index="/order/offline">
        <el-icon>
          <location />
        </el-icon>
        <span>订单offline</span>
      </el-menu-item>
    </el-sub-menu>

    <el-menu-item index="/media">
      <el-icon>
        <location />
      </el-icon>
      <span>媒体</span>
    </el-menu-item>

    <el-sub-menu index="/permission">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>权限</span>
      </template>
      <el-menu-item index="/permission/role">
        <el-icon>
          <location />
        </el-icon>
        <span>角色</span>
      </el-menu-item>
      <el-menu-item index="/permission/admin">
        <el-icon>
          <location />
        </el-icon>
        <span>管理员</span>
      </el-menu-item>
      <el-menu-item index="/permission/rule">
        <el-icon>
          <Location />
        </el-icon>
        <span>规则</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import { useStore } from '../../store/store'
import { Location } from '@element-plus/icons-vue'

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
