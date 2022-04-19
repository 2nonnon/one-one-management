<template>
  <el-container>
    <el-aside>
      <AppMenu />
    </el-aside>
    <el-container>
      <el-header><AppHeader /></el-header>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import AppMenu from './AppMenu/index.vue'
import AppHeader from './AppHeader/index.vue'
</script>

<style scoped lang="scss">
.el-container {
  height: 100vh;
}
.el-aside {
  width: auto;
}
</style>
