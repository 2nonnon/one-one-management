<template>
  <el-container>
    <el-aside width="200px">
      <AppMenu />
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import AppMenu from './components/AppMenu.vue'
</script>
